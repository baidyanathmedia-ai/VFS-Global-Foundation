import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Volume1,
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
  Radio,
  Upload,
  Link as LinkIcon,
  RefreshCw,
  Video
} from 'lucide-react';
import { REEL_VIDEOS_DATA } from '../data/academyData';
import { ReelVideoItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

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
  const [duration, setDuration] = useState<number>(62); // seconds estimate
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Likes state per reel
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({
    'fb-reel-01': 1140,
    'fb-reel-02': 1380,
    'reel-01': 1420,
    'reel-04': 418
  });

  // Copied link toast notification
  const [copiedReelId, setCopiedReelId] = useState<string | null>(null);

  // Custom MP4 state for VIDEO 04
  const [customMp4Url, setCustomMp4Url] = useState<string>(
    'https://assets.mixkit.co/videos/preview/mixkit-modern-airport-terminal-with-passengers-walking-43306-large.mp4'
  );
  const [customMp4FileName, setCustomMp4FileName] = useState<string>('sample-airport-operations.mp4');
  const [urlInputVal, setUrlInputVal] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter tabs: Facebook Reels, Instagram Reel, All Videos
  const [activeFilter, setActiveFilter] = useState<'all' | 'facebook' | 'instagram' | 'mp4'>('all');

  const filterTabs = [
    { id: 'all', labelEn: `All Videos (${REEL_VIDEOS_DATA.length})`, labelHi: `सभी वीडियो (${REEL_VIDEOS_DATA.length})` },
    ...(REEL_VIDEOS_DATA.some(v => v.platform === 'facebook') ? [{ id: 'facebook', labelEn: 'Facebook Reels', labelHi: 'फेसबुक रील्स' }] : []),
    ...(REEL_VIDEOS_DATA.some(v => v.platform === 'instagram') ? [{ id: 'instagram', labelEn: 'Instagram Reel', labelHi: 'इंस्टाग्राम रील' }] : []),
    ...(REEL_VIDEOS_DATA.some(v => v.platform === 'mp4') ? [{ id: 'mp4', labelEn: 'Uploadable MP4', labelHi: 'अपलोड करने योग्य MP4' }] : [])
  ];

  const displayedVideos = REEL_VIDEOS_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'facebook') return item.platform === 'facebook';
    if (activeFilter === 'instagram') return item.platform === 'instagram';
    if (activeFilter === 'mp4') return item.platform === 'mp4';
    return true;
  });

  // Open modal handler (Stay on website!)
  const handleOpenModal = (video: ReelVideoItem) => {
    setModalVideo(video);
    setIsPlaying(true);
    setProgress(0);
    setCurrentTime(0);
    setDuration(video.duration === '1:30' ? 90 : video.duration === '1:02' ? 62 : 45);
  };

  const handleCloseModal = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
    setModalVideo(null);
    setIsFullscreen(false);
  };

  // Fullscreen toggle
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

  // Share handler
  const handleShare = (video: ReelVideoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(video.url).then(() => {
      setCopiedReelId(video.id);
      setTimeout(() => setCopiedReelId(null), 2500);
    });
  };

  // Modal progress ticker simulation (for iframe embeds) & real ticker for MP4
  useEffect(() => {
    if (!modalVideo || !isPlaying) return;

    const interval = setInterval(() => {
      if (modalVideo.platform === 'mp4' && modalVideoRef.current) {
        const cur = modalVideoRef.current.currentTime;
        const dur = modalVideoRef.current.duration || 60;
        setCurrentTime(Math.floor(cur));
        setDuration(Math.floor(dur));
        setProgress((cur / dur) * 100);
      } else {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            return 0; // loop
          }
          return prev + 1;
        });
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1.6));
      }
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

  // File upload for Video 04
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setCustomMp4Url(blobUrl);
      setCustomMp4FileName(file.name);
      setToastMessage(language === 'hi' ? `फ़ाइल लोड हुई: ${file.name}` : `Connected: ${file.name}`);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  // URL connect for Video 04
  const handleConnectUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInputVal.trim()) return;
    setCustomMp4Url(urlInputVal.trim());
    setCustomMp4FileName('Connected Video Stream');
    setShowUrlInput(false);
    setUrlInputVal('');
    setToastMessage(language === 'hi' ? 'वीडियो URL कनेक्ट हो गया!' : 'Video URL Connected Successfully!');
    setTimeout(() => setToastMessage(null), 3500);
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
        
        {/* Section Header: Exact User Request */}
        <div className={`text-center max-w-3xl mx-auto space-y-3 mb-10 transition-all duration-700 ${
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Film className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>{language === 'hi' ? 'वीडियो वॉच सेक्शन' : 'Video Watch Section'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-slate-300 font-normal">Playable Reels</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Watch Our Latest Videos
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-medium">
            Creative Ideas. Powerful Stories. Real Results.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            {language === 'hi'
              ? 'अकादमी में आयोजित व्यावहारिक प्रशिक्षण, साक्षात्कार सिमुलेशन एवं पूर्व छात्रों के वीडियो सीधे वेबसाइट पर देखें।'
              : 'Experience immersive student transformations and official reels played directly within the website without leaving the portal.'}
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

        {/* Global Toast for Link Copied / File Uploaded */}
        {copiedReelId && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4" />
            <span>Link copied to clipboard!</span>
          </div>
        )}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-fade-in-up">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 9:16 Vertical Reel-Style Video Cards Carousel */}
        <div 
          ref={carouselRef}
          className={`flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar ${
            displayedVideos.length <= 2 ? 'justify-start md:justify-center' : 'justify-start'
          }`}
        >
          {displayedVideos.map((video) => {
            const isLiked = !!likedReels[video.id];
            const currentLikes = likeCounts[video.id] || 0;

            return (
              <div
                key={video.id}
                className="shrink-0 w-[295px] sm:w-[320px] md:w-[335px] snap-center group relative flex flex-col cursor-pointer"
                onClick={() => handleOpenModal(video)}
              >
                {/* Smartphone Reel Container (Exact 9:16 Aspect Ratio) */}
                <div className="relative aspect-[9/16] w-full rounded-3xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl shadow-black/80 group-hover:border-blue-500/70 transition-all duration-300 flex flex-col justify-between">
                  
                  {/* Glowing Top Frame Accent */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 opacity-90 z-20" />

                  {/* Top Status Bar: Card Number, Platform & Live Indicator */}
                  <div className="relative z-20 p-4 flex items-center justify-between text-xs bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[11px] tracking-wider px-2.5 py-0.5 rounded-md bg-blue-600/90 text-white uppercase shadow-sm">
                        {video.cardNumber}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-200 drop-shadow">
                        {video.platformLabel}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/90 text-white shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      REEL
                    </span>
                  </div>

                  {/* Poster Screen Area with Premium Hover Zoom Effect (scale-105) */}
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
                      className="w-full h-full object-cover transform transition-transform duration-500 ease-out hover:scale-105 group-hover:scale-105 will-change-transform filter brightness-90 group-hover:brightness-95 cursor-zoom-in"
                      loading="lazy"
                      title="Click to view full-resolution image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
                    
                    {/* Large Interactive Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(video);
                        }}
                        className="pointer-events-auto cursor-pointer w-16 h-16 rounded-full bg-blue-600/90 group-hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-600/60 transform group-hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white/30 backdrop-blur-xs"
                        title={`Play ${video.title}`}
                      >
                        <Play className="w-7 h-7 fill-white ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Right-Side Floating Reel Action Rail */}
                  <div className="relative z-20 self-end pr-3.5 pb-20 flex flex-col items-center gap-4">
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
                      <span className="text-[10px] font-bold text-white mt-1 drop-shadow">
                        {currentLikes}
                      </span>
                    </button>

                    {/* Share Button */}
                    <button
                      type="button"
                      onClick={(e) => handleShare(video, e)}
                      className="flex flex-col items-center group/btn cursor-pointer"
                      title="Share / Copy Link"
                    >
                      <div className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all hover:scale-105">
                        <Share2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-white mt-1 drop-shadow">
                        Share
                      </span>
                    </button>
                  </div>

                  {/* Bottom Glassmorphic Overlay: User Handle, Title & "Watch Video" Button */}
                  <div className="relative z-20 p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-6 space-y-2">
                    {/* User profile & Audio Ticker */}
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center font-bold text-[10px] text-white ring-2 ring-white/30">
                        VFS
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white tracking-tight drop-shadow">
                          @vfsglobal_deoghar
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400 text-slate-950" />
                      </div>
                    </div>

                    {/* Headline */}
                    <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 drop-shadow">
                      {video.subtitle}
                    </h3>

                    {/* Audio track ticker */}
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-300 bg-white/10 rounded-full px-2.5 py-0.5 w-fit backdrop-blur-xs">
                      <Radio className="w-3 h-3 text-pink-400 animate-pulse" />
                      <span className="truncate max-w-[190px]">VFS Global Academy • Official Reel</span>
                    </div>

                    {/* Dedicated Prominent "Watch Video" Button */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(video);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>{language === 'hi' ? 'वीडियो देखें' : 'Watch Video'}</span>
                      </button>
                    </div>
                  </div>

                </div>

                {/* Uploadable MP4 UI Drawer for Video 04 */}
                {video.isUploadable && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 bg-slate-800/80 rounded-2xl p-3 border border-slate-700/80 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200 flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{language === 'hi' ? 'कस्टम वीडियो अपलोड / लिंक' : 'Upload or Connect MP4'}</span>
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-snug">
                      Active: <span className="text-emerald-400 font-mono truncate">{customMp4FileName}</span>
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <label className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold cursor-pointer transition-colors text-center">
                        <Upload className="w-3 h-3" />
                        <span>{language === 'hi' ? 'फाइल चुनें' : 'Upload MP4'}</span>
                        <input
                          type="file"
                          accept="video/mp4,video/webm,video/quicktime"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => setShowUrlInput(!showUrlInput)}
                        className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] font-bold cursor-pointer transition-colors"
                      >
                        <LinkIcon className="w-3 h-3" />
                        <span>{language === 'hi' ? 'URL पेस्ट करें' : 'Paste URL'}</span>
                      </button>
                    </div>

                    {showUrlInput && (
                      <form onSubmit={handleConnectUrl} className="pt-2 flex gap-1.5">
                        <input
                          type="url"
                          placeholder="https://.../video.mp4"
                          value={urlInputVal}
                          onChange={(e) => setUrlInputVal(e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          type="submit"
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          Connect
                        </button>
                      </form>
                    )}
                  </div>
                )}

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
                ? 'सभी वीडियो वीएफएस ग्लोबल अकादमी, एसटीपीआई देवघर परिसर में सीधे वेबसाइट पर स्ट्रीम होते हैं।'
                : 'All videos play directly inside the VFS Global Academy website without redirection.'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#success-stories"
              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              <span>{language === 'hi' ? 'पूर्व छात्रों की सफलता गाथाएं देखें' : 'View Alumni Success Stories'}</span>
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
      {/* PREMIUM VIDEO MODAL / LIGHTBOX (100% Inside Website, No External Tab/Redirect) */}
      {/* ========================================================================= */}
      {modalVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 animate-fade-in-up"
          onClick={handleCloseModal}
        >
          {/* Close Button at Viewport Top Right */}
          <button
            type="button"
            onClick={handleCloseModal}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-800/90 hover:bg-red-600 text-white transition-all cursor-pointer shadow-2xl hover:rotate-90 duration-200"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* 9:16 Vertical Reel-Style Player Modal Container */}
          <div 
            ref={modalContainerRef}
            className="relative w-full max-w-[420px] h-full sm:h-[88vh] rounded-none sm:rounded-3xl overflow-hidden bg-slate-950 border-0 sm:border-2 sm:border-slate-800 shadow-2xl flex flex-col justify-between group/player"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Header Bar */}
            <div className="relative z-30 p-4 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-600 text-white uppercase shadow-sm">
                  {modalVideo.cardNumber}
                </span>
                <span className="text-xs font-semibold text-white drop-shadow">
                  {modalVideo.platformLabel}
                </span>
              </div>

              {/* Close Button Inside Modal Header */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Close (✕)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Stream Area (Official Facebook / Instagram / MP4 Embed) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
              {modalVideo.platform === 'mp4' ? (
                <video
                  ref={modalVideoRef}
                  src={customMp4Url}
                  autoPlay={isPlaying}
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : modalVideo.platform === 'facebook' ? (
                /* Official Facebook Supported Embedded Video Player Method */
                <div className="w-full h-full relative bg-black flex items-center justify-center">
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(modalVideo.url)}&show_text=0&autoplay=1&mute=${isMuted ? '1' : '0'}`}
                    title={modalVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : modalVideo.embedUrl ? (
                /* Official Instagram Embed Player Method */
                <iframe
                  src={modalVideo.embedUrl}
                  title={modalVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : null}
            </div>

            {/* Bottom Comprehensive Player Controls (Play/Pause, Mute, Volume, Progress, Fullscreen, Close) */}
            <div className="relative z-30 p-4 bg-gradient-to-t from-black via-black/90 to-transparent space-y-3">
              
              {/* Progress Bar (⏱ Scrubber & Time Elapsed) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div 
                  className="h-1.5 w-full bg-slate-700/80 rounded-full overflow-hidden cursor-pointer relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                    setProgress(newProgress);
                    setCurrentTime(Math.floor((newProgress / 100) * duration));
                    if (modalVideo.platform === 'mp4' && modalVideoRef.current) {
                      modalVideoRef.current.currentTime = (newProgress / 100) * duration;
                    }
                  }}
                >
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-150 relative"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Video Title & Description Snippet */}
              <div>
                <h4 className="text-sm font-bold text-white line-clamp-1">
                  {modalVideo.subtitle}
                </h4>
                <p className="text-[11px] text-slate-300 line-clamp-1 font-normal">
                  {modalVideo.description}
                </p>
              </div>

              {/* Player Control Actions Rail */}
              <div className="flex items-center justify-between pt-1">
                
                {/* Left Controls: Play/Pause, Mute/Unmute & Volume Slider */}
                <div className="flex items-center gap-2.5">
                  {/* Play / Pause Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      if (modalVideo.platform === 'mp4' && modalVideoRef.current) {
                        if (isPlaying) {
                          modalVideoRef.current.pause();
                        } else {
                          modalVideoRef.current.play();
                        }
                      }
                    }}
                    className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                  </button>

                  {/* Mute / Unmute Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const nextMute = !isMuted;
                      setIsMuted(nextMute);
                      if (modalVideo.platform === 'mp4' && modalVideoRef.current) {
                        modalVideoRef.current.muted = nextMute;
                      }
                    }}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>

                  {/* Volume Slider (🔊 Volume) */}
                  <div className="flex items-center gap-1.5 hidden sm:flex">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setVolume(val);
                        if (val > 0) setIsMuted(false);
                        if (modalVideo.platform === 'mp4' && modalVideoRef.current) {
                          modalVideoRef.current.volume = val / 100;
                          modalVideoRef.current.muted = val === 0;
                        }
                      }}
                      className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      title={`Volume: ${volume}%`}
                    />
                    <span className="text-[10px] text-slate-400 font-mono w-7">
                      {isMuted ? '0%' : `${volume}%`}
                    </span>
                  </div>
                </div>

                {/* Right Controls: Fullscreen & Close (⛶ Fullscreen & ✕ Close) */}
                <div className="flex items-center gap-2">
                  {/* Fullscreen Button */}
                  <button
                    type="button"
                    onClick={handleToggleFullscreen}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Close Video (✕)"
                  >
                    <X className="w-4 h-4" />
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
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-slate-800/90 hover:bg-red-600 text-white transition-all cursor-pointer shadow-2xl hover:rotate-90 duration-200"
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
