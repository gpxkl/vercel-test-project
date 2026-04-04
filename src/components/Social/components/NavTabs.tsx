import React from 'react';
import { Home, MessageCircle, Rss, User, Settings } from 'lucide-react';

const NavTabs: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col items-center py-4 gap-6 w-20 shrink-0 border-r border-[var(--border)] bg-[var(--background)]">
      <Home size={24} className="text-[var(--muted-foreground)]" />
      <MessageCircle size={24} className="text-[var(--muted-foreground)]" />
      <Rss size={24} className="text-[var(--primary)]" />
      <span className="text-[10px] text-[var(--primary)]">動態</span>
      <User size={24} className="text-[var(--muted-foreground)]" />
      <Settings size={24} className="text-[var(--muted-foreground)]" />
    </div>
  );
};

export default NavTabs;
