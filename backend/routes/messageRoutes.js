import express from 'express';
import Message from '../models/messageModel.js';
import { transporter } from '../utils.js';

const messageRouter = express.Router();

// Save a new message
messageRouter.post('/contact', (req, res) => {
  const {
    update_time,
    fullName,
    email,
    subject,
    message,
    replied,
    replyContent,
    replyEmail,
    replySentAt,
  } = req.body;

  const newMessage = new Message({
    update_time,
    fullName,
    email,
    subject,
    message,
    replied,
    replyContent,
    replyEmail,
    replySentAt,
  });

  newMessage
    .save()
    .then((savedMessage) => {
      res.status(201).json(savedMessage); // Respond with the saved message
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: 'Failed to save message', error: error.message });
    });
});

// Retrieve all messages
messageRouter.get('/messages', (req, res) => {
  Message.find()
    .then((foundMessages) => res.json(foundMessages))
    .catch((error) => {
      res
        .status(500)
        .json({ message: 'Failed to retrieve messages', error: error.message });
    });
});

// Delete a message
messageRouter.delete('/messages', (req, res) => {
  const { update_time, fullName, email, subject, message } = req.body;

  Message.findOneAndDelete({ update_time, fullName, email, subject, message })
    .then((deletedMessage) => {
      if (deletedMessage) {
        res.json({ message: 'Message deleted successfully' });
      } else {
        res.status(404).json({ message: 'Message not found' });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: 'Failed to delete message', error: error.message });
    });
});

// Send a reply to a message
messageRouter.post('/messages/reply', async (req, res) => {
  const { email, subject, message, replyContent } = req.body; // Reply data from frontend

  try {
    // Perform necessary actions to send the reply using Nodemailer
    // Assuming you have access to the 'transporter' from your utility functions (utils.js)
    const emailContent = {
      from: 'exoticwoodpen@gmail.com', // Change this to your email address
      to: email,
      subject: `Re: ${subject}`, // Append 'Re: ' to the original subject
      html: `
        <h1>Reply to Your Message</h1>
        <p>You wrote:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p>Our Reply:</p>
        <p>${replyContent}</p>
        <p>Thank you,</p>
        <p>exoticwoodpen.com</p>
      `,
    };

    // Send the email using the transporter
    const info = await transporter.sendMail(emailContent);
    console.log('Email sent:', info);

    res.json({ message: 'Reply sent successfully' });
  } catch (error) {
    console.error('Error sending reply:', error);
    res
      .status(500)
      .json({ message: 'Failed to send reply', error: error.message });
  }
});

export default messageRouter;
