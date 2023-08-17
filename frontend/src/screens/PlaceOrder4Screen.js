import Axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Button, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  // cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10); // round2(10) => $10.00 shipping price
  cart.shippingPrice = cart.itemsPrice > 0 ? round2(0) : round2(0); // testing
  cart.taxPrice = round2(0.07 * cart.itemsPrice); // tax price: 0.07 = 7%
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await Axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);

  return (
    <div className='content'>
      <br />
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div>
        <Helmet>
          <title>Preview Order</title>
        </Helmet>
        <br />
        <h4 className='box'>Preview Order</h4>
        <Row>
          <Col md={6}>
            <div className='box'>
              <div className='body'>
                <title>Items</title>
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item) => (
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
                        <Col md={3}>Price: ${item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Link to='/cart' className='youtube'>
                  Edit
                </Link>
              </div>
            </div>

            <div className='box'>
              <div className='body'>
                <title>Shipping</title>
                <text>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong>
                  {cart.shippingAddress.address}
                  <br />
                  <strong>Street: </strong> {cart.shippingAddress.city},
                  {cart.shippingAddress.states},
                  <br />
                  <strong>Zip Code: </strong> {cart.shippingAddress.postalCode},
                  <br />
                  <strong>State: </strong> {cart.shippingAddress.states},
                  <br />
                  <strong>Country: </strong> {cart.shippingAddress.country}
                </text>
                <br />
                <Link to='/shipping'>
                  <strong className='youtube'>Edit</strong>
                </Link>
              </div>
            </div>
          </Col>

          <Col md={6}>
            <div className='box'>
              <div className='body'>
                <title>Payment</title>
                <text>
                  <strong>Method:</strong> {cart.paymentMethod}
                </text>
                <br />
                <Link to='/payment'>
                  <strong className='youtube'>Edit</strong>
                </Link>
              </div>
            </div>
            <div className='box'>
              <div className='body'>
                <title>Order Summary</title>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${cart.itemsPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${cart.shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${cart.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong> Order Total</strong>
                      </Col>
                      <Col>
                        <strong>${cart.totalPrice.toFixed(2)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button
                        type='button'
                        variant='primary'
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0}
                      >
                        Place Order
                      </Button>
                    </div>
                    {loading && <LoadingBox></LoadingBox>}
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

// step 1 (CartScreen)
// step 2 (ShippingAddress2Screen)
// step 3 (PaymentMethod3Screen)
// step 4 (PlaceOrder4Screen) <= CURRENT STEP
// lands on OrderScreen for payment
