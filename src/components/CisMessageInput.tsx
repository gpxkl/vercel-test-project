import React from 'react';

const CisMessageInput: React.FC = () => {
  return (
    <div className="w-full flex items-center gap-3 p-4">
      <div className="w-11 h-11 rounded-full bg-cisGlassWhite" />
      <div className="flex flex-grow h-11 bg-cisGlassWhite rounded-full border-[1.5px] border-border flex items-center gap-2 px-3">
        <div className="w-7 h-7 rounded-full bg-muted" />
        <input 
          type="text" 
          placeholder="Type a message..." 
          className="flex-grow bg-transparent text-mutedForeground text-textBase outline-none"
        />
      </div>
      <div className="w-11 h-11 rounded-full bg-primary" />
    </div>
  );
};

export default CisMessageInput;
