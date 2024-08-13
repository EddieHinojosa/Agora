import React, { useState, useContext } from "react";
import MessageList from "../../components/Messaging/MessageList";
import MessageDetail from "../../components/Messaging/MessageDetails";
import NewMessage from "../../components/Messaging/NewMessage";
import { AuthContext } from "../../context/AuthContext";
import Tabs from "../../components/Messaging/Tabs";

const MessagingApp = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("inbox");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deletedMessages, setDeletedMessages] = useState([]);
  const [composeData, setComposeData] = useState(null);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleDeleteMessage = (message) => {
    setDeletedMessages((prevDeletedMessages) => {
      const updatedDeletedMessages = [message, ...prevDeletedMessages];
      return updatedDeletedMessages.slice(0, 5);
    });
    setSelectedMessage(null); // Close the message detail view after deletion
  };

  const handleReplyMessage = () => {
    setComposeData({
      recipient: selectedMessage.sender,
      subject: `RE: ${selectedMessage.subject}`,
      body: `\n\n---------- Original message ----------\nFrom: ${
        selectedMessage.sender
      }\nDate: ${new Date(
        selectedMessage.createdAt.toDate()
      ).toLocaleString()}\nSubject: ${selectedMessage.subject}\nTo: ${
        selectedMessage.recipient
      }\n\n${selectedMessage.body}`,
    });
    setActiveTab("compose");
  };

  const handleForwardMessage = () => {
    setComposeData({
      recipient: "",
      subject: `Fwd: ${selectedMessage.subject}`,
      body: `\n\n---------- Forwarded message ----------\nFrom: ${
        selectedMessage.sender
      }\nDate: ${new Date(
        selectedMessage.createdAt.toDate()
      ).toLocaleString()}\nSubject: ${selectedMessage.subject}\nTo: ${
        selectedMessage.recipient
      }\n\n${selectedMessage.body}`,
    });
    setActiveTab("compose");
  };

  const handleMessageSent = () => {
    setComposeData(null);
  };

  return (
    <div className="min-h-screen p-4">
      {user ? (
        <>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-4">
            {activeTab === "inbox" && (
              <div className="flex">
                <MessageList
                  type="inbox"
                  onSelectMessage={handleSelectMessage}
                  onDeleteMessage={handleDeleteMessage}
                />
                <MessageDetail
                  message={selectedMessage}
                  onClose={() => setSelectedMessage(null)}
                  onReply={handleReplyMessage}
                />
              </div>
            )}
            {activeTab === "sent" && (
              <div className="flex">
                <MessageList
                  type="sent"
                  onSelectMessage={handleSelectMessage}
                  onDeleteMessage={handleDeleteMessage}
                />
                <MessageDetail
                  message={selectedMessage}
                  onClose={() => setSelectedMessage(null)}
                  onForward={handleForwardMessage}
                />
              </div>
            )}
            {activeTab === "compose" && (
              <NewMessage
                composeData={composeData}
                onMessageSent={handleMessageSent}
              />
            )}
            {activeTab === "trash" && (
              <div className="flex">
                <div className="w-full">
                  {deletedMessages.map((message) => (
                    <div
                      key={message.id}
                      className="p-4 border-b border-gray-200 flex justify-between items-center hover:bg-gray-100"
                    >
                      <div
                        onClick={() => handleSelectMessage(message)}
                        className="cursor-pointer w-3/4"
                      >
                        <h4 className="font-bold">{message.subject}</h4>
                        <p>{message.body.slice(0, 20)}...</p>
                        <p className="text-sm text-gray-500">
                          {new Date(
                            message.createdAt.toDate()
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <MessageDetail
                  message={selectedMessage}
                  onClose={() => setSelectedMessage(null)}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <p>Please log in to use the messaging system.</p>
        </div>
      )}
    </div>
  );
};

export default MessagingApp;
