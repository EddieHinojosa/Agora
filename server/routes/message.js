import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// Send message
router.post('/', async (req, res) => {
  const { senderId, receiverId, subject, content } = req.body;

  try {
    const newMessage = new Message({ senderId, receiverId, subject, content });
    await newMessage.save();

    // Emit the new message event to the receiver
    req.io.emit('newMessage', newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
});

// Get messages for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).populate('senderId', 'username').populate('receiverId', 'username');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Get sent messages for a user
router.get('/sent/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const messages = await Message.find({ senderId: userId }).populate('senderId', 'username').populate('receiverId', 'username');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sent messages' });
  }
});

export default router;