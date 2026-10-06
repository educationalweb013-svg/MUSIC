import React, { useState } from 'react';
import {
  ExternalLink,
  SkipBack,
  SkipForward,
  Share2,
  Check,
  AlertCircle,
  Tv,
  Volume2,
  Disc3,
  Calendar,
  Clock,
} from 'lucide-react';
import { VideoItem } from '../types/video';
import { getYoutubeEmbedUrl, getYoutubeWatchUrl } from '../data/videos';

interface VideoPlayerProps {
  currentVideo: VideoItem;
  totalVideos: number;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  currentVideo,
  totalVideos,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
}) => {
  const [copied, setCopied] = useState(false);
  const [showTroubleshoot, setShowTroubleshoot] = useState(false);

  const watchUrl = getYoutubeWatchUrl(currentVideo.id);
  const embedUrl = getYoutubeEmbedUrl(currentVideo.id, true);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(watchUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
      setCopied(false);
    }
  };

  return (
    <section className="w-full">
      {/* Ambient background glow */}
      <div className="relative mx-auto max-w-5xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1 sm:-inset-2 rounded-3xl bg-gradient-to-r from-rose-600/15 via-purple-600/15 to-indigo-600/15 blur-2xl opacity-70"
        />

        {/* Player Container */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#12141c] shadow-2xl shadow-black/80">
          {/* Main 16:9 Video Frame */}
          <div className="relative w-full aspect-video bg-black flex items-center justify-center">
            <iframe
              key={currentVideo.id}
              className="absolute inset-0 h-full w-full border-0"
              src={embedUrl}
              title={`${currentVideo.title} - ${currentVideo.artist}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Under-Player Metadata & Control Bar */}
          <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-b from-[#151824] to-[#10121a]">
            {/* Top row: Track badges & actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-md bg-rose-500/15 border border-rose-500/30 px-2.5 py-1 text-xs font-bold tracking-wider text-rose-400">
                  <Disc3 className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                  TRACK {String(currentVideo.number).padStart(2, '0')} / {String(totalVideos).padStart(2, '0')}
                </span>
                {currentVideo.genre && (
                  <span className="hidden sm:inline-block text-xs text-slate-400 font-medium">
                    {currentVideo.genre}
                  </span>
                )}
              </div>

              {/* Quick Action buttons */}
              <div className="flex items-center gap-2">
                {/* Troubleshoot / Fallback notice toggle */}
                <button
                  type="button"
                  onClick={() => setShowTroubleshoot((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    showTroubleshoot
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10 border border-white/5'
                  }`}
                  title="Video playback helper"
                >
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span className="hidden xs:inline">Playback Help</span>
                </button>

                {/* Share Link button */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  title="Copy video link"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3.5 w-3.5" />
                      <span className="hidden xs:inline">Share</span>
                    </>
                  )}
                </button>

                {/* Direct YouTube watch button */}
                <a
                  href={watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 hover:bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-red-950/40 transition-colors"
                  title="Open video on YouTube"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>

            {/* Error/Notice Banner for embedding restrictions */}
            {showTroubleshoot && (
              <div className="my-3 rounded-xl border border-amber-500/30 bg-amber-950/30 p-3 sm:p-4 text-xs sm:text-sm text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-300">
                      If this video cannot be played here because of YouTube restrictions:
                    </p>
                    <p className="text-amber-200/80 text-xs mt-0.5">
                      Some YouTube music distributors disable embedded playback on 3rd-party sites. You can watch it directly on YouTube with one tap.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <a
                    href={watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-950 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open on YouTube
                  </a>
                  <button
                    type="button"
                    onClick={onNext}
                    className="inline-flex items-center gap-1 rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    Next Video
                  </button>
                </div>
              </div>
            )}

            {/* Main Title & Track Navigation Controls */}
            <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {currentVideo.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                  <span className="font-semibold text-rose-400">{currentVideo.artist}</span>
                  {currentVideo.duration && (
                    <span className="flex items-center gap-1 text-slate-400 text-xs">
                      <Clock className="h-3 w-3" />
                      {currentVideo.duration}
                    </span>
                  )}
                  {currentVideo.year && (
                    <span className="flex items-center gap-1 text-slate-400 text-xs">
                      <Calendar className="h-3 w-3" />
                      {currentVideo.year}
                    </span>
                  )}
                </div>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={onPrev}
                  disabled={!hasPrev}
                  aria-label="Previous video"
                  className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-white/10 transition-all ${
                    hasPrev
                      ? 'bg-white/5 text-slate-200 hover:bg-white/15 hover:border-white/20 hover:scale-105 active:scale-95 cursor-pointer'
                      : 'bg-white/[0.02] text-slate-600 border-white/5 cursor-not-allowed'
                  }`}
                  title="Previous track"
                >
                  <SkipBack className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={onNext}
                  disabled={!hasNext}
                  aria-label="Next video"
                  className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border transition-all ${
                    hasNext
                      ? 'bg-rose-600 border-rose-500 text-white hover:bg-rose-500 hover:scale-105 active:scale-95 shadow-lg shadow-rose-950/50 cursor-pointer'
                      : 'bg-white/[0.02] text-slate-600 border-white/5 cursor-not-allowed'
                  }`}
                  title="Next track"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
