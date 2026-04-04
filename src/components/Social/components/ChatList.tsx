import React from 'react';
import ChatItem from './ChatItem';

const ChatList: React.FC = () => {
  return (
    <div className="flex flex-col w-[280px] shrink-0 border-r border-[var(--border)] bg-[var(--background)]">
      <div className="flex items-center h-14 px-4 border-b border-[var(--border)]">
        <span className="text-base font-bold text-[var(--foreground)]">聊天列表</span>
      </div>
      <ChatItem avatarColor="bg-[var(--border)]" userName="用戶A" lastMessage="最近在做什麼項目？" />
      <ChatItem avatarColor="bg-[var(--border)]" userName="用戶B" lastMessage="明天一起吃飯嗎？" />
      <ChatItem avatarColor="bg-[var(--border)]" userName="用戶C" lastMessage="已收到，謝謝！" />
    </div>
  );
};

export default ChatList;
