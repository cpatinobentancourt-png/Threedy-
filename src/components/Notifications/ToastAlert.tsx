import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { ARCHETYPES } from '../../data/mockData';
import { Bell, Heart, MessageSquare, Repeat2, X } from 'lucide-react';

export const ToastAlert: React.FC = () => {
  const { toastNotification, dismissToast, setActiveTab } = useSocial();

  if (!toastNotification) return null;

  const arch = ARCHETYPES[toastNotification.actor.archetypeId];

  const getIcon = () => {
    switch (toastNotification.type) {
      case 'like':
        return <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />;
      case 'mention':
        return <MessageSquare className="w-3.5 h-3.5 text-blue-500" />;
      case 'repost':
        return <Repeat2 className="w-3.5 h-3.5 text-emerald-500" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-cyan-500" />;
    }
  };

  return (
    <div className="fixed top-16 right-4 sm:right-6 z-50 max-w-sm w-full animate-in slide-in-from-top-4 duration-300">
      <div 
        onClick={() => {
          if (toastNotification.type === 'chat') {
            setActiveTab('messages');
          }
          dismissToast();
        }}
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 p-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 cursor-pointer group hover:border-blue-500/50 transition-all"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <img
              src={toastNotification.actor.avatar}
              alt={toastNotification.actor.name}
              className="w-10 h-10 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs shadow-xs">
              {getIcon()}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {toastNotification.actor.name}
              </span>
              {arch && <span className="text-xs">{arch.icon}</span>}
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1">
              {toastNotification.targetContent}
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            dismissToast();
          }}
          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full transition-colors cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
