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
  imageAlt?: string;
}

const FeedPost: React.FC<FeedPostProps> = ({ avatarColor, userName, timeAgo, content, likes, comments, postType, code, imageAlt }) => {
  return (
    <div className="flex flex-col p-4 gap-3 bg-[var(--card)] rounded-2xl border border-[var(--border)]">
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-full ${avatarColor}`} />
        <span className="text-sm font-semibold text-[var(--foreground)]">{userName}</span>
        <div className="flex-1" />
        <span className="text-xs text-[var(--muted-foreground)]">{timeAgo}</span>
      </div>
      <p className="text-sm text-[var(--foreground)]">{content}</p>
      {
        postType === 'code' && code && (
          <div className="flex flex-col p-3 rounded-lg bg-[var(--code-background)]">
            <span className="font-mono text-xs text-[var(--code-foreground)]">{code.line1}</span>
            <span className="font-mono text-xs text-[var(--code-highlight)]">{code.line2}</span>
            <span className="font-mono text-xs text-[var(--code-highlight)]">{code.line3}</span>
          </div>
        )
      }
      {
        postType === 'image' && (
          <div className="flex items-center justify-center w-full h-40 rounded-xl bg-[var(--tab-inactive-background)]">
            <ImageIcon size={32} className="text-[var(--border)]" />
          </div>
        )
      }
      <div className="flex items-center gap-4">
        <span className="text-xs text-[var(--muted-foreground)]">❤️ {likes}</span>
        <span className="text-xs text-[var(--muted-foreground)]">💬 {comments}</span>
        <Share size={14} className="text-[var(--muted-foreground)]" />
      </div>
    </div>
  );
};

export default FeedPost;
