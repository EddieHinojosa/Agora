import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Tab } from '@headlessui/react';
import MessageList from '../../components/Messaging/MessageList';
import SendMessage from '../../components/Messaging/SendMessage';

const Messages = () => {
  const { user } = useContext(AuthContext);
  const [currentTab, setCurrentTab] = useState('Received');
  const [replyTo, setReplyTo] = useState('');

  const handleReply = (username) => {
    setReplyTo(username);
    setCurrentTab('Send');
  };

  const handleMessageSent = () => {
    setCurrentTab('Sent');
  };

  return (
    <div className="p-4">
      <Tab.Group selectedIndex={currentTab === 'Received' ? 0 : currentTab === 'Sent' ? 1 : 2}>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg 
              ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
            }
            onClick={() => setCurrentTab('Received')}
          >
            Received Messages
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg 
              ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
            }
            onClick={() => setCurrentTab('Sent')}
          >
            Sent Messages
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg 
              ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
            }
            onClick={() => setCurrentTab('Send')}
          >
            Send Message
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <MessageList userId={user._id} type="Received" handleReply={handleReply} />
          </Tab.Panel>
          <Tab.Panel>
            <MessageList userId={user._id} type="Sent" />
          </Tab.Panel>
          <Tab.Panel>
            <SendMessage userId={user._id} replyTo={replyTo} onMessageSent={handleMessageSent} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
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

