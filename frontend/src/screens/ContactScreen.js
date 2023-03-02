import { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !subject || !message) {
      return toast.error('Please fill email, subject and message');
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/email`, {
        email,
        subject,
        message,
      });
      setLoading(false);
      toast.success(data.message);
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  return (
    <div className='contact'>
      <ToastContainer position='bottom-center' limit={1} />
      <Container className='small-container'>
        <Helmet>
          <title>Contact Us</title>
        </Helmet>
        <h1 className='my-3'>Contact Us</h1>
        <Form onSubmit={submitHandler}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='subject'>
            <Form.Label>Subject / Pen Name and #</Form.Label>
            <Form.Control
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='message'>
            <Form.Label>Message</Form.Label>
            <Form.Control
              value={message}
              as='textarea'
              rows={3}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>

          <div>
            <Button variant='primary' disabled={loading} type='submit'>
              {loading ? 'Sending...' : 'Submit'}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
