import React, { useState, useContext } from 'react';
import MessageList from '../../components/Messaging/MessageList';
import MessageDetail from '../../components/Messaging/MessageDetails';
import NewMessage from '../../components/Messaging/NewMessage';
import { AuthContext } from '../../context/AuthContext';
import Tabs from '../../components/Messaging/Tabs';

const MessagingApp = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);

  return (
    <div className="min-h-screen p-4">
      {user ? (
        <>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-4">
            {activeTab === 'inbox' && (
              <div className="flex">
                <MessageList type="inbox" onSelectMessage={setSelectedMessage} />
                <MessageDetail message={selectedMessage} />
              </div>
            )}
            {activeTab === 'sent' && (
              <div className="flex">
                <MessageList type="sent" onSelectMessage={setSelectedMessage} />
                <MessageDetail message={selectedMessage} />
              </div>
            )}
            {activeTab === 'compose' && <NewMessage />}
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
