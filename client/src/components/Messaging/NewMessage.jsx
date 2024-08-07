import React, { useState, useContext } from 'react';
import { db } from '../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';

const NewMessage = () => {
  const { user } = useContext(AuthContext);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (subject.trim() !== '' && body.trim() !== '' && recipient.trim() !== '') {
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default NewMessage;