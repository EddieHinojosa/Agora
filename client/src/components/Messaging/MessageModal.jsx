import React, { useEffect } from 'react';

const MessageModal = ({ message, onClose, handleReply }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl mb-4">Message from {message.senderId.username}</h2>
        <h3 className="text-xl mb-2">Subject: {message.subject}</h3>
        <p className="mb-4">{message.content}</p>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => handleReply(message.senderId.username)}
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;