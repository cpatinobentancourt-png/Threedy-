import React, { useState, useEffect, useRef } from 'react';
import { useSocial } from '../../context/SocialContext';
import { X, Heart, Send, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { ARCHETYPES } from '../../data/mockData';

export const StoryViewerModal: React.FC = () => {
  const { stories, activeStoryIndex, setActiveStoryIndex, viewStory, addCustomNotification } = useSocial();
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const currentStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;

  // Mark story as viewed
  useEffect(() => {
    if (currentStory) {
      viewStory(currentStory.id);
      setProgress(0);
    }
  }, [activeStoryIndex]);

  // Progress timer
  useEffect(() => {
    if (activeStoryIndex === null || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next story
          if (activeStoryIndex < stories.length - 1) {
            setActiveStoryIndex(activeStoryIndex + 1);
            return 0;
          } else {
            setActiveStoryIndex(null);
            return 100;
          }
        }
        return prev + 2; // ~5 seconds total
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStoryIndex, isPaused, stories.length]);

  if (activeStoryIndex === null || !currentStory) return null;

  const currentArchetype = ARCHETYPES[currentStory.archetypeId];

  const handleNext = () => {
    if (activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
    } else {
      setActiveStoryIndex(null);
    }
  };

  const handlePrev = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    // Simulate sending reply to contact chat & notifying
    addCustomNotification({
      type: 'chat',
      actor: {
        name: currentStory.userName,
        handle: currentStory.userHandle,
        avatar: currentStory.userAvatar,
        archetypeId: currentStory.archetypeId
      },
      targetContent: `recibió tu respuesta a su historia: "${replyText}"`
    });

    setReplyText('');
  };

  const handleHeartReaction = () => {
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);
    addCustomNotification({
      type: 'like',
      actor: {
        name: currentStory.userName,
        handle: currentStory.userHandle,
        avatar: currentStory.userAvatar,
        archetypeId: currentStory.archetypeId
      },
      targetContent: 'recibió tu reacción de corazón ❤️ a su historia'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 select-none">
      
      {/* Container simulating high-res smartphone viewport */}
      <div className="relative w-full h-full sm:max-w-md sm:h-[86vh] sm:rounded-3xl overflow-hidden bg-slate-950 flex flex-col justify-between shadow-2xl">
        
        {/* Story Background Media */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentStory.mediaUrl}
            alt={currentStory.caption || 'Historia'}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Subtle contrast gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        {/* Flying heart animation */}
        {showHeartBurst && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-ping">
            <Heart className="w-24 h-24 text-red-500 fill-red-500 drop-shadow-lg" />
          </div>
        )}

        {/* Top Header: Progress Segments & User info */}
        <div className="relative z-20 p-4 space-y-3">
          
          {/* Segmented progress bars */}
          <div className="flex items-center gap-1.5 w-full">
            {stories.map((s, idx) => {
              let segProgress = 0;
              if (idx < activeStoryIndex) segProgress = 100;
              else if (idx === activeStoryIndex) segProgress = progress;
              return (
                <div
                  key={s.id}
                  className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{ width: `${segProgress}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* User profile row */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <img
                src={currentStory.userAvatar}
                alt={currentStory.userName}
                className="w-9 h-9 rounded-full object-cover border border-white/40"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold truncate max-w-[150px]">
                    {currentStory.userName}
                  </span>
                  {currentArchetype && (
                    <span className="text-xs" title={currentArchetype.name}>
                      {currentArchetype.icon}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-white/70">
                  <span>@{currentStory.userHandle}</span>
                  <span>·</span>
                  <span>{currentStory.timestamp}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                title={isPaused ? 'Reanudar' : 'Pausar'}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setActiveStoryIndex(null)}
                className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tap areas for previous/next navigation */}
        <div className="relative z-10 flex-1 flex">
          <div
            onClick={handlePrev}
            className="w-1/3 h-full cursor-pointer"
            title="Historia anterior"
          />
          <div
            onClick={() => setIsPaused(!isPaused)}
            className="w-1/3 h-full cursor-pointer"
            title="Mantener para pausar"
          />
          <div
            onClick={handleNext}
            className="w-1/3 h-full cursor-pointer"
            title="Siguiente historia"
          />
        </div>

        {/* Bottom Story Footer: Caption, Reply input & Heart */}
        <div className="relative z-20 p-4 space-y-3">
          {currentStory.caption && (
            <p className="text-sm text-white font-medium bg-black/40 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
              {currentStory.caption}
            </p>
          )}

          <form onSubmit={handleSendReply} className="flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Responder a ${currentStory.userName}...`}
              className="flex-1 bg-white/20 border border-white/30 text-white placeholder-white/70 text-xs rounded-full px-4 py-2.5 outline-none focus:bg-white/30 transition-all"
            />
            {replyText.trim() ? (
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleHeartReaction}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-transform active:scale-125 cursor-pointer shrink-0"
                title="Enviar corazón"
              >
                <Heart className="w-5 h-5 text-red-400 fill-red-400/30" />
              </button>
            )}
          </form>
        </div>

      </div>

      {/* Desktop Prev / Next helper chevrons */}
      {activeStoryIndex > 0 && (
        <button
          onClick={handlePrev}
          className="hidden sm:flex absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center backdrop-blur-md transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {activeStoryIndex < stories.length - 1 && (
        <button
          onClick={handleNext}
          className="hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center backdrop-blur-md transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

    </div>
  );
};
