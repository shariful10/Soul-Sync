import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
// import "./CheckoutForm.css";

const CheckoutForm = ({ price, bookings }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (price > 0) {
      console.log(price);
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      toast.warning(error.message, {
        position: "top-center",
        autoClose: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "unknown",
          },
        },
      });
    if (confirmError) {
      toast.warning(confirmError.message, {
        position: "top-center",
        autoClose: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
    console.log("paymentIntent: ", paymentIntent);

    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;

      // TODO: Next steps
      // Save payment info to server
      const payment = {
        email: user?.email,
        transactionId,
        price,
        date: new Date(),
        status: "Pending",
        quantity: bookings.length,
        bookingsItems: bookings.map((item) => item._id),
        classItems: bookings.map((item) => item.itemId),
      };
      // axiosSecure.post("/payments", payment).then((res) => {
      //   console.log(res.data);
      //   if (res.data.result.insertedId) {
      //     // call the class update api?

      //     navigate("/dashboard/my-payments");
      //     toast.success(`Payment Success`, {
      //       position: "top-center",
      //       autoClose: 3000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "light",
      //     });
      //   }
      // });

      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        if (res.data.result.insertedId) {
          // Get the array of class item IDs from the response
          const classItems = res.data.classItems;

          // Iterate over each class item and call the class update API
          classItems.forEach((classId) => {
            const classUpdate = {
              id: classId,
              value: "some value", // Specify the value you want to update for each class item
            };

            // Call the class update API
            axiosSecure
              .patch(`/classes/${classUpdate.id}`, classUpdate)
              .then((response) => {
                console.log(response.data);
                // Handle the response or perform any additional actions
              })
              .catch((error) => {
                console.error(error);
                // Handle errors if necessary
              });
          });

          navigate("/dashboard/my-payments");
          toast.success(`Payment Success`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full my-10">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="text-center px-5 md:px-0 md:w[410px] mt-8">
        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
