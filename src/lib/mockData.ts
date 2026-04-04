// project/src/lib/mockData.ts

export interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  avatarColor: string;
}

export interface FeedPost {
  id: string;
  author: {
    name: string;
    avatarColor: string;
  };
  time: string;
  content: string;
  type: 'text' | 'image' | 'code';
  media?: string; // For image URL or code content
  likes: number;
  comments: number;
  shares: number;
}

export const mockChatItems: ChatItem[] = [
  {
    id: '1',
    name: '用戶A',
    lastMessage: '最近在做什麼項目？',
    avatarColor: '#D1CFC9',
  },
  {
    id: '2',
    name: '用戶B',
    lastMessage: '明天一起吃飯嗎？',
    avatarColor: '#D1CFC9',
  },
  {
    id: '3',
    name: '用戶C',
    lastMessage: '已收到，謝謝！',
    avatarColor: '#D1CFC9',
  },
];

export const mockFeedPosts: FeedPost[] = [
  {
    id: 'post1',
    author: {
      name: 'Tech達人',
      avatarColor: '#3B82F6',
    },
    time: '3h',
    content: '分享一個超棒的 TypeScript 技巧，讓你的代碼更加簡潔高效！',
    type: 'code',
    media: `const result = items
  .filter(Boolean)
  .map(transform);`,
    likes: 456,
    comments: 78,
    shares: 23,
  },
  {
    id: 'post2',
    author: {
      name: '美食博主',
      avatarColor: '#F59E0B',
    },
    time: '5h',
    content: '週末美食推薦！這家餐廳的牛排真的太好吃了，強烈推薦給大家～',
    type: 'image',
    media: 'https://via.placeholder.com/300x200?text=Food+Image', // Placeholder image
    likes: 234,
    comments: 45,
    shares: 12,
  },
  {
    id: 'post3',
    author: {
      name: '健身教練',
      avatarColor: '#10B981',
    },
    time: '1d',
    content: '今天的訓練課表，挑戰你的極限！',
    type: 'text',
    likes: 180,
    comments: 30,
    shares: 8,
  },
  {
    id: 'post4',
    author: {
      name: '旅行玩家',
      avatarColor: '#EF4444',
    },
    time: '2d',
    content: '美到窒息的自然風光，下次一定要再來！',
    type: 'image',
    media: 'https://via.placeholder.com/300x200?text=Travel+Image', // Placeholder image
    likes: 520,
    comments: 90,
    shares: 40,
  },
];
