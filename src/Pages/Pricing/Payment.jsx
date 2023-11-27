import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const Payment = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState()
    const [clientSecret, setClientSecret] = useState('')
    const axiosSecure = useAxiosSecure()
    const [selectedUserId, setSelectedUserId] = useState(null);
    console.log(selectedUserId);
    const {user} = useAuth()


   

      useEffect(() => {
        const totalPrice = {
          price: 10
        };
        axiosSecure.post('/create-payment-intent', totalPrice)
          .then(res => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
          });
      }, [axiosSecure]);  
      



      const { data: paring = [] } = useQuery({
        queryKey: ['paring'],
        queryFn: async () => {
          const res = await axiosSecure.get('/paring');
          return res.data;
        },
      });
    
      useEffect(() => {
        const userData = paring.find((u) => u.name === user?.displayName);
        if (userData) {
          setSelectedUserId(userData._id);
        }
      }, [paring, user]);
    
      
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
            if(paymentIntent.status === "succeeded"){
                axiosSecure.patch(`/users/proUser/${selectedUserId}`).then((res) => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                      Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: `${user.displayName} is an pro user Now!`,
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }
                  });
            
            }

        
        }

        

    }
    return (
        <div>
            
            <h1 className="text-2xl text-center">You Want To A Pro User Pay: $10</h1>
              <form onSubmit={handleSubmit}>
                {
                    paring?.map(u => 
                       <div  key={u._id}>
                      {
                        u?.name === user?.displayName &&
                        <>
                        <h1 className="text-center text-5xl text-green-500">Dear {u.name} Get Payment</h1>
                        </>
                      }
                       </div>
                    )
                }

<CardElement
    className="lg:mx-[500px] mt-20 border-4 border-green-500 p-10"
    options={{
        style: {
            base: {
                fontSize: '20px',
                color: '#424770',
                border: '1px solid #ced4da', // Add this line for the border
                borderRadius: '4px', // Optional: Add border radius for rounded corners
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

           
         <div className="flex justify-center">
         <button className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-green-500 to-lime-500 text-white mt-10" type="submit"  disabled={!stripe || !clientSecret}>
                Pay
            </button>
         </div>
            
        </form>
        </div>
    );
};

export default Payment;