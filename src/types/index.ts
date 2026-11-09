export type ArchetypeId = 
  | 'tech_cyber'
  | 'streetwear'
  | 'minimalist'
  | 'fitness'
  | 'dark_academia'
  | 'boho_nomad'
  | 'lofi_gamer';

export interface Archetype {
  id: ArchetypeId;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  vibePillColor: string;
  popularTags: string[];
  description: string;
  memberCount: string;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverImage: string;
  bio: string;
  archetypeId: ArchetypeId;
  themeAura: 'cyan' | 'amber' | 'emerald' | 'violet' | 'slate';
  pronouns?: string;
  website?: string;
  anthem?: {
    title: string;
    artist: string;
    albumArt?: string;
  };
  stats: {
    posts: number;
    followers: number;
    following: number;
    tribeRep: number;
  };
  verified?: boolean;
}

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userHandle: string;
  userAvatar: string;
  archetypeId: ArchetypeId;
  mediaUrl: string;
  caption?: string;
  timestamp: string;
  viewed: boolean;
  type: 'image' | 'text';
  backgroundColor?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userHandle: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

export type PostType = 'photo' | 'thread' | 'video' | 'poll';

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    archetypeId: ArchetypeId;
    verified?: boolean;
  };
  type: PostType;
  content: string;
  mediaUrl?: string;
  videoDuration?: string;
  tags: string[];
  timestamp: string;
  likes: number;
  reposts: number;
  commentsCount: number;
  isLiked: boolean;
  isReposted: boolean;
  isSaved: boolean;
  comments: Comment[];
  poll?: {
    question: string;
    options: { text: string; votes: number }[];
    totalVotes: number;
    userVote?: number;
  };
}

export interface Reel {
  id: string;
  creator: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    archetypeId: ArchetypeId;
    verified?: boolean;
  };
  caption: string;
  mediaUrl: string;
  musicTrack: string;
  likes: number;
  commentsCount: number;
  shares: number;
  isLiked: boolean;
  tags: string[];
}

export interface Message {
  id: string;
  senderId: string;
  text?: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  isAudio?: boolean;
  audioDuration?: string;
}

export interface ChatConversation {
  id: string;
  contact: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    archetypeId: ArchetypeId;
    online: boolean;
    lastSeen?: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'mention' | 'repost' | 'chat' | 'tribe' | 'system';
  actor: {
    name: string;
    handle: string;
    avatar: string;
    archetypeId: ArchetypeId;
  };
  targetContent?: string;
  timestamp: string;
  read: boolean;
}

export interface TribeCommunity {
  id: string;
  name: string;
  archetypeId: ArchetypeId;
  tagline: string;
  description: string;
  bannerUrl: string;
  memberCount: number;
  isJoined: boolean;
  activeDiscussions: number;
  rules: string[];
}
