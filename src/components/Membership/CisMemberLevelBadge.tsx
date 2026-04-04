import React from 'react';
import { cn } from '../../lib/utils';
import { MemberLevel } from '../../types/chat';

interface CisMemberLevelBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  memberLevel: MemberLevel;
  customLevelName?: string;
  size?: 'sm' | 'md'; // Based on SDD: sm has padding 2px 6px, fontSize 10px
}

const CisMemberLevelBadge: React.FC<CisMemberLevelBadgeProps> = ({
  memberLevel,
  customLevelName,
  size = 'md',
  className,
  ...
}) => {
  if (!memberLevel || !memberLevel.level) return null;

  const levelText = customLevelName || `LV.${memberLevel.level}`;

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-1 text-xs',
  };

  // Example colors for different levels - customize as needed
  const getLevelColors = (level: number) => {
    if (level >= 80) return 'bg-yellow-400 text-yellow-900'; // Gold
    if (level >= 50) return 'bg-gray-300 text-gray-800'; // Silver
    if (level >= 20) return 'bg-amber-300 text-amber-900'; // Bronze
    return 'bg-blue-300 text-blue-900'; // Default
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-semibold',
        getLevelColors(memberLevel.level),
        sizeClasses[size],
        className
      )}
      {...rest}
    >
      {memberLevel.name === '黄金会员' ? '👑' : ''} {levelText}
    </span>
  );
};

export default CisMemberLevelBadge;
