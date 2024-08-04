import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Messages = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.MODE === 'production' ? import.meta.env.VITE_PROD_API_URL : import.meta.env.VITE_DEV_API_URL}/api/messages/${user._id}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchMessages();
    }
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      {messages.length > 0 ? (
        <ul>
          {messages.map((msg) => (
            <li key={msg._id} className="border-b border-gray-300 p-2 mb-4">
              <p><strong>From:</strong> {msg.senderId.username}</p>
              <p><strong>To:</strong> {msg.receiverId.username}</p>
              <p><strong>Message:</strong> {msg.content}</p>
              <p><strong>Timestamp:</strong> {new Date(msg.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
};

export default Messages;









// import { useEffect, useState } from 'react';
// import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
// import { auth, db } from '../../utils/firebaseConfig';
// import { Link } from 'react-router-dom';
// import { FaSearch } from 'react-icons/fa';
// import { IoIosAddCircle } from "react-icons/io";

// const Messages = () => {
//   const [messages, setMessages] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Currently connected to Firestore DB - needs to pull from whatever DB Users are
//   // Fetch messages currently if user is auth
//   useEffect(() => {
//     const user = auth.currentUser;
//     if (!user) return;

//     // Query messages where recipient is the current user
//     const q = query(
//       collection(db, 'messages'),
//       where('recipient', '==', user.uid),
//       orderBy('timestamp', 'desc')
//     );

//     // Listen for changes to the query 
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const messages = querySnapshot.docs.map((doc) => doc.data());
//       setMessages(messages);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Handle search input
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Filter messages based on search term
//   const filteredMessages = messages.filter((message) =>
//     message.text.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className='mt-4'>
//       <h2 className="text-2xl">Messages</h2>

//       {/* Search and new message button */}
//       <div className="mt-4 flex space-x-2 mb-4 w-full">
//         <div className="flex items-center w-3/4 md:w-3/4 p-2 border border-gray-300 rounded-md">
//           <button className="text-gray-500 mr-2">
//             <FaSearch />
//           </button>
//           <input
//             type="text"
//             placeholder="Search messages..."
//             value={searchTerm}
//             onChange={handleSearch}
//             className="w-full border-none focus:ring-0"
//           />
//         </div>
//         <Link to='/shopmanager/newmessage' className="ml-auto text-l flex items-center border border-gray-300 rounded-lg px-4 py-2 hover:bg-black hover:text-white">
//                     <IoIosAddCircle className="mr-2 text-xl" /> New Message
//                 </Link>
//       </div>

//       {/* Inbox and Sent Links --- currently no code inputed for links to make this happen */}
//       <div className="flex space-x-4 mb-4 ml-2">
//         <Link to="/shopmanager/inbox" className="text-black hover:underline">
//           Inbox
//         </Link>
//         <Link to="/shopmanager/sent" className="text-black hover:underline">
//           Sent
//         </Link>
//       </div>

//       {/* Display messages */}
//       <ul className="space-y-2">
//         {filteredMessages.map((message, index) => (
//           <li key={index} className="p-2 bg-gray-100 rounded">
//             {message.text}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Messages;

