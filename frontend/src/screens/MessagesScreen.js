import React, { useEffect, useState, useReducer } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import MessageBox from '../components/MessageBox';
import axios from 'axios';
import { getError } from '../utils';
import SkeletonMessageScreen from '../components/skeletons/SkeletonMessageScreen';

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
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function MessagesScreen() {
  const [messages, setMessages] = useState([
    {
      update_time: '',
      fullName: '',
      email: '',
      subject: '',
      message: '',
    },
  ]);
  const [
    { loading, error, loadingDelete, successDelete, page, pages },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    fetch('/messages')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setMessages(jsonRes));
  }, []);

  // delete messages
  useEffect(() => {
    const fetchData = async () => {
      // Simulate delay for 1.5 seconds
      await new Promise((resolve) => setTimeout(resolve, 1500));

      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const message = await axios.get(`/messages`);
        dispatch({ type: 'FETCH_SUCCESS', payload: message });
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
  }, [messages, successDelete]);

  const deleteHandler = async (message) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete('/messages', {
          data: {
            update_time: message.update_time,
            fullName: message.fullName,
            email: message.email,
            subject: message.subject,
            message: message.message,
          },
        });
        toast.success('Message deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  // Pagination
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    return `/?&page=${filterPage}`;
  };

  return (
    <div className='content'>
      <Helmet>
        <title>Messages</title>
      </Helmet>
      <br />
      <h1 className='box'>Your Messages</h1>
      <div className='box'>
        {loadingDelete && <SkeletonMessageScreen />}
        {loading ? (
          <Row>
            {[...Array(8).keys()].map((i) => (
              <Col key={i} md={12} className='mb-3'>
                <SkeletonMessageScreen />
              </Col>
            ))}
          </Row>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <Table responsive striped bordered className='noWrap'>
            <thead>
              <tr>
                <th>DATE</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>SUBJECT</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages &&
                messages.map((message) => (
                  <tr key={message}>
                    <td>
                      {message.createdAt
                        ? message.createdAt.substring(0, 10)
                        : message.update_time}
                    </td>
                    <td>{message.fullName}</td>
                    <td>{message.email}</td>
                    <td>{message.subject}</td>
                    <td>{message.message}</td>
                    <td>
                      <Button
                        type='button'
                        variant='primary'
                        onClick={() => deleteHandler(message)}
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
