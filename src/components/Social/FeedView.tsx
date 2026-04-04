import React from 'react';
import { Home, MessageCircle, Rss, User, Settings, PlusCircle, Search, Bell, Bookmark, Share, Image as ImageIcon } from 'lucide-react';

const FeedView: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* TopBar */}
      <div className="flex items-center justify-between h-[92px] px-6 border-b border-[var(--border)] bg-[var(--background)] z-20">
        <span className="text-sm font-bold text-[var(--foreground)]">LV80</span>
        <div className="flex-1" />
        <span className="text-sm font-bold text-[var(--foreground)]">GP200</span>
        <div className="flex-1" />
        <span className="text-sm font-bold text-[var(--foreground)]">EXP</span>
      </div>

      {/* ContentRow */}
      <div className="flex flex-1 overflow-hidden">
        {/* NavTabs - Col1 */}
        <div className="hidden lg:flex flex-col items-center py-4 gap-6 w-20 shrink-0 border-r border-[var(--border)] bg-[var(--background)]">
          <Home size={24} className="text-[#6B7280]" />
          <MessageCircle size={24} className="text-[#6B7280]" />
          <Rss size={24} className="text-[var(--primary)]" />
          <span className="text-[10px] text-[var(--primary)]">動態</span>
          <User size={24} className="text-[#6B7280]" />
          <Settings size={24} className="text-[#6B7280]" />
        </div>

        {/* ChatList - Col2 */}
        <div className="hidden lg:flex flex-col w-[420px] shrink-0 border-r border-[var(--border)] bg-[var(--background)]">
          <div className="flex items-center h-14 px-4 border-b border-[var(--border)]">
            <span className="text-base font-bold text-[var(--foreground)]">聊天列表</span>
          </div>
          {/* ChatItem1 */}
          <div className="flex items-center h-[72px] px-4 gap-3 border-b border-[var(--border)]">
            <div className="w-10 h-10 rounded-full bg-[var(--border)]" />
            <div className="flex flex-col flex-1 gap-1">
              <span className="text-sm font-semibold text-[var(--foreground)]">用戶A</span>
              <span className="text-xs text-[#6B7280]">最近在做什麼項目？</span>
            </div>
          </div>
          {/* ChatItem2 */}
          <div className="flex items-center h-[72px] px-4 gap-3 border-b border-[var(--border)]">
            <div className="w-10 h-10 rounded-full bg-[var(--border)]" />
            <div className="flex flex-col flex-1 gap-1">
              <span className="text-sm font-semibold text-[var(--foreground)]">用戶B</span>
              <span className="text-xs text-[#6B7280]">明天一起吃飯嗎？</span>
            </div>
          </div>
          {/* ChatItem3 */}
          <div className="flex items-center h-[72px] px-4 gap-3 border-b border-[var(--border)]">
            <div className="w-10 h-10 rounded-full bg-[var(--border)]" />
            <div className="flex flex-col flex-1 gap-1">
              <span className="text-sm font-semibold text-[var(--foreground)]">用戶C</span>
              <span className="text-xs text-[#6B7280]">已收到，謝謝！</span>
            </div>
          </div>
        </div>

        {/* Sidebar - Col3 (mobile: absolute inset-0 z-50 for col3+col4 container) */}
        <div className="absolute lg:relative inset-0 lg:inset-auto z-50 lg:z-auto flex flex-1 overflow-hidden min-w-0">
        <div className="flex flex-col items-center py-4 gap-5 w-12 lg:w-[60px] shrink-0 rounded-tr-3xl rounded-br-3xl bg-[#ECE9E2CC] backdrop-blur-xl shadow-lg">
          <PlusCircle size={24} className="text-[#6B7280]" />
          <Search size={24} className="text-[#6B7280]" />
          <Bell size={24} className="text-[#6B7280]" />
          <Bookmark size={24} className="text-[#6B7280]" />
        </div>

        {/* Content - Col4 */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0 bg-white">
          {/* Header */}
          <div className="flex items-center h-14 px-6 border-b border-[var(--border)]">
            <span className="text-lg font-bold text-[var(--foreground)]">社交動態</span>
          </div>

          {/* TabBar */}
          <div className="flex items-center h-11 px-4 gap-2">
            <div className="flex items-center justify-center px-4 py-1.5 rounded-full bg-[var(--primary)]">
              <span className="text-sm font-semibold text-white">推薦</span>
            </div>
            <div className="flex items-center justify-center px-4 py-1.5 rounded-full bg-[#F3F4F6]">
              <span className="text-sm text-[#6B7280]">關注</span>
            </div>
            <div className="flex items-center justify-center px-4 py-1.5 rounded-full bg-[#F3F4F6]">
              <span className="text-sm text-[#6B7280]">最新</span>
            </div>
          </div>

          {/* Feed */}
          <div className="flex flex-col flex-1 p-4 gap-3 overflow-y-auto">
            {/* Post1 */}
            <div className="flex flex-col p-4 gap-3 bg-white rounded-2xl border border-[var(--border)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--primary)]" />
                <span className="text-sm font-semibold text-[var(--foreground)]">Tech達人</span>
                <div className="flex-1" />
                <span className="text-xs text-[#6B7280]">3h</span>
              </div>
              <p className="text-sm text-[var(--foreground)]">分享一個超棒的 TypeScript 技巧，讓你的代碼更加簡潔高效！</p>
              <div className="flex flex-col p-3 rounded-lg bg-[#1E293B]">
                <span className="font-mono text-xs text-[#E2E8F0]">const result = items</span>
                <span className="font-mono text-xs text-[#A5F3FC]">  .filter(Boolean),</span>
                <span className="font-mono text-xs text-[#A5F3FC]">  .map(transform);</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-[#6B7280]">❤️ 456</span>
                <span className="text-xs text-[#6B7280]">💬 78</span>
                <Share size={14} className="text-[#6B7280]" />
              </div>
            </div>

            {/* Post2 */}
            <div className="flex flex-col p-4 gap-3 bg-white rounded-2xl border border-[var(--border)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#F59E0B]" />
                <span className="text-sm font-semibold text-[var(--foreground)]">美食博主</span>
                <div className="flex-1" />
                <span className="text-xs text-[#6B7280]">5h</span>
              </div>
              <p className="text-sm text-[var(--foreground)]">週末美食推薦！這家餐廳的牛排真的太好吃了，強烈推薦給大家～</p>
              <div className="flex items-center justify-center w-full h-40 rounded-xl bg-[#F3F4F6]">
                <ImageIcon size={32} className="text-[var(--border)]" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-[#6B7280]">❤️ 234</span>
                <span className="text-xs text-[#6B7280]">💬 45</span>
                <Share size={14} className="text-[#6B7280]" />
              </div>
            </div>
          </div>
        </div>
        </div> {/* End of Col3+Col4 Flex Container for mobile responsiveness */}
      </div>
    </div>
  );
};

export default FeedView;