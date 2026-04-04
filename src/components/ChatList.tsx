import React from 'react';
import { Chat, ExtendedChatCategory } from '../types/chat';
import SwipeableChatItem from './SwipeableChatItem';
import { cn } from '../lib/utils';

interface ChatListProps extends React.HTMLAttributes<HTMLDivElement> {
  chats: Chat[];
  category: ExtendedChatCategory;
  onChatClick: (chat: Chat) => void;
  onPinChat: (chatId: string) => void;
  onReadChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  category,
  onChatClick,
  onPinChat,
  onReadChat,
  onDeleteChat,
  className,
  ...rest
}) => {
  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-muted-foreground">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-input-background">
          <span className="text-3xl">💬</span>
        </div>
        <p className="text-base font-semibold text-foreground">
          {category === 'all' ? '還沒有聊天' : '找不到相關聊天'}
        </p>
        <p className="text-sm text-center mt-2">
          {category === 'all' ? '從這裡開始您的第一次對話吧！' : '請嘗試其他分類或搜尋關鍵字'}
        </p>
      </div>
    );
  }

  const sortedChats = [...chats].sort((a, b) => {
    // Pinned chats first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    // Then by timestamp (latest first) - simplistic string comparison for mock data
    if (a.timestamp && b.timestamp) {
      return b.timestamp.localeCompare(a.timestamp);
    }
    return 0;
  });

  return (
    <div className={cn('flex-1 overflow-y-auto', className)} {...rest}>
      {sortedChats.map((chat) => (
        <SwipeableChatItem
          key={chat.id}
          chat={chat}
          category={category}
          onPin={onPinChat}
          onRead={onReadChat}
          onDelete={onDeleteChat}
          onClick={onChatClick}
        />
      ))}
    </div>
  );
};

export default ChatList;
