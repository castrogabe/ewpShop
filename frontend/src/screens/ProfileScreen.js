import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Col, Button, Form } from 'react-bootstrap';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
          loadingUpdate,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated successfully', {
        autoClose: 1000, // Display success message for 1 second
      });
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.error(getError(err));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='small-screen'>
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <Col>
        <br />
        <h4 className='box'>User Profile</h4>
        <form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>New Password</Form.Label>
            <div className='input-group'>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder='Minimum length 8, 1 uppercase, 1 lowercase, 1 digit, and 1 special character'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant='outline-secondary'
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fa ${
                    showPassword ? 'fas fa-eye-slash' : 'fa-eye'
                  }`}
                ></i>
              </Button>
            </div>
          </Form.Group>

          <Form.Group className='mb-3' controlId='confirmPassword'>
            <Form.Label>Confirm New Password</Form.Label>
            <div className='input-group'>
              <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Minimum length 8, 1 uppercase, 1 lowercase, 1 digit, and 1 special character'
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                variant='outline-secondary'
                onClick={toggleConfirmPasswordVisibility}
              >
                <i
                  className={`fa ${
                    showConfirmPassword ? 'fas fa-eye-slash' : 'fa-eye'
                  }`}
                ></i>
              </Button>
            </div>
          </Form.Group>
          <div className='mb-3'>
            <Button type='submit'>Update</Button>
          </div>
        </form>
      </Col>
    </div>
  );
}
