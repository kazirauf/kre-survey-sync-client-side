import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";


const Payment = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState()
    const [clientSecret, setClientSecret] = useState('')
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
 

  useEffect(() => {
    const totalPrice = {
        price: 10
    }
    axiosSecure.post('/create-payment-intent', totalPrice)
    .then(res => {
     console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
    })



  }, [axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }
         
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
           
        }
        else {
            console.log('payment intent', paymentIntent)
            console.log("price", 10);
            // if(paymentIntent.status === "succeeded"){
                
            // }

        
        }

        

    }
    return (
        <div>
            <h1 className="text-2xl text-center">You Want To A Pro User Pay: $10</h1>
              <form onSubmit={handleSubmit}>

            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit"  disabled={!stripe || !clientSecret}>
                Pay
            </button>
            
        </form>
        </div>
    );
};

export default Payment;