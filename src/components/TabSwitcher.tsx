import React from 'react';
import { Bell } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ExtendedChatCategory } from '../../types/chat';

interface TabSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: {
    id: ExtendedChatCategory;
    label: string;
    notifications?: number;
  }[];
  activeCategory: ExtendedChatCategory;
  onCategoryChange: (category: ExtendedChatCategory) => void;
  centered?: boolean;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  centered = false,
  className,
  ...
}) => {
  return (
    <div
      className={cn(
        'flex-shrink-0 px-4 py-2 border-b shadow-sm',
        className
      )}
      style={{
        backgroundColor: 'white',
        borderBottomColor: 'rgba(var(--border-rgb), 0.1)', // Assuming --border-rgb is defined or using a direct color
      }}
      {...rest}
    >
      <div
        className={cn(
          'flex items-center gap-2',
          centered ? 'justify-center' : 'justify-start'
        )}
      >
        {categories.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'bg-transparent text-foreground hover:bg-muted'
              )}
            >
              <span
                className="text-[var(--text-label)]"
                style={{
                  fontWeight: isActive
                    ? 'var(--font-weight-bold)'
                    : 'var(--font-weight-semibold)',
                  lineHeight: '1.2',
                }}
              >
                {category.label}
              </span>
              {category.notifications && category.notifications > 0 && (
                <span
                  className={cn(
                    'px-1.5 py-0.5 rounded-full text-[10px] font-bold',
                    isActive
                      ? 'bg-white text-primary'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {category.notifications > 99 ? '99+' : category.notifications}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabSwitcher;
