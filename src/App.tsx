import React, { useState } from 'react';
import ChatListContainer from './components/ChatListContainer';
import ChatRoomView from './components/ChatRoomView';
import ChatSubNav from './components/ChatSubNav';
import NavigationTabs from './components/NavigationTabs';
import TopBarV1 from './components/TopBar/TopBarV1';

const AppContent: React.FC = () => {
  const [selectedNavId, setSelectedNavId] = useState<string | null>('chat');
  const [selectedChatSubNavId, setSelectedChatSubNavId] = useState<string | null>('chat');
  const [selectedChat, setSelectedChat] = useState<any | null>(null); // Replace 'any' with actual Chat type

  // This state would typically come from a global state management or context
  const showChatList = true; // For now, always show chat list based on SDD description

  return (
    <div className="flex-1 flex flex-row overflow-hidden relative max-w-full">
      {/* Col 1 - NavigationTabs (PC) */}
      <NavigationTabs selectedNavId={selectedNavId} onSelectNav={setSelectedNavId} isMobile={false} />

      {/* Col 2 - ChatListContainer */}
      <ChatListContainer
        searchQuery=""
        onChatSelect={setSelectedChat}
        onScroll={() => {}}
        onToggleCollapse={() => {}}
        onCategoryChange={() => {}}
        onAddFriend={() => {}}
        className={`
          h-full shrink-0 flex flex-col overflow-hidden
          lg:w-[320px] lg:min-w-[280px] lg:max-w-[380px]
          ${selectedNavId === 'chat' ? 'flex' : 'hidden lg:flex'}
        `}
      />

      {/* Col 3 & 4 - ChatSubNav and ChatRoomView */}
      <div className="flex-1 flex flex-row overflow-hidden min-w-0">
        {selectedNavId === 'chat' && (
          <ChatSubNav selectedNavId={selectedChatSubNavId} onSelectNav={setSelectedChatSubNavId} />
        )}
        <ChatRoomView selectedChat={selectedChat} selectedChatSubNavId={selectedChatSubNavId} />
      </div>
    </div>
  );
};

function App() {
  // For now, always render TopBarV1 as per SDD global layout
  const memberLevel = { level: 80, name: '黄金会员' };
  const gpAmount = 12580;
  const userName = '用户';
  const notifications = 5; // Example
  const expProgress = 0.785; // Example

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col text-[var(--foreground)]"
      style={{ backgroundColor: 'var(--background)' }}>
      <TopBarV1
        memberLevel={memberLevel}
        gpAmount={gpAmount}
        userName={userName}
        notifications={notifications}
        expProgress={expProgress}
      />
      <AppContent />
    </div>
  );
}

export default App;
