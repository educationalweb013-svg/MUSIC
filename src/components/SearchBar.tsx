import React from 'react';
import { Search, X, ListFilter, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
  totalCount: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  resultCount,
  totalCount,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input container */}
        <div className="relative flex-1">
          <label htmlFor="video-search-input" className="sr-only">
            Search music videos
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            id="video-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, artist, or number (e.g., 'Aschalew', 'Gonder', '1')..."
            className="w-full rounded-xl border border-white/10 bg-[#161822] py-3 pl-10 pr-10 text-sm text-white placeholder-slate-400 shadow-inner transition-all focus:border-rose-500 focus:bg-[#1a1d29] focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Clear search"
              aria-label="Clear search query"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                <X className="h-3 w-3" />
              </div>
            </button>
          )}
        </div>

        {/* View mode toggle (Grid vs Compact List) */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <div className="text-xs font-medium text-slate-400">
            {searchQuery ? (
              <span>
                Found <strong className="text-rose-400">{resultCount}</strong> of {totalCount}
              </span>
            ) : (
              <span>
                <strong className="text-slate-200">{totalCount}</strong> videos in playlist
              </span>
            )}
          </div>

          {/* Segmented button toggle */}
          <div className="flex items-center rounded-xl border border-white/10 bg-[#141620] p-1">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              aria-label="Grid layout"
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
              title="Grid view"
            >
              Grid
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              aria-label="List layout"
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
              title="List view"
            >
              List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
