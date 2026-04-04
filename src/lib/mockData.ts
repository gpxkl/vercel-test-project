import { Chat, MemberLevel, ChatCategory } from '../types/chat';

const mockMemberLevel: MemberLevel = { level: 80, name: '黄金会员' };

export const mockFriendChats: Chat[] = [
  {
    id: 'dm-1',
    type: 'dm',
    name: '阿杰',
    lastMessage: '晚点见！',
    timestamp: '18:15',
    unreadCount: 1,
    isPinned: true,
    user: {
      id: 'user-1',
      name: '阿杰',
      avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      isOnline: true,
      memberLevel: mockMemberLevel,
      isVerified: true,
    },
  },
  {
    id: 'dm-2',
    type: 'dm',
    name: '小美',
    lastMessage: '好的，谢谢！',
    timestamp: '昨天',
    unreadCount: 0,
    isPinned: false,
    user: {
      id: 'user-2',
      name: '小美',
      avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
      isOnline: false,
      memberLevel: { level: 25, name: '白银会员' },
      isVerified: false,
    },
  },
  {
    id: 'dm-3',
    type: 'dm',
    name: '訪客',
    lastMessage: '你好！',
    timestamp: '前天',
    unreadCount: 0,
    isPinned: false,
    user: {
      id: 'user-3',
      name: '訪客',
      avatarUrl: '',
      isOnline: false,
    },
  },
];

export const mockGroupChats: Chat[] = [
  {
    id: 'group-1',
    type: 'group',
    name: '开发群',
    lastMessage: '请大家看下PR',
    timestamp: '昨天',
    unreadCount: 3,
    isPinned: false,
    group: {
      memberCount: 25,
      isVoiceActive: true,
    },
  },
  {
    id: 'group-2',
    type: 'group',
    name: '项目组',
    lastMessage: '会议纪要已发送',
    timestamp: '09:30',
    unreadCount: 0,
    isPinned: false,
    group: {
      memberCount: 10,
      isVoiceActive: false,
    },
  },
];

export const mockServerChannels: Chat[] = [
  {
    id: 'server-channel-1',
    type: 'server_channel',
    name: '#general',
    lastMessage: '欢迎新成员！',
    timestamp: '16:00',
    unreadCount: 5,
    isPinned: false,
    serverChannel: {
      serverId: 'server-1',
      serverName: '社区服务器',
      serverIconUrl: 'https://via.placeholder.com/48/2B7D8E/FFFFFF?text=CS',
      memberCount: 150,
      isVerified: true,
    },
  },
  {
    id: 'server-channel-2',
    type: 'server_channel',
    name: '#voice-chat',
    lastMessage: '正在语音聊天',
    timestamp: '14:00',
    unreadCount: 0,
    isPinned: false,
    serverChannel: {
      serverId: 'server-1',
      serverName: '社区服务器',
      serverIconUrl: 'https://via.placeholder.com/48/2B7D8E/FFFFFF?text=CS',
      memberCount: 30,
      isVerified: false,
    },
  },
];

export const getPresenceColor = (isOnline?: boolean) => {
  return isOnline ? 'bg-cis-online' : 'bg-muted'; // Use muted for offline/unknown
};

export const getBadgeColor = (type: ChatCategory) => {
  switch (type) {
    case 'all':
      return 'bg-primary text-white';
    case 'friends':
      return 'bg-blue-500 text-white';
    case 'gp':
      return 'bg-purple-500 text-white';
    case 'server_channel':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};
