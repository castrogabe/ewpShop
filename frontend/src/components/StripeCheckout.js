import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from '@stripe/react-stripe-js';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const CheckoutForm = (props) => {
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);

  const handleStripeSuccess = async (paymentResult) => {
    try {
      // Perform the action when payment is successful
      props.handleStripeSuccess(paymentResult);
    } catch (err) {
      // Handle errors
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    // Call stripe.confirmCardPayment() with the client secret.
    const { data } = await Axios(`/api/stripe/secret/${props.orderId}`, {
      headers: {
        Authorization: `Bearer YOUR_STRIPE_SECRET_KEY`,
      },
    });
    const clientSecret = data.client_secret;

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
      console.log(result.error.message);
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setSucceeded(true);
        handleStripeSuccess(result.paymentIntent);
        setDisplaySuccessMessage(true); // Show success message after successful payment
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
        disabled={!stripe || processing || succeeded}
      >
        Pay With Credit Card
      </Button>
      <br />
      {displaySuccessMessage && (
        <p className='result-message'>
          Payment Successful.{' '}
          <Link to='/orderhistory'>See it in your purchase history.</Link>
        </p>
      )}
    </form>
  );
};

const StripeCheckout = (props) => (
  <Elements stripe={props.stripe}>
    <CheckoutForm
      orderId={props.orderId}
      handleStripeSuccess={props.handleStripeSuccess}
    />
  </Elements>
);

export default StripeCheckout;
