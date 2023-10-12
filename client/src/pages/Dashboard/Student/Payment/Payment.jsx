import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";
import useBookings from "../../../../hooks/useBookings";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_PK);
// TODO: key in loadStripe missing

const Payment = () => {
  const [bookings] = useBookings();
  const totalPrice = bookings.reduce(
    (sum, item) => parseInt(item.price) + sum,
    0
  );
  const price = parseFloat(totalPrice.toFixed(2));
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Helmet>
        <title>Soul Sync | Payment</title>
      </Helmet>
      <div className="max-w-xl container mx-auto text-center bg-white p-14 rounded-lg">
        <h3 className="text-2xl md:text-4xl font-semibold">
          Amount to Pay: ${price}
        </h3>
        <Elements stripe={stripePromise}>
          <CheckoutForm price={price} bookings={bookings} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
