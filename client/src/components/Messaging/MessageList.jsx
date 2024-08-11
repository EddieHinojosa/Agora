import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../utils/firebase';
import { collection, query, orderBy, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';


const MessageList = ({ type, onSelectMessage, onDeleteMessage }) => {
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

  const getPreview = (body) => {
    const words = body.split(' ');
    if (words.length <= 20) {
      return body;
    }
    return words.slice(0, 20).join(' ') + '...';
  };

  const handleDelete = async (message) => {
    try {
      await deleteDoc(doc(db, 'messages', message.id));
      onDeleteMessage(message);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="w-full">
      {messages.map((message) => (
        <div
          key={message.id}
          className="p-4 border-b border-gray-200 flex justify-between items-center hover:bg-gray-100"
        >
          <div onClick={() => onSelectMessage(message)} className="cursor-pointer w-3/4">
            <h4 className="font-bold">{message.subject}</h4>
            <p>{getPreview(message.body)}</p>
            <p className="text-sm text-gray-500">
              {new Date(message.createdAt.toDate()).toLocaleString()}
            </p>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => handleDelete(message)} className="bg-red-900 hover:bg-red-700 text-white p-2 rounded-md text-sm">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;