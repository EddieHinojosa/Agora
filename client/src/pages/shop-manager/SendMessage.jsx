import React, { useState } from 'react';
import axios from 'axios';
import UserData from '../../components/ShopManager/Main/UserData';
import { useParams } from 'react-router-dom';

const SendMessage = () => {
  const { id } = useParams();
  const [receiverUsername, setReceiverUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.get(`${import.meta.env.MODE === 'production' ? import.meta.env.VITE_PROD_API_URL : import.meta.env.VITE_DEV_API_URL}/api/users/username/${receiverUsername}`);
      const receiver = response.data;
      await axios.post(`${import.meta.env.MODE === 'production' ? import.meta.env.VITE_PROD_API_URL : import.meta.env.VITE_DEV_API_URL}/api/messages`, {
        senderId: id,
        receiverId: receiver._id,
        content: message,
      });
      alert('Message sent successfully');
      // Clear the form
      setReceiverUsername('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please check the username and try again.');
    }
  };

  return (
    <UserData
      userId={id}
      render={(userData) => (
        <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-md rounded">
          <h1 className="text-2xl font-bold mb-6 text-center">Send Message</h1>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <form onSubmit={(e) => handleSubmit(e, userData)}>
            <div>
              <label>To:</label>
              <input
                type="text"
                value={receiverUsername}
                onChange={(e) => setReceiverUsername(e.target.value)}
                required
                className="w-full p-2 mt-1 border rounded"
              />
            </div>
            <div>
              <label>Message:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full p-2 mt-1 border rounded"
              />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 mt-4">
              Send Message
            </button>
          </form>
        </div>
      )}
    />
  );
};

export default SendMessage;







// import { useState } from 'react';
// import sendMessage from '../../utils/sendMessage';


// const Messages = () => {
//   const [recipientId, setRecipientId] = useState('');
//   // const [text, setText] = useState('');
//   const [text, setText] = useState({
//     message: ''
//   });

//   const handleSend = async () => {
//     if (recipientId && text) {
//       await sendMessage(recipientId, text);
//       setText('');
//     }
//   }

//   const handleChangeInput = (event)=>{
//     setText({
//       message: event.target.value
//     })

//   }

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Messages</h2>
//       <div className="bg-white shadow-md rounded-lg p-4">
//         <input
//           type="text"
//           placeholder="User ID"
//           value={recipientId}
//           onChange={(e) => setRecipientId(e.target.value)}
//           className="w-full p-2 mb-4 border border-gray-300 rounded"
//           />
//         <textarea
//           placeholder="Message"
//           value={text.message}
//           // onChange={(e) => setText(e.target.value)}
//           onChange={handleChangeInput}
//           className="w-full p-2 mb-4 border border-gray-300 rounded"
//         />
//         <button
//           onClick={handleSend}
//           className="w-full bg-black text-sm text-white p-2 rounded hover:bg-gray-300"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Messages;