import socketIo from 'socket.io';
import Message from '../models/Message';

const setupSocket = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('User connected')

        // Handle sending message
        socket.on('sendMessage', async (data) => {
            const { senderId, recipientId, text } = data;
            const message = new Message({
                sender: senderId,
                recipient: recipientId,
                text,
                Timestamp: new Date(),
            });
            await message.save()

            // Emit message to recipient
            socket.to(recipientId).emit('receiveMessage', message)
        })

        socket.on('disconnect', () => {
            console.log('User disconnected');
        })
    })
    return io;
}

export default setupSocket