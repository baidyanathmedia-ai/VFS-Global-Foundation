import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2,
  X, 
  ChevronLeft, 
  ChevronRight, 
  Film, 
  Check, 
  CheckCircle2,
  Share2,
  Heart,
  Radio
} from 'lucide-react';
import { REEL_VIDEOS_DATA } from '../data/academyData';
import { ReelVideoItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

declare global {
  interface Window {
    FB?: {
      init: (params: Record<string, unknown>) => void;
      XFBML: {
        parse: (element?: HTMLElement | null) => void;
      };
      Event: {
        subscribe: (event: string, callback: (msg: any) => void) => void;
      };
    };
    fbAsyncInit?: () => void;
  }
}

interface VideoShowcaseSectionProps {
  onOpenApply?: () => void;
}

export const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = ({ onOpenApply }) => {
  const { language } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.08 });
  
  // Carousel scroll container ref
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fullscreen / Lightbox Modal State
  const [modalVideo, setModalVideo] = useState<ReelVideoItem | null>(null);
  const [selectedPosterImage, setSelectedPosterImage] = useState<{ src: string; title: string; subtitle?: string } | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(85); // 0 to 100
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(62);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);

  const modalContainerRef = useRef<HTMLDivElement>(null);
  const fbPlayerInstanceRef = useRef<any>(null);

  // Likes state per reel
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({
    'fb-reel-01': 1140,
    'fb-reel-02': 1420
  });

  // Copied link toast notification
  const [copiedReelId, setCopiedReelId] = useState<string | null>(null);

  // Filter tabs
  const [activeFilter, setActiveFilter] = useState<'all' | 'reel-01' | 'reel-02'>('all');

  const filterTabs = [
    { id: 'all', labelEn: `All Reels (${REEL_VIDEOS_DATA.length})`, labelHi: `सभी रील्स (${REEL_VIDEOS_DATA.length})` },
    { id: 'reel-01', labelEn: 'Facebook Reel 01', labelHi: 'फेसबुक रील 01' },
    { id: 'reel-02', labelEn: 'Facebook Reel 02', labelHi: 'फेसबुक रील 02' }
  ];

  const displayedVideos = REEL_VIDEOS_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'reel-01') return item.id === 'fb-reel-01';
    if (activeFilter === 'reel-02') return item.id === 'fb-reel-02';
    return true;
  });

  // Load Official Facebook JS SDK for supported XFBML video player integration
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!document.getElementById('facebook-jssdk')) {
      window.fbAsyncInit = function () {
        window.FB?.init({
          xfbml: true,
          version: 'v19.0'
        });
        window.FB?.Event?.subscribe('xfbml.ready', (msg: any) => {
          if (msg.type === 'video' && msg.instance) {
            fbPlayerInstanceRef.current = msg.instance;
          }
        });
      };
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
    }
  }, []);

  // Open modal handler (Keeps visitor 100% on the VFS Global Academy website)
  const handleOpenModal = (video: ReelVideoItem) => {
    fbPlayerInstanceRef.current = null;
    setModalVideo(video);
    setIsPlaying(true);
    setProgress(0);
    setCurrentTime(0);
    setDuration(video.duration === '1:02' ? 62 : 45);
    setIframeKey((prev) => prev + 1);
  };

  const handleCloseModal = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
    fbPlayerInstanceRef.current = null;
    setModalVideo(null);
    setIsFullscreen(false);
  };

  // Fullscreen toggle (⛶ Fullscreen)
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalContainerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Carousel navigation
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 340;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Toggle Like
  const handleToggleLike = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedReels((prev) => {
      const isCurrentlyLiked = !!prev[reelId];
      const nextLiked = !isCurrentlyLiked;
      setLikeCounts((counts) => ({
        ...counts,
        [reelId]: (counts[reelId] || 0) + (nextLiked ? 1 : -1)
      }));
      return { ...prev, [reelId]: nextLiked };
    });
  };

  // Share handler (Copies link to clipboard, no redirect)
  const handleShare = (video: ReelVideoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(video.url).then(() => {
      setCopiedReelId(video.id);
      setTimeout(() => setCopiedReelId(null), 2500);
    });
  };

  // Modal progress synchronization
  useEffect(() => {
    if (!modalVideo || !isPlaying) return;

    const interval = setInterval(() => {
      if (fbPlayerInstanceRef.current && typeof fbPlayerInstanceRef.current.getCurrentPosition === 'function') {
        try {
          const cur = fbPlayerInstanceRef.current.getCurrentPosition() || 0;
          const dur = fbPlayerInstanceRef.current.getDuration() || duration;
          setCurrentTime(Math.floor(cur));
          if (dur > 0) {
            setDuration(Math.floor(dur));
            setProgress(Math.min(100, (cur / dur) * 100));
          }
          return;
        } catch {
          // Fallback to timeline sync below
        }
      }

      setCurrentTime((prev) => {
        if (prev >= duration) {
          return 0;
        }
        return prev + 1;
      });
      setProgress((prev) => (prev >= 100 ? 0 : prev + 100 / Math.max(1, duration)));
    }, 1000);

    return () => clearInterval(interval);
  }, [modalVideo, isPlaying, duration]);

  // Lock body scroll when any modal is active
  useEffect(() => {
    if (modalVideo || selectedPosterImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalVideo, selectedPosterImage]);

  // Escape key listener for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedPosterImage) {
          setSelectedPosterImage(null);
        } else if (modalVideo) {
          handleCloseModal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalVideo, selectedPosterImage]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Control Handlers
  const handleTogglePlayPause = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);
    if (fbPlayerInstanceRef.current) {
      try {
        if (nextPlaying) {
          fbPlayerInstanceRef.current.play?.();
        } else {
          fbPlayerInstanceRef.current.pause?.();
        }
      } catch {
        // Handled by embedded player state
      }
    }
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (fbPlayerInstanceRef.current) {
      try {
        if (nextMute) {
          fbPlayerInstanceRef.current.mute?.();
        } else {
          fbPlayerInstanceRef.current.unmute?.();
        }
      } catch {
        // Handled by embedded player state
      }
    }
  };

  const handleVolumeChange = (val: number) => {
    setVolume(val);
    const nextMuted = val === 0;
    setIsMuted(nextMuted);
    if (fbPlayerInstanceRef.current) {
      try {
        fbPlayerInstanceRef.current.setVolume?.(val / 100);
        if (nextMuted) {
          fbPlayerInstanceRef.current.mute?.();
        } else {
          fbPlayerInstanceRef.current.unmute?.();
        }
      } catch {
        // Handled by embedded player state
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="video-showcase" 
      className="py-20 bg-slate-900 text-white relative overflow-hidden transition-colors duration-200"
    >
      {/* Background Decorative Mesh & Radial Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto space-y-3 mb-10 transition-all duration-700 ${
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-semibold tracking-wide">
            <Film className="w-3.5 h-3.5 text-blue-400" />
            <span>{language === 'hi' ? 'वीडियो वॉच सेक्शन' : 'Video Watch Section'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300">9:16 Vertical Reels</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {language === 'hi' ? 'हमारे नवीनतम वीडियो देखें' : 'Watch Our Latest Videos'}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-medium">
            {language === 'hi'
              ? 'अकादमी के आधिकारिक रील वीडियो सीधे वेबसाइट के अंदर देखें।'
              : 'Click Play on any card below to watch our official Reels directly inside the VFS Global Academy website.'}
          </p>
        </div>

        {/* Filter Controls & Carousel Arrows */}
        <div className={`flex flex-wrap items-center justify-between gap-4 mb-8 transition-all duration-700 ${
          isVisible ? 'animate-fade-in-up animation-delay-100 opacity-100' : 'opacity-0 translate-y-6'
        }`}>
          {/* Segmented Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700/80 backdrop-blur-sm">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  {language === 'hi' ? tab.labelHi : tab.labelEn}
                </button>
              );
            })}
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollCarousel('left')}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel('right')}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Toast for Link Copied */}
        {copiedReelId && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4" />
            <span>Link copied to clipboard!</span>
          </div>
        )}

        {/* 9:16 Vertical Reel-Style Video Cards Grid / Carousel */}
        <div 
          ref={carouselRef}
          className="flex flex-wrap md:flex-nowrap justify-center gap-8 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {displayedVideos.map((video) => {
            const isLiked = !!likedReels[video.id];
            const currentLikes = likeCounts[video.id] || 0;

            return (
              <div
                key={video.id}
                className="shrink-0 w-[300px] sm:w-[330px] md:w-[350px] snap-center group relative flex flex-col cursor-pointer transition-transform duration-300 hover:-translate-y-2"
                onClick={() => handleOpenModal(video)}
              >
                {/* 9:16 Aspect Ratio Vertical Reel Card */}
                <div className="relative aspect-[9/16] w-full rounded-3xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl shadow-black/80 group-hover:border-blue-500 group-hover:shadow-blue-600/20 transition-all duration-300 flex flex-col justify-between">
                  
                  {/* Glowing Top Frame Accent */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 opacity-90 z-20" />

                  {/* Top Header Bar: Card Title ("Facebook Reel 01" / "Facebook Reel 02") */}
                  <div className="relative z-20 p-4 flex items-center justify-between text-xs bg-gradient-to-b from-black/85 via-black/40 to-transparent">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs tracking-wide px-3 py-1 rounded-lg bg-blue-600 text-white shadow-md">
                        {video.cardNumber}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>9:16 Reel</span>
                    </span>
                  </div>

                  {/* Facebook Video Thumbnail / Poster Area with Premium Hover Effect */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPosterImage({
                          src: video.thumbnail,
                          title: video.title,
                          subtitle: video.subtitle
                        });
                      }}
                      className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform filter brightness-90 group-hover:brightness-100"
                      loading="lazy"
                      title="Click to preview high-resolution poster"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent pointer-events-none" />
                    
                    {/* Large Center Play Button (▶ Play Video) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(video);
                        }}
                        className="pointer-events-auto cursor-pointer w-20 h-20 rounded-full bg-blue-600/95 group-hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl shadow-blue-600/70 transform group-hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white/30 backdrop-blur-xs"
                        aria-label={`Play ${video.title}`}
                        title={`Play ${video.title}`}
                      >
                        <Play className="w-9 h-9 fill-white ml-1" />
                      </button>
                      <span className="px-3 py-1 rounded-md bg-black/70 text-white text-[11px] font-bold tracking-wide backdrop-blur-xs border border-white/15 shadow-md">
                        ▶ Play Video
                      </span>
                    </div>
                  </div>

                  {/* Right-Side Floating Reel Action Rail */}
                  <div className="relative z-20 self-end pr-3.5 pb-24 flex flex-col items-center gap-4">
                    {/* Like Button */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleLike(video.id, e)}
                      className="flex flex-col items-center group/btn cursor-pointer"
                      title="Like Reel"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isLiked 
                          ? 'bg-rose-600 text-white scale-110' 
                          : 'bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm'
                      }`}>
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-white text-white' : 'text-white'}`} />
                      </div>
                      <span className="text-[10px] font-bold text-white mt-1 drop-shadow tabular-nums">
                        {currentLikes}
                      </span>
                    </button>

                    {/* Share Button */}
                    <button
                      type="button"
                      onClick={(e) => handleShare(video, e)}
                      className="flex flex-col items-center group/btn cursor-pointer"
                      title="Copy Video Link"
                    >
                      <div className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all hover:scale-105">
                        <Share2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-white mt-1 drop-shadow">
                        Share
                      </span>
                    </button>
                  </div>

                  {/* Bottom Overlay: Card Title, Subtitle & Prominent "Watch Video" Button */}
                  <div className="relative z-20 p-5 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent pt-8 space-y-2.5">
                    {/* Academy Handle */}
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center font-bold text-[10px] text-white ring-2 ring-white/30">
                        VFS
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white tracking-tight drop-shadow">
                          VFS Global Academy Deoghar
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                    </div>

                    {/* Card Main Title */}
                    <div>
                      <h3 className="text-base font-extrabold text-white leading-tight drop-shadow">
                        {language === 'hi' && video.titleHi ? video.titleHi : video.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">
                        {language === 'hi' && video.subtitleHi ? video.subtitleHi : video.subtitle}
                      </p>
                    </div>

                    {/* Audio Track Line */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse shrink-0" />
                      <span className="truncate">Official In-Site Reel Player · {video.duration}</span>
                    </div>

                    {/* Prominent "Watch Video" Button */}
                    <div className="pt-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(video);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>{language === 'hi' ? 'वीडियो देखें (Watch Video)' : 'Watch Video'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              {language === 'hi'
                ? 'सभी वीडियो वीएफएस ग्लोबल अकादमी वेबसाइट के प्रीमियम मोडल प्लेयर में सीधे चलते हैं।'
                : 'Videos open directly inside our website lightbox modal — no external tabs or redirects.'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#batch-7"
              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              <span>{language === 'hi' ? 'बैच 7 छात्र उपलब्धियां देखें' : 'View Batch 7 Student Achievements'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>

            {onOpenApply && (
              <button
                type="button"
                onClick={onOpenApply}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'प्रवेश हेतु आवेदन करें' : 'Apply For Admission'}
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* PREMIUM 9:16 REEL VIDEO MODAL / LIGHTBOX (100% Inside Website)            */}
      {/* ========================================================================= */}
      {modalVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in-up"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-label={modalVideo.title}
        >
          {/* Close Button at Viewport Top Right (✕ Close) */}
          <button
            type="button"
            onClick={handleCloseModal}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-800/90 hover:bg-red-600 text-white transition-all cursor-pointer shadow-2xl"
            aria-label="Close video modal"
            title="✕ Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* 9:16 Vertical Reel-Style Player Modal Container */}
          <div 
            ref={modalContainerRef}
            className="relative w-full max-w-[420px] aspect-[9/16] max-h-[92vh] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Header Bar */}
            <div className="relative z-30 px-4 py-3 flex items-center justify-between bg-slate-950/95 border-b border-slate-800/80">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-600 text-white shrink-0">
                  {modalVideo.cardNumber}
                </span>
                <span className="text-xs font-semibold text-slate-200 truncate">
                  {modalVideo.subtitle}
                </span>
              </div>

              {/* Close Button Inside Modal Header (✕ Close) */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                title="✕ Close"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Official Embedded Video Player Area (9:16 Vertical Layout) */}
            <div className="relative flex-1 w-full bg-black flex items-center justify-center overflow-hidden">
              {modalVideo.platform === 'facebook' ? (
                /* Official Facebook Supported Embedded Video Player */
                <iframe
                  key={`${modalVideo.id}-${iframeKey}-${isMuted ? 'muted' : 'unmuted'}`}
                  src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(modalVideo.url)}&show_text=false&autoplay=${isPlaying ? '1' : '0'}&mute=${isMuted ? '1' : '0'}&width=400`}
                  title={modalVideo.title}
                  className="w-full h-full border-0 bg-black"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                />
              ) : (
                /* Official Embedded Reel Player */
                <iframe
                  key={`${modalVideo.id}-${iframeKey}`}
                  src={modalVideo.embedUrl || `${modalVideo.url.split('?')[0].replace(/\/$/, '')}/embed/`}
                  title={modalVideo.title}
                  className="w-full h-full border-0 bg-black"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                />
              )}
            </div>

            {/* Bottom Comprehensive Video Player Controls Bar */}
            {/* Includes: ▶ Play/Pause, 🔊 Mute/Unmute, 🔊 Volume, ⏱ Progress bar, ⛶ Fullscreen, ✕ Close */}
            <div className="relative z-30 p-3.5 bg-slate-950/95 border-t border-slate-800/90 space-y-2.5">
              
              {/* ⏱ Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-slate-300">
                  <span>⏱ {formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div 
                  className="h-2 w-full bg-slate-800 rounded-full overflow-hidden cursor-pointer relative"
                  title="Seek Progress Bar"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                    const targetSeconds = Math.floor((newProgress / 100) * duration);
                    setProgress(newProgress);
                    setCurrentTime(targetSeconds);
                    if (fbPlayerInstanceRef.current && typeof fbPlayerInstanceRef.current.seek === 'function') {
                      try {
                        fbPlayerInstanceRef.current.seek(targetSeconds);
                      } catch {
                        // Synced
                      }
                    }
                  }}
                >
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Controls Row: ▶ Play / Pause | 🔊 Mute / Unmute | 🔊 Volume | ⛶ Fullscreen | ✕ Close */}
              <div className="flex items-center justify-between gap-2 pt-0.5">
                
                {/* Left Controls: Play/Pause, Mute/Unmute & Volume Slider */}
                <div className="flex items-center gap-2">
                  {/* ▶ Play / Pause */}
                  <button
                    type="button"
                    onClick={handleTogglePlayPause}
                    className="px-2.5 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer shadow-md"
                    title={isPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                    <span className="hidden xs:inline">{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  {/* 🔊 Mute / Unmute */}
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title={isMuted ? "Unmute (🔊)" : "Mute (🔊)"}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>

                  {/* 🔊 Volume Slider */}
                  <div className="flex items-center gap-1.5">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className="w-16 sm:w-20 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      title={`Volume: ${isMuted ? 0 : volume}%`}
                      aria-label="Volume"
                    />
                    <span className="text-[10px] text-slate-400 font-mono tabular-nums w-7">
                      {isMuted ? '0%' : `${volume}%`}
                    </span>
                  </div>
                </div>

                {/* Right Controls: ⛶ Fullscreen & ✕ Close */}
                <div className="flex items-center gap-1.5">
                  {/* ⛶ Fullscreen */}
                  <button
                    type="button"
                    onClick={handleToggleFullscreen}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title={isFullscreen ? "Exit Fullscreen (⛶)" : "Fullscreen (⛶)"}
                    aria-label="Fullscreen"
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>

                  {/* ✕ Close */}
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-2.5 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-white flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer"
                    title="Close Video (✕)"
                    aria-label="Close Video"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Close</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CENTERED OVERLAY MODAL: HIGH-RESOLUTION IMAGE PREVIEW WITH CLOSE BUTTON   */}
      {/* ========================================================================= */}
      {selectedPosterImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in-up"
          onClick={() => setSelectedPosterImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="High-resolution image preview"
        >
          {/* Top Right Close Button */}
          <button
            type="button"
            onClick={() => setSelectedPosterImage(null)}
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-slate-800/90 hover:bg-red-600 text-white transition-all cursor-pointer shadow-2xl"
            aria-label="Close image modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Centered Image Container */}
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full p-4 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {selectedPosterImage.title}
                </h3>
                {selectedPosterImage.subtitle && (
                  <p className="text-xs text-slate-400">
                    {selectedPosterImage.subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedPosterImage(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* High-Resolution Image Display Area */}
            <div className="relative max-h-[75vh] w-full overflow-hidden flex items-center justify-center bg-black/70 p-3 sm:p-6">
              <img
                src={selectedPosterImage.src}
                alt={selectedPosterImage.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
              />
            </div>

            {/* Modal Footer */}
            <div className="w-full p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>High-Resolution Campus & Training Media</span>
              </span>
              <button
                type="button"
                onClick={() => setSelectedPosterImage(null)}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer transition-colors"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
