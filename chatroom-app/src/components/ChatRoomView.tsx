import React from 'react';
import CisNavigationTabs from './CisNavigationTabs';
import CisChatList from './CisChatList';
import CisHeader from './CisHeader';
import CisMessageBubble from './CisMessageBubble';
import CisMessageInput from './CisMessageInput';

const ChatRoomView: React.FC = () => {
  return (
    <div className="flex w-full h-screen bg-background">
      <CisNavigationTabs />
      <CisChatList />
      <div className="flex flex-col flex-grow">
        <CisHeader />
        <div className="flex flex-col flex-grow gap-4 p-6 overflow-y-auto">
          <CisMessageBubble 
            sender="Alice" 
            content="Hey everyone! Welcome to the General Chat!" 
            avatarColor="bg-cisOrange"
          />
          <CisMessageBubble 
            sender="Bob" 
            content="I just found this cool keyboard." 
            avatarColor="bg-cisPurple" 
            hasProductCard={true}
          />
          <CisMessageBubble 
            sender="Me" 
            content="That looks awesome! I might get one." 
            isMe={true} 
            avatarColor="bg-cisOlive"
          />
        </div>
        <CisMessageInput />
      </div>
    </div>
  );
};

export default ChatRoomView;
