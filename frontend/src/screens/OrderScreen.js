import React, { useContext, useEffect, useReducer, useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row, ListGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils'; // frontend utils.js
import { toast } from 'react-toastify';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js/pure';
import StripeCheckout from '../components/StripeCheckout';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false };
    case 'SHIPPED_REQUEST':
      return { ...state, loadingShipped: true };
    case 'SHIPPED_SUCCESS':
      return { ...state, loadingShipped: false, successShipped: true };
    case 'SHIPPED_FAIL':
      return { ...state, loadingShipped: false };
    case 'SHIPPED_RESET':
      return {
        ...state,
        loadingShipped: false,
        successShipped: false,
      };
    default:
      return state;
  }
}

export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [paymentMethod, setPaymentMethod] = useState('');
  const [stripe, setStripe] = useState(null);

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  // shipping email confirmation
  const [deliveryDays, setDeliveryDays] = useState('');
  const [carrierName, setCarrierName] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const [
    {
      loading,
      loadingPay,
      error,
      order,
      successPay,
      loadingShipped,
      successShipped,
      shipEmailTemplate,
      transporter,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
    successPay: false,
    loadingPay: false,
  });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    const addStripeScript = async () => {
      const { data: clientId } = await axios.get('/api/stripe/key', {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      const stripeObj = await loadStripe(clientId);
      setStripe(stripeObj);
    };

    const loadPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/keys/paypal', {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': clientId,
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    };

    if (!userInfo) {
      return navigate('/login');
    }
    if (
      !order._id ||
      successPay ||
      successShipped ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successShipped) {
        dispatch({ type: 'SHIPPED_RESET' });
      }
    } else {
      loadPaypalScript();
      addStripeScript();
      setPaymentMethod(order.paymentMethod);
    }
  }, [
    order,
    userInfo,
    orderId,
    navigate,
    paypalDispatch,
    successPay,
    successShipped,
    shipEmailTemplate,
    transporter,
  ]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid', {
          autoClose: 1000, // Duration in milliseconds (1 second)
        });
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  const onError = (err) => {
    toast.error(getError(err));
  };

  const handleStripeSuccess = async (paymentResult) => {
    try {
      dispatch({ type: 'PAY_REQUEST' });
      const { data } = await axios.put(
        `/api/orders/${order._id}/pay`,
        paymentResult,
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'PAY_SUCCESS', payload: data });
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      toast.success('Order is paid', {
        autoClose: 1000,
      });
    } catch (err) {
      dispatch({ type: 'PAY_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'SHIPPED_REQUEST' });
      // Make an API call to update the order with the shipping information
      const { data } = await axios.put(
        `/api/orders/${order._id}/shipped`,
        {
          deliveryDays,
          carrierName,
          trackingNumber,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'SHIPPED_SUCCESS', payload: data });
      toast.success('Order has shipped', {
        autoClose: 1000, // Duration in milliseconds (1 second)
      });
    } catch (err) {
      dispatch({ type: 'SHIPPED_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant='danger'>{error}</MessageBox>
  ) : (
    <div className='content'>
      <br />
      <Helmet>
        <title>{order.paymentMethod}</title> {/* displays PayPal or Stripe  */}
      </Helmet>
      <h4 className='box'>
        {order.paymentMethod} Order: {orderId}
      </h4>
      <Row>
        <Col md={6}>
          <div className='box'>
            <div className='body'>
              <title>Items</title>
              <ListGroup variant='flush'>
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className='align-items-center'>
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='img-fluid rounded img-thumbnail'
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>Quantity: {item.quantity}</span>
                      </Col>
                      <Col md={3}>Price ${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>

          <div className='box'>
            <div className='body'>
              <title>Shipping</title>
              <text>
                <strong>Name:</strong> {order.shippingAddress.fullName}
                <br />
                <strong>Address: </strong> {order.shippingAddress.address}
                <br />
                <strong>City:</strong> {order.shippingAddress.city} <br />
                <strong>State:</strong> {order.shippingAddress.states} <br />
                <strong>Postal Code:</strong> {order.shippingAddress.postalCode}
                <br />
                <strong>Country:</strong> {order.shippingAddress.country}
              </text>
              {order.isShipped ? (
                <MessageBox variant='success'>
                  Shipped On{' '}
                  {new Date(order.shippedAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                  })}
                </MessageBox>
              ) : (
                <MessageBox variant='danger'>Not Shipped</MessageBox>
              )}
            </div>
          </div>

          <div className='box'>
            <div className='body'>
              <title>Payment</title>
              <text>
                <strong>Method:</strong> {order.paymentMethod}
              </text>
              {order.isPaid ? (
                <MessageBox variant='success'>
                  Paid at{' '}
                  {new Date(order.paidAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                  })}
                </MessageBox>
              ) : (
                <MessageBox variant='danger'>Not Paid</MessageBox>
              )}
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className='box'>
            <div className='body'>
              <title>Order Summary</title>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity</Col>
                    <Col>
                      {/* Calculate and display the total quantity of all items */}
                      {order.orderItems.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Order Price</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {!order.isPaid && (
                  <ListGroup.Item>
                    {paymentMethod === 'PayPal' ? (
                      isPending ? (
                        <LoadingBox />
                      ) : (
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          />
                          {/* Send payment receipt when item is paid */}
                          {loadingPay && <LoadingBox></LoadingBox>}
                        </div>
                      )
                    ) : (
                      <div>
                        {/* Send payment receipt when item is paid */}
                        {!order.isPaid && !stripe && <LoadingBox />}
                        {!order.isPaid && stripe && (
                          <StripeCheckout
                            stripe={stripe}
                            orderId={order._id}
                            handleStripeSuccess={handleStripeSuccess}
                            successPay={successPay}
                          />
                        )}
                      </div>
                    )}
                  </ListGroup.Item>
                )}

                {userInfo.isAdmin && order.isPaid && !order.isShipped && (
                  <ListGroup.Item>
                    {loadingShipped && <LoadingBox />}
                    <div className='d-grid'>
                      {/* send shipping confirmation email when order ships */}
                      <h6>
                        Admin fill in the fields below to send to customer
                      </h6>
                      <Form>
                        <Form.Group className='mb-3' controlId='days'>
                          <Form.Label>Delivery Days</Form.Label>
                          <Form.Control
                            value={deliveryDays}
                            onChange={(e) => setDeliveryDays(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='name'>
                          <Form.Label>Carrier Name</Form.Label>
                          <Form.Control
                            value={carrierName}
                            onChange={(e) => setCarrierName(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='slug'>
                          <Form.Label>Tracking Number</Form.Label>
                          <Form.Control
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Form>
                      <Button type='button' onClick={submitHandler}>
                        Order Shipped
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

// step 1 (CartScreen)
// step 2 (ShippingAddress2Screen)
// step 3 (PaymentMethod3Screen)
// step 4 (PlaceOrder4Screen)
// lands on OrderScreen for payment <= CURRENT STEP
