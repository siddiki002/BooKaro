import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51N6BxLHzuVgB341SBthCgvPjtjsU8zUvyWqnKvsJoJmdoQ9xPSMPZbI5s8iJE3USmba0AHpGDp2bpItkq3wfRd4C00YI8S6MSR"
);

export default function Payment({ ticket, success, setSuccess }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        ticket={ticket}
        success={success}
        setSuccess={setSuccess}
      ></PaymentForm>
    </Elements>
  );
}
