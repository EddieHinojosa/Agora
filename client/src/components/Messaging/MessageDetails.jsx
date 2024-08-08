import React from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const MessageDetail = ({ message, onClose, onReply }) => {
  if (!message) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'messages', message.id));
      onClose();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">&times;</button>
        <h2 className="text-2xl font-bold mb-4">{message.subject}</h2>
        <p className="text-sm text-gray-500 mb-2">From: {message.sender}</p>
        <p className="text-sm text-gray-500 mb-2">To: {message.recipient}</p>
        <p className="text-sm text-gray-500 mb-4">{new Date(message.createdAt.toDate()).toLocaleString()}</p>
        <div className="whitespace-pre-wrap mb-4">{message.body}</div>
        <div className="flex justify-end space-x-4">
          <button onClick={() => onReply(message)} className="bg-blue-500 text-white p-2 rounded">Reply</button>
          <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete</button>
          <button onClick={onClose} className="bg-gray-300 text-black p-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;