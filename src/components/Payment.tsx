import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

import { postApi } from "@/api-client/methods";
import { useTotalContext } from "@/context/productContext";
import { PaymentIntentData } from "@/utils/interfaces";
import { toast } from "react-toastify";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Paw4TRrpeYldV0YphWsfpOZqwApIHf2IbS1TOIe9686LQKFY8vNciPdFtUZ38mr06rfaAQKlFavikOpYKfEYDjD00tTteCqOh"
);

export default function App() {
  const [clientSecret, setClientSecret] = React.useState("");
  const { state } = useTotalContext();
  const data = state.orderData;
  const createOrder = async () => {
    if (Object.keys(data)?.length > 0) {
      try {
        const responseData = await postApi<PaymentIntentData>({
          endUrl: "user/create-order",
          data,
        });
        if (responseData?.data?.client_secret) {
          setClientSecret(responseData?.data?.client_secret);
        }
      } catch (err: any) {
        toast.error(err?.message);
      }
    }
  };
  React.useEffect(() => {
    createOrder();
  }, [data]);

  const appearance = {
    theme: "stripe" as "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
