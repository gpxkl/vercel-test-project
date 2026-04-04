import React from 'react';

const ContentHeader: React.FC = () => {
  return (
    <div className="flex items-center h-14 px-6 border-b border-[var(--border)]">
      <span className="text-lg font-bold text-[var(--foreground)]">社交動態</span>
    </div>
  );
};

export default ContentHeader;
