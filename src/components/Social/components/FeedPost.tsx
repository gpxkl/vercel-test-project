import React from 'react';
import { Share, Image as ImageIcon } from 'lucide-react';

interface FeedPostProps {
  avatarColor: string;
  userName: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  postType: 'code' | 'image';
  code?: { line1: string; line2: string; line3: string; };
}

const FeedPost: React.FC<FeedPostProps> = ({ avatarColor, userName, timeAgo, content, likes, comments, postType, code }) => {
  return (
    <div className="flex flex-col p-4 gap-3 bg-[#FFFFFF] rounded-2xl border border-[#D1CFC9]">
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-full ${avatarColor}`} />
        <span className="text-sm font-semibold text-[#1A1A1A]">{userName}</span>
        <div className="flex-1" />
        <span className="text-xs text-[#6B7280]">{timeAgo}</span>
      </div>
      <p className="text-sm text-[#1A1A1A]">{content}</p>
      {
        postType === 'code' && code && (
          <div className="flex flex-col p-3 rounded-lg bg-[#1E293B]">
            <span className="font-mono text-xs text-[#E2E8F0]">{code.line1}</span>
            <span className="font-mono text-xs text-[#A5F3FC]">{code.line2}</span>
            <span className="font-mono text-xs text-[#A5F3FC]">{code.line3}</span>
          </div>
        )
      }
      {
        postType === 'image' && (
          <div className="flex items-center justify-center w-full h-40 rounded-xl bg-[#F3F4F6]">
            <ImageIcon size={32} className="text-[#D1CFC9]" />
          </div>
        )
      }
      <div className="flex items-center gap-4">
        <span className="text-xs text-[#6B7280]">❤️ {likes}</span>
        <span className="text-xs text-[#6B7280]">💬 {comments}</span>
        <Share size={14} className="text-[#6B7280]" />
      </div>
    </div>
  );
};

export default FeedPost;
