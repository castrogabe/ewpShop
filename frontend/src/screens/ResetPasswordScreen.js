import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Col, Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../utils';

export default function ResetPasswordScreen() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo || !token) {
      navigate('/');
    }
  }, [navigate, userInfo, token]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await Axios.post('/api/users/reset-password', {
        password,
        token,
      });
      navigate('/signin');
      toast.success('Password updated successfully');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className='small-screen'>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <br />
      <Col>
        <h1 className='box'>Reset Password</h1>
        <Form onSubmit={submitHandler}>
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
                placeholder='Confirm New Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
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
        </Form>
      </Col>
    </div>
  );
}
