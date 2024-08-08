import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const MessageModal = ({ message, onClose, onSelectMessage }) => {
  const navigate = useNavigate();

  const handleReply = () => {
    onSelectMessage('new', { recipient: message.sender, subject: `RE: ${message.subject}` });
    onClose();
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'messages', message.id));
      onClose();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-2">{message.subject}</h2>
        <p className="mb-4">{message.body}</p>
        <p className="text-sm text-gray-500">{message.createdAt ? new Date(message.createdAt.toDate()).toLocaleString() : 'No date available'}</p>
        <div className="flex justify-end space-x-4">
          <button onClick={handleReply} className="bg-blue-500 text-white p-2 rounded">Reply</button>
          <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete</button>
          <button onClick={onClose} className="bg-gray-300 text-black p-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;