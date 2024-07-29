import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'messages'),
      where('recipient', '==', user.uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
