import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Table, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import SkeletonOrderHistoryScreen from '../components/skeletons/SkeletonOrderHistoryScreen';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      // Simulate delay for 1.5 seconds
      await new Promise((resolve) => setTimeout(resolve, 1500));

      try {
        const { data } = await axios.get(
          `/api/orders/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  // MM-DD-YYYY
  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(dateObject.getDate()).padStart(2, '0');
    const year = dateObject.getFullYear();

    return `${month}-${day}-${year}`;
  }

  return (
    <div className='content'>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <br />
      <div className='box'>
        <h4>{userInfo.name}'s Order History</h4>
        <p className='lead'>
          Your orders on one place, click details for more information.
        </p>
        <p className='text-muted'>
          If you have any questions, please feel free to{' '}
          <Link to='/contact'>
            <strong>Contact Us.</strong>
          </Link>
        </p>
        <hr />
        {loading ? (
          <Row>
            {[...Array(8).keys()].map((i) => (
              <Col key={i} md={12} className='mb-3'>
                <SkeletonOrderHistoryScreen />
              </Col>
            ))}
          </Row>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <Table responsive striped bordered className='noWrap'>
            <thead className='thead'>
              <tr>
                <th>ID / PRODUCT</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>QTY</th>
                <th>PAID</th>
                <th>SHIPPED DATE</th>
                <th>SHIPPED ADDRESS</th>
                <th>DELIVERY DAYS</th>
                <th>CARRIER NAME</th>
                <th>TRACKING NUMBER</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    {order._id}{' '}
                    {order.orderItems.map((item) => (
                      <div key={item._id}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='img-fluid rounded img-thumbnail'
                        />
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </div>
                    ))}
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.orderItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </td>
                  <td>
                    {order.isPaid ? formatDate(order.paidAt) : 'No'}
                    <br />
                    {order.paymentMethod}
                  </td>
                  <td>
                    <div>{formatDate(order.shippedAt)}</div>
                  </td>
                  <td>
                    <div>
                      {order.shippingAddress.address} <br />
                      {order.shippingAddress.city},{' '}
                      {order.shippingAddress.states},{' '}
                      {order.shippingAddress.postalCode} <br />
                      {order.shippingAddress.country}
                    </div>
                  </td>
                  <td>{order.deliveryDays}</td>
                  <td>{order.carrierName}</td>
                  <td>{order.trackingNumber}</td>
                  <td>
                    <Button
                      type='button'
                      variant='primary'
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      More Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}
