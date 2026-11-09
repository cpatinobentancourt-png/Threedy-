import React, { useState } from 'react';
import { Post } from '../../types';
import { useSocial } from '../../context/SocialContext';
import { ARCHETYPES } from '../../data/mockData';
import { Heart, MessageCircle, Repeat2, Bookmark, Share2, Send, CheckCircle2 } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { 
    toggleLikePost, 
    toggleSavePost, 
    toggleRepost, 
    addComment, 
    votePoll, 
    setSelectedArchetypeFilter, 
    user 
  } = useSocial();

  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const archetype = ARCHETYPES[post.author.archetypeId] || ARCHETYPES.tech_cyber;

  const handleDoubleTapPhoto = () => {
    if (!post.isLiked) {
      toggleLikePost(post.id);
    }
    setShowHeartOverlay(true);
    setTimeout(() => setShowHeartOverlay(false), 800);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(post.id, commentInput);
    setCommentInput('');
    setIsCommentsExpanded(true);
  };

  const handleShare = async () => {
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <article className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 transition-colors">
      <div className="p-4 sm:p-5 space-y-3.5">
        
        {/* Post Header: Author lockup & metadata */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span 
                className="absolute -bottom-1 -right-1 text-xs select-none bg-white dark:bg-slate-900 rounded-full px-0.5 shadow-xs"
                title={archetype.name}
              >
                {archetype.icon}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                  {post.author.name}
                </span>
                {post.author.verified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/20" />
                )}
                {/* Archetype clickable filter tag */}
                <button
                  onClick={() => setSelectedArchetypeFilter(post.author.archetypeId)}
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-md cursor-pointer transition-colors ${archetype.vibePillColor} bg-slate-100 dark:bg-slate-900`}
                >
                  {archetype.name.split('&')[0]}
                </button>
              </div>

              {/* Zero-pill unboxed metadata with separators */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span>@{post.author.handle}</span>
                <span aria-hidden="true">·</span>
                <span>{post.timestamp}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <p className="text-sm sm:text-[15px] text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>

        {/* Media Photo Showcase with double-tap heart */}
        {post.mediaUrl && post.type === 'photo' && (
          <div
            onDoubleClick={handleDoubleTapPhoto}
            className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 group cursor-pointer aspect-4/3"
          >
            <img
              src={post.mediaUrl}
              alt="Publicación"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
            />

            {/* Flying heart animation on double tap */}
            {showHeartOverlay && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-ping">
                <Heart className="w-20 h-20 text-red-500 fill-red-500 drop-shadow-md" />
              </div>
            )}
          </div>
        )}

        {/* Interactive Poll Layout */}
        {post.poll && (
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2.5">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {post.poll.question}
            </p>
            <div className="space-y-2">
              {post.poll.options.map((opt, idx) => {
                const total = post.poll?.totalVotes || 1;
                const percentage = Math.round((opt.votes / total) * 100);
                const hasVoted = post.poll?.userVote !== undefined;
                const isUserChoice = post.poll?.userVote === idx;

                return (
                  <button
                    key={idx}
                    disabled={hasVoted}
                    onClick={() => votePoll(post.id, idx)}
                    className={`relative w-full text-left p-3 rounded-xl border text-xs font-medium overflow-hidden transition-all cursor-pointer ${
                      isUserChoice
                        ? 'border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 font-semibold'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {/* Background Progress fill when voted */}
                    {hasVoted && (
                      <div
                        className="absolute inset-y-0 left-0 bg-blue-500/15 dark:bg-blue-400/20 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isUserChoice && <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>}
                        <span>{opt.text}</span>
                      </div>
                      {hasVoted && (
                        <span className="font-mono tabular-nums text-slate-600 dark:text-slate-400">
                          {percentage}%
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1">
              <span className="font-mono tabular-nums">
                {post.poll.totalVotes} votos totales
              </span>
              <span>
                {post.poll.userVote !== undefined ? 'Tu voto ha sido registrado' : 'Toca una opción para votar'}
              </span>
            </div>
          </div>
        )}

        {/* Tags row */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Toolbar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-900 text-slate-600 dark:text-slate-400">
          
          {/* Like */}
          <button
            onClick={() => toggleLikePost(post.id)}
            className={`flex items-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer group ${
              post.isLiked ? 'text-red-500' : 'hover:text-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/30'
            }`}
          >
            <Heart className={`w-4 h-4 transition-transform group-active:scale-125 ${post.isLiked ? 'fill-red-500' : ''}`} />
            <span className="font-mono tabular-nums">{post.likes}</span>
          </button>

          {/* Comment */}
          <button
            onClick={() => setIsCommentsExpanded(!isCommentsExpanded)}
            className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium hover:text-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="font-mono tabular-nums">{post.commentsCount}</span>
          </button>

          {/* Repost (X style) */}
          <button
            onClick={() => toggleRepost(post.id)}
            className={`flex items-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              post.isReposted ? 'text-emerald-500' : 'hover:text-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30'
            }`}
          >
            <Repeat2 className="w-4 h-4" />
            <span className="font-mono tabular-nums">{post.reposts}</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={() => toggleSavePost(post.id)}
            className={`flex items-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              post.isSaved ? 'text-amber-500' : 'hover:text-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/30'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-amber-500' : ''}`} />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="relative flex items-center py-1.5 px-2 rounded-lg text-xs font-medium hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
            title="Compartir enlace"
          >
            <Share2 className="w-4 h-4" />
            {copyFeedback && (
              <span className="absolute -top-7 right-0 text-[10px] bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                ¡Enlace copiado!
              </span>
            )}
          </button>
        </div>

        {/* Expandable Comments Drawer */}
        {isCommentsExpanded && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-900 space-y-3">
            
            {/* New Comment Input */}
            <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Escribe una respuesta o comentario..."
                className="flex-1 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-3.5 py-2 outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="p-2 rounded-full bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-500 transition-all cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* List of existing comments */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {post.comments.length === 0 ? (
                <p className="text-xs text-slate-400 py-2 text-center">
                  Aún no hay comentarios. ¡Sé el primero en iniciar la conversación!
                </p>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2.5 text-xs">
                    <img
                      src={comment.userAvatar}
                      alt={comment.userName}
                      className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 bg-slate-50 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {comment.userName}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

      </div>
    </article>
  );
};
