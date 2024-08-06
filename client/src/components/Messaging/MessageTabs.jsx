import React from 'react';

const MessageTabs = ({ tabs, currentTab, setCurrentTab }) => {
  return (
    <div className="flex space-x-4 border-b">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`py-2 px-4 ${currentTab === tab ? 'border-b-2 border-indigo-500' : ''}`}
          onClick={() => setCurrentTab(tab)}
          disabled={currentTab === tab} // Disable the current tab
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default MessageTabs;
