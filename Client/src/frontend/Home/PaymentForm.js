import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "black",
      fontWeight: 400,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "black" },
      "::placeholder": { color: "black" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "black",
    },
  },
};

export default function PaymentForm({ ticket, success, setSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(
        CardCvcElement,
        CardExpiryElement,
        CardNumberElement
      ),
    });

    console.log(error, paymentMethod);

    if (!error) {
      try {
        console.log(ticket)
        axios.post("http://localhost:5001/payment", {ticket : ticket, id : paymentMethod.id})
        .then((response) => {
          console.log('Successful Payment')
          setSuccess(true)
        })
        .catch((err) => {
          console.log(`Error: ${err}`)
        })
        
        // Add server-side API code
        // send ticket to db see ticket structure in Criket.js Bus.js
        // const { id } = paymentMethod;
        // const response = await axios.post("http://localhost:5001/payment", {
        //   ticket: ticket,
        //   id,
        // });

        
      }
      catch (error) {
        console.log("Error", error);
      }
    } else {
      alert(error.message);
    }
  }

  return (
    <div style={{ height: "100%" }}>
      {!success ? (
        // <form onSubmit={handleSubmit}>
        //   <fieldset className="FormGroup">
        //     <div className="FormRow">
        //       <CardNumberElement options={CARD_OPTIONS} />
        //     </div>
        //   </fieldset>
        //   <fieldset className="FormGroup">
        //     <div className="FormRow">
        //       <CardExpiryElement options={CARD_OPTIONS} />
        //     </div>
        //   </fieldset>
        //   <fieldset className="FormGroup">
        //     <div className="FormRow">
        //       <CardCvcElement options={CARD_OPTIONS} />
        //     </div>
        //   </fieldset>
        //   <button>Pay</button>
        // </form>

        <div className="payment">
          <div className="card-label">Card Number</div>
          <div className="cardnum payment-inp">
            <CardNumberElement options={CARD_OPTIONS} />
          </div>
          <div className="card-label">Expiry</div>
          <div className="card-expiry payment-inp">
            <CardExpiryElement options={CARD_OPTIONS} />
          </div>
          <div className="card-label">CVC</div>
          <div className="card-cvc payment-inp">
            <CardCvcElement options={CARD_OPTIONS} />
          </div>
          <button
            className="card-pay"
            onClick={handleSubmit}
          >
            Pay
          </button>
        </div>
      ) : (
        <div className="payment-success">
          <h2>Payment successful</h2>
          <h3 className="Thank-you">Thank you for your patronage</h3>
        </div>
      )}
    </div>
  );
}
