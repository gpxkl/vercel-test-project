import React from 'react';

const TabBar: React.FC = () => {
  return (
    <div className="flex items-center h-11 px-4 py-2 gap-2">
      <div className="flex items-center justify-center px-4 py-[6px] rounded-[20px] bg-[#3B82F6]">
        <span className="text-[13px] font-semibold text-white">推薦</span>
      </div>
      <div className="flex items-center justify-center px-4 py-[6px] rounded-[20px] bg-[#F3F4F6]">
        <span className="text-[13px] text-[#6B7280]">關注</span>
      </div>
      <div className="flex items-center justify-center px-4 py-[6px] rounded-[20px] bg-[#F3F4F6]">
        <span className="text-[13px] text-[#6B7280]">最新</span>
      </div>
    </div>
  );
};

export default TabBar;
