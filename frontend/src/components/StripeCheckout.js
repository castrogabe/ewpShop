import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from '@stripe/react-stripe-js';
import { Button } from 'react-bootstrap';
import Axios from 'axios';

function CheckoutForm(props) {
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleStripeSuccess = (paymentResult) => {
    // Call the parent component's callback to handle the successful payment
    props.handleStripeSuccess(paymentResult);
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setProcessing(true);
    const { data } = await Axios(`/api/stripe/secret/${props.orderId}`);
    const clientSecret = data.client_secret;

    // Call stripe.confirmCardPayment() with the client secret.
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: data.order.user.name,
          email: data.order.user.email,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
      alert(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        handleStripeSuccess(result.paymentIntent); // Call the callback function
      }
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button
        type='submit'
        className='btn-block'
        disabled={!stripe || processing}
      >
        Pay With Stripe
      </Button>
    </form>
  );
}

const StripeCheckout = (props) => (
  <Elements stripe={props.stripe}>
    <CheckoutForm
      orderId={props.orderId}
      handleStripeSuccess={props.handleSuccessPayment} // Pass the callback function
    />
  </Elements>
);

export default StripeCheckout;
