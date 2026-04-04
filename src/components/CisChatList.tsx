import React from 'react';

const CisChatList: React.FC = () => {
  return (
    <div className="w-[420px] h-[800px] bg-background border-r border-border flex flex-col">
      <div className="w-full h-16 px-4 flex items-center">
        <h3 className="text-foreground text-textH3 font-bold w-[300px]">Messages</h3>
      </div>
      <div className="w-full p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary" />
        <div className="flex flex-col flex-grow">
          <p className="text-foreground text-textBase font-semibold">General Chat</p>
          <p className="text-mutedForeground text-textLabel">Hello there!</p>
        </div>
      </div>
    </div>
  );
};

export default CisChatList;
