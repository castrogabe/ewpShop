import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Col, Form, Button } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [isPayPalSelected, setIsPayPalSelected] = useState(
    paymentMethod === 'PayPal'
  );
  const [isStripeSelected, setIsStripeSelected] = useState(
    paymentMethod === 'Stripe'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const selectedMethod = isPayPalSelected ? 'PayPal' : 'Stripe';

    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedMethod });
    localStorage.setItem('paymentMethod', selectedMethod);
    navigate('/placeorder');
  };

  return (
    <div className='content'>
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <br />
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className='small-screen'>
        <br />
        <Col>
          <h4 className='box'>Select Payment Method</h4>
          <Form onSubmit={submitHandler}>
            <div className='mb-3'>
              <div className='payment-option'>
                <Form.Check
                  type='radio'
                  id='PayPal'
                  label='PayPal'
                  checked={isPayPalSelected}
                  onChange={() => {
                    setIsPayPalSelected(true);
                    setIsStripeSelected(false);
                  }}
                />
                <i className='fab fa-cc-paypal'></i>
              </div>
            </div>
            <div className='mb-3'>
              <div className='payment-option'>
                <Form.Check
                  type='radio'
                  id='Stripe'
                  label='Credit Card'
                  checked={isStripeSelected}
                  onChange={() => {
                    setIsStripeSelected(true);
                    setIsPayPalSelected(false);
                  }}
                />
                <i className='fab fa-cc-stripe'></i>
              </div>
            </div>

            <div className='mb-3'>
              <Button type='submit'>Continue</Button>
            </div>
          </Form>
        </Col>
      </div>
    </div>
  );
}

// step 1 (CartScreen)
// step 2 (ShippingAddress2Screen)
// step 3 (PaymentMethod3Screen) <= CURRENT STEP
// step 4 (PlaceOrder4Screen)
// lands on OrderScreen for payment
