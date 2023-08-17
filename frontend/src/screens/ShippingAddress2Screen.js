import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [states, setStates] = useState(shippingAddress.states || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || '');
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        states,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        states,
        postalCode,
        country,
      })
    );
    navigate('/payment');
  };
  return (
    <div className='content'>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <br />
      <CheckoutSteps step1 step2></CheckoutSteps>
      <br />
      <div className='small-screen'>
        <Col>
          <h4 className='box'>Shipping Address</h4>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='fullName'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='address'>
              <Form.Label>Full Address, Bld, Apt, Space</Form.Label>
              <Form.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='states'>
              <Form.Label>State</Form.Label>
              <Form.Control
                value={states}
                onChange={(e) => setStates(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='postalCode'>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='country'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>

            <div className='mb-3'>
              <Button variant='primary' type='submit'>
                Continue
              </Button>
            </div>
          </Form>
        </Col>
      </div>
    </div>
  );
}

// step 1 (CartScreen)
// step 2 (ShippingAddress2Screen) <= CURRENT STEP
// step 3 (PaymentMethod3Screen) select radial button for PayPal or Stripe
// step 4 (PlaceOrder4Screen)
// lands on (OrderScreen) 0r (StripeOrderScreen) for payment
