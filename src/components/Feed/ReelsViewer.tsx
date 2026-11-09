import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { ARCHETYPES } from '../../data/mockData';
import { Heart, MessageCircle, Share2, Volume2, VolumeX, Music, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';

export const ReelsViewer: React.FC = () => {
  const { reels, toggleLikeReel, addCustomNotification } = useSocial();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const currentReel = reels[currentIndex];
  if (!currentReel) return null;

  const arch = ARCHETYPES[currentReel.creator.archetypeId];

  const handleNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(reels.length - 1);
    }
  };

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-[calc(100vh-8.5rem)] lg:h-[750px] rounded-3xl overflow-hidden bg-slate-950 shadow-2xl flex flex-col justify-between my-2 select-none border border-slate-800">
      
      {/* Background Visual Stream */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentReel.mediaUrl}
          alt={currentReel.caption}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Measured contrast scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85" />
      </div>

      {/* Top Header Controls: Sound & Archetype indicator */}
      <div className="relative z-20 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-wider uppercase text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            Reel #{currentIndex + 1}
          </span>
          {arch && (
            <span className="text-xs text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
              {arch.icon} {arch.name.split('&')[0]}
            </span>
          )}
        </div>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          title={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Center navigation hints for desktop */}
      <div className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 flex-col gap-2">
        <button
          onClick={handlePrev}
          className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          title="Reel anterior"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          title="Siguiente reel"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Floating Action Column on the Right */}
      <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-4 text-white">
        
        {/* Like */}
        <button
          onClick={() => toggleLikeReel(currentReel.id)}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center group-active:scale-125 transition-transform">
            <Heart className={`w-5 h-5 ${currentReel.isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </div>
          <span className="text-[11px] font-mono tabular-nums font-semibold">
            {(currentReel.likes / 1000).toFixed(1)}K
          </span>
        </button>

        {/* Comments */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <span className="text-[11px] font-mono tabular-nums font-semibold">
            {currentReel.commentsCount}
          </span>
        </div>

        {/* Share */}
        <button
          onClick={handleShare}
          className="relative flex flex-col items-center gap-1 cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <Share2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-[11px] font-mono tabular-nums font-semibold">
            {(currentReel.shares / 1000).toFixed(1)}K
          </span>
          {showShareToast && (
            <span className="absolute -left-28 top-2 bg-white text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
              ¡Reel compartido!
            </span>
          )}
        </button>

        {/* Spinning Vinyl Audio Indicator */}
        <div className="w-10 h-10 rounded-full border-2 border-white/60 overflow-hidden animate-spin duration-3000 flex items-center justify-center bg-slate-900">
          <img
            src={currentReel.creator.avatar}
            alt="Audio cover"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

      </div>

      {/* Bottom Creator Info & Music Track */}
      <div className="relative z-20 p-4 space-y-2.5 max-w-[80%] text-white">
        
        {/* Creator identity */}
        <div className="flex items-center gap-2.5">
          <img
            src={currentReel.creator.avatar}
            alt={currentReel.creator.name}
            className="w-10 h-10 rounded-full object-cover border border-white/40"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold truncate">
                {currentReel.creator.name}
              </span>
              {currentReel.creator.verified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
              )}
            </div>
            <span className="text-xs text-white/70">
              @{currentReel.creator.handle}
            </span>
          </div>
          <button className="ml-2 px-3 py-1 rounded-full bg-white text-slate-900 text-xs font-semibold hover:bg-white/90 active:scale-95 transition-all cursor-pointer">
            Seguir
          </button>
        </div>

        {/* Caption */}
        <p className="text-xs sm:text-sm text-white/90 leading-snug line-clamp-3">
          {currentReel.caption}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 text-[11px] text-white/75 font-medium">
          {currentReel.tags.map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>

        {/* Audio Track Marquee */}
        <div className="flex items-center gap-2 text-xs text-white/80 pt-1">
          <Music className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{currentReel.musicTrack}</span>
        </div>

      </div>

    </div>
  );
};
