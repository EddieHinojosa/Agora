import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import MessageModal from './MessageModal';

const socket = io('https://agora-1-h35b.onrender.com', {
  path: '/socket.io',
  transports: ['websocket'],
});

const MessageList = ({ userId, type, handleReply }) => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const url = type === 'Received' ? `/api/messages/${userId}` : `/api/messages/sent/${userId}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (userId) {
      fetchMessages();
    }

    socket.on('newMessage', (message) => {
      if (message.receiverId === userId && type === 'Received') {
        setMessages((prevMessages) => [...prevMessages, message]);
      } else if (message.senderId === userId && type === 'Sent') {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off('newMessage');
    };
  }, [userId, type]);

  const openMessageModal = (message) => {
    setSelectedMessage(message);
  };

  const closeMessageModal = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="bg-white rounded-xl p-3">
      {messages.length === 0 ? (
        <p>No {type.toLowerCase()} messages</p>
      ) : (
        messages.map((message) => (
          <div
            key={message._id}
            className="border-b border-gray-300 p-2 cursor-pointer"
            onClick={() => openMessageModal(message)}
          >
            <p><strong>{type === 'Received' ? 'From' : 'To'}:</strong> {message.senderId ? message.senderId.username : 'Unknown'}</p>
            <p><strong>Subject:</strong> {message.subject}</p>
          </div>
        ))
      )}
      {selectedMessage && (
        <MessageModal message={selectedMessage} onClose={closeMessageModal} handleReply={handleReply} />
      )}
    </div>
  );
};

export default MessageList;

