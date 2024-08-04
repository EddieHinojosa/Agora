import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessageList = ({ userId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/messages/${userId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [userId]);

  return (
    <div>
      <h3 className="text-2xl mb-4">Message List</h3>
      {messages.map((message) => (
        <div key={message._id} className="border-b border-gray-300 p-2">
          <p><strong>From:</strong> {message.senderId}</p>
          <p><strong>To:</strong> {message.receiverId}</p>
          <p><strong>Message:</strong> {message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;