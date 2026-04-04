import React from 'react';
import { Image } from 'lucide-react';

const CisProductCard: React.FC = () => {
  return (
    <div className="w-[280px] bg-background rounded-radiusXl border border-border flex flex-col overflow-hidden">
      <div className="w-full h-40 bg-cisBgMuted flex items-center justify-center">
        <Image className="w-12 h-12 text-mutedForeground" />
      </div>
      <div className="w-full p-4 flex flex-col gap-2">
        <p className="text-foreground text-textH4 font-bold">Gaming Keyboard</p>
        <p className="text-secondary text-textH4 font-bold">$129.99</p>
        <div className="w-full h-10 bg-primary rounded-md flex items-center justify-center">
          <p className="text-primaryForeground text-textBase font-semibold">Add to Cart</p>
        </div>
      </div>
    </div>
  );
};

export default CisProductCard;
