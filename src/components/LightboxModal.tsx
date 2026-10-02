import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Play, 
  Pause,
  Grid,
  Sparkles,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { GalleryItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (index: number) => void;
  onOpenApply?: (courseId?: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  items,
  onClose,
  onNavigate,
  onOpenApply
}) => {
  const { language } = useLanguage();
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(true);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<number>(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const currentIndex = item ? items.findIndex(i => i.id === item.id) : 0;
  const validIndex = currentIndex >= 0 ? currentIndex : 0;

  // Reset zoom & pan when slide changes
  useEffect(() => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  }, [item?.id]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailStripRef.current) {
      const activeEl = thumbnailStripRef.current.children[validIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [validIndex]);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (items.length <= 1) return;
    setSlideDirection(-1);
    const prevIndex = (validIndex - 1 + items.length) % items.length;
    onNavigate(prevIndex);
  }, [items.length, onNavigate, validIndex]);

  const handleNext = useCallback(() => {
    if (items.length <= 1) return;
    setSlideDirection(1);
    const nextIndex = (validIndex + 1) % items.length;
    onNavigate(nextIndex);
  }, [items.length, onNavigate, validIndex]);

  // Auto-play slideshow timer
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlay, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;

      if (e.key === 'Escape') {
        if (zoomLevel > 1) {
          setZoomLevel(1);
          setPan({ x: 0, y: 0 });
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoomLevel(prev => Math.min(prev + 0.5, 3));
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setZoomLevel(prev => {
          const next = Math.max(prev - 0.5, 1);
          if (next === 1) setPan({ x: 0, y: 0 });
          return next;
        });
      } else if (e.key === '0') {
        e.preventDefault();
        setZoomLevel(1);
        setPan({ x: 0, y: 0 });
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlay(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, handlePrev, handleNext, onClose, zoomLevel]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Zoom controls
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  // Mouse pan handling when zoomed in
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    e.preventDefault();
    const maxX = (zoomLevel - 1) * 300;
    const maxY = (zoomLevel - 1) * 200;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setPan({
      x: Math.max(Math.min(newX, maxX), -maxX),
      y: Math.max(Math.min(newY, maxY), -maxY)
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch gestures for mobile swipe & pan
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || zoomLevel > 1) return;
    const touchEnd = e.changedTouches[0];
    const diffX = touchEnd.clientX - touchStartRef.current.x;
    const diffY = touchEnd.clientY - touchStartRef.current.y;

    // Horizontal swipe threshold
    if (Math.abs(diffX) > 45 && Math.abs(diffY) < 80) {
      if (diffX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartRef.current = null;
  };

  if (!item) return null;

  return (
    <div
      ref={containerRef}
      id="vfs-gallery-lightbox"
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-xl text-white select-none overflow-hidden"
      onClick={onClose}
    >
      {/* 1. TOP CONTROL BAR */}
      <div 
        className="relative z-50 flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800/80 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Category Badge & Slide Count */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{item.category}</span>
          </div>

          <div className="text-xs text-slate-400 font-medium hidden sm:flex items-center gap-1.5">
            <span className="text-white font-bold">{validIndex + 1}</span>
            <span>/</span>
            <span>{items.length}</span>
            <span className="text-slate-500 text-[11px]">
              ({language === 'hi' ? 'तस्वीरें' : 'Photos'})
            </span>
          </div>
        </div>

        {/* Center: Quick Zoom & Slideshow Toolbar (Desktop) */}
        <div className="hidden md:flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-xl border border-slate-700">
          <button
            id="lightbox-zoom-out-btn"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            title={language === 'hi' ? 'ज़ूम आउट करें (-)' : 'Zoom Out (-)'}
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono px-2 text-slate-300 min-w-[44px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>

          <button
            id="lightbox-zoom-in-btn"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            title={language === 'hi' ? 'ज़ूम इन करें (+)' : 'Zoom In (+)'}
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {zoomLevel > 1 && (
            <button
              id="lightbox-reset-zoom-btn"
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg hover:bg-slate-700 text-emerald-400 transition-colors cursor-pointer ml-1"
              title={language === 'hi' ? 'रीसेट ज़ूम (0)' : 'Reset Zoom (0)'}
              aria-label="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="w-[1px] h-4 bg-slate-700 mx-1" />

          {/* Auto Slideshow */}
          <button
            id="lightbox-slideshow-toggle-btn"
            onClick={() => setIsAutoPlay(prev => !prev)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs px-2 ${
              isAutoPlay ? 'bg-emerald-600 text-white' : 'hover:bg-slate-700 text-slate-300 hover:text-white'
            }`}
            title={language === 'hi' ? 'स्लाइड शो चलाएं (Space)' : 'Auto Slideshow (Space)'}
            aria-label="Toggle Slideshow"
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline text-[11px] font-medium">
              {isAutoPlay ? (language === 'hi' ? 'चल रहा है' : 'Playing') : (language === 'hi' ? 'स्लाइड शो' : 'Play')}
            </span>
          </button>
        </div>

        {/* Right: Thumbnails Toggle, Fullscreen & Close */}
        <div className="flex items-center gap-2">
          {/* Thumbnails Toggle Button */}
          <button
            id="lightbox-toggle-thumbnails-btn"
            onClick={() => setShowThumbnails(prev => !prev)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              showThumbnails 
                ? 'bg-blue-600/30 border-blue-500/50 text-blue-300' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title={language === 'hi' ? 'थंबनेल पट्टी टॉगल करें' : 'Toggle Thumbnails'}
            aria-label="Toggle Thumbnails"
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            id="lightbox-fullscreen-btn"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:flex"
            title={language === 'hi' ? 'फुल स्क्रीन (F)' : 'Toggle Fullscreen (F)'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Button */}
          <button
            id="lightbox-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 hover:text-rose-200 transition-colors cursor-pointer flex items-center gap-1"
            title={language === 'hi' ? 'बंद करें (Esc)' : 'Close Preview (Esc)'}
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
            <span className="text-xs font-semibold hidden sm:inline">
              {language === 'hi' ? 'बंद करें' : 'Close'}
            </span>
          </button>
        </div>
      </div>

      {/* 2. MAIN VIEWPORT WITH NAVIGATION ARROWS */}
      <div 
        className="relative flex-1 flex items-center justify-center overflow-hidden px-4 sm:px-16 md:px-20 py-2"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        {/* Previous Navigation Arrow Button */}
        <button
          id="lightbox-prev-arrow-btn"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          disabled={items.length <= 1}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-2xl bg-slate-900/80 hover:bg-blue-600 border border-slate-700/80 hover:border-blue-400 text-white shadow-2xl backdrop-blur-md transition-all duration-200 cursor-pointer disabled:opacity-20 disabled:hover:bg-slate-900/80 group"
          title={language === 'hi' ? 'पिछली तस्वीर (←)' : 'Previous Image (←)'}
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Next Navigation Arrow Button */}
        <button
          id="lightbox-next-arrow-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          disabled={items.length <= 1}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-2xl bg-slate-900/80 hover:bg-blue-600 border border-slate-700/80 hover:border-blue-400 text-white shadow-2xl backdrop-blur-md transition-all duration-200 cursor-pointer disabled:opacity-20 disabled:hover:bg-slate-900/80 group"
          title={language === 'hi' ? 'अगली तस्वीर (→)' : 'Next Image (→)'}
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Active Slide Image */}
        <div 
          className="relative max-w-full max-h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl"
              style={{
                transform: `scale(${zoomLevel}) translate(${pan.x / zoomLevel}px, ${pan.y / zoomLevel}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out'
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="max-w-[90vw] max-h-[58vh] sm:max-h-[64vh] md:max-h-[68vh] object-contain rounded-xl shadow-2xl border border-slate-800"
                referrerPolicy="no-referrer"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. CAPTION & METADATA BAR */}
      <div 
        className="relative z-40 bg-slate-900/95 border-t border-slate-800/80 px-4 sm:px-6 py-3.5 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                {item.title}
              </h3>
              {item.location && (
                <span className="inline-flex items-center gap-1 text-xs text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-800/60">
                  <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                  <span>{item.location}</span>
                </span>
              )}
            </div>
            
            <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Inquire / Apply Shortcut in Lightbox */}
          {onOpenApply && (
            <button
              id="lightbox-apply-now-btn"
              onClick={() => {
                onClose();
                onOpenApply();
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{language === 'hi' ? 'कोर्स में प्रवेश लें' : 'Apply for Next Batch'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </button>
          )}
        </div>
      </div>

      {/* 4. THUMBNAILS CAROUSEL STRIP */}
      {showThumbnails && (
        <div 
          className="relative z-40 bg-slate-950 border-t border-slate-800/80 py-2.5 px-4 overflow-x-auto select-none"
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            ref={thumbnailStripRef}
            className="flex items-center gap-2.5 max-w-6xl mx-auto overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-slate-700"
          >
            {items.map((thumbItem, idx) => {
              const isSelected = thumbItem.id === item.id;
              return (
                <button
                  key={thumbItem.id}
                  id={`lightbox-thumb-${thumbItem.id}`}
                  onClick={() => onNavigate(idx)}
                  className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'border-blue-500 ring-2 ring-blue-400/50 scale-105 opacity-100' 
                      : 'border-slate-800 opacity-50 hover:opacity-90 hover:border-slate-600'
                  }`}
                  title={thumbItem.title}
                  aria-label={`View photo ${idx + 1}: ${thumbItem.title}`}
                >
                  <img
                    src={thumbItem.image}
                    alt={thumbItem.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-blue-600/20 pointer-events-none" />
                  )}
                  <span className="absolute bottom-0.5 right-1 text-[9px] font-bold text-white bg-slate-900/80 px-1 rounded">
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
