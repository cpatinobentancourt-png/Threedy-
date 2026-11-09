import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  Post, 
  Story, 
  Reel, 
  ChatConversation, 
  NotificationItem, 
  TribeCommunity, 
  ArchetypeId 
} from '../types';
import { 
  INITIAL_USER, 
  INITIAL_POSTS, 
  INITIAL_STORIES, 
  INITIAL_REELS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_TRIBES 
} from '../data/mockData';

interface SocialContextType {
  user: UserProfile;
  updateUser: (updated: Partial<UserProfile>) => void;
  posts: Post[];
  toggleLikePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  toggleRepost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  createPost: (newPost: Omit<Post, 'id' | 'timestamp' | 'likes' | 'reposts' | 'commentsCount' | 'isLiked' | 'isReposted' | 'isSaved' | 'comments'>) => void;
  votePoll: (postId: string, optionIndex: number) => void;
  stories: Story[];
  viewStory: (storyId: string) => void;
  reels: Reel[];
  toggleLikeReel: (reelId: string) => void;
  conversations: ChatConversation[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  sendMessage: (chatId: string, text: string, isAudio?: boolean, audioDuration?: string) => void;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markAllNotificationsAsRead: () => void;
  addCustomNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  tribes: TribeCommunity[];
  toggleJoinTribe: (tribeId: string) => void;
  activeFilter: 'all' | 'threads' | 'media' | 'polls';
  setActiveFilter: (filter: 'all' | 'threads' | 'media' | 'polls') => void;
  selectedArchetypeFilter: ArchetypeId | 'all';
  setSelectedArchetypeFilter: (id: ArchetypeId | 'all') => void;
  activeStoryIndex: number | null;
  setActiveStoryIndex: (index: number | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: (open: boolean) => void;
  isThreedyStudioOpen: boolean;
  setIsThreedyStudioOpen: (open: boolean) => void;
  activeTab: 'feed' | 'tribes' | 'watch' | 'messages' | 'profile';
  setActiveTab: (tab: 'feed' | 'tribes' | 'watch' | 'messages' | 'profile') => void;
  toastNotification: NotificationItem | null;
  dismissToast: () => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [reels, setReels] = useState<Reel[]>(INITIAL_REELS);
  const [conversations, setConversations] = useState<ChatConversation[]>(INITIAL_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [tribes, setTribes] = useState<TribeCommunity[]>(INITIAL_TRIBES);
  
  // Navigation & filters
  const [activeTab, setActiveTab] = useState<'feed' | 'tribes' | 'watch' | 'messages' | 'profile'>('feed');
  const [activeFilter, setActiveFilter] = useState<'all' | 'threads' | 'media' | 'polls'>('all');
  const [selectedArchetypeFilter, setSelectedArchetypeFilter] = useState<ArchetypeId | 'all'>('all');
  
  // Modals & Sheets
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isThreedyStudioOpen, setIsThreedyStudioOpen] = useState(false);
  
  // Live simulated toast
  const [toastNotification, setToastNotification] = useState<NotificationItem | null>(null);

  // Periodic simulation of real-time incoming social activity
  useEffect(() => {
    const timer = setInterval(() => {
      const simulatedActions: Array<Omit<NotificationItem, 'id' | 'timestamp' | 'read'>> = [
        {
          type: 'like',
          actor: {
            name: 'Clara Lindqvist',
            handle: 'clara_minimal',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
            archetypeId: 'minimalist'
          },
          targetContent: 'le dio Me Gusta a tu publicación'
        },
        {
          type: 'mention',
          actor: {
            name: 'Malik Vance',
            handle: 'malik_drips',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
            archetypeId: 'streetwear'
          },
          targetContent: 'te etiquetó en un look de la tribu urbana'
        },
        {
          type: 'chat',
          actor: {
            name: 'Valeria Chen',
            handle: 'val_cyber',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
            archetypeId: 'tech_cyber'
          },
          targetContent: 'te envió un nuevo mensaje directo'
        }
      ];

      const chosen = simulatedActions[Math.floor(Math.random() * simulatedActions.length)];
      const newNotif: NotificationItem = {
        id: `sim_${Date.now()}`,
        type: chosen.type,
        actor: chosen.actor,
        targetContent: chosen.targetContent,
        timestamp: 'Ahora mismo',
        read: false
      };

      setNotifications(prev => [newNotif, ...prev]);
      setToastNotification(newNotif);

      // Auto dismiss toast after 5s
      setTimeout(() => {
        setToastNotification(prev => (prev?.id === newNotif.id ? null : prev));
      }, 5000);

    }, 35000); // Trigger every 35s

    return () => clearInterval(timer);
  }, []);

  const updateUser = (updated: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updated }));
  };

  const toggleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  const toggleSavePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isSaved: !p.isSaved
        };
      }
      return p;
    }));
  };

  const toggleRepost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isReposted: !p.isReposted,
          reposts: p.isReposted ? p.reposts - 1 : p.reposts + 1
        };
      }
      return p;
    }));
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: `comment_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      userHandle: user.handle,
      content: text.trim(),
      timestamp: 'Ahora mismo',
      likes: 0
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [newComment, ...p.comments]
        };
      }
      return p;
    }));
  };

  const createPost = (newPostData: Omit<Post, 'id' | 'timestamp' | 'likes' | 'reposts' | 'commentsCount' | 'isLiked' | 'isReposted' | 'isSaved' | 'comments'>) => {
    const post: Post = {
      ...newPostData,
      id: `post_${Date.now()}`,
      timestamp: 'Ahora mismo',
      likes: 0,
      reposts: 0,
      commentsCount: 0,
      isLiked: false,
      isReposted: false,
      isSaved: false,
      comments: []
    };
    setPosts(prev => [post, ...prev]);
    setUser(prev => ({
      ...prev,
      stats: { ...prev.stats, posts: prev.stats.posts + 1 }
    }));
  };

  const votePoll = (postId: string, optionIndex: number) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId && p.poll && p.poll.userVote === undefined) {
        const updatedOptions = [...p.poll.options];
        updatedOptions[optionIndex] = {
          ...updatedOptions[optionIndex],
          votes: updatedOptions[optionIndex].votes + 1
        };
        return {
          ...p,
          poll: {
            ...p.poll,
            options: updatedOptions,
            totalVotes: p.poll.totalVotes + 1,
            userVote: optionIndex
          }
        };
      }
      return p;
    }));
  };

  const viewStory = (storyId: string) => {
    setStories(prev => prev.map(s => s.id === storyId ? { ...s, viewed: true } : s));
  };

  const toggleLikeReel = (reelId: string) => {
    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        return {
          ...r,
          isLiked: !r.isLiked,
          likes: r.isLiked ? r.likes - 1 : r.likes + 1
        };
      }
      return r;
    }));
  };

  const sendMessage = (chatId: string, text: string, isAudio = false, audioDuration = '0:15') => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: user.id,
      text: isAudio ? '🎙️ Mensaje de voz' : text,
      timestamp: timeStr,
      status: 'read' as const,
      isAudio,
      audioDuration
    };

    setConversations(prev => prev.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          lastMessage: isAudio ? `🎙️ Nota de voz (${audioDuration})` : text,
          lastMessageTime: timeStr,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));

    // Simulate instant natural response from the contact after 1.5s
    setTimeout(() => {
      const responseReplies = [
        '¡Genial! Me parece excelente la dirección.',
        'Totalmente, justo lo que venía pensando para la tribu.',
        'Dale, te aviso en cuanto revise los últimos cambios.',
        'Brutal ese concepto 🔥'
      ];
      const replyText = responseReplies[Math.floor(Math.random() * responseReplies.length)];
      const replyMsg = {
        id: `reply_${Date.now()}`,
        senderId: chatId, // Contact ID
        text: replyText,
        timestamp: timeStr,
        status: 'read' as const
      };

      setConversations(convs => convs.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMessage: replyText,
            lastMessageTime: timeStr,
            messages: [...c.messages, replyMsg]
          };
        }
        return c;
      }));
    }, 1800);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addCustomNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif_${Date.now()}`,
      timestamp: 'Ahora mismo',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    setToastNotification(newNotif);
  };

  const toggleJoinTribe = (tribeId: string) => {
    setTribes(prev => prev.map(t => {
      if (t.id === tribeId) {
        const nextState = !t.isJoined;
        return {
          ...t,
          isJoined: nextState,
          memberCount: nextState ? t.memberCount + 1 : t.memberCount - 1
        };
      }
      return t;
    }));
  };

  const dismissToast = () => {
    setToastNotification(null);
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <SocialContext.Provider
      value={{
        user,
        updateUser,
        posts,
        toggleLikePost,
        toggleSavePost,
        toggleRepost,
        addComment,
        createPost,
        votePoll,
        stories,
        viewStory,
        reels,
        toggleLikeReel,
        conversations,
        activeChatId,
        setActiveChatId,
        sendMessage,
        notifications,
        unreadNotificationCount,
        markAllNotificationsAsRead,
        addCustomNotification,
        tribes,
        toggleJoinTribe,
        activeFilter,
        setActiveFilter,
        selectedArchetypeFilter,
        setSelectedArchetypeFilter,
        activeStoryIndex,
        setActiveStoryIndex,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isEditProfileOpen,
        setIsEditProfileOpen,
        isThreedyStudioOpen,
        setIsThreedyStudioOpen,
        activeTab,
        setActiveTab,
        toastNotification,
        dismissToast
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};
