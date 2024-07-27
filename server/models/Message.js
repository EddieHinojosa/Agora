import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    Timestamp: {
        type: Date,
        default: Date.now,
    }
});

const Message = mongoose.model('Message', MessageSchema)
export default Message