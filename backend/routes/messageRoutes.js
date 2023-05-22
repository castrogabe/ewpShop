import express from 'express';
import Message from '../models/messageModel.js';

const messageRouter = express.Router();

// Save a new message
messageRouter.post('/contact', (req, res) => {
  const newMessage = new Message({
    update_time: req.body.update_time,
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

// Delete a message
messageRouter.delete(`/messages`, (req, res) => {
  const update_time = req.body.update_time;
  const fullName = req.body.fullName;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

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

export default messageRouter;
