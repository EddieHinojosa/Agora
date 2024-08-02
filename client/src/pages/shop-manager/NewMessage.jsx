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