import React from 'react';
import { cn } from '../../lib/utils';
import CisMemberLevelBadge from './CisMemberLevelBadge';
import VerifiedBadge from './VerifiedBadge';
import { MemberLevel } from '../../types/chat';

interface CombinedBadgesProps extends React.HTMLAttributes<HTMLDivElement> {
  memberLevel?: MemberLevel;
  customLevelName?: string;
  isVerified?: boolean;
  size?: 'sm' | 'md'; // Passed to MemberLevelBadge
  spacing?: 'tight' | 'normal';
}

const CombinedBadges: React.FC<CombinedBadgesProps> = ({
  memberLevel,
  customLevelName,
  isVerified,
  size = 'md',
  spacing = 'normal',
  className,
  ...
}) => {
  const gapClass = spacing === 'tight' ? 'gap-1' : 'gap-2';

  return (
    <div className={cn('flex items-center', gapClass, className)} {...rest}>
      {memberLevel && memberLevel.level > 0 && (
        <CisMemberLevelBadge
          memberLevel={memberLevel}
          customLevelName={customLevelName}
          size={size}
        />
      )}
      {isVerified && (
        <VerifiedBadge size={size === 'sm' ? 12 : 14} />
      )}
    </div>
  );
};

export default CombinedBadges;
