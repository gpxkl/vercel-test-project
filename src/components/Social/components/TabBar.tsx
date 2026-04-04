import React from 'react';

const TabBar: React.FC = () => {
  return (
    <div className="flex items-center h-11 px-4 gap-2">
      <div className="flex items-center justify-center px-4 py-1.5 rounded-full bg-[var(--primary)]">
        <span className="text-sm font-semibold text-white">推薦</span>
      </div>
      <div className="flex items-center justify-center px-4 py-1.5 rounded-full bg-[var(--tab-inactive-background)]">
        <span className="text-sm text-[var(--muted-foreground)]">關注</span>
      </div>
      <div className="flex items-center justify-center px-4 py-1.5 rounded-full bg-[var(--tab-inactive-background)]">
        <span className="text-sm text-[var(--muted-foreground)]">最新</span>
      </div>
    </div>
  );
};

export default TabBar;
