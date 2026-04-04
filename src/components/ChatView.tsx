import React, { useState, useMemo } from 'react';
import { Plus, Users, UserPlus, Server, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';
import TabSwitcher from './TabSwitcher';
import ChatList from './ChatList';
import { Chat, ExtendedChatCategory, QuickActionGroup, QuickActionOption } from '../../types/chat';
import { mockFriendChats, mockGroupChats, mockServerChannels } from '../../lib/mockData';

// Modal imports
import CreateGroupModal from './Modals/CreateGroupModal';
import CreateServerModal from './Modals/CreateServerModal';
import JoinServerModal from './Modals/JoinServerModal';

interface ChatViewProps extends React.HTMLAttributes<HTMLDivElement> {
  searchQuery: string;
  onChatSelect: (chat: Chat) => void;
  onScroll: () => void;
  onToggleCollapse: () => void;
  onCategoryChange: (category: ExtendedChatCategory) => void;
  onAddFriend: () => void; // Not directly used in FAB, but as a prop
}

const ChatView: React.FC<ChatViewProps> = ({
  searchQuery,
  onChatSelect,
  onScroll,
  onToggleCollapse,
  onCategoryChange: propOnCategoryChange,
  onAddFriend,
  className,
  ...
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ExtendedChatCategory>('all');
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showCreateServerModal, setShowCreateServerModal] = useState(false);
  const [showJoinServerModal, setShowJoinServerModal] = useState(false);
  const [allChats, setAllChats] = useState<Chat[]>([...mockFriendChats, ...mockGroupChats, ...mockServerChannels]);

  const handleCategoryChange = (category: ExtendedChatCategory) => {
    setSelectedCategory(category);
    propOnCategoryChange(category); // Pass up to parent if needed
  };

  const handlePinChat = (chatId: string) => {
    setAllChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat
      )
    );
    toast.success('聊天置顶状态已更新');
  };

  const handleReadChat = (chatId: string) => {
    setAllChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId ? { ...chat, unreadCount: 0, hasMention: false } : chat
      )
    );
    toast.success('聊天已标记为已读');
  };

  const handleDeleteChat = (chatId: string) => {
    setAllChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    toast.info('聊天已删除');
  };

  const filteredChats = useMemo(() => {
    let chats = allChats;

    if (searchQuery) {
      chats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (selectedCategory) {
      case 'all':
        return chats;
      case 'friends':
        return chats.filter(chat => chat.type === 'dm');
      case 'group':
        return chats.filter(chat => chat.type === 'group');
      case 'gp': // SDD mentions 'gp' for community/server channels
      case 'server_channel':
        return chats.filter(chat => chat.type === 'server_channel');
      default:
        return chats;
    }
  }, [allChats, searchQuery, selectedCategory]);

  // Quick Action Menu Options
  const quickActionGroups: QuickActionGroup[] = [
    {
      title: '好友功能',
      options: [
        {
          id: 'create-dm',
          label: '创建私讯',
          description: '与好友开始一对一聊天',
          icon: Plus,
          bgColor: 'rgba(var(--primary),0.12)',
          iconColor: 'var(--primary)',
          onClick: () => { /* TODO: Implement create DM logic */ toast.info('创建私讯功能待实现'); setShowCreateMenu(false); },
        },
        {
          id: 'create-group',
          label: '创建群组',
          description: '邀请多位好友一起聊天',
          icon: Users,
          bgColor: 'rgba(var(--cis-green),0.12)',
          iconColor: 'var(--cis-green)',
          onClick: () => { setShowCreateGroupModal(true); setShowCreateMenu(false); },
        },
        {
          id: 'add-friend',
          label: '添加好友',
          description: '通过ID或扫码添加新朋友',
          icon: UserPlus,
          bgColor: 'rgba(var(--muted-foreground),0.12)',
          iconColor: 'var(--muted-foreground)',
          onClick: () => { onAddFriend(); setShowCreateMenu(false); },
        },
      ],
    },
    {
      title: '伺服器功能',
      options: [
        {
          id: 'create-server',
          label: '创建伺服器',
          description: '建立您的专属社群空间',
          icon: Server,
          bgColor: 'rgba(var(--cis-purple),0.12)',
          iconColor: 'var(--cis-purple)',
          onClick: () => { setShowCreateServerModal(true); setShowCreateMenu(false); },
        },
        {
          id: 'join-server',
          label: '加入伺服器',
          description: '输入邀请码加入现有伺服器',
          icon: LogIn,
          bgColor: 'rgba(var(--cis-blue),0.12)',
          iconColor: 'var(--cis-blue)',
          onClick: () => { setShowJoinServerModal(true); setShowCreateMenu(false); },
        },
      ],
    },
  ];

  const tabCategories = [
    { id: 'all', label: '全部', notifications: allChats.length }, // Example, adjust logic for actual counts
    { id: 'friends', label: '个人/群组', notifications: allChats.filter(c => c.type === 'dm' || c.type === 'group').length },
    { id: 'gp', label: '社群', notifications: allChats.filter(c => c.type === 'server_channel').length },
  ];

  return (
    <div className={cn('h-full flex flex-col', className)} {...rest}>
      <TabSwitcher
        categories={tabCategories}
        activeCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        centered={false} // Adjust based on SDD, default to false
      />

      <ChatList
        chats={filteredChats}
        category={selectedCategory}
        onChatClick={onChatSelect}
        onPinChat={handlePinChat}
        onReadChat={handleReadChat}
        onDeleteChat={handleDeleteChat}
      />

      {/* FAB and Quick Create Menu */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center z-20"
        onClick={() => setShowCreateMenu(!showCreateMenu)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        animate={{ rotate: showCreateMenu ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Plus size={24} className="text-white" />
      </motion.button>

      <AnimatePresence>
        {showCreateMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 bg-black bg-opacity-30"
            onClick={() => setShowCreateMenu(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCreateMenu && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-30 rounded-2xl shadow-2xl bg-background border border-border"
            style={{ minWidth: '280px', maxWidth: '320px', backdropFilter: 'blur(12px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b" style={{ backgroundColor: 'rgba(var(--muted-rgb), 0.05)' }}> {/* Need to add muted-rgb */} 
              <h3 className="text-[15px] font-bold text-foreground">快速操作</h3>
            </div>
            <div className="py-2">
              {quickActionGroups.map((group, groupIndex) => (
                <React.Fragment key={group.title}>
                  <div className="px-4 py-1 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {group.title}
                  </div>
                  {group.options.map((option) => (
                    <motion.button
                      key={option.id}
                      className="w-full px-4 py-3 flex items-start gap-3 text-left hover:bg-muted/50"
                      onClick={option.onClick}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: option.bgColor }}
                      >
                        <option.icon size={20} style={{ color: option.iconColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-semibold text-foreground mb-[2px]">
                          {option.label}
                        </div>
                        <div className="text-[13px] text-muted-foreground leading-snug truncate">
                          {option.description}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                  {groupIndex < quickActionGroups.length - 1 && (
                    <div className="my-2 mx-4 h-[1px] bg-border" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <CreateGroupModal
        isOpen={showCreateGroupModal}
        onClose={() => setShowCreateGroupModal(false)}
        onCreateGroup={(name) => { toast.success(`创建群组: ${name}`); setShowCreateGroupModal(false); }}
      />
      <CreateServerModal
        isOpen={showCreateServerModal}
        onClose={() => setShowCreateServerModal(false)}
        onCreateServer={(name) => { toast.success(`创建伺服器: ${name}`); setShowCreateServerModal(false); }}
      />
      <JoinServerModal
        isOpen={showJoinServerModal}
        onClose={() => setShowJoinServerModal(false)}
        onJoinServer={(code) => { toast.success(`加入伺服器: ${code}`); setShowJoinServerModal(false); }}
      />
    </div>
  );
};

export default ChatView;
