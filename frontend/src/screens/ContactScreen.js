import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

export default function ContactScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    let newMessage;
    try {
      newMessage = {
        fullName,
        email,
        subject,
        message,
      };
      setLoading(true);
      toast.success('Success, message sent!', { autoClose: 1000 }); // Display success message for 1 second
      await axios.post(`/contact`, newMessage); // Make the API request
    } catch (err) {
      toast.error('Message not sent', { autoClose: 1000 }); // Display error message for 1 second
    }
    setLoading(false);
  };

  return (
    <Container>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <br />
      <div className='box'>
        <h1>Contact Us</h1>
      </div>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label> Full Name</Form.Label>
          <Form.Control
            placeholder='full name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='subject'>
          <Form.Label>Subject / Pen Name and number</Form.Label>
          <Form.Control
            placeholder='ex: Cigar 40'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='message'>
          <Form.Label>Message</Form.Label>
          <Form.Control
            placeholder='your message'
            value={message}
            as='textarea'
            rows={4}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>

        <div>
          <Button variant='primary' disabled={loading} type='submit'>
            {loading ? 'Sending...' : 'Submit'}
          </Button>
        </div>
        <br />
      </Form>
    </Container>
  );
}
