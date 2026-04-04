import React from 'react';
import CisUnreadBadge from './CisUnreadBadge';
import { cn } from '../../lib/utils';

interface ChatNotificationIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  hasMention?: boolean;
  hasReply?: boolean; // Not explicitly used in SDD, but good to have for completeness
  unreadCount?: number;
}

const ChatNotificationIndicator: React.FC<ChatNotificationIndicatorProps> = ({
  hasMention,
  unreadCount = 0,
  className,
  ...rest
}) => {
  const showIndicator = hasMention || unreadCount > 0;

  if (!showIndicator) return null;

  return (
    <div className={cn('flex items-center gap-1.5 flex-shrink-0', className)} {...rest}>
      {hasMention && (
        <span className="px-1.5 py-0.5 rounded bg-secondary text-white text-[10px] font-bold shadow-sm">
          @提及
        </span>
      )}
      {unreadCount > 0 && (
        <CisUnreadBadge count={unreadCount} size="md" />
      )}
    </div>
  );
};

export default ChatNotificationIndicator;
