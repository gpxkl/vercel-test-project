import React from 'react';
import Badge from '../ui/badge';
import { cn } from '../../lib/utils';

interface CisUnreadBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
  size?: 'sm' | 'md'; // Based on SDD: min-w-[22px] / min-w-[28px]
}

const CisUnreadBadge: React.FC<CisUnreadBadgeProps> = ({
  count,
  size = 'md',
  className,
  ...
}) => {
  const displayCount = count > 99 ? '99+' : count;
  const minWidthClass = size === 'sm' ? 'min-w-[22px] h-[22px]' : 'min-w-[28px] h-7';
  const paddingClass = size === 'sm' ? 'px-1.5' : 'px-2.5';
  const fontSizeClass = size === 'sm' ? 'text-[10px]' : 'text-xs';

  if (count === 0) return null;

  return (
    <Badge
      variant="default"
      className={cn(
        'bg-cis-red text-white font-bold shadow-sm flex items-center justify-center',
        minWidthClass,
        paddingClass,
        fontSizeClass,
        size === 'sm' ? 'rounded-full' : 'rounded-full',
        className
      )}
      {...rest}
    >
      {displayCount}
    </Badge>
  );
};

export default CisUnreadBadge;
