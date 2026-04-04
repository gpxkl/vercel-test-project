import React from \'react\';
import TopBar from \'./components/TopBar\';
// import NavTabs from \'./components/NavTabs\'; // Temporarily commented out
import ChatList from \'./components/ChatList\';
// import Sidebar from \'./components/Sidebar\'; // Temporarily commented out

import TabBar from \'./components/TabBar\';
import FeedPost from \'./components/FeedPost\';

const FeedView: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-[var(--background)] text-[var(--foreground)]">
      <TopBar />

      {/* Main Navigation Tabs */}
      <div className="flex items-center h-14 px-6 border-b border-[var(--border)] bg-[var(--background)]">
        <div className="flex-1 flex gap-6">
          <span className="text-base font-bold text-[var(--primary)] cursor-pointer">動態</span>
          <span className="text-base text-[var(--muted-foreground)] cursor-pointer">聊天列表</span>
          <span className="text-base text-[var(--muted-foreground)] cursor-pointer">社交動態</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat List Section */}
        <ChatList />

        {/* Social Feed Section */}
        <div className="flex flex-col flex-1 overflow-hidden bg-[var(--card)]">
          
          <TabBar />

          {/* Feed Posts */}
          <div className="flex flex-col flex-1 p-4 gap-3 overflow-y-auto">
            <FeedPost
              avatarColor="bg-[var(--primary)]"
              userName="Tech達人"
              timeAgo="3h"
              content="分享一個超棒的 TypeScript 技巧，讓你的代碼更加簡潔高效！"
              likes={456}
              comments={78}
              postType="code"
              code={{
                line1: \'const result = items\',
                line2: \'  .filter(Boolean)\',\
                line3: \'  .map(transform);\',\
              }}
            />
            <FeedPost
              avatarColor="bg-[#F59E0B]"
              userName="美食博主"
              timeAgo="5h"
              content="週末美食推薦！這家餐廳的牛排真的太好吃了，強烈推薦給大家～"
              likes={234}
              comments={45}
              postType="image"
              imageAlt="Delicious steak at a restaurant"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedView;
