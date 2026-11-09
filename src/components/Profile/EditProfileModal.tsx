import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { ARCHETYPES } from '../../data/mockData';
import { ArchetypeId } from '../../types';
import { X, Sparkles, Check, Music, Link, User, Shield } from 'lucide-react';

export const EditProfileModal: React.FC = () => {
  const { isEditProfileOpen, setIsEditProfileOpen, user, updateUser, addCustomNotification } = useSocial();

  const [name, setName] = useState(user.name);
  const [handle, setHandle] = useState(user.handle);
  const [bio, setBio] = useState(user.bio);
  const [pronouns, setPronouns] = useState(user.pronouns || 'él/he');
  const [website, setWebsite] = useState(user.website || 'https://pulse.network/alex');
  const [archetypeId, setArchetypeId] = useState<ArchetypeId>(user.archetypeId);
  const [themeAura, setThemeAura] = useState<'cyan' | 'amber' | 'emerald' | 'violet' | 'slate'>(user.themeAura);
  const [anthemTitle, setAnthemTitle] = useState(user.anthem?.title || 'Resonance // Neo-Tokyo');
  const [anthemArtist, setAnthemArtist] = useState(user.anthem?.artist || 'HOME & Lorn');
  const [selectedCover, setSelectedCover] = useState(user.coverImage);

  if (!isEditProfileOpen) return null;

  const coverOptions = [
    { label: 'Cyberpunk Tokyo', url: '/src/assets/images/feed_tech_cyberpunk_1794234353608.jpg' },
    { label: 'Streetwear Brutalist', url: '/src/assets/images/feed_streetwear_urban_1794234354462.jpg' },
    { label: 'Minimalist Workspace', url: '/src/assets/images/feed_minimal_aesthetic_1794234354724.jpg' },
    { label: 'Athletic Track Dawn', url: '/src/assets/images/feed_fitness_athlete_1794234355691.jpg' }
  ];

  const auraOptions: Array<{ id: 'cyan' | 'amber' | 'emerald' | 'violet' | 'slate'; label: string; class: string }> = [
    { id: 'cyan', label: 'Cyan Cósmico', class: 'bg-cyan-500' },
    { id: 'amber', label: 'Ámbar Solar', class: 'bg-amber-500' },
    { id: 'emerald', label: 'Esmeralda', class: 'bg-emerald-500' },
    { id: 'violet', label: 'Violeta Tokyo', class: 'bg-purple-500' },
    { id: 'slate', label: 'Grafito Minimal', class: 'bg-slate-500' }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateUser({
      name: name.trim(),
      handle: handle.trim(),
      bio: bio.trim(),
      pronouns: pronouns.trim(),
      website: website.trim(),
      archetypeId,
      themeAura,
      coverImage: selectedCover,
      anthem: {
        title: anthemTitle.trim(),
        artist: anthemArtist.trim()
      }
    });

    addCustomNotification({
      type: 'system',
      actor: {
        name: 'Sistema Pulse',
        handle: 'pulse_system',
        avatar: user.avatar,
        archetypeId
      },
      targetContent: 'Tu perfil personalizable ha sido actualizado y sincronizado en la red.'
    });

    setIsEditProfileOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Personalizar Perfil
            </h2>
          </div>
          <button
            onClick={() => setIsEditProfileOpen(false)}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSave} className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1">
          
          {/* Estereotipo / Arquetipo Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Arquetipo / Estereotipo de Perfil</span>
              <span className="text-[11px] text-blue-600 dark:text-blue-400">Define tu insignia y estilo</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.values(ARCHETYPES).map((arch) => (
                <button
                  key={arch.id}
                  type="button"
                  onClick={() => setArchetypeId(arch.id)}
                  className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-all cursor-pointer flex flex-col justify-between ${
                    archetypeId === arch.id
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 font-semibold ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base">{arch.icon}</span>
                    {archetypeId === arch.id && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                  </div>
                  <span className="truncate text-[11px]">{arch.name.split('&')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Aura Picker */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-900 dark:text-white block">
              Color de Aura de Perfil
            </label>
            <div className="flex items-center gap-3">
              {auraOptions.map((aura) => (
                <button
                  key={aura.id}
                  type="button"
                  onClick={() => setThemeAura(aura.id)}
                  className={`w-8 h-8 rounded-full ${aura.class} flex items-center justify-center transition-transform cursor-pointer ${
                    themeAura === aura.id ? 'ring-4 ring-offset-2 ring-blue-500 dark:ring-offset-slate-950 scale-110' : 'hover:scale-105'
                  }`}
                  title={aura.label}
                >
                  {themeAura === aura.id && <Check className="w-4 h-4 text-white stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Cover Image Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-900 dark:text-white block">
              Foto de Portada
            </label>
            <div className="grid grid-cols-2 gap-2">
              {coverOptions.map((opt) => (
                <div
                  key={opt.url}
                  onClick={() => setSelectedCover(opt.url)}
                  className={`relative h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedCover === opt.url
                      ? 'border-blue-500 ring-2 ring-blue-500/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={opt.url}
                    alt={opt.label}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[11px] font-semibold">
                    {opt.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Name & Handle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Nombre para mostrar
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 outline-none text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Usuario (@handle)
              </label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 outline-none text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Pronouns & Website */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Pronombres
              </label>
              <input
                type="text"
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
                className="w-full text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 outline-none text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Enlace / Portafolio
              </label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 outline-none text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Biografía & Intereses
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 outline-none text-slate-900 dark:text-white resize-none"
            />
          </div>

          {/* Anthem / Spotify mini widget config */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
              <Music className="w-3.5 h-3.5 text-emerald-500" />
              <span>Himno Musical de Perfil (Audio Anthem)</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={anthemTitle}
                onChange={(e) => setAnthemTitle(e.target.value)}
                placeholder="Título de la canción"
                className="w-full text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 outline-none text-slate-900 dark:text-white"
              />
              <input
                type="text"
                value={anthemArtist}
                onChange={(e) => setAnthemArtist(e.target.value)}
                placeholder="Artista / Grupo"
                className="w-full text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 outline-none text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-semibold text-sm shadow-md active:scale-[0.99] transition-all cursor-pointer"
            >
              Guardar Cambios de Perfil
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
