import express from 'express';
import Message from '../models/messageModel.js';

const messageRouter = express.Router();

// Save a new message
messageRouter.post('/contact', (req, res) => {
  const newMessage = new Message({
    fullName: req.body.fullName,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });
  newMessage.save();
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

export default messageRouter;
