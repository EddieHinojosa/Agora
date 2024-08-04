import React, { useState } from 'react';
import axios from 'axios';
import UserData from '../../components/ShopManager/Main/UserData';
import { useParams } from 'react-router-dom';

const SendMessage = () => {
  const { id } = useParams();
  const [receiverUsername, setReceiverUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.get(`/api/users/username/${receiverUsername}`);
      const receiver = response.data;
      await axios.post(`/api/messages`, {
        senderId: id,
        receiverId: receiver._id,
        content: message,
      });
      alert('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please check the username and try again.');
    }
  };

  return (
    <UserData
      userId={id}
      render={(userData) => (
        <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-md rounded">
          <h1 className="text-2xl font-bold mb-6 text-center">Send Message</h1>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>To:</label>
              <input
                type="text"
                value={receiverUsername}
                onChange={(e) => setReceiverUsername(e.target.value)}
                required
                className="w-full p-2 mt-1 border rounded"
              />
            </div>
            <div>
              <label>Message:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full p-2 mt-1 border rounded"
              />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 mt-4">
              Send Message
            </button>
          </form>
        </div>
      )}
    />
  );
};

export default SendMessage;