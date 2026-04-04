import React from 'react';
import { MessageSquare, Package, Briefcase, Hash, Image, Folder } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import CisUnreadBadge from '../Notification/CisUnreadBadge';
import { NavigationTabItem } from '../../types/chat';

interface NavigationTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedNavId: string | null;
  onSelectNav: (id: string) => void;
  isMobile: boolean;
  hide?: boolean; // For mobile, to hide tabs on scroll or chat selected
}

const navigationItems: NavigationTabItem[] = [
  {
    id: 'chat',
    icon: MessageSquare,
    label: '聊天',
    notifications: 20, // Example
  },
  {
    id: 'gp',
    icon: Package,
    label: 'GP',
  },
  {
    id: 'items',
    icon: Briefcase,
    label: '物品',
  },
  // Additional items for potential use in chat view, not explicitly in SDD NavigationTabs but common
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

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  selectedNavId,
  onSelectNav,
  isMobile,
  hide = false,
  className,
  ...
}) => {
  const renderTabButton = (item: NavigationTabItem) => {
    const isActive = selectedNavId === item.id;

    if (isMobile) {
      return (
        <motion.button
          key={item.id}
          className={cn(
            'flex flex-col items-center justify-center min-w-[60px] px-2 py-1.5 rounded-lg transition-colors',
            isActive ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted-foreground/10'
          )}
          onClick={() => onSelectNav(item.id)}
        >
          <div className="relative">
            <item.icon size={18} className="mb-0.5" />
            {item.notifications && item.notifications > 0 && (
              <CisUnreadBadge count={item.notifications} size="sm" className="absolute -top-1 -right-1" />
            )}
          </div>
          <span
            className="text-[9px]"
            style={{ fontWeight: isActive ? '800' : '600' }}
          >
            {item.label}
          </span>
        </motion.button>
      );
    } else {
      // PC Vertical Tabs
      return (
        <button
          key={item.id}
          className={cn(
            'flex flex-col items-center justify-center gap-1 py-4 relative',
            isActive
              ? 'bg-background text-primary border-l-3 border-primary'
              : 'text-foreground hover:bg-muted/20 border-l-3 border-transparent'
          )}
          style={{
            borderLeftColor: isActive ? 'var(--primary)' : 'transparent',
          }}
          onClick={() => onSelectNav(item.id)}
        >
          <item.icon size={24} className="w-6 h-6" />
          <span className="text-[11px] font-semibold">
            {item.label}
          </span>
          {item.notifications && item.notifications > 0 && (
            <CisUnreadBadge count={item.notifications} size="sm" className="absolute top-2 right-2" />
          )}
        </button>
      );
    }
  };

  if (isMobile) {
    return (
      <AnimatePresence>
        {!hide && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'flex flex-row justify-around px-1 py-1',
              className
            )}
            style={{ backgroundColor: 'var(--background)' }}
            {...rest}
          >
            {navigationItems.slice(0, 3).map(renderTabButton)} {/* Only Chat, GP, Items for mobile bottom nav */}
          </motion.div>
        )}
      </AnimatePresence>
    );
  } else {
    // PC View
    return (
      <div
        className={cn(
          'hidden lg:flex h-full shrink-0 flex-col py-4',
          className
        )}
        style={{
          width: '80px',
          backgroundColor: 'var(--background)',
          borderRight: '1px solid rgba(var(--border-rgb), 0.1)',
        }}
        {...rest}
      >
        {/* Placeholder for User Avatar/Profile in PC Nav if needed */}
        {/* <div className="flex flex-col items-center justify-center py-4 mb-4">
          <Avatar fallback="U" size="md" />
        </div> */}
        {navigationItems.map(renderTabButton)}
      </div>
    );
  }
};

export default NavigationTabs;
