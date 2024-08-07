import React from 'react';

const MessageDetail = ({ message }) => {
  if (!message) {
    return <div className="w-2/3 p-4">Select a message to view details</div>;
  }

  return (
    <div className="w-2/3 p-4">
      <h2 className="text-2xl font-bold mb-4">{message.subject}</h2>
      <p className="text-sm text-gray-500 mb-4">From: {message.sender}</p>
      <p className="text-sm text-gray-500 mb-4">To: {message.recipient}</p>
      <p className="text-sm text-gray-500 mb-4">{new Date(message.createdAt.toDate()).toLocaleString()}</p>
      <div className="whitespace-pre-wrap">{message.body}</div>
    </div>
  );
};

export default MessageDetail;