import React from 'react';
import CisProductCard from './CisProductCard';

interface CisMessageBubbleProps {
  sender: string;
  content: string;
  isMe?: boolean;
  avatarColor?: string;
  hasProductCard?: boolean;
}

const CisMessageBubble: React.FC<CisMessageBubbleProps> = ({
  sender, 
  content,
  isMe = false,
  avatarColor = 'bg-primary',
  hasProductCard = false,
}) => {
  const bubbleClasses = isMe 
    ? "bg-primary rounded-tl-[16px] rounded-tr-[2px] rounded-bl-[16px] rounded-br-[16px]"
    : "bg-cisGlassWhite rounded-tl-[16px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[2px] border border-cisBgMuted";
  const textClasses = isMe ? "text-primaryForeground" : "text-foreground";

  return (
    <div className={`w-full flex gap-3 p-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
      {!isMe && <div className={`w-10 h-10 rounded-full ${avatarColor}`} />}
      <div className={`flex flex-col gap-1.5 ${isMe ? 'items-end' : 'items-start'} flex-grow max-w-[80%]`}>
        <p className="text-mutedForeground text-textLabel font-semibold">{sender}</p>
        <div className={`py-3 px-4 flex flex-col gap-2 ${bubbleClasses}`}>
          <p className={`${textClasses} text-textBase w-[300px]`}>{content}</p>
          {hasProductCard && <CisProductCard />}
        </div>
      </div>
      {isMe && <div className={`w-10 h-10 rounded-full ${avatarColor}`} />}
    </div>
  );
};

export default CisMessageBubble;
