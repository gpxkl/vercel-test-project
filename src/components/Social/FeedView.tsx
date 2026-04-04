// project/src/components/Social/FeedView.tsx
import React, { useState } from 'react';
import { Home, MessageCircle, Rss, User, Settings, PlusCircle, Search, Bell, Bookmark, Hash } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { mockChatItems, mockFeedPosts } from '../../lib/mockData';
import UnifiedFeedPost from '../Feed/UnifiedFeedPost'; // Import UnifiedFeedPost

// Placeholder Components (will be replaced with actual implementations later if needed)
const TopBar: React.FC = () => (
  <div className="w-full h-[92px] bg-background border-b border-border flex items-center px-6 z-20">
    <span className="font-bold text-sm">LV80</span>
    <div className="flex-1"></div>
    <span className="font-bold text-sm">GP200</span>
    <div className="flex-1"></div>
    <span className="font-bold text-sm">EXP</span>
  </div>
);

const NavTabs: React.FC = () => (
  <div className="w-[80px] h-full flex-shrink-0 border-r border-border flex flex-col items-center py-4 gap-6 hidden lg:flex bg-background">
    <Home size={24} className="text-gray-500" />
    <MessageCircle size={24} className="text-gray-500" />
    <Rss size={24} className="text-primary" />
    <span className="text-xs text-primary">動態</span>
    <User size={24} className="text-gray-500" />
    <Settings size={24} className="text-gray-500" />
  </div>
);

const ChatList: React.FC = () => (
  <div className="w-[420px] h-full flex-shrink-0 border-r border-border flex flex-col bg-background">
    <div className="h-14 flex items-center px-4 border-b border-border">
      <h2 className="text-lg font-bold">聊天列表</h2>
    </div>
    <div className="flex-1 overflow-y-auto">
      {mockChatItems.map(chat => (
        <div key={chat.id} className="flex items-center p-4 gap-3 border-b border-border">
          <Avatar color={chat.avatarColor} size="md" />
          <div className="flex flex-col flex-1">
            <span className="text-sm font-semibold text-foreground">{chat.name}</span>
            <span className="text-xs text-muted-foreground">{chat.lastMessage}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Sidebar: React.FC = () => (
  <div className="w-[60px] h-full flex-shrink-0 bg-background/80 backdrop-blur-xl rounded-r-2xl shadow-lg flex flex-col items-center py-4 gap-5">
    <PlusCircle size={24} className="text-gray-500" />
    <Search size={24} className="text-gray-500" />
    <Bell size={24} className="text-gray-500" />
    <Bookmark size={24} className="text-gray-500" />
  </div>
);

// FeedCreateInput component as described in the MD
const FeedCreateInput: React.FC = () => {
  return (
    <div className="p-4 flex gap-4 flex-shrink-0 cursor-pointer transition-colors hover:bg-muted/30 border-b border-border/20">
      <Avatar size="md" color="#2B7D8E" /> {/* Placeholder for user avatar */}
      <div className="flex-1">
        <div className="text-sm font-medium text-muted-foreground py-2.5">開始新討論串...</div>
        <div className="flex items-center gap-4 mt-2">
          <Hash size={20} className="text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">添加話題標籤</span>
          <button className="ml-auto px-4 py-1.5 rounded-full bg-muted/30 text-muted-foreground text-sm font-semibold pointer-events-none">
            發布
          </button>
        </div>
      </div>
    </div>
  );
};

const FeedView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('推薦'); // State for TabBar

  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <NavTabs />
        <ChatList />
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-card text-foreground">
          {/* Content area for FeedView */}
          <div className="w-full h-14 flex items-center px-6 border-b border-border">
            <h1 className="text-xl font-bold">社交動態</h1>
          </div>

          {/* TabBar */}
          <div className="flex items-center p-2 gap-2 border-b border-border">
            {['推薦', '關注', '最新'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors
                  ${activeTab === tab
                    ? 'bg-primary text-white'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted/80'
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* FeedCreateInput */}
          <FeedCreateInput />

          {/* Feed List */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {mockFeedPosts.map(post => (
              <UnifiedFeedPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedView;
