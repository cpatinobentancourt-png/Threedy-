import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { ARCHETYPES } from '../../data/mockData';
import { 
  Sparkles, 
  Share2, 
  Grid, 
  MessageSquare, 
  Video, 
  Bookmark, 
  CheckCircle2, 
  Music, 
  Play, 
  Pause,
  ExternalLink,
  Heart
} from 'lucide-react';
import { PostCard } from '../Feed/PostCard';

export const ProfileView: React.FC = () => {
  const { user, posts, reels, setIsEditProfileOpen, setSelectedArchetypeFilter, setActiveTab } = useSocial();
  const [activeProfileTab, setActiveProfileTab] = useState<'grid' | 'threads' | 'reels' | 'saved'>('grid');
  const [isPlayingAnthem, setIsPlayingAnthem] = useState(false);

  const archetype = ARCHETYPES[user.archetypeId] || ARCHETYPES.tech_cyber;

  const auraBorderColors = {
    cyan: 'ring-cyan-500 shadow-cyan-500/20',
    amber: 'ring-amber-500 shadow-amber-500/20',
    emerald: 'ring-emerald-500 shadow-emerald-500/20',
    violet: 'ring-purple-500 shadow-purple-500/20',
    slate: 'ring-slate-500 shadow-slate-500/20'
  };

  const auraClass = auraBorderColors[user.themeAura] || auraBorderColors.cyan;

  // Filter user posts
  const userPosts = posts.filter(p => p.author.handle === user.handle);
  const userMediaPosts = userPosts.filter(p => p.mediaUrl);
  const savedPosts = posts.filter(p => p.isSaved);

  return (
    <div className="w-full max-w-4xl mx-auto py-2 sm:py-4 px-4 sm:px-6 space-y-6">
      
      {/* Profile Card Header */}
      <div className="relative rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm">
        
        {/* Cover Photo */}
        <div className="relative h-44 sm:h-56 w-full bg-slate-800 overflow-hidden group">
          <img
            src={user.coverImage}
            alt="Foto de portada"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md text-xs font-medium border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Editar Portada</span>
          </button>
        </div>

        {/* Profile Main Body */}
        <div className="px-4 sm:px-6 pb-6 pt-0 relative space-y-4">
          
          {/* Avatar and Top Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20">
            
            {/* Avatar with dynamic aura ring */}
            <div className="relative">
              <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-white dark:bg-slate-950 ring-4 shadow-xl ${auraClass} transition-all`}>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-2xl object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span
                className="absolute -bottom-2 -right-2 text-2xl select-none bg-white dark:bg-slate-900 rounded-full p-1 shadow-md border border-slate-200 dark:border-slate-800"
                title={archetype.name}
              >
                {archetype.icon}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Personalizar Perfil</span>
              </button>
              
              <button
                onClick={() => alert('¡Enlace de perfil copiado al portapapeles!')}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                title="Compartir perfil"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Name, Handle, Pronouns & Archetype Badge */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {user.name}
              </h1>
              {user.verified && (
                <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500/20" />
              )}
              {user.pronouns && (
                <span className="text-xs text-slate-400 font-medium">
                  ({user.pronouns})
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500 font-mono">
                @{user.handle}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              
              {/* Active Tribe Badge */}
              <button
                onClick={() => {
                  setSelectedArchetypeFilter(user.archetypeId);
                  setActiveTab('tribes');
                }}
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${archetype.vibePillColor} bg-slate-100 dark:bg-slate-900`}
              >
                {archetype.icon} Tribu {archetype.name.split('&')[0]}
              </button>
            </div>
          </div>

          {/* Bio & Link */}
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed max-w-2xl">
            {user.bio}
          </p>

          {user.website && (
            <a
              href={user.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{user.website.replace('https://', '')}</span>
            </a>
          )}

          {/* Spotify-style Profile Anthem Widget */}
          {user.anthem && (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between max-w-md">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsPlayingAnthem(!isPlayingAnthem)}
                  className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer shrink-0"
                  title={isPlayingAnthem ? 'Pausar himno' : 'Reproducir himno'}
                >
                  {isPlayingAnthem ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div>
                  <div className="flex items-center gap-1">
                    <Music className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {user.anthem.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {user.anthem.artist} {isPlayingAnthem && '· Reproduciendo en loop 🎵'}
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                Himno
              </span>
            </div>
          )}

          {/* Stats Bar (Unboxed quantitative figures with tabular-nums) */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-900 grid grid-cols-4 gap-2 text-center sm:text-left">
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                {user.stats.posts}
              </span>
              <p className="text-[11px] text-slate-500">Publicaciones</p>
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                {(user.stats.followers / 1000).toFixed(1)}K
              </span>
              <p className="text-[11px] text-slate-500">Seguidores</p>
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                {user.stats.following}
              </span>
              <p className="text-[11px] text-slate-500">Siguiendo</p>
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums text-cyan-600 dark:text-cyan-400">
                {user.stats.tribeRep}
              </span>
              <p className="text-[11px] text-slate-500">Rep en Tribu</p>
            </div>
          </div>

        </div>

      </div>

      {/* Profile Section Tabs (Single-line controls) */}
      <div className="flex items-center justify-around border-b border-slate-200/80 dark:border-slate-800/80">
        <button
          onClick={() => setActiveProfileTab('grid')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
            activeProfileTab === 'grid'
              ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Galería</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('threads')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
            activeProfileTab === 'threads'
              ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Hilos</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('reels')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
            activeProfileTab === 'reels'
              ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Reels</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('saved')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
            activeProfileTab === 'saved'
              ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Guardados</span>
        </button>
      </div>

      {/* Tab Content Panels */}
      <div>
        {/* Photo Grid View (Instagram style) */}
        {activeProfileTab === 'grid' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {[...userMediaPosts, ...posts.filter(p => p.mediaUrl)].map((post, i) => (
              <div
                key={post.id + i}
                className="relative rounded-2xl overflow-hidden aspect-square bg-slate-900 group cursor-pointer"
              >
                <img
                  src={post.mediaUrl}
                  alt="Post preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white text-xs font-semibold">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-white" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>{post.commentsCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Threads View (X style) */}
        {activeProfileTab === 'threads' && (
          <div className="divide-y divide-slate-200/80 dark:divide-slate-800/80 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80">
            {posts.slice(0, 3).map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Reels View */}
        {activeProfileTab === 'reels' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {reels.map(reel => (
              <div
                key={reel.id}
                onClick={() => setActiveTab('watch')}
                className="relative rounded-2xl overflow-hidden aspect-9/16 bg-slate-900 group cursor-pointer"
              >
                <img
                  src={reel.mediaUrl}
                  alt={reel.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{(reel.likes / 1000).toFixed(1)}K</span>
                  </div>
                  <p className="text-[11px] line-clamp-1 mt-0.5">{reel.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Saved Posts View */}
        {activeProfileTab === 'saved' && (
          <div className="space-y-4">
            {savedPosts.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">
                No tienes publicaciones guardadas todavía.
              </p>
            ) : (
              <div className="divide-y divide-slate-200/80 dark:divide-slate-800/80 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80">
                {savedPosts.map(p => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
