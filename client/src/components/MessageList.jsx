import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../pages/utils/firebaseConfig';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'messages'),
      where('recipient', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Inbox</h2>
      <ul className="space-y-2">
        {messages.map((message, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded">
            {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;

