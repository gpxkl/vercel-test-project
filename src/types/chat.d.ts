// src/types/chat.d.ts

export type ChatCategory = 'all' | 'friends' | 'gp' | 'server_channel';
export type ExtendedChatCategory = ChatCategory | 'group';

export interface MemberLevel {
  level: number;
  name: string;
}

export interface Chat {
  id: string;
  type: 'dm' | 'group' | 'server_channel';
  name: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  isPinned?: boolean;
  hasMention?: boolean;
  hasReply?: boolean;
  // DM specific
  user?: {
    id: string;
    name: string;
    avatarUrl?: string;
    isOnline?: boolean;
    memberLevel?: MemberLevel;
    isVerified?: boolean;
  };
  // Group specific
  group?: {
    memberCount?: number;
    isVoiceActive?: boolean;
  };
  // Server Channel specific
  serverChannel?: {
    serverId: string;
    serverName: string;
    serverIconUrl?: string;
    memberCount?: number;
    isVerified?: boolean;
  };
}

export interface NavigationTabItem {
  id: string;
  icon: React.ElementType;
  label: string;
  notifications?: number;
}

export interface QuickActionOption {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  bgColor: string;
  iconColor: string;
  onClick: () => void;
}

export interface QuickActionGroup {
  title: string;
  options: QuickActionOption[];
}
