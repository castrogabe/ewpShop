import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../utils';

export default function ForgetPasswordScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/forget-password', {
        email,
      });
      toast.success(data.message, {
        autoClose: 1000, // Duration in milliseconds (1 second)
      });
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className='content'>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <br />
      <h1 className='box'>Forget Password</h1>
      <Row>
        <Col md={6}>
          <div className='box'>
            <Form onSubmit={submitHandler}>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <div className='mb-3'>
                <Button type='submit'>submit</Button>
              </div>
            </Form>
          </div>
        </Col>
        <Col md={6} className='mt-3'>
          <img src='/images/forget.jpg' alt='signin' />
        </Col>
      </Row>
    </div>
  );
}
