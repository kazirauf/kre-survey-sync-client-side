import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";

// TODO: add key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY)
const Pricing = () => {
    return (
        <div>
    
            <Elements stripe={stripePromise}>
              <Payment></Payment>
            </Elements>
        </div>
    );
};

export default Pricing;