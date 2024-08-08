import React, { useState, useContext, useEffect } from 'react';
import { db } from '../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';

const NewMessage = ({ replyData }) => {
  const { user } = useContext(AuthContext);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (replyData) {
      setRecipient(replyData.recipient);
      setSubject(replyData.subject);
    }
  }, [replyData]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (subject.trim() !== '' && body.trim() !== '' && recipient.trim() !== '') {
      try {
        await addDoc(collection(db, 'messages'), {
          recipient,
          subject,
          body,
          sender: user.username || user.shopName,
          createdAt: new Date(),
        });
        setRecipient('');
        setSubject('');
        setBody('');
        setSuccessMessage('Message sent successfully!');
        setErrorMessage('');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
      } catch (error) {
        console.error('Error sending message:', error);
        setErrorMessage('Failed to send message. Please try again.');
        setTimeout(() => setErrorMessage(''), 3000); // Clear error message after 3 seconds
      }
    } else {
      setErrorMessage('All fields are required.');
      setTimeout(() => setErrorMessage(''), 3000); // Clear error message after 3 seconds
    }
  };

  return (
    <div className="w-full p-4">
      <form onSubmit={handleSendMessage} className="space-y-4">
        <div>
          <label className="block text-gray-700">To (Username or Shop Name):</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Message:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded"
            rows="10"
            required
          />
        </div>
        <div className="flex items-center space-x-4">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Send
          </button>
          {successMessage && (
            <span className="text-green-700 bg-green-200 border border-green-400 rounded p-2">
              {successMessage}
            </span>
          )}
          {errorMessage && (
            <span className="text-red-700 bg-red-200 border border-red-400 rounded p-2">
              {errorMessage}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewMessage;
  