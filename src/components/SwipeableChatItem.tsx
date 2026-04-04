import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pin, Check, Trash2, Users, Hash, Mic, Volume2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import Avatar from '../ui/avatar';
import ChatNotificationIndicator from '../Notification/ChatNotificationIndicator';
import CombinedBadges from '../Membership/CombinedBadges';
import VerifiedBadge from '../Membership/VerifiedBadge';
import { Chat, ExtendedChatCategory } from '../../types/chat';
import { getPresenceColor } from '../../lib/mockData'; // For online status color

interface SwipeableChatItemProps extends React.HTMLAttributes<HTMLDivElement> {
  chat: Chat;
  category: ExtendedChatCategory;
  onPin: (chatId: string) => void;
  onRead: (chatId: string) => void;
  onDelete: (chatId: string) => void;
  onClick: (chat: Chat) => void;
}

// Swipe Constants
const MAX_SWIPE_LEFT = 160; // For Read/Delete buttons
const MAX_SWIPE_RIGHT = 80; // For Pin button
const THRESHOLD = 50; // Distance to trigger action
const LONG_PRESS_DELAY = 500; // ms
const MOVE_THRESHOLD = 10; // px

const SwipeableChatItem: React.FC<SwipeableChatItemProps> = ({
  chat,
  category,
  onPin,
  onRead,
  onDelete,
  onClick,
  className,
  ...
}) => {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showActionPanel, setShowActionPanel] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
    setIsDragging(false);
    isLongPress.current = false;
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setShowActionPanel(true);
      setOffset(0); // Reset swipe offset on long press
    }, LONG_PRESS_DELAY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    const deltaX = e.touches[0].clientX - currentX.current;
    const totalDeltaX = e.touches[0].clientX - startX.current;

    if (Math.abs(totalDeltaX) > MOVE_THRESHOLD && !isLongPress.current) {
      setIsDragging(true);
      setOffset(prevOffset => {
        const newOffset = prevOffset + deltaX;
        return Math.max(-MAX_SWIPE_LEFT, Math.min(MAX_SWIPE_RIGHT, newOffset));
      });
    }
    currentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    if (isLongPress.current) {
      // Long press action already handled, prevent click
      return;
    }

    setIsDragging(false);
    if (offset < -THRESHOLD) {
      // Trigger Read/Delete
      if (offset < -MAX_SWIPE_LEFT / 2) {
        // Assuming last half for delete, first half for read. Simplified for now.
        // Will implement actual action trigger later
        console.log('Triggering Delete for', chat.id);
      } else {
        console.log('Triggering Read for', chat.id);
      }
      setOffset(0); // Snap back
    } else if (offset > THRESHOLD) {
      // Trigger Pin
      console.log('Triggering Pin for', chat.id);
      setOffset(0); // Snap back
    } else {
      setOffset(0); // Snap back if not past threshold
      if (Math.abs(startX.current - currentX.current) < MOVE_THRESHOLD) {
        // It was a tap, not a drag
        onClick(chat);
      }
    }
  };

  const renderChatContent = () => {
    if (chat.type === 'dm' && chat.user) {
      const user = chat.user;
      const avatarFallback = user.avatarUrl ? undefined : user.name.charAt(0).toUpperCase();

      return (
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Avatar Area */}
          <div className="relative flex-shrink-0">
            <Avatar src={user.avatarUrl} fallback={avatarFallback} size="md" />
            {user.isOnline && (
              <div
                className={cn(
                  'absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white',
                  getPresenceColor(user.isOnline)
                )}
              />
            )}
          </div>

          {/* Info Area */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                <span className="truncate text-base font-semibold text-foreground">
                  {user.name}
                </span>
                <CombinedBadges
                  memberLevel={user.memberLevel}
                  isVerified={user.isVerified}
                  size="sm"
                  spacing="tight"
                />
              </div>
              <span className="flex-shrink-0 ml-2 text-xs font-medium text-muted-foreground">
                {chat.timestamp}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                <span className="truncate text-sm font-normal text-muted-foreground">
                  {chat.lastMessage}
                </span>
              </div>
              <ChatNotificationIndicator
                hasMention={chat.hasMention}
                unreadCount={chat.unreadCount}
              />
            </div>
          </div>
        </div>
      );
    } else if (chat.type === 'server_channel' && chat.serverChannel) {
      const sc = chat.serverChannel;
      const isVoiceChannel = chat.name.includes('#voice'); // Simple check, refine as needed
      const serverInitial = sc.serverName.charAt(0).toUpperCase();

      return (
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Avatar Area (Server Icon) */}
          <div className="relative flex-shrink-0">
            <div
              className="w-12 h-12 rounded-[16px] flex items-center justify-center overflow-hidden"
              style={{
                backgroundColor: sc.serverIconUrl ? 'transparent' : 'var(--primary)',
              }}
            >
              {sc.serverIconUrl ? (
                <img src={sc.serverIconUrl} alt={sc.serverName} className="w-full h-full object-cover" />
              ) : isVoiceChannel ? (
                <Volume2 size={24} className="text-white" />
              ) : (
                <span className="text-lg font-bold text-white">{serverInitial}</span>
              )}
            </div>
            {/* Hash Badge */}
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md flex items-center justify-center border-2 border-white bg-foreground"
            >
              <Hash size={12} className="text-white" />
            </div>
          </div>

          {/* Info Area */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                {/* Server Name Badge */}
                <span
                  className="flex-shrink-0 px-1.5 py-0.5 rounded text-[12px] font-semibold"
                  style={{
                    backgroundColor: 'rgba(141, 59, 99, 0.1)',
                    color: 'var(--cis-purple)',
                  }}
                >
                  {sc.serverName}
                </span>
                {/* Channel Name */}
                <span className="truncate flex items-center gap-0.5 text-base font-semibold text-foreground">
                  <Hash size={16} className="text-muted-foreground" />
                  {chat.name}
                </span>
              </div>
              <span className="flex-shrink-0 ml-2 text-xs font-medium text-muted-foreground">
                {chat.timestamp}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 mt-1">
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                {/* Verified Badge + Member Count */}
                <div className="flex items-center gap-1">
                  {sc.isVerified && <VerifiedBadge size={14} className="text-primary" />}
                  <span className="text-xs font-semibold text-muted-foreground">{sc.memberCount}</span>
                </div>
                <span className="truncate text-sm font-normal text-muted-foreground">
                  {chat.lastMessage}
                </span>
              </div>
              <CisUnreadBadge count={chat.unreadCount || 0} size="sm" />
            </div>
          </div>
        </div>
      );
    } else if (chat.type === 'group' && chat.group) {
      const group = chat.group;
      const isVoiceActive = group.isVoiceActive;

      return (
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Avatar Area (Group Icon) */}
          <div className="relative flex-shrink-0">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center bg-cis-green"
            >
              <Users size={24} className="text-white" />
            </div>
            {/* Voice Indicator */}
            {isVoiceActive && (
              <div
                className="absolute -bottom-1 -right-1 rounded-full p-1 border-2 bg-cis-voice-live border-background"
              >
                <Mic size={12} className="text-white" />
              </div>
            )}
          </div>

          {/* Info Area */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="truncate text-base font-semibold text-foreground">
                  {chat.name}
                </span>
                {group.memberCount && (
                  <span className="text-sm text-muted-foreground">({group.memberCount})</span>
                )}
              </div>
              <span className="flex-shrink-0 ml-2 text-xs font-medium text-muted-foreground">
                {chat.timestamp}
              </span>
            </div>
            {isVoiceActive && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-cis-voice-live">Voice Active</span>
              </div>
            )}
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-normal text-muted-foreground">
                {chat.lastMessage}
              </span>
              <CisUnreadBadge count={chat.unreadCount || 0} size="md" />
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      ref={itemRef}
      className={cn('relative overflow-hidden border-b border-gray-100', className)}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Background Operation Layer */}
      <div
        className="absolute inset-0 flex items-center justify-between px-4"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {/* Right Swipe (Pin) */}
        {offset > 0 && (
          <div className="w-16 h-full flex items-center justify-center bg-secondary">
            <Pin size={24} className="text-white" />
          </div>
        )}
        {/* Left Swipe (Read/Delete) */}
        {offset < 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <button
              className="w-16 h-16 flex items-center justify-center bg-primary text-white"
              onClick={() => onRead(chat.id)}
            >
              <Check size={24} />
            </button>
            <button
              className="w-16 h-16 flex items-center justify-center bg-destructive text-white"
              onClick={() => onDelete(chat.id)}
            >
              <Trash2 size={24} />
            </button>
          </div>
        )}
      </div>

      {/* Content Container */}
      <motion.div
        className="relative cursor-pointer bg-cis-white"
        style={{
          x: offset,
          touchAction: 'none',
        }}
        transition={isDragging ? { type: 'tween', ease: 'linear', duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => !isDragging && !isLongPress.current && onClick(chat)}
      >
        {/* Pin Indicator */}
        {chat.isPinned && (
          <div
            className="absolute left-0 top-0 bottom-0 w-2 bg-cis-pin-active"
          />
        )}
        {renderChatContent()}
      </motion.div>

      {/* Long Press Action Panel (LINE style) */}
      <AnimatePresence>
        {showActionPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-40"
            onClick={() => setShowActionPanel(false)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '-50%', opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed left-4 right-4 z-50 rounded-2xl shadow-2xl bg-background border border-border"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside panel
            >
              <div className="px-4 py-3 border-b" style={{ backgroundColor: 'var(--input-background)' }}>
                <h3 className="text-sm font-semibold text-foreground">訊息操作</h3>
              </div>
              <div className="py-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted" onClick={() => { onPin(chat.id); setShowActionPanel(false); }}>
                  <Pin size={20} className="text-primary" />
                  <span className="text-base font-medium text-foreground">{chat.isPinned ? '取消置顶' : '置顶'}</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted" onClick={() => { onRead(chat.id); setShowActionPanel(false); }}>
                  <Check size={20} className="text-secondary" />
                  <span className="text-base font-medium text-foreground">标记为已读</span>
                </button>
                {/* More options like Mute, Notification Settings would go here */}
                <div className="my-2 mx-4 h-[1px] bg-border" />
                <button className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-muted" onClick={() => { onDelete(chat.id); setShowActionPanel(false); }}>
                  <Trash2 size={20} className="text-destructive" />
                  <span className="text-base font-medium text-destructive">删除聊天</span>
                </button>
              </div>
              <div className="px-4 py-3 border-t" style={{ backgroundColor: 'var(--input-background)' }}>
                <button className="w-full py-2.5 rounded-lg bg-background border border-border text-base font-semibold text-foreground hover:bg-muted"
                  onClick={() => setShowActionPanel(false)}>
                  取消
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SwipeableChatItem;
