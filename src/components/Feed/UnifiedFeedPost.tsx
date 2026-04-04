// project/src/components/Feed/UnifiedFeedPost.tsx
import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share2, MoreHorizontal } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { FeedPost } from '../../lib/mockData';

interface UnifiedFeedPostProps {
  post: FeedPost;
}

const UnifiedFeedPost: React.FC<UnifiedFeedPostProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [localReposts, setLocalReposts] = useState(post.shares);

  const handleLike = () => {
    setLiked(!liked);
    setLocalLikes(liked ? localLikes - 1 : localLikes + 1);
  };

  const handleRepost = () => {
    setReposted(!reposted);
    setLocalReposts(reposted ? localReposts - 1 : localReposts + 1);
  };

  return (
    <div className="flex gap-4 pr-4 py-4 pl-2 border border-border transition-colors hover:bg-muted/10 bg-card rounded-xl shadow-sm">
      <div className="flex flex-col items-center gap-2 shrink-0 -ml-1">
        <Avatar size="md" color={post.author.avatarColor} />
        <div className="w-0.5 flex-1 rounded-full my-1 opacity-50 bg-border"></div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-semibold text-foreground">{post.author.name}</h4>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{post.time}</span>
            <MoreHorizontal size={20} className="text-foreground" />
          </div>
        </div>
        <p className="mb-3 text-sm text-foreground whitespace-pre-wrap leading-relaxed">{post.content}</p>
        {post.type === 'code' && (
          <div className="bg-gray-900 rounded-lg p-3 mb-3 text-xs font-mono text-white">
            <pre className="whitespace-pre-wrap">{post.media}</pre>
          </div>
        )}
        {post.type === 'image' && (
          <div className="mb-3 rounded-lg overflow-hidden shadow-sm border border-border/20 cursor-pointer">
            <img src={post.media} alt="Post image" className="w-full h-auto max-h-[400px] object-cover" />
          </div>
        )}
        <div className="flex items-center gap-6 -ml-2 mb-3 text-muted-foreground text-sm">
          <button onClick={handleLike} className={`flex items-center gap-1 hover:text-destructive ${liked ? 'text-destructive' : ''}`}>
            <Heart size={22} strokeWidth={1.5} fill={liked ? 'currentColor' : 'none'} /> {localLikes}
          </button>
          <button className="flex items-center gap-1 hover:text-primary">
            <MessageCircle size={22} strokeWidth={1.5} /> {post.comments}
          </button>
          <button onClick={handleRepost} className={`flex items-center gap-1 hover:text-secondary ${reposted ? 'text-secondary' : ''}`}>
            <Repeat2 size={22} strokeWidth={1.5} /> {localReposts}
          </button>
          <button className="ml-auto hover:text-primary">
            <Share2 size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnifiedFeedPost;
