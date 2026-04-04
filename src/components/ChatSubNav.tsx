import React from 'react';
import { MessageCircle, Hash, Image, Folder } from 'lucide-react';
import { cn } from '../lib/utils';

interface ChatSubNavProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedNavId: string | null; // This will actually be the selected sub-tab ID
  onSelectNav: (id: string) => void;
}

const chatSubNavItems = [
  {
    id: 'chat',
    icon: MessageCircle,
    label: '聊天',
  },
  {
    id: 'discussion',
    icon: Hash,
    label: '讨论',
  },
  {
    id: 'media',
    icon: Image,
    label: '媒体',
  },
  {
    id: 'files',
    icon: Folder,
    label: '文件',
  },
];

const ChatSubNav: React.FC<ChatSubNavProps> = ({
  selectedNavId,
  onSelectNav,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "hidden lg:flex flex-col h-full shrink-0 w-20 py-4 gap-3 items-center border-r",
        className
      )}
      style={{
        backgroundColor: 'var(--background)',
        borderColor: 'rgba(var(--border), 0.1)'
      }}
      {...rest}
    >
      {/* Placeholder for User Avatar/Profile in PC Nav if needed */}
      <div className="flex flex-col items-center justify-center py-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">👤</div>
      </div>
      {chatSubNavItems.map((item) => {
        const isActive = selectedNavId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectNav(item.id)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-full py-2 rounded-lg transition-colors",
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/10"
            )}
          >
            <item.icon size={24} />
            <span className="text-xs font-semibold">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ChatSubNav;
