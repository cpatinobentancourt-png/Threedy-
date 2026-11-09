import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { Plus } from 'lucide-react';
import { ARCHETYPES } from '../../data/mockData';

export const StoriesBar: React.FC = () => {
  const { stories, user, setActiveStoryIndex, setIsCreateModalOpen } = useSocial();

  return (
    <div className="w-full overflow-x-auto py-3 px-4 border-b border-slate-200/80 dark:border-slate-800/80 scrollbar-none">
      <div className="flex items-center gap-3.5 min-w-max">
        
        {/* Current user's story / add story */}
        <button
          onClick={() => {
            // If user has a story, open viewer, otherwise open creator
            setActiveStoryIndex(0);
          }}
          className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-500 group-hover:scale-105 transition-transform">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-950"
                referrerPolicy="no-referrer"
              />
            </div>
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setIsCreateModalOpen(true);
              }}
              className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center border-2 border-white dark:border-slate-950 shadow-sm hover:scale-110 transition-transform"
              title="Añadir a tu historia"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>
          <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 max-w-[68px] truncate">
            Tu historia
          </span>
        </button>

        {/* Stories from other tribe members */}
        {stories.slice(1).map((story, idx) => {
          const arch = ARCHETYPES[story.archetypeId];
          const actualIndex = idx + 1;
          return (
            <button
              key={story.id}
              onClick={() => setActiveStoryIndex(actualIndex)}
              className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none"
            >
              <div className="relative">
                <div
                  className={`w-16 h-16 rounded-full p-0.5 transition-all group-hover:scale-105 ${
                    story.viewed
                      ? 'bg-slate-300 dark:bg-slate-700'
                      : 'bg-gradient-to-tr from-cyan-500 via-pink-500 to-amber-500 animate-gradient'
                  }`}
                >
                  <img
                    src={story.userAvatar}
                    alt={story.userName}
                    className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-950"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {arch && (
                  <span 
                    className="absolute -bottom-1 -right-1 text-xs select-none bg-white dark:bg-slate-900 rounded-full px-0.5 shadow-xs"
                    title={arch.name}
                  >
                    {arch.icon}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 max-w-[68px] truncate">
                {story.userHandle}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
};
