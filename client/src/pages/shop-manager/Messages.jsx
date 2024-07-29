import sendMessage from "../../sendMessage";

const Messages = () => {
  const [recipientId, setRecipientId] = useState('');
  const [text, setText] = useState('');

  const handleSend = async () => {
    if (recipientId && text) {
      await sendMessage(recipientId, text);
      setText('');
    }
  }

  return (
    <div>
      <h2>Messages</h2>
      <input type="text" placeholder="User ID" value={recipientId} onChange={(e) => setRecipientId(e.target.value)}/>
      <textarea placeholder="Message" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Messages;




