import React from 'react';
import { PlusCircle, Search, Bell, Bookmark } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-4 gap-5 w-[60px] shrink-0 rounded-tr-3xl rounded-br-3xl bg-[var(--background)] backdrop-blur-xl shadow-lg">
      <PlusCircle size={24} className="text-[var(--muted-foreground)]" />
      <Search size={24} className="text-[var(--muted-foreground)]" />
      <Bell size={24} className="text-[var(--muted-foreground)]" />
      <Bookmark size={24} className="text-[var(--muted-foreground)]" />
    </div>
  );
};

export default Sidebar;
