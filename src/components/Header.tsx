import React from 'react';
import { Music2, PlayCircle, Sparkles } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  currentTitle?: string;
  onScrollToPlaylist?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalCount,
  currentTitle,
  onScrollToPlaylist,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#0b0c10]/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:py-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 via-pink-600 to-indigo-600 text-white shadow-lg shadow-rose-950/40">
            <Music2 className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h1 className="brand-font text-2xl font-black tracking-wider text-white sm:text-3xl">
                MUSIC
              </h1>
              <span className="hidden text-xs font-semibold uppercase tracking-widest text-rose-400 sm:inline-block">
                STREAM
              </span>
            </div>
            <p className="hidden text-xs text-slate-400 md:block">
              Curated High-Definition Music Video Experience
            </p>
          </div>
        </div>

        {/* Right Info / Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {currentTitle && (
            <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 max-w-[280px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
              </span>
              <span className="truncate font-medium">{currentTitle}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="rounded-lg bg-white/5 px-2.5 py-1 font-mono font-medium text-slate-300 border border-white/10">
              {totalCount} Tracks
            </span>
          </div>

          {onScrollToPlaylist && (
            <button
              onClick={onScrollToPlaylist}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors shadow-sm cursor-pointer"
              title="Jump to playlist"
            >
              <PlayCircle className="h-3.5 w-3.5" />
              <span>Playlist</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
