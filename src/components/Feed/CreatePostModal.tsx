import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { ARCHETYPES } from '../../data/mockData';
import { ArchetypeId, PostType } from '../../types';
import { X, Image, MessageSquare, BarChart2, Video, Sparkles, Check } from 'lucide-react';

export const CreatePostModal: React.FC = () => {
  const { isCreateModalOpen, setIsCreateModalOpen, createPost, user, addCustomNotification } = useSocial();
  
  const [postType, setPostType] = useState<PostType>('photo');
  const [content, setContent] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeId>(user.archetypeId);
  const [selectedImage, setSelectedImage] = useState<string>('/src/assets/images/feed_tech_cyberpunk_1794234353608.jpg');
  const [tagsInput, setTagsInput] = useState('#Tech #MetaSocial');
  
  // Poll state
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['Opción 1', 'Opción 2']);

  if (!isCreateModalOpen) return null;

  const availableSampleImages = [
    { label: 'Cyberpunk Tokyo', url: '/src/assets/images/feed_tech_cyberpunk_1794234353608.jpg' },
    { label: 'Streetwear Drop', url: '/src/assets/images/feed_streetwear_urban_1794234354462.jpg' },
    { label: 'Minimalist Workspace', url: '/src/assets/images/feed_minimal_aesthetic_1794234354724.jpg' },
    { label: 'Fitness Track', url: '/src/assets/images/feed_fitness_athlete_1794234355691.jpg' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const parsedTags = tagsInput
      .split(' ')
      .map(t => t.trim())
      .filter(t => t.startsWith('#'));

    const newPostData: any = {
      author: {
        id: user.id,
        name: user.name,
        handle: user.handle,
        avatar: user.avatar,
        archetypeId: selectedArchetype,
        verified: user.verified
      },
      type: postType,
      content: content.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['#PulseSocial'],
      mediaUrl: (postType === 'photo' || postType === 'video') ? selectedImage : undefined
    };

    if (postType === 'poll' && pollQuestion.trim()) {
      newPostData.poll = {
        question: pollQuestion.trim(),
        options: pollOptions.filter(o => o.trim()).map(text => ({ text, votes: 0 })),
        totalVotes: 0
      };
    }

    createPost(newPostData);
    
    // Add real-time notification
    addCustomNotification({
      type: 'system',
      actor: {
        name: 'Pulse Network',
        handle: 'pulse_official',
        avatar: user.avatar,
        archetypeId: selectedArchetype
      },
      targetContent: 'Tu nueva publicación ha sido indexada en la red y transmitida a tu tribu.'
    });

    setIsCreateModalOpen(false);
    setContent('');
    setPollQuestion('');
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, `Opción ${pollOptions.length + 1}`]);
    }
  };

  const handleUpdatePollOption = (idx: number, val: string) => {
    const updated = [...pollOptions];
    updated[idx] = val;
    setPollOptions(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-slate-900 dark:text-white">
              Nueva Publicación
            </span>
            <span className="text-xs text-slate-500">· Pulse Studio</span>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(false)}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          
          {/* Format Selector: Segmented controls (Single-line) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-x-auto">
            <button
              type="button"
              onClick={() => setPostType('photo')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                postType === 'photo'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>Foto</span>
            </button>
            <button
              type="button"
              onClick={() => setPostType('thread')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                postType === 'thread'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Hilo / X</span>
            </button>
            <button
              type="button"
              onClick={() => setPostType('poll')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                postType === 'poll'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Encuesta</span>
            </button>
          </div>

          {/* Archetype / Tribe Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Etiquetar con Estereotipo / Tribu</span>
              <span className="text-[11px] text-slate-500">Audiencia recomendada</span>
            </label>
            <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none">
              {Object.values(ARCHETYPES).map(arch => (
                <button
                  key={arch.id}
                  type="button"
                  onClick={() => setSelectedArchetype(arch.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer border ${
                    selectedArchetype === arch.id
                      ? `${arch.borderColor} bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold ring-2 ring-blue-500/30`
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <span>{arch.icon}</span>
                  <span className="whitespace-nowrap">{arch.name.split('&')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Preview Row */}
          <div className="flex items-center gap-2.5 pt-1">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                {user.name} <span className="font-normal text-slate-500">@{user.handle}</span>
              </p>
              <p className="text-[10px] text-blue-600 dark:text-blue-400">
                Compartiendo en {ARCHETYPES[selectedArchetype]?.name}
              </p>
            </div>
          </div>

          {/* Textarea */}
          <div>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                postType === 'thread'
                  ? 'Escribe tu hilo o pensamiento al estilo X/Threads...'
                  : '¿Qué estás explorando hoy? Comparte tus ideas con la comunidad...'
              }
              className="w-full text-sm bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 outline-none focus:border-blue-500 dark:focus:border-blue-400 text-slate-900 dark:text-white placeholder-slate-400 resize-none transition-colors"
            />
            <div className="flex justify-between items-center text-[11px] text-slate-400 px-1 mt-1">
              <span>{postType === 'thread' ? 'Modo microblogging optimizado' : 'Texto libre'}</span>
              <span className="font-mono tabular-nums">{content.length} caracteres</span>
            </div>
          </div>

          {/* Photo Selector if type === photo */}
          {postType === 'photo' && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Seleccionar Fotografía de Alta Definición
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableSampleImages.map(img => (
                  <div
                    key={img.url}
                    onClick={() => setSelectedImage(img.url)}
                    className={`relative rounded-xl overflow-hidden aspect-4/3 cursor-pointer border-2 transition-all ${
                      selectedImage === img.url
                        ? 'border-blue-500 ring-2 ring-blue-500/40 scale-[1.02]'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1.5 text-[10px] text-white truncate font-medium">
                      {img.label}
                    </div>
                    {selectedImage === img.url && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Poll Builder if type === poll */}
          {postType === 'poll' && (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Pregunta de la Encuesta
                </label>
                <input
                  type="text"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  placeholder="Ej: ¿Qué prefieres para programar?"
                  className="w-full text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  Opciones
                </label>
                {pollOptions.map((opt, i) => (
                  <input
                    key={i}
                    type="text"
                    value={opt}
                    onChange={(e) => handleUpdatePollOption(i, e.target.value)}
                    placeholder={`Opción ${i + 1}`}
                    className="w-full text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 outline-none text-slate-900 dark:text-white"
                  />
                ))}
                {pollOptions.length < 4 && (
                  <button
                    type="button"
                    onClick={handleAddPollOption}
                    className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer"
                  >
                    + Añadir otra opción
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Hashtags de la red
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="#Cyberpunk #Design #Streetwear"
              className="w-full text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 outline-none text-slate-900 dark:text-white"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!content.trim()}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:opacity-95 disabled:opacity-40 text-white font-semibold text-sm shadow-md active:scale-[0.99] transition-all cursor-pointer"
            >
              Publicar en Pulse
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
