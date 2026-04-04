import React from 'react';
import { Search, Users, Bell, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MemberLevel } from '../../types/chat';

interface TopBarV1Props extends React.HTMLAttributes<HTMLDivElement> {
  memberLevel: MemberLevel;
  gpAmount: number;
  userName: string;
  notifications: number;
  expProgress: number; // 0-1 range
}

const TopBarV1: React.FC<TopBarV1Props> = ({
  memberLevel,
  gpAmount,
  userName,
  notifications,
  expProgress,
  className,
  ...rest
}) => {
  const expPercentage = Math.round(expProgress * 100);

  return (
    <div
      className={cn(
        'hidden lg:block shrink-0 w-full px-3 pt-3 pb-3',
        className
      )}
      style={{
        backgroundColor: 'var(--background)',
        borderBottom: '1px solid rgba(var(--border-rgb), 0.1)',
      }}
      {...rest}
    >
      {/* First Row: Member Badge, Icons */}
      <div className="flex items-center justify-between mb-3">
        {/* Member Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-yellow-400 text-yellow-900 px-2 py-1 text-xs font-semibold">
            👑 {memberLevel.name} LV.{memberLevel.level}
          </span>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <Search size={20} className="text-foreground cursor-pointer" />
          <Users size={20} className="text-foreground cursor-pointer" />
          <div className="relative">
            <Bell size={20} className="text-foreground cursor-pointer" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[8px] text-white font-bold"></span>
            )}
          </div>
          <Settings size={20} className="text-foreground cursor-pointer" />
        </div>
      </div>

      {/* Second Row: GP Coin, EXP Progress */}
      <div className="flex items-end gap-3 px-0.5">
        {/* GP Coin Display */}
        <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
          <span>💰</span>
          <span>{gpAmount.toLocaleString()}</span>
        </div>

        {/* EXP Progress Bar */}
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden relative">
          <div
            className="absolute inset-y-0 left-0 bg-primary rounded-full"
            style={{ width: `${expPercentage}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white leading-none">
            EXP {Math.round(memberLevel.level * 1000 * expProgress)} / {memberLevel.level * 1000}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBarV1;
