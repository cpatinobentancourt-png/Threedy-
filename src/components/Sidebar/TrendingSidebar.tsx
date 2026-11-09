import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { TRENDING_TOPICS, ARCHETYPES } from '../../data/mockData';
import { TrendingUp, Users, ArrowRight } from 'lucide-react';

export const TrendingSidebar: React.FC = () => {
  const { setSelectedArchetypeFilter, setActiveTab, tribes, toggleJoinTribe } = useSocial();

  const suggestedCreators = [
    {
      name: 'Valeria Chen',
      handle: 'val_cyber',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'tech_cyber',
      followers: '48.2K'
    },
    {
      name: 'Malik Vance',
      handle: 'malik_drips',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'streetwear',
      followers: '89.1K'
    },
    {
      name: 'Elena Rostova',
      handle: 'elena_pace',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'fitness',
      followers: '104K'
    }
  ];

  return (
    <aside className="hidden xl:block w-80 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] p-4 space-y-6 overflow-y-auto">
      
      {/* Trending Topics (X/Twitter inspired) */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          <span>Tendencias en Pulse</span>
        </div>

        <div className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
          {TRENDING_TOPICS.map((topic, i) => (
            <div
              key={topic.tag}
              onClick={() => {
                setSelectedArchetypeFilter(topic.archetype as any);
                setActiveTab('feed');
              }}
              className="py-2.5 first:pt-1 last:pb-1 group cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{topic.category}</span>
                <span className="font-mono tabular-nums">{topic.postsCount} posts</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {topic.tag}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Creators by Archetype */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            Creadores Sugeridos
          </span>
          <button 
            onClick={() => setActiveTab('tribes')}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Ver más
          </button>
        </div>

        <div className="space-y-3">
          {suggestedCreators.map((creator) => {
            const arch = ARCHETYPES[creator.archetypeId];
            return (
              <div key={creator.handle} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {creator.name}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <span>@{creator.handle}</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums">{creator.followers}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedArchetypeFilter(creator.archetypeId as any);
                    setActiveTab('feed');
                  }}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  Seguir
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Community Tribe */}
      {tribes[0] && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-900/10 via-blue-900/10 to-transparent border border-cyan-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
              Tribu Destacada
            </span>
            <span className="text-xs">{ARCHETYPES[tribes[0].archetypeId]?.icon}</span>
          </div>
          
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {tribes[0].name}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
            {tribes[0].tagline}
          </p>

          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-slate-500 font-mono tabular-nums">
              {(tribes[0].memberCount / 1000).toFixed(1)}K miembros
            </span>
            <button
              onClick={() => toggleJoinTribe(tribes[0].id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                tribes[0].isJoined
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white'
              }`}
            >
              {tribes[0].isJoined ? 'Miembro ✓' : 'Unirse a Tribu'}
            </button>
          </div>
        </div>
      )}

      {/* Footer copyright */}
      <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
        <p>PULSE · Meta Social Network © 2026</p>
        <p>Diseño sin fricción · Arquitectura de Tribus & Hilos</p>
      </div>

    </aside>
  );
};
