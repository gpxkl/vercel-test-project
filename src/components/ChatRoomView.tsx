import React from 'react';
import { Search, Menu, Camera, Smile, FileText, Play } from 'lucide-react';
import { cn } from '../lib/utils';
import { Chat } from '../types/chat';

interface ChatRoomViewProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedChat: Chat | null;
  selectedChatSubNavId: string | null;
}

const ChatRoomView: React.FC<ChatRoomViewProps> = ({ selectedChat, className, ...rest }) => {
  if (!selectedChat) {
    return (
      <div className={cn("flex-1 flex items-center justify-center h-full text-muted-foreground", className)} {...rest}>
        Select a chat to view messages
      </div>
    );
  }

  return (
    <div className={cn("flex-1 flex flex-col overflow-hidden", className)} style={{ backgroundColor: 'var(--background)' }} {...rest}>
      {/* Chat Header */}
      <div
        className="shrink-0 h-16 px-6 flex items-center justify-between border-b"
        style={{ borderColor: 'rgba(var(--border), 0.2)' }}
      >
        <h2 className="text-xl font-bold text-foreground">{selectedChat.name}</h2>
        <div className="flex items-center gap-4">
          <Search size={24} className="text-foreground/80" />
          <Menu size={24} className="text-foreground/80" />
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Example incoming message */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl">👤</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-2">
              <span className="font-semibold text-foreground">阿杰</span>
              <span className="text-xs text-muted-foreground">18:15</span>
            </div>
            <div
              className="px-4 py-3 rounded-xl rounded-tl-sm bg-white/70 backdrop-blur-md border"
              style={{ borderColor: 'rgba(var(--border), 0.1)' }}
            >
              <p className="text-sm text-foreground">关于最新的 UI 设计，大家都看过投票结果了吗？我们需要在这周定下来。</p>
            </div>
          </div>
        </div>

        {/* Example outgoing message */}
        <div className="flex items-end justify-end gap-3">
          <div className="flex flex-col gap-2 items-end">
            <span className="text-xs text-muted-foreground">18:20</span>
            <div className="px-4 py-3 rounded-xl rounded-br-sm bg-primary text-white">
              <p className="text-sm">刚刚开完会，我觉得投票的结果很符合预期，我们可以按这个方向推进。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input Area */}
      <div
        className="shrink-0 h-20 px-6 py-4 flex items-center gap-3 border-t"
        style={{ borderColor: 'rgba(var(--border), 0.1)' }}
      >
        <button className="w-11 h-11 rounded-full bg-white/70 flex items-center justify-center shadow-sm">
          <Camera size={20} className="text-primary" />
        </button>
        <div
          className="flex-1 h-11 rounded-full border bg-white/70 flex items-center px-4 gap-3"
          style={{ borderColor: 'var(--primary)' }}
        >
          <Smile size={20} className="text-primary" />
          <input
            type="text"
            placeholder="输入消息..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
          />
        </div>
        <button className="w-11 h-11 rounded-full bg-white/70 flex items-center justify-center shadow-sm border" style={{ borderColor: 'var(--primary)' }}>
          <FileText size={20} className="text-red-500" />
        </button>
        <button className="w-11 h-11 rounded-full bg-white/70 flex items-center justify-center shadow-sm border" style={{ borderColor: 'var(--primary)' }}>
          <Play size={20} className="text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default ChatRoomView;
