const ThreadSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Thread = mongoose.model('Thread', ThreadSchema);
export default Thread;