import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { ARCHETYPES } from '../../data/mockData';
import { X, CheckCheck, Bell, Sparkles, Heart, MessageSquare, Repeat2 } from 'lucide-react';

export const NotificationSheet: React.FC = () => {
  const { 
    isNotificationsOpen, 
    setIsNotificationsOpen, 
    notifications, 
    markAllNotificationsAsRead, 
    addCustomNotification,
    setActiveTab,
    unreadNotificationCount 
  } = useSocial();

  const [activeCategory, setActiveCategory] = useState<'all' | 'mentions' | 'likes' | 'chats'>('all');

  if (!isNotificationsOpen) return null;

  const filteredNotifications = notifications.filter((notif) => {
    if (activeCategory === 'mentions') return notif.type === 'mention';
    if (activeCategory === 'likes') return notif.type === 'like';
    if (activeCategory === 'chats') return notif.type === 'chat';
    return true;
  });

  const triggerSimulatedAlert = () => {
    const randomActors = [
      {
        name: 'Elena Rostova',
        handle: 'elena_pace',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        archetypeId: 'fitness' as const,
        content: 'ha empezado a seguir tus entrenamientos en la tribu Iron'
      },
      {
        name: 'Malik Vance',
        handle: 'malik_drips',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        archetypeId: 'streetwear' as const,
        content: 'mencionó tu diseño en el canal de lanzamientos globales'
      },
      {
        name: 'Valeria Chen',
        handle: 'val_cyber',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
        archetypeId: 'tech_cyber' as const,
        content: 'te envió una respuesta a tu hilo de arquitectura neuronal'
      }
    ];

    const pick = randomActors[Math.floor(Math.random() * randomActors.length)];

    addCustomNotification({
      type: 'mention',
      actor: {
        name: pick.name,
        handle: pick.handle,
        avatar: pick.avatar,
        archetypeId: pick.archetypeId
      },
      targetContent: pick.content
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end">
      
      {/* Click outside to close backdrop */}
      <div 
        onClick={() => setIsNotificationsOpen(false)}
        className="absolute inset-0 cursor-pointer"
      />

      {/* Slide-over Sheet panel */}
      <div className="relative z-10 w-full max-w-md h-full bg-white dark:bg-slate-950 border-l border-slate-200/80 dark:border-slate-800/80 shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-500" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Notificaciones en Vivo
              </h2>
              {unreadNotificationCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                  {unreadNotificationCount}
                </span>
              )}
            </div>

            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Categories (Single-line controls) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setActiveCategory('mentions')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'mentions'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Menciones
            </button>
            <button
              onClick={() => setActiveCategory('likes')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'likes'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Likes
            </button>
            <button
              onClick={() => setActiveCategory('chats')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'chats'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Chats
            </button>
          </div>
        </div>

        {/* List of Notifications */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-900 p-2">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No tienes notificaciones en esta categoría.
            </div>
          ) : (
            filteredNotifications.map((n) => {
              const arch = ARCHETYPES[n.actor.archetypeId];
              return (
                <div
                  key={n.id}
                  onClick={() => {
                    if (n.type === 'chat') {
                      setActiveTab('messages');
                      setIsNotificationsOpen(false);
                    }
                  }}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-colors cursor-pointer ${
                    !n.read
                      ? 'bg-blue-50/60 dark:bg-blue-950/20'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={n.actor.avatar}
                      alt={n.actor.name}
                      className="w-10 h-10 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {arch && (
                      <span className="absolute -bottom-1 -right-1 text-xs select-none">
                        {arch.icon}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-900 dark:text-white leading-snug">
                      <span className="font-bold">{n.actor.name}</span>{' '}
                      <span className="text-slate-600 dark:text-slate-300">
                        {n.targetContent}
                      </span>
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                      {n.timestamp}
                    </span>
                  </div>

                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions: Mark all as read & Trigger Test */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsAsRead}
              className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-4 h-4 text-emerald-500" />
              <span>Marcar leídas</span>
            </button>

            <button
              onClick={triggerSimulatedAlert}
              className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simular Alerta</span>
            </button>
          </div>
          <p className="text-[10px] text-slate-400 text-center">
            Las notificaciones se sincronizan automáticamente cada 35 segundos.
          </p>
        </div>

      </div>

    </div>
  );
};
