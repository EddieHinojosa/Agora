import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../utils/firebase';
import { collection, query, orderBy, where, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';

const MessageList = ({ type, onSelectMessage }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (user) {
      let q;
      if (type === 'inbox') {
        q = query(
          collection(db, 'messages'),
          where('recipient', '==', user.username || user.shopName),
          orderBy('createdAt', 'desc')
        );
      } else if (type === 'sent') {
        q = query(
          collection(db, 'messages'),
          where('sender', '==', user.username || user.shopName),
          orderBy('createdAt', 'desc')
        );
      }

      const unsubscribe = onSnapshot(q, (snapshot) => {
        let messagesArray = [];
        snapshot.forEach((doc) => {
          messagesArray.push({ ...doc.data(), id: doc.id });
        });
        setMessages(messagesArray);
      });

      return () => unsubscribe();
    }
  }, [user, type]);

  return (
    <div className="w-full">
      {messages.map((message) => (
        <div
          key={message.id}
          onClick={() => onSelectMessage(message)}
          className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
        >
          <h4 className="font-bold">{message.subject}</h4>
          <p>{message.body.slice(0, 50)}...</p>
          <p className="text-sm text-gray-500">{message.createdAt ? new Date(message.createdAt.toDate()).toLocaleString() : 'No date available'}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;