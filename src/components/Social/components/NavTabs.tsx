import React from 'react';
import { Home, MessageCircle, Rss, User, Settings } from 'lucide-react';

const NavTabs: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-full py-4 gap-6 w-20 shrink-0 border-r border-[#D1CFC9]">
      <Home size={24} className="text-[#6B7280]" />
      <MessageCircle size={24} className="text-[#6B7280]" />
      <Rss size={24} className="text-[#3B82F6]" />
      <span className="text-[10px] text-[#3B82F6]">動態</span>
      <User size={24} className="text-[#6B7280]" />
      <Settings size={24} className="text-[#6B7280]" />
    </div>
  );
};

export default NavTabs;
