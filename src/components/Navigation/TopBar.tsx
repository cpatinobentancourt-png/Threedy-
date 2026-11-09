import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { ARCHETYPES } from '../../data/mockData';
import { Bell, MessageSquare, Plus, Sparkles, Box } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { 
    user, 
    unreadNotificationCount, 
    setIsNotificationsOpen, 
    setIsCreateModalOpen,
    setActiveTab,
    selectedArchetypeFilter,
    setSelectedArchetypeFilter,
    conversations,
    setIsThreedyStudioOpen
  } = useSocial();

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const currentArchetype = ARCHETYPES[user.archetypeId] || ARCHETYPES.tech_cyber;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        
        {/* Brand & Archetype indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => {
              setActiveTab('feed');
              setSelectedArchetypeFilter('all');
            }}
            className="flex items-center gap-2 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              P
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white block leading-none">
                PULSE
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Social Meta
              </span>
            </div>
          </button>

          {/* Quick archetype filter badge */}
          <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400">Tribu:</span>
            <select
              value={selectedArchetypeFilter}
              onChange={(e) => setSelectedArchetypeFilter(e.target.value as any)}
              className="text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 border-none rounded-lg px-2 py-1 outline-none cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <option value="all">Todas las tribus</option>
              {Object.values(ARCHETYPES).map(arch => (
                <option key={arch.id} value={arch.id}>
                  {arch.icon} {arch.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* Threedy Brand Studio Button */}
          <button
            onClick={() => setIsThreedyStudioOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-800 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/60 active:scale-95 transition-all cursor-pointer whitespace-nowrap shadow-xs"
            title="Ver los logotipos y manual de marca de Threedy"
          >
            <Box className="w-3.5 h-3.5" />
            <span>Threedy 3D</span>
          </button>

          {/* Quick Create Post */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer whitespace-nowrap shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Crear</span>
          </button>

          {/* Direct Messages Shortcut */}
          <button
            onClick={() => setActiveTab('messages')}
            className="relative min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-full transition-colors cursor-pointer"
            aria-label="Mensajes directos"
          >
            <MessageSquare className="w-5 h-5" />
            {totalUnreadMessages > 0 && (
              <span className="absolute top-2 right-2 min-w-[18px] h-[18px] bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {totalUnreadMessages}
              </span>
            )}
          </button>

          {/* Real-time Notifications Bell */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-full transition-colors cursor-pointer"
            aria-label="Notificaciones en tiempo real"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-2 right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-pulse">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Profile mini avatar shortcut */}
          <button
            onClick={() => setActiveTab('profile')}
            className="relative ml-1 p-0.5 rounded-full ring-2 ring-transparent hover:ring-slate-300 dark:hover:ring-slate-700 transition-all cursor-pointer"
            title={user.name}
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-8 h-8 rounded-full object-cover" 
              referrerPolicy="no-referrer"
            />
            <span 
              className="absolute -bottom-0.5 -right-0.5 text-xs select-none"
              title={currentArchetype.name}
            >
              {currentArchetype.icon}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
