import React from 'react';

const TopBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between h-[92px] px-6 border-b border-[var(--border)] bg-[var(--background)] z-20">
      <span className="text-sm font-bold text-[var(--foreground)]">LV80</span>
      <div className="flex-1" />
      <span className="text-sm font-bold text-[var(--foreground)]">GP200</span>
      <div className="flex-1" />
      <span className="text-sm font-bold text-[var(--foreground)]">EXP</span>
    </div>
  );
};

export default TopBar;
