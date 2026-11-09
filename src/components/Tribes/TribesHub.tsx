import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { ARCHETYPES } from '../../data/mockData';
import { ArchetypeId } from '../../types';
import { Users, Sparkles, Compass, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export const TribesHub: React.FC = () => {
  const { 
    tribes, 
    toggleJoinTribe, 
    setSelectedArchetypeFilter, 
    setActiveTab, 
    user, 
    updateUser 
  } = useSocial();

  const [selectedTab, setSelectedTab] = useState<'all' | 'joined'>('all');

  const handleAdoptArchetype = (archId: ArchetypeId) => {
    updateUser({ archetypeId: archId });
  };

  const handleExploreTribeFeed = (archId: ArchetypeId) => {
    setSelectedArchetypeFilter(archId);
    setActiveTab('feed');
  };

  const displayTribes = selectedTab === 'all' 
    ? tribes 
    : tribes.filter(t => t.isJoined);

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-4 sm:px-6 space-y-6">
      
      {/* Hero Banner for Tribus & Estereotipos */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden border border-slate-800 shadow-xl">
        <div className="relative z-10 max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-cyan-400 border border-white/10">
            <Compass className="w-3.5 h-3.5" />
            <span>Tribus Urbanas & Arquetipos 2026</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Descubre tu Estilo & Comunidad
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Explora las subculturas y estereotipos que marcan tendencia en Pulse. Cada tribu cuenta con su propio lenguaje visual, estética de publicaciones y canales dedicados.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <span className="text-xs text-slate-400">Tu arquetipo activo:</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md border border-white/20 flex items-center gap-1.5">
              <span>{ARCHETYPES[user.archetypeId]?.icon}</span>
              <span>{ARCHETYPES[user.archetypeId]?.name}</span>
            </span>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Segmented Filter: All Tribes vs Joined */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              selectedTab === 'all'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Todas las Tribus ({tribes.length})
          </button>
          <button
            onClick={() => setSelectedTab('joined')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              selectedTab === 'joined'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Mis Tribus ({tribes.filter(t => t.isJoined).length})
          </button>
        </div>
      </div>

      {/* Tribus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayTribes.map((tribe) => {
          const arch = ARCHETYPES[tribe.archetypeId];
          const isUserArchetype = user.archetypeId === tribe.archetypeId;

          return (
            <div
              key={tribe.id}
              className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Banner with cover photo */}
              <div className="relative h-32 w-full overflow-hidden bg-slate-800">
                <img
                  src={tribe.bannerUrl}
                  alt={tribe.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl select-none">{arch?.icon}</span>
                    <h3 className="text-base font-bold truncate">{tribe.name}</h3>
                  </div>
                  <span className="text-xs font-mono tabular-nums bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                    {(tribe.memberCount / 1000).toFixed(1)}K miembros
                  </span>
                </div>
              </div>

              {/* Tribe Details */}
              <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    {tribe.tagline}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {tribe.description}
                  </p>

                  {/* Popular tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {arch?.popularTags.map(tag => (
                      <span 
                        key={tag}
                        onClick={() => handleExploreTribeFeed(tribe.archetypeId)}
                        className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Community Rules Preview */}
                  <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                    <div className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Normas de la tribu:</span>
                    </div>
                    <ul className="list-disc list-inside pl-1 text-[11px] text-slate-500 dark:text-slate-400">
                      {tribe.rules.slice(0, 2).map((rule, idx) => (
                        <li key={idx} className="truncate">{rule}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleExploreTribeFeed(tribe.archetypeId)}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Ver Muro</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => toggleJoinTribe(tribe.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      tribe.isJoined
                        ? 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs'
                    }`}
                  >
                    {tribe.isJoined ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Miembro</span>
                      </>
                    ) : (
                      <span>Unirse</span>
                    )}
                  </button>

                  {!isUserArchetype && (
                    <button
                      onClick={() => handleAdoptArchetype(tribe.archetypeId)}
                      className="p-2 rounded-xl text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                      title="Adoptar este estilo en mi perfil"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
