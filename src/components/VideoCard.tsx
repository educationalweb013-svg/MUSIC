import React, { useState } from 'react';
import { Play, Volume2, Clock, CheckCircle2 } from 'lucide-react';
import { VideoItem } from '../types/video';
import { getYoutubeThumbnailUrl } from '../data/videos';

interface VideoCardProps {
  video: VideoItem;
  isSelected: boolean;
  onSelect: (video: VideoItem) => void;
  viewMode: 'grid' | 'list';
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isSelected,
  onSelect,
  viewMode,
}) => {
  const [imgSrc, setImgSrc] = useState(getYoutubeThumbnailUrl(video.id));
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    // If hqdefault fails, try mqdefault or fallback
    if (!imgError) {
      setImgError(true);
      setImgSrc(`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(video);
    }
  };

  if (viewMode === 'list') {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(video)}
        onKeyDown={handleKeyDown}
        aria-selected={isSelected}
        aria-label={`Play track ${video.number}: ${video.title} by ${video.artist}`}
        className={`group relative flex items-center gap-3 sm:gap-4 rounded-xl p-2.5 sm:p-3 transition-all cursor-pointer border text-left outline-none ${
          isSelected
            ? 'border-rose-500/80 bg-rose-500/10 shadow-lg shadow-rose-950/20 ring-1 ring-rose-500/40'
            : 'border-white/5 bg-[#141622]/80 hover:border-white/15 hover:bg-[#181b2a] focus-visible:border-rose-500'
        }`}
      >
        {/* Track Number / Equalizer indicator */}
        <div className="flex w-7 sm:w-8 shrink-0 items-center justify-center text-center">
          {isSelected ? (
            <div className="flex items-end gap-[3px] h-4">
              <span className="w-1 bg-rose-500 rounded-full animate-eq-1" />
              <span className="w-1 bg-rose-400 rounded-full animate-eq-2" />
              <span className="w-1 bg-rose-500 rounded-full animate-eq-3" />
            </div>
          ) : (
            <span className="font-mono text-xs sm:text-sm font-bold text-slate-400 group-hover:text-rose-400 transition-colors">
              {String(video.number).padStart(2, '0')}
            </span>
          )}
        </div>

        {/* Thumbnail */}
        <div className="relative aspect-video w-24 sm:w-32 shrink-0 overflow-hidden rounded-lg bg-black">
          <img
            src={imgSrc}
            alt={`Thumbnail for ${video.title}`}
            onError={handleImageError}
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-300 ${
              isSelected ? 'scale-105' : 'group-hover:scale-105'
            }`}
          />
          {/* Overlay Play Icon */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${
              isSelected ? 'opacity-100 bg-rose-900/40' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform ${
                isSelected
                  ? 'bg-rose-500 text-white scale-110 shadow-md'
                  : 'bg-white/90 text-slate-900 group-hover:scale-100'
              }`}
            >
              <Play className="h-4 w-4 fill-current ml-0.5" />
            </div>
          </div>

          {video.duration && (
            <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[10px] font-mono text-slate-200">
              {video.duration}
            </span>
          )}
        </div>

        {/* Title and details */}
        <div className="min-w-0 flex-1 space-y-0.5">
          <div className="flex items-center gap-2">
            <h3
              className={`truncate text-sm sm:text-base font-bold transition-colors ${
                isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
              }`}
            >
              {video.title}
            </h3>
            {isSelected && (
              <span className="hidden sm:inline-flex items-center rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-400 shrink-0">
                Playing
              </span>
            )}
          </div>
          <p className="truncate text-xs text-slate-400 group-hover:text-slate-300">
            {video.artist}
          </p>
          {video.genre && (
            <p className="hidden md:block truncate text-[11px] text-slate-400">
              {video.genre}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="shrink-0 pr-1">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border transition-all ${
              isSelected
                ? 'border-rose-500/40 bg-rose-600 text-white shadow-md shadow-rose-950/40'
                : 'border-white/10 bg-white/5 text-slate-300 group-hover:border-white/20 group-hover:bg-rose-600 group-hover:text-white'
            }`}
          >
            <Play className="h-4 w-4 fill-current ml-0.5" />
          </button>
        </div>
      </div>
    );
  }

  // Grid layout (optimized for tablet landscape / desktop)
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(video)}
      onKeyDown={handleKeyDown}
      aria-selected={isSelected}
      aria-label={`Play track ${video.number}: ${video.title} by ${video.artist}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-200 cursor-pointer outline-none ${
        isSelected
          ? 'border-rose-500/80 bg-[#161826] shadow-xl shadow-rose-950/30 ring-2 ring-rose-500/40'
          : 'border-white/10 bg-[#13151f] hover:border-white/20 hover:bg-[#181b28] hover:-translate-y-1 focus-visible:border-rose-500'
      }`}
    >
      {/* Video Thumbnail with 16:9 Aspect Ratio */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <img
          src={imgSrc}
          alt={`Thumbnail for ${video.title}`}
          onError={handleImageError}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-300 ${
            isSelected ? 'scale-105' : 'group-hover:scale-105'
          }`}
        />

        {/* Video number pill badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-lg bg-black/75 px-2.5 py-1 text-xs font-mono font-bold text-white backdrop-blur-sm border border-white/10">
          <span>#{String(video.number).padStart(2, '0')}</span>
        </div>

        {/* Duration badge */}
        {video.duration && (
          <div className="absolute bottom-2.5 right-2.5 rounded bg-black/80 px-2 py-0.5 text-xs font-mono text-slate-200 backdrop-blur-sm">
            {video.duration}
          </div>
        )}

        {/* Overlay Play Action button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity ${
            isSelected
              ? 'bg-rose-950/40 opacity-100'
              : 'bg-black/30 opacity-0 group-hover:opacity-100'
          }`}
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 ${
              isSelected
                ? 'bg-rose-500 text-white scale-110 shadow-lg shadow-rose-950/60'
                : 'bg-white/95 text-slate-900 group-hover:scale-105 shadow-lg'
            }`}
          >
            <Play className="h-6 w-6 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Info card footer */}
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3
              className={`line-clamp-1 text-sm sm:text-base font-bold transition-colors ${
                isSelected ? 'text-white' : 'text-slate-100 group-hover:text-rose-300'
              }`}
            >
              {video.title}
            </h3>
            {isSelected && (
              <div className="flex items-end gap-[2px] h-3.5 shrink-0" title="Now playing">
                <span className="w-1 bg-rose-500 rounded-full animate-eq-1" />
                <span className="w-1 bg-rose-400 rounded-full animate-eq-2" />
                <span className="w-1 bg-rose-500 rounded-full animate-eq-3" />
              </div>
            )}
          </div>
          <p className="mt-1 line-clamp-1 text-xs sm:text-sm font-medium text-slate-400 group-hover:text-slate-300">
            {video.artist}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-400">
          <span>{video.genre || 'Music Video'}</span>
          <span className="font-semibold text-rose-400 group-hover:translate-x-0.5 transition-transform">
            {isSelected ? 'Playing now' : 'Play video →'}
          </span>
        </div>
      </div>
    </div>
  );
};
