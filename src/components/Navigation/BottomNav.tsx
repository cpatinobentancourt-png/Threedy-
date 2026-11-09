import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { Home, Compass, Plus, MessageCircle, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsCreateModalOpen,
    conversations
  } = useSocial();

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 transition-colors pb-safe">
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-2">
        
        {/* Feed Tab */}
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] rounded-xl transition-all cursor-pointer ${
            activeTab === 'feed'
              ? 'text-slate-900 dark:text-white font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          aria-label="Inicio"
        >
          <Home className={`w-5 h-5 ${activeTab === 'feed' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight mt-1 whitespace-nowrap">Inicio</span>
        </button>

        {/* Tribus / Explore Tab */}
        <button
          onClick={() => setActiveTab('tribes')}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] rounded-xl transition-all cursor-pointer ${
            activeTab === 'tribes'
              ? 'text-slate-900 dark:text-white font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          aria-label="Tribus y Estereotipos"
        >
          <Compass className={`w-5 h-5 ${activeTab === 'tribes' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight mt-1 whitespace-nowrap">Tribus</span>
        </button>

        {/* Create Post Center Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 active:scale-90 transition-all cursor-pointer"
            aria-label="Crear publicación"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* WhatsApp-Style Chats Tab */}
        <button
          onClick={() => setActiveTab('messages')}
          className={`relative flex flex-col items-center justify-center min-h-[48px] min-w-[48px] rounded-xl transition-all cursor-pointer ${
            activeTab === 'messages'
              ? 'text-slate-900 dark:text-white font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          aria-label="Chats"
        >
          <div className="relative">
            <MessageCircle className={`w-5 h-5 ${activeTab === 'messages' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {totalUnreadMessages > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[16px] h-4 bg-emerald-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                {totalUnreadMessages}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1 whitespace-nowrap">Chats</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] rounded-xl transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'text-slate-900 dark:text-white font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          aria-label="Perfil"
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight mt-1 whitespace-nowrap">Perfil</span>
        </button>

      </div>
    </nav>
  );
};
