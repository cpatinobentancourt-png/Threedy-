import React, { useState, useEffect } from 'react';
import { useSocial } from '../../context/SocialContext';
import { ARCHETYPES } from '../../data/mockData';
import { 
  Send, 
  Mic, 
  Phone, 
  Video, 
  MoreVertical, 
  CheckCheck, 
  Play, 
  Pause, 
  ArrowLeft,
  Smile,
  Paperclip
} from 'lucide-react';

export const ChatDrawer: React.FC = () => {
  const { 
    conversations, 
    activeChatId, 
    setActiveChatId, 
    sendMessage, 
    user 
  } = useSocial();

  const [inputText, setInputText] = useState('');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioPlaybackSec, setAudioPlaybackSec] = useState(0);

  const selectedConv = conversations.find(c => c.id === activeChatId) || conversations[0];

  // Simulated audio playback ticker
  useEffect(() => {
    let interval: any;
    if (playingAudioId) {
      interval = setInterval(() => {
        setAudioPlaybackSec(prev => {
          if (prev >= 24) {
            setPlayingAudioId(null);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setAudioPlaybackSec(0);
    }
    return () => clearInterval(interval);
  }, [playingAudioId]);

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedConv) return;
    sendMessage(selectedConv.id, inputText.trim());
    setInputText('');
  };

  const handleSendVoiceNote = () => {
    if (!selectedConv) return;
    sendMessage(selectedConv.id, '', true, '0:18');
  };

  const togglePlayAudio = (msgId: string) => {
    if (playingAudioId === msgId) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(msgId);
      setAudioPlaybackSec(0);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto h-[calc(100vh-8.5rem)] lg:h-[750px] my-2 bg-white dark:bg-slate-950 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm flex flex-col md:flex-row">
      
      {/* Contact Conversations List (WhatsApp style) */}
      <div className={`w-full md:w-80 shrink-0 border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col ${
        activeChatId ? 'hidden md:flex' : 'flex'
      }`}>
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Chats en Vivo
            </h2>
            <p className="text-xs text-slate-500">
              Inspirado en WhatsApp Direct
            </p>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            {conversations.length} activos
          </span>
        </div>

        {/* Contact list items */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-900">
          {conversations.map((conv) => {
            const isSelected = selectedConv?.id === conv.id;
            const arch = ARCHETYPES[conv.contact.archetypeId];

            return (
              <div
                key={conv.id}
                onClick={() => setActiveChatId(conv.id)}
                className={`flex items-center gap-3 p-3.5 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-slate-100 dark:bg-slate-900'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={conv.contact.avatar}
                    alt={conv.contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {conv.contact.online ? (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full" />
                  ) : (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-slate-400 border-2 border-white dark:border-slate-950 rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {conv.contact.name}
                      </span>
                      {arch && <span className="text-xs shrink-0">{arch.icon}</span>}
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono shrink-0">
                      {conv.lastMessageTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate pr-2">
                      {conv.lastMessage}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="min-w-[18px] h-[18px] rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center px-1 shrink-0">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Conversation Chat Window */}
      {selectedConv ? (
        <div className={`flex-1 flex flex-col bg-slate-50/50 dark:bg-slate-950/40 ${
          activeChatId ? 'flex' : 'hidden md:flex'
        }`}>
          
          {/* WhatsApp style Chat Header */}
          <div className="p-3.5 px-4 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveChatId(null)}
                className="md:hidden p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="relative">
                <img
                  src={selectedConv.contact.avatar}
                  alt={selectedConv.contact.name}
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {selectedConv.contact.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {selectedConv.contact.name}
                  </span>
                  <span className="text-xs">
                    {ARCHETYPES[selectedConv.contact.archetypeId]?.icon}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {selectedConv.contact.online ? 'En línea' : selectedConv.contact.lastSeen || 'Desconectado'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <button 
                onClick={() => alert(`Llamada de voz cifrada iniciada con ${selectedConv.contact.name}`)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                title="Llamada de voz"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button 
                onClick={() => alert(`Videollamada en alta definición iniciada con ${selectedConv.contact.name}`)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                title="Videollamada"
              >
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            <div className="text-center my-2">
              <span className="text-[11px] text-slate-500 bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-full">
                🔒 Cifrado de extremo a extremo · Pulse Network
              </span>
            </div>

            {selectedConv.messages.map((msg) => {
              const isMe = msg.senderId === user.id;

              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 space-y-1 shadow-xs ${
                      isMe
                        ? 'bg-blue-600 dark:bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800/80 rounded-tl-xs'
                    }`}
                  >
                    {/* Audio Voice Note Bubble */}
                    {msg.isAudio ? (
                      <div className="flex items-center gap-3 py-1">
                        <button
                          onClick={() => togglePlayAudio(msg.id)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer ${
                            isMe
                              ? 'bg-white/20 text-white hover:bg-white/30'
                              : 'bg-blue-600 text-white hover:bg-blue-500'
                          }`}
                        >
                          {playingAudioId === msg.id ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4 ml-0.5" />
                          )}
                        </button>

                        <div className="flex-1 space-y-1">
                          {/* Simulated audio waveform */}
                          <div className="flex items-center gap-0.5 h-6">
                            {[40, 70, 30, 90, 60, 100, 50, 80, 45, 95, 30, 75, 55, 85].map((h, i) => (
                              <div
                                key={i}
                                className={`w-1 rounded-full transition-all ${
                                  playingAudioId === msg.id && i < audioPlaybackSec
                                    ? 'bg-emerald-400'
                                    : isMe ? 'bg-white/60' : 'bg-slate-400 dark:bg-slate-600'
                                }`}
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>
                          <div className="flex justify-between text-[10px] opacity-80 font-mono">
                            <span>{playingAudioId === msg.id ? `0:${audioPlaybackSec.toString().padStart(2, '0')}` : msg.audioDuration}</span>
                            <span>Nota de voz</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                        {msg.text}
                      </p>
                    )}

                    {/* Metadata & Status */}
                    <div className="flex items-center justify-end gap-1 text-[10px] opacity-75">
                      <span className="font-mono">{msg.timestamp}</span>
                      {isMe && (
                        <CheckCheck className="w-3.5 h-3.5 text-cyan-300 stroke-[2.5]" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendText} className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2">
            
            <button
              type="button"
              onClick={handleSendVoiceNote}
              className="p-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              title="Enviar nota de voz rápida"
            >
              <Mic className="w-5 h-5 text-red-500 animate-pulse" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe un mensaje en tiempo real..."
              className="flex-1 text-xs sm:text-sm bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-blue-500 rounded-full px-4 py-2.5 outline-none text-slate-900 dark:text-white placeholder-slate-400 transition-all"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Enviar mensaje"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>

        </div>
      ) : (
        <div className="flex-1 hidden md:flex items-center justify-center p-8 text-center text-slate-400">
          <p>Selecciona un chat para iniciar la conversación</p>
        </div>
      )}

    </div>
  );
};
