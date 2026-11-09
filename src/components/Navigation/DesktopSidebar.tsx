import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { ARCHETYPES } from '../../data/mockData';
import { Home, Compass, Tv, MessageCircle, User, Plus, Sparkles, Box } from 'lucide-react';

export const DesktopSidebar: React.FC = () => {
  const {
    user,
    activeTab,
    setActiveTab,
    setIsCreateModalOpen,
    conversations,
    selectedArchetypeFilter,
    setSelectedArchetypeFilter,
    setIsEditProfileOpen,
    setIsThreedyStudioOpen
  } = useSocial();

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const currentArchetype = ARCHETYPES[user.archetypeId] || ARCHETYPES.tech_cyber;

  interface NavItem {
    id: 'feed' | 'tribes' | 'watch' | 'messages' | 'profile';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }

  const navItems: NavItem[] = [
    { id: 'feed', label: 'Inicio', icon: Home },
    { id: 'tribes', label: 'Tribus & Estilos', icon: Compass },
    { id: 'watch', label: 'Watch & Clips', icon: Tv },
    { 
      id: 'messages', 
      label: 'Chats en Vivo', 
      icon: MessageCircle, 
      badge: totalUnreadMessages > 0 ? totalUnreadMessages : undefined 
    },
    { id: 'profile', label: 'Mi Perfil', icon: User },
  ];

  return (
    <aside className="hidden lg:flex flex-col justify-between w-64 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] p-4 border-r border-slate-200/80 dark:border-slate-800/80 overflow-y-auto">
      <div className="space-y-6">
        
        {/* Navigation list */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Archetype / Tribe quick filter card */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-900 dark:text-white">
              Filtrar por Tribu
            </span>
            <span className="text-xs text-slate-500">
              {selectedArchetypeFilter === 'all' ? 'Todas' : ARCHETYPES[selectedArchetypeFilter]?.icon}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={() => setSelectedArchetypeFilter('all')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedArchetypeFilter === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🌐 Todas las publicaciones
            </button>
            {Object.values(ARCHETYPES).slice(0, 4).map((arch) => (
              <button
                key={arch.id}
                onClick={() => setSelectedArchetypeFilter(arch.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium truncate transition-colors cursor-pointer ${
                  selectedArchetypeFilter === arch.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {arch.icon} {arch.name}
              </button>
            ))}
          </div>
        </div>

        {/* Threedy Brand Studio Showcase Button */}
        <button
          onClick={() => setIsThreedyStudioOpen(true)}
          className="w-full p-3 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-900 border border-cyan-500/30 text-left hover:border-cyan-400/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
              <Box className="w-3.5 h-3.5" />
              <span>Threedy Studio 3D</span>
            </span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded-full font-bold">
              3 Logos
            </span>
          </div>
          <p className="text-xs font-semibold text-white group-hover:text-cyan-200 transition-colors">
            Ver Logotipos & Brand Suite
          </p>
        </button>

        {/* Primary Create Action */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Crear Publicación</span>
        </button>
      </div>

      {/* User profile mini badge at bottom */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
        <div 
          onClick={() => setActiveTab('profile')}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {user.name}
              </span>
              <span className="text-xs">{currentArchetype.icon}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              @{user.handle}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditProfileOpen(true);
            }}
            className="p-1.5 text-slate-600 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Personalizar perfil"
          >
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </button>
        </div>
      </div>
    </aside>
  );
};
