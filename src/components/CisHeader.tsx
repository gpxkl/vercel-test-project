import React from 'react';
import { Search, Settings } from 'lucide-react';

const CisHeader: React.FC = () => {
  return (
    <div className="w-full h-16 bg-cisGlassWhite backdrop-blur-md border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary" />
        <div className="flex flex-col">
          <p className="text-foreground text-textBase font-bold w-[200px]">General Chat</p>
          <p className="text-cisGreen text-textLabel w-[200px]">12 online</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Search className="w-6 h-6 text-foreground" />
        <Settings className="w-6 h-6 text-foreground" />
      </div>
    </div>
  );
};

export default CisHeader;
