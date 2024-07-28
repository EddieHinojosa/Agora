// import { Server } from 'socket.io';
// import Message from '../models/Message.js';
// import User from '../models/User.js';

// // Http server is passes as argument to setupSocket
// const setupSocket = (server) => {
//   const io = new Server(server, {

//     // Freaking CORS
//     cors: {
//       origin: ['http://localhost:5173', 'https://agora-crafts.onrender.com'],
//       methods: ['GET', 'POST'],
//       allowedHeaders: ['Content-Type'],
//       credentials: true,
//     }
//   });

//     //Sets up event listeners for socket.io
//   io.on('connection', (socket) => {
//     console.log('socket.io - connection');

//     // Send message
//     socket.on('sendMessage', async (data) => {
//       const { senderId, recipientUsername, text } = data;

//       // Debug
//       console.log('sendMessage data:', data);

//       try {
//         // Check if sender exists --- issue with this
//         const senderExists = await User.findById(senderId);
//         if (!senderExists) {
//           console.error(`Sender with ID ${senderId} does not exist`);
//           return;
//         }

//         // Check if recipient exists --- issue with this
//         const recipientExists = await User.findOne({ username: recipientUsername });
//         if (!recipientExists) {
//           console.error(`Recipient with username ${recipientUsername} does not exist`);
//           return;
//         }

//         // Create message
//         const message = new Message({
//           sender: senderId,
//           recipient: recipientExists._id,
//           text,
//           timestamp: new Date(),
//         });
//         await message.save();

//         // Populate message with sender and recipient info
//         const populatedMessage = await message
//           .populate('sender', 'firstName lastName username email')
//           .populate('recipient', 'firstName lastName username email')
//           .execPopulate();

//         // Emit message to recipient
//         socket.to(recipientExists._id.toString()).emit('receiveMessage', populatedMessage);
//       } catch (err) {
//         console.error(err);
//       }
//     });

//     // disconnects when client disconnects
//     socket.on('disconnect', () => {
//       console.log(`socket.io - socket.id \`${socket.id}\` disconnected`);
//     });
//   });
// };

// export default setupSocket;


