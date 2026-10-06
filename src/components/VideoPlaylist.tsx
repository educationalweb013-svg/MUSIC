import React, { useState, useMemo } from 'react';
import { VideoItem } from '../types/video';
import { SearchBar } from './SearchBar';
import { VideoCard } from './VideoCard';
import { Music, AlertCircle, RefreshCw } from 'lucide-react';

interface VideoPlaylistProps {
  videos: VideoItem[];
  selectedVideo: VideoItem;
  onSelectVideo: (video: VideoItem) => void;
  playlistRef?: React.RefObject<HTMLDivElement | null>;
}

export const VideoPlaylist: React.FC<VideoPlaylistProps> = ({
  videos,
  selectedVideo,
  onSelectVideo,
  playlistRef,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter videos based on title, artist, or number
  const filteredVideos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return videos;

    return videos.filter((v) => {
      const matchTitle = v.title.toLowerCase().includes(q);
      const matchArtist = v.artist.toLowerCase().includes(q);
      const matchNumber = String(v.number).includes(q);
      const matchGenre = v.genre?.toLowerCase().includes(q);
      return matchTitle || matchArtist || matchNumber || matchGenre;
    });
  }, [videos, searchQuery]);

  return (
    <section ref={playlistRef} className="w-full space-y-5 pt-4">
      {/* Header section with title and search bar */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Music className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Playlist Queue
              </h3>
              <p className="text-xs text-slate-400">
                Click any track to play instantly in the main player
              </p>
            </div>
          </div>
        </div>

        {/* Search bar & filter view toggle */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredVideos.length}
          totalCount={videos.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </div>

      {/* Playlist Content */}
      {filteredVideos.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isSelected={video.id === selectedVideo.id}
                onSelect={onSelectVideo}
                viewMode="grid"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isSelected={video.id === selectedVideo.id}
                onSelect={onSelectVideo}
                viewMode="list"
              />
            ))}
          </div>
        )
      ) : (
        /* Empty Search State */
        <div className="rounded-2xl border border-white/5 bg-[#141622] p-8 sm:p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-slate-400 mb-4">
            <AlertCircle className="h-7 w-7 text-rose-400" />
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white">
            No music videos found
          </h4>
          <p className="mt-1 text-sm text-slate-400 max-w-sm mx-auto">
            We couldn't find any videos matching &quot;{searchQuery}&quot;. Try searching for an artist name or song title.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-rose-950/40 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset Search
          </button>
        </div>
      )}
    </section>
  );
};
