import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { StoriesBar } from './StoriesBar';
import { PostCard } from './PostCard';
import { ReelsViewer } from './ReelsViewer';
import { ARCHETYPES } from '../../data/mockData';
import { Sparkles, MessageSquare, Image, BarChart2, Video, X } from 'lucide-react';

export const FeedView: React.FC = () => {
  const { 
    posts, 
    activeFilter, 
    setActiveFilter, 
    selectedArchetypeFilter, 
    setSelectedArchetypeFilter 
  } = useSocial();

  const activeArchetypeObj = selectedArchetypeFilter !== 'all' ? ARCHETYPES[selectedArchetypeFilter] : null;

  // Filter posts by archetype and format
  const filteredPosts = posts.filter(post => {
    // Archetype filter
    if (selectedArchetypeFilter !== 'all' && post.author.archetypeId !== selectedArchetypeFilter) {
      return false;
    }

    // Format filter
    if (activeFilter === 'threads') {
      return post.type === 'thread';
    }
    if (activeFilter === 'media') {
      return post.type === 'photo';
    }
    if (activeFilter === 'polls') {
      return post.type === 'poll';
    }
    return true;
  });

  return (
    <div className="w-full max-w-2xl mx-auto border-x-0 sm:border-x border-slate-200/80 dark:border-slate-800/80 min-h-[calc(100vh-3.5rem)] bg-white dark:bg-slate-950 transition-colors">
      
      {/* Instagram-style Stories Bar */}
      <StoriesBar />

      {/* Format Segmented Filter Bar (Feed, Threads/X, Media, Polls) */}
      <div className="sticky top-14 z-20 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-3 py-2">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeFilter === 'all'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Para Ti</span>
          </button>

          <button
            onClick={() => setActiveFilter('threads')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeFilter === 'threads'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Hilos / X</span>
          </button>

          <button
            onClick={() => setActiveFilter('media')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeFilter === 'media'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>Fotos</span>
          </button>

          <button
            onClick={() => setActiveFilter('polls')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeFilter === 'polls'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Encuestas</span>
          </button>
        </div>
      </div>

      {/* Active Tribe Filter indicator bar */}
      {activeArchetypeObj && (
        <div className="p-3 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-transparent border-b border-blue-500/20 flex items-center justify-between px-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">{activeArchetypeObj.icon}</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              Filtrado por: {activeArchetypeObj.name}
            </span>
          </div>
          <button
            onClick={() => setSelectedArchetypeFilter('all')}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-900 dark:hover:text-white px-2 py-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Ver todo</span>
          </button>
        </div>
      )}

      {/* Posts Stream */}
      <div className="divide-y divide-slate-200/80 dark:divide-slate-800/80 pb-20 lg:pb-8">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No hay publicaciones para este filtro de tribu o formato.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSelectedArchetypeFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>

    </div>
  );
};
