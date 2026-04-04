import React, { useState } from 'react';
import ChatView from './components/ChatView';
import NavigationTabs from './components/NavigationTabs';
import TopBarV1 from './components/TopBar/TopBarV1';

const AppContent: React.FC = () => {
  const [selectedNavId, setSelectedNavId] = useState<string | null>('chat');
  const [selectedChat, setSelectedChat] = useState<any | null>(null); // Replace 'any' with actual Chat type

  // This state would typically come from a global state management or context
  const showChatList = true; // For now, always show chat list based on SDD description

  return (
    <div className="flex-1 flex flex-row overflow-hidden relative max-w-full">
      {/* Col 1 - NavigationTabs (PC) */}
      <NavigationTabs selectedNavId={selectedNavId} onSelectNav={setSelectedNavId} isMobile={false} />

      {/* Col 2 - ChatView Container */}
      <div
        className={`h-full shrink-0 flex flex-col overflow-hidden
          lg:w-[420px] lg:min-w-[380px] lg:max-w-[480px] w-full
          ${(selectedChat || selectedNavId) ? 'hidden lg:flex' : 'flex'}`}
        style={{ backgroundColor: 'var(--background)', borderRight: '1px solid rgba(var(--border), 0.1)' }}
      >
        {/* Mobile TopBar and NavigationTabs - Conditional Rendering */}
        <div className="lg:hidden shrink-0" style={{ backgroundColor: 'var(--background)', borderBottom: '1px solid rgba(var(--border), 0.1)' }}>
          <div className="px-3 pt-3 pb-3 flex items-center justify-between">
            {/* Mobile TopBar content - simplified for now */}
            <span className="font-bold">Mobile Header</span>
            {/* Add search, contacts, notification, settings icons */}
          </div>
          <NavigationTabs selectedNavId={selectedNavId} onSelectNav={setSelectedNavId} isMobile={true} hide={selectedChat !== null} />
        </div>

        {/* ChatView component */}
        {showChatList && (
          <ChatView
            searchQuery=""
            onChatSelect={setSelectedChat}
            onScroll={() => {}}
            onToggleCollapse={() => {}}
            onCategoryChange={() => {}}
            onAddFriend={() => {}}
          />
        )}
      </div>

      {/* Col 3 & 4 - Placeholder for Sidebar and ChatRoomView / FeedView */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0"
        style={{ backgroundColor: 'var(--background)' }}>
        {selectedChat ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">Chat Room View for {selectedChat.name}</div>
        ) : selectedNavId === 'chat' && !showChatList ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">Select a chat to view messages</div>
        ) : selectedNavId && selectedNavId !== 'chat' ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">Content for {selectedNavId}</div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">Welcome!</div>
        )}
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
