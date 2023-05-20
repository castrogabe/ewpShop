import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

export default function MessagesScreen() {
  const [messages, setMessages] = useState([
    {
      fullName: '',
      email: '',
      subject: '',
      message: '',
    },
  ]);

  useEffect(() => {
    fetch('/messages')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setMessages(jsonRes));
  }, []);

  return (
    <div className='content'>
      <Helmet>
        <title>Messages</title>
      </Helmet>
      <br />
      <h1 className='box'>Your Messages</h1>
      <div className='box'>
        <Table responsive striped bordered className='noWrap'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>SUBJECT</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages &&
              messages.map((message, index) => (
                <tr key={index}>
                  <td>{message.fullName}</td>
                  <td>{message.email}</td>
                  <td>{message.subject}</td>
                  <td>{message.message}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
