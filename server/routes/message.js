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
    console.error('Failed to send message:', error);
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
});

// Get messages for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log(`Fetching messages for userId: ${userId}`);
  try {
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).populate('senderId', 'username').populate('receiverId', 'username');
    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: 'No messages found for this user' });
    }
    res.status(200).json(messages);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages', message: error.message });
  }
});

// Get sent messages for a user
router.get('/sent/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log(`Fetching sent messages for userId: ${userId}`);
  try {
    const messages = await Message.find({ senderId: userId }).populate('senderId', 'username').populate('receiverId', 'username');
    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: 'No sent messages found for this user' });
    }
    res.status(200).json(messages);
  } catch (error) {
    console.error('Failed to fetch sent messages:', error);
    res.status(500).json({ error: 'Failed to fetch sent messages', message: error.message });
  }
});

export default router;