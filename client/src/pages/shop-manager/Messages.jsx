import { useState, useEffect, useContext } from 'react';
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { io } from 'socket.io-client';
import AuthContext from '../../context/AuthContext';
import fetchUser from '../../utils/fetchUser';

// Establish connection to socket
const socket = io(import.meta.env.VITE_SOCKET_URL);

const Messages = () => {
  const [showModal, setShowModal] = useState(false);
  const [recipientUsername, setRecipientUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);

  // Listens for incoming messages
  useEffect(() => {
    if (!user || !user._id) {
      console.error("User is not authenticated or user ID is missing");
      return;
    }
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [user]);

  // For modal
  const handleNewMessageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Makes sure input is not empty
  const handleSendMessage = async () => {
    if (!recipientUsername || !message) {
      alert('Recipient username and message text are required.');
      return;
    }

    // Checks if user is authenticated
    if (!user || !user._id) {
      alert('User is not authenticated or user ID is missing.');
      return;
    }

    // Fetches user
    const recipientId = await fetchUser(recipientUsername);
    if (!recipientId) {
      alert('Recipient not found');
      return;
    }

    // If user is found, sends message
    const newMessage = {
      senderId: user._id,
      recipientId,
      text: message,
    };
    socket.emit('sendMessage', newMessage);
    setShowModal(false);
    setRecipientUsername("");
    setMessage("");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="p-4 w-full md:w-1/4">
        <div className="flex flex-col mb-4">
          <h2 className="text-2xl mb-2">Messages</h2>
          <div className="relative w-full">
            <button className="absolute inset-y-0 left-0 flex items-center pl-2">
              <IoMdSearch className="text-gray-500" />
            </button>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="bg-gray-50 p-4">
          <button
            onClick={handleNewMessageClick}
            className="bg-black text-white px-4 py-2 text-sm mb-4 w-full hover:bg-gray-300"
          >
            + New Message
          </button>

          {/* Inbox and Sent links */}
          <ul>
            <li className="mb-2">
              <Link to="#" className="text-gray-700 hover:underline">
                Inbox
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-700 hover:underline">
                Sent
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {messages.map((msg, index) => (
          <div key={index} className="flex justify-between items-center border p-4 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 mr-4">
                <img src="" alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-bold">{msg.sender?.firstName} {msg.sender?.lastName}</h2>
                <p className="text-gray-600">{msg.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl">
            <h2 className="text-2xl mb-4">New Message</h2>
            <input
              type="text"
              placeholder="Recipient Username"
              value={recipientUsername}
              onChange={(e) => setRecipientUsername(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              rows="4"
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-black px-4 py-2 text-sm mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="bg-black text-white px-4 py-2 text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;

