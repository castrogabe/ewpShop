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

  // State to manage reply form visibility and data
  const [replyVisible, setReplyVisible] = useState(false);
  const [replyMessage, setReplyMessage] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  // Function to handle opening the reply form
  const sendReply = async () => {
    try {
      const response = await axios.post('/api/messages/reply', {
        email: replyMessage.email,
        subject: replyMessage.subject,
        message: replyMessage.replyContent, // Assuming this is the reply message content from the form
      });

      console.log(response.data); // Log the response from the backend
      // Close the reply form after sending the reply
      setReplyVisible(false);
    } catch (error) {
      console.error('Error sending reply:', error);
      // Add error handling logic (e.g., show an error message)
    }
  };

  useEffect(() => {
    fetch('/api/messages')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => {
        setMessages(jsonRes);
        console.log('Messages:', jsonRes); // Log entire messages array
        if (jsonRes.length > 0) {
          console.log('Sample Message:', jsonRes[0]); // Log a sample message
        }
      });
  }, []);

  // delete messages
  useEffect(() => {
    const fetchData = async () => {
      // Simulate delay for 1.5 seconds
      await new Promise((resolve) => setTimeout(resolve, 1500));

      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const message = await axios.get(`/api/messages`);
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

  const deleteHandler = async (messageToDelete) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete('/api/messages', {
          data: {
            update_time: messageToDelete.update_time,
            fullName: messageToDelete.fullName,
            email: messageToDelete.email,
            subject: messageToDelete.subject,
            message: messageToDelete.message,
          },
        });
        toast.success('Message deleted successfully', {
          autoClose: 1500, // Display success message for 1 second
        });
        dispatch({ type: 'DELETE_SUCCESS' });

        // Update the messages state by filtering out the deleted message
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== messageToDelete.id)
        );
      } catch (err) {
        toast.error(getError(err));
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
    <>
      <Helmet>
        <title>Messages</title>
      </Helmet>
      <div className='content'>
        <br />
        <h4 className='box'>Messages</h4>
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
                          ? new Date(message.createdAt).toLocaleDateString(
                              'en-US'
                            )
                          : new Date(message.update_time).toLocaleDateString(
                              'en-US'
                            )}
                      </td>
                      <td>{message.fullName}</td>
                      <td>{message.email}</td>
                      <td>{message.subject}</td>
                      <td>{message.message}</td>
                      <td>
                        <Button
                          type='button'
                          variant='primary'
                          onClick={() => {
                            setReplyMessage({
                              fullName: message.fullName,
                              email: message.email,
                              subject: `Re: ${message.subject}`,
                              message: `Dear ${message.fullName},\n\n`,
                            });
                            setReplyVisible(true);
                          }}
                        >
                          Reply
                        </Button>
                      </td>
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

        {/* Reply Form/Dialog */}
        {replyVisible && (
          <div className='box'>
            <h2>Reply</h2>
            <form>
              <div className='form-group'>
                <label>
                  Your Reply to {replyMessage.fullName} | {replyMessage.subject}{' '}
                  | {replyMessage.email}
                </label>
                <textarea
                  className='form-control'
                  rows='5'
                  value={replyMessage.replyContent}
                  onChange={(e) =>
                    setReplyMessage({
                      ...replyMessage,
                      replyContent: e.target.value,
                    })
                  }
                />
              </div>
              <br />
              {/* Submit button and close button */}
              <Button
                type='submit'
                variant='primary'
                onClick={sendReply}
                className='send-reply-button'
              >
                Send Reply
              </Button>

              <Button
                type='button'
                variant='secondary'
                onClick={() => setReplyVisible(false)}
                className='send-reply-button'
              >
                Close
              </Button>
            </form>
          </div>
        )}

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
    </>
  );
}
