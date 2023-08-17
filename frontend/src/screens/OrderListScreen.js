import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Button, Table, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import { toast } from 'react-toastify';
import SkeletonOrderListScreen from '../components/skeletons/SkeletonOrderListScreen';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
        autoClose: action.payload.autoClose,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    // return deliveryDays, carrierName, trackingNumber
    case 'SHIPPING_REQUEST':
      return { ...state, loadingShipped: true };
    case 'SHIPPING_SUCCESS':
      return { ...state, loadingShipped: false, successShipped: true };
    case 'SHIPPING_FAIL':
      return { ...state, loadingShipped: false };
    case 'SHIPPING_RESET':
      return { ...state, loadingShipped: false, successShipped: false };
    default:
      return state;
  }
};

export default function OrderListScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [
    {
      loading,
      error,
      orders,
      users,
      loadingDelete,
      successDelete,
      page,
      pages,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      // Simulate delay for 1.5 seconds
      await new Promise((resolve) => setTimeout(resolve, 1500));

      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data: ordersData } = await axios.get(`/api/orders`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        // Extract user IDs from the orders
        const userIds = ordersData.map((order) => order.user._id);

        // Fetch user data for the extracted user IDs
        const { data: usersData } = await axios.post(`/api/users/usersByIds`, {
          userIds,
        });

        // Update orders with user information
        const ordersWithUsers = ordersData.map((order) => {
          const user = usersData.find((user) => user._id === order.user._id);
          return { ...order, user };
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: ordersWithUsers });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  const deleteHandler = async (order) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/orders/${order._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('Order deleted successfully', {
          autoClose: 1000, // Duration in milliseconds (1 second)
        });
      } catch (err) {
        toast.error(getError(error));
        dispatch({ type: 'DELETE_FAIL' });
      } finally {
        dispatch({
          type: 'DELETE_SUCCESS',
          payload: {
            autoClose: 1000, // Duration in milliseconds (1 second)
          },
        });
      }
    }
  };

  // MM-DD-YYYY
  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(dateObject.getDate()).padStart(2, '0');
    const year = dateObject.getFullYear();

    return `${month}-${day}-${year}`;
  }

  // Pagination
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    return `/?&page=${filterPage}`;
  };

  return (
    <div className='content'>
      <Helmet>
        <title>Orders List</title>
      </Helmet>
      <br />
      <h4 className='box'>Orders List</h4>
      <div className='box'>
        {loadingDelete && <SkeletonOrderListScreen />}
        {loading ? (
          <div>
            {[...Array(8).keys()].map((i) => (
              <Col key={i} className='mb-1'>
                <SkeletonOrderListScreen />
              </Col>
            ))}
          </div>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <Table responsive striped bordered className='noWrap'>
            <thead className='thead'>
              <tr>
                <th>ID / PRODUCT</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>QTY</th>
                <th>PAID</th>
                <th>SHIPPED DATE</th>
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
                  <td>
                    <div>
                      <strong>Name:</strong>{' '}
                      {order.user ? order.user.name : 'DELETED USER'}
                    </div>
                    {order.user && (
                      <>
                        <div>
                          <strong>Email:</strong> {order.user.email}
                        </div>
                        <div>
                          <strong>Address:</strong> <br />
                          {order.shippingAddress.address} <br />
                          {order.shippingAddress.city},{' '}
                          {order.shippingAddress.states},{' '}
                          {order.shippingAddress.postalCode} <br />
                          {order.shippingAddress.country}
                        </div>
                      </>
                    )}
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
                      Details
                    </Button>
                    &nbsp;
                    <Button
                      type='button'
                      variant='primary'
                      onClick={() => deleteHandler(order)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      <div>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            className='mx-1'
            to={getFilterUrl({ page: x + 1 })}
          >
            <Button
              className={Number(page) === x + 1 ? 'text-bold' : ''}
              variant='light'
            >
              {x + 1}
            </Button>
          </LinkContainer>
        ))}
      </div>
      <br />
    </div>
  );
}
