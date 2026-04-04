import React from 'react';

interface ChatItemProps {
  avatarColor: string;
  userName: string;
  lastMessage: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ avatarColor, userName, lastMessage }) => {
  return (
    <div className="flex items-center h-[72px] px-4 gap-3 border-b border-[var(--border)]">
      <div className={`w-10 h-10 rounded-full ${avatarColor}`} />
      <div className="flex flex-col flex-1 gap-1">
        <span className="text-sm font-semibold text-[var(--foreground)]">{userName}</span>
        <span className="text-xs text-[var(--muted-foreground)]">{lastMessage}</span>
      </div>
    </div>
  );
};

export default ChatItem;
