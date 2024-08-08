import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b">
      <button
        className={`p-4 ${activeTab === 'inbox' ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => setActiveTab('inbox')}
      >
        Inbox
      </button>
      <button
        className={`p-4 ${activeTab === 'sent' ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => setActiveTab('sent')}
      >
        Sent
      </button>
      <button
        className={`p-4 ${activeTab === 'compose' ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => setActiveTab('compose')}
      >
        New Message
      </button>
      <button
        className={`p-4 ${activeTab === 'trash' ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => setActiveTab('trash')}
      >
        Trash
      </button>
    </div>
  );
};

export default Tabs;