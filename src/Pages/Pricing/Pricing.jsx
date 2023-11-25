import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";

// TODO: add key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY)
const Pricing = () => {
    return (
        <div>
            <h1>Pricing Page</h1>
            <Elements stripe={stripePromise}>
              <Payment></Payment>
            </Elements>
        </div>
    );
};

export default Pricing;