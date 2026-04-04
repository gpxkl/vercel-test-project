import React from 'react';
import { PlusCircle, Search, Bell, Bookmark } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-full py-4 gap-5 w-[60px] shrink-0 rounded-tr-3xl rounded-br-3xl bg-[#ECE9E2CC]">
      <PlusCircle size={24} className="text-[#6B7280]" />
      <Search size={24} className="text-[#6B7280]" />
      <Bell size={24} className="text-[#6B7280]" />
      <Bookmark size={24} className="text-[#6B7280]" />
    </div>
  );
};

export default Sidebar;
