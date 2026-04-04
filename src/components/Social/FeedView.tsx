import React from 'react';
import TopBar from './components/TopBar';
import NavTabs from './components/NavTabs';
import ChatList from './components/ChatList';
import Sidebar from './components/Sidebar';
import ContentHeader from './components/ContentHeader'; // Will create this component next

import TabBar from './components/TabBar';
import FeedPost from './components/FeedPost';

const FeedView: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-[#ECE9E2] text-[var(--foreground)]">
      <TopBar />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <NavTabs />
        <ChatList />
        <Sidebar />

        {/* Social Feed Section */}        <div className="flex flex-col flex-1 overflow-hidden bg-[#FFFFFF]">
          <ContentHeader />
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
                line1: 'const result = items',
                line2: '  .filter(Boolean)',
                line3: '  .map(transform);',
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedView;
