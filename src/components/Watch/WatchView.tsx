import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { ARCHETYPES } from '../../data/mockData';
import { Play, Pause, ThumbsUp, Share2, Bookmark, CheckCircle2, Volume2, Maximize2 } from 'lucide-react';

export const WatchView: React.FC = () => {
  const { user } = useSocial();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likesCount, setLikesCount] = useState(14820);
  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(135); // in seconds
  const totalDuration = 480; // 8 minutes

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const relatedVideos = [
    {
      id: 'v1',
      title: 'Construyendo sistemas reactivos en TypeScript 2026',
      creator: 'Valeria Chen',
      views: '45K visualizaciones',
      timeAgo: 'Hace 3 días',
      duration: '14:22',
      thumbnail: '/src/assets/images/feed_tech_cyberpunk_1794234353608.jpg'
    },
    {
      id: 'v2',
      title: 'Análisis de siluetas y patronaje en moda urbana moderna',
      creator: 'Malik Vance',
      views: '89K visualizaciones',
      timeAgo: 'Hace 1 semana',
      duration: '18:40',
      thumbnail: '/src/assets/images/feed_streetwear_urban_1794234354462.jpg'
    },
    {
      id: 'v3',
      title: 'Biomecánica de la zancada en pista para fondistas',
      creator: 'Elena Rostova',
      views: '62K visualizaciones',
      timeAgo: 'Hace 2 días',
      duration: '11:15',
      thumbnail: '/src/assets/images/feed_fitness_athlete_1794234355691.jpg'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-4 sm:px-6 space-y-6">
      
      {/* Featured Main Video Player */}
      <div className="space-y-4">
        
        {/* Screen container */}
        <div className="relative aspect-16/9 rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
          <img
            src="/src/assets/images/feed_tech_cyberpunk_1794234353608.jpg"
            alt="Video en reproducción"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          
          {/* Ambient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Center Play/Pause Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </button>
          </div>

          {/* Player Controls Bar at bottom */}
          <div className="absolute inset-x-0 bottom-0 p-4 space-y-2 z-20 bg-gradient-to-t from-black/90 to-transparent">
            {/* Scrubber bar */}
            <div 
              className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setCurrentTime(Math.round(pos * totalDuration));
              }}
            >
              <div 
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono tabular-nums">
                  {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/20">
                  4K 60FPS
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 cursor-pointer" />
                <Maximize2 className="w-4 h-4 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Video Info & Channel Row */}
        <div className="space-y-4">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            Diseñando la próxima generación de redes sociales: Fusión de Meta, X y YouTube en 2026
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
            
            {/* Creator / Channel info */}
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
                alt="Valeria Chen"
                className="w-11 h-11 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Valeria Chen
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500/20" />
                </div>
                <p className="text-xs text-slate-500 font-mono tabular-nums">
                  142K suscriptores
                </p>
              </div>

              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`ml-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isSubscribed
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    : 'bg-red-600 hover:bg-red-500 text-white shadow-sm'
                }`}
              >
                {isSubscribed ? 'Suscrito ✓' : 'Suscribirse'}
              </button>
            </div>

            {/* Actions: Likes, Share, Save */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleLike}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  isLiked
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="font-mono tabular-nums">{(likesCount / 1000).toFixed(1)}K</span>
              </button>

              <button
                onClick={() => alert('Enlace del video copiado al portapapeles')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir</span>
              </button>

              <button
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Guardar en lista"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Related Stream Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Videos Recomendados por tus Tribus
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedVideos.map(vid => (
            <div
              key={vid.id}
              onClick={() => setIsPlaying(true)}
              className="group cursor-pointer space-y-2.5 rounded-2xl p-2 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-800">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 text-white">
                  {vid.duration}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {vid.title}
                </h4>
                <div className="text-[11px] text-slate-500 mt-1">
                  <p>{vid.creator}</p>
                  <p className="font-mono tabular-nums">{vid.views} · {vid.timeAgo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
