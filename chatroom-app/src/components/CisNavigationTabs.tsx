import React from 'react';

const CisNavigationTabs: React.FC = () => {
  return (
    <div className="w-20 h-[800px] bg-cardBackground border-r border-border flex flex-col items-center gap-6 p-4">
      <div className="w-12 h-12 rounded-full bg-primary" />
      <div className="w-12 h-12 rounded-full bg-muted" />
      <div className="w-12 h-12 rounded-full bg-muted" />
    </div>
  );
};

export default CisNavigationTabs;
