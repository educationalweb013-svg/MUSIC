import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { VideoPlayer } from './components/VideoPlayer';
import { VideoPlaylist } from './components/VideoPlaylist';
import { MUSIC_VIDEOS } from './data/videos';
import { VideoItem } from './types/video';
import { Radio, Headphones, Play, Sparkles, ChevronUp } from 'lucide-react';

export default function App() {
  // First video is selected by default on load
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(MUSIC_VIDEOS[0]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const playerSectionRef = useRef<HTMLDivElement>(null);
  const playlistSectionRef = useRef<HTMLDivElement>(null);

  // Current video index
  const currentIndex = MUSIC_VIDEOS.findIndex((v) => v.id === selectedVideo.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < MUSIC_VIDEOS.length - 1;

  const handleNext = useCallback(() => {
    if (hasNext) {
      const nextVideo = MUSIC_VIDEOS[currentIndex + 1];
      setSelectedVideo(nextVideo);
    }
  }, [currentIndex, hasNext]);

  const handlePrev = useCallback(() => {
    if (hasPrev) {
      const prevVideo = MUSIC_VIDEOS[currentIndex - 1];
      setSelectedVideo(prevVideo);
    }
  }, [currentIndex, hasPrev]);

  // When a user selects a video from the playlist
  const handleSelectVideo = useCallback((video: VideoItem) => {
    setSelectedVideo(video);
    // On mobile / tablet view, smoothly scroll up to the video player if below it
    if (window.innerWidth < 1024 && playerSectionRef.current) {
      playerSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Scroll to playlist
  const handleScrollToPlaylist = () => {
    if (playlistSectionRef.current) {
      playlistSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Track scroll position for "Back to top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for Previous / Next track
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in search bar
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key === 'ArrowRight' && hasNext) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, hasNext, hasPrev]);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* 1. Header */}
      <Header
        totalCount={MUSIC_VIDEOS.length}
        currentTitle={selectedVideo.title}
        onScrollToPlaylist={handleScrollToPlaylist}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-12">
        {/* 2. Large Video Player Section */}
        <div ref={playerSectionRef} className="scroll-mt-20">
          <VideoPlayer
            currentVideo={selectedVideo}
            totalVideos={MUSIC_VIDEOS.length}
            onNext={handleNext}
            onPrev={handlePrev}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        </div>

        {/* 3. Video Playlist Section Underneath Player */}
        <div ref={playlistSectionRef} className="scroll-mt-20">
          <VideoPlaylist
            videos={MUSIC_VIDEOS}
            selectedVideo={selectedVideo}
            onSelectVideo={handleSelectVideo}
          />
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="mt-16 border-t border-white/5 bg-[#090a0d] py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="brand-font font-bold text-white tracking-widest text-sm">
              MUSIC
            </span>
            <span>·</span>
            <span>All rights belong to their respective artists & YouTube creators</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Powered by YouTube Embed API</span>
            <span>·</span>
            <span>{MUSIC_VIDEOS.length} Tracks Available</span>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-rose-600 text-white shadow-xl shadow-rose-950/60 hover:bg-rose-500 active:scale-95 transition-all cursor-pointer"
          title="Back to top"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
