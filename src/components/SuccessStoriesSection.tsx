import React, { useState } from 'react';
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  AlertCircle, 
  GraduationCap, 
  Award,
  Play,
  Pause,
  Film,
  Volume2,
  VolumeX,
  ExternalLink,
  Video
} from 'lucide-react';
import { SUCCESS_STORIES_DATA } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface SuccessStoriesSectionProps {
  onOpenApply?: () => void;
}

export const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({ onOpenApply }) => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [playingVideoCards, setPlayingVideoCards] = useState<Set<string>>(new Set());
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const categories = [
    { id: 'all', labelEn: 'All Industries', labelHi: 'सभी क्षेत्र' },
    { id: 'Aviation', labelEn: 'Airlines & Airports', labelHi: 'एयरलाइंस व एयरपोर्ट' },
    { id: 'Hospitality', labelEn: 'Luxury Hospitality', labelHi: 'हॉस्पिटैलिटी व होटल्स' },
    { id: 'Visa & Consular', labelEn: 'Visa & Consular Services', labelHi: 'वीजा व कॉन्स्युलर सेवाएं' },
    { id: 'Travel & Tourism', labelEn: 'Travel & Tourism', labelHi: 'पर्यटन व ट्रेवल' }
  ];

  const filteredStories = selectedCategory === 'all'
    ? SUCCESS_STORIES_DATA
    : SUCCESS_STORIES_DATA.filter((story) => story.category === selectedCategory);

  const toggleCardExpansion = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        // Also stop playing video if card collapses
        setPlayingVideoCards((vPrev) => {
          const vNext = new Set(vPrev);
          vNext.delete(id);
          return vNext;
        });
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleVideoPlayback = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingVideoCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAllExpansion = () => {
    if (expandedCards.size === filteredStories.length) {
      setExpandedCards(new Set());
      setPlayingVideoCards(new Set());
    } else {
      setExpandedCards(new Set(filteredStories.map((s) => s.id)));
    }
  };

  const isAllExpanded = filteredStories.length > 0 && expandedCards.size === filteredStories.length;

  return (
    <section 
      ref={sectionRef}
      id="success-stories" 
      className="py-20 bg-white dark:bg-slate-950 relative transition-colors duration-200 overflow-hidden"
    >
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with subtle fade-in-up */}
        <div className={`text-center max-w-3xl mx-auto space-y-3 mb-8 transition-all duration-700 ${
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t.successStoriesTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.successStoriesTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {t.successStoriesSubtitle}
          </p>

          {/* Quick Anchor Links to Batch 7 and Video Showcase Section */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <a
              href="#batch-7"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-all shadow-xs group"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>{language === 'hi' ? 'बैच 7 उपलब्धियां देखें' : 'Batch 7 Achievements (8 Profiles)'}</span>
              <span className="text-emerald-500 font-extrabold">↓</span>
            </a>

            <a
              href="#video-showcase"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold transition-all shadow-xs group"
            >
              <Film className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              <span>{language === 'hi' ? 'वीडियो रील शोकेस देखें' : 'Watch Our Latest Videos (Reel Carousel)'}</span>
              <span className="text-blue-500 font-extrabold">↓</span>
            </a>
          </div>
        </div>

        {/* Category Filters & Quick Expand All Toggle */}
        <div className={`flex flex-wrap items-center justify-between gap-3 mb-10 transition-all duration-700 ${
          isVisible ? 'animate-fade-in-up animation-delay-100 opacity-100' : 'opacity-0 translate-y-6'
        }`}>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 hidden sm:flex">
              <Filter className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'फ़िल्टर:' : 'Filter:'}</span>
            </div>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-600/30 dark:ring-blue-400/30'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {language === 'hi' ? cat.labelHi : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Toggle All Cards View */}
          <button
            type="button"
            onClick={toggleAllExpansion}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            title={isAllExpanded ? "Collapse all career highlights" : "Expand all career highlights"}
          >
            {isAllExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{language === 'hi' ? 'सभी संक्षिप्त करें' : 'Collapse All'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{language === 'hi' ? 'सभी हाइलाइट्स व वीडियो देखें' : 'Expand All & Video Stories'}</span>
              </>
            )}
          </button>
        </div>

        {/* Success Stories Grid with Clean Initial View & Interactive Expandable Highlights + Embedded Video Clips */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((item, index) => {
            const isExpanded = expandedCards.has(item.id);
            const isPlayingVideo = playingVideoCards.has(item.id);
            const highlights = item.highlights || [
              item.keyMetric || 'Industry Certified',
              'STPI Deoghar Mentorship',
              'Placement Ready'
            ];

            return (
              <div
                key={`${item.id}-${selectedCategory}`}
                style={{ animationDelay: `${index * 80 + 150}ms` }}
                className={`bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-400/50 dark:hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-6'
                } ${isExpanded ? 'ring-2 ring-blue-500/20 dark:ring-blue-400/20' : ''}`}
              >
                {/* Subtle Top Gradient Accent on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="space-y-4">
                  {/* Card Header: Company & Verified Key Metric Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="font-bold tracking-tight">{item.company}</span>
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      {item.videoClip && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                          <Film className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
                          <span>Video Clip</span>
                        </span>
                      )}

                      {item.keyMetric && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 whitespace-nowrap shadow-2xs">
                          <Award className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{item.keyMetric}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Role and Placement Location */}
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {language === 'hi' ? 'वर्तमान पद व संस्थान' : 'Current Role & Placement'}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-0.5">
                      {item.currentRole}
                    </h3>
                    {item.location && (
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Initial Clean Snapshot: Primary Career Impact Summary */}
                  <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-200/60 dark:border-slate-800/80 relative">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-bold text-slate-900 dark:text-slate-200 block mb-0.5">
                          {language === 'hi' ? 'करियर उपलब्धि व प्रभाव:' : 'Career Achievement:'}
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {item.currentImpact}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Subtle Career Highlights Preview Pills */}
                  <div className="space-y-1.5 pt-0.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                      <span className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-400">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        {language === 'hi' ? 'प्रमुख कौशल व विशेषज्ञता:' : 'Key Competencies:'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {highlights.slice(0, 2).map((h, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/50"
                        >
                          {h}
                        </span>
                      ))}
                      {highlights.length > 2 && !isExpanded && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          +{highlights.length - 2} {language === 'hi' ? 'अन्य' : 'more'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expandable Deep Case Study Drawer + Embedded Alumni Video Player */}
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${
                      isExpanded ? 'max-h-[1400px] opacity-100 pt-2 space-y-3' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {/* Phase 1: Starting Challenge */}
                    <div className="bg-amber-50/70 dark:bg-amber-950/25 rounded-xl p-3 border border-amber-200/50 dark:border-amber-900/40">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-400 text-[11px] mb-1">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>{language === 'hi' ? 'प्रारंभिक चुनौती:' : 'Initial Starting Point:'}</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {item.challenge}
                      </p>
                    </div>

                    {/* Phase 2: STPI Deoghar Mentorship & Practical Drills */}
                    <div className="bg-blue-50/70 dark:bg-blue-950/30 rounded-xl p-3 border border-blue-200/50 dark:border-blue-900/40">
                      <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300 text-[11px] mb-1">
                        <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>{language === 'hi' ? 'अकादमी में प्रशिक्षण:' : 'STPI Deoghar Mentorship:'}</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {item.transformation}
                      </p>
                    </div>

                    {/* Full Highlights List in Expanded View */}
                    <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl p-3 border border-emerald-200/50 dark:border-emerald-900/30">
                      <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 block mb-1.5">
                        {language === 'hi' ? 'सत्यापित करियर उपलब्धियां:' : 'Verified Career Milestones:'}
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                        {highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Embedded Alumni Short Video Clip Player (Directly within Expanded Card View) */}
                    {item.videoClip && (
                      <div className="bg-slate-900 text-white rounded-xl p-3 border border-slate-800 shadow-md space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                              <Video className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <span className="text-[11px] font-bold block text-white">
                                {language === 'hi' ? 'पूर्व छात्र वीडियो क्लिप' : 'Alumni Video Story'}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                {item.videoClip.duration || 'Short Reel'} • {item.videoClip.platform === 'instagram' ? 'Instagram Reel' : 'Facebook Video'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => toggleVideoPlayback(item.id, e)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                isPlayingVideo
                                  ? 'bg-red-600 hover:bg-red-500 text-white'
                                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                              }`}
                            >
                              {isPlayingVideo ? (
                                <>
                                  <Pause className="w-3 h-3 fill-white" />
                                  <span>{language === 'hi' ? 'बंद करें' : 'Close Player'}</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-3 h-3 fill-white" />
                                  <span>{language === 'hi' ? 'वीडियो चलाएं' : 'Play Video'}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Inline Video Player Container */}
                        {isPlayingVideo ? (
                          <div className="rounded-lg overflow-hidden border border-slate-800 bg-black aspect-video relative animate-fade-in-up">
                            {item.videoClip.embedUrl ? (
                              <iframe
                                src={item.videoClip.embedUrl}
                                title={item.videoClip.title}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              />
                            ) : (
                              <video
                                src={item.videoClip.url}
                                controls
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        ) : (
                          <div 
                            onClick={(e) => toggleVideoPlayback(item.id, e)}
                            className="group/thumb relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950 aspect-video flex items-center justify-center cursor-pointer transition-all hover:border-blue-500/60"
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                            
                            {/* Play overlay button */}
                            <div className="relative z-10 flex flex-col items-center gap-1.5">
                              <div className="w-10 h-10 rounded-full bg-blue-600 group-hover/thumb:bg-blue-500 text-white flex items-center justify-center shadow-lg group-hover/thumb:scale-110 transition-transform">
                                <Play className="w-4 h-4 fill-white ml-0.5" />
                              </div>
                              <span className="text-[11px] font-bold text-slate-200 group-hover/thumb:text-white">
                                {language === 'hi' ? 'यहाँ वीडियो देखें' : 'Click to Play Story Here'}
                              </span>
                            </div>

                            <span className="absolute bottom-2 right-2 text-[10px] font-medium text-slate-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                              {item.videoClip.duration}
                            </span>
                          </div>
                        )}

                        {/* Video Caption & Direct Social Link */}
                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                          <p className="line-clamp-1 text-slate-300 pr-2">
                            {item.videoClip.caption}
                          </p>
                          <a
                            href={item.videoClip.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold shrink-0 cursor-pointer"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action & Student Metadata Footer */}
                <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  
                  {/* Subtle Interactive 'Read More / Highlights' Bar with Hover Indicator */}
                  <button
                    type="button"
                    onClick={() => toggleCardExpansion(item.id)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer bg-slate-50 hover:bg-blue-50 dark:bg-slate-800/70 dark:hover:bg-blue-950/50 text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300 border border-slate-200/70 hover:border-blue-300 dark:border-slate-700 dark:hover:border-blue-800/80 group/btn"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover/btn:scale-110 transition-transform" />
                      <span>
                        {isExpanded
                          ? (language === 'hi' ? 'संक्षिप्त विवरण करें' : 'Show Less Highlights')
                          : (language === 'hi' ? 'करियर यात्रा व वीडियो देखें' : 'Read Career Highlights & Video Story')}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 transition-transform" />
                      ) : (
                        <ChevronDown className="w-4 h-4 transition-transform group-hover/btn:translate-y-0.5" />
                      )}
                    </span>
                  </button>

                  {/* Student Metadata Information (Clean footer without duplicate student name h4) */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-full ${item.avatarBg || 'bg-blue-600 text-white'} flex items-center justify-center font-bold text-xs shadow-sm shrink-0`}>
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                          {item.course}
                        </p>
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          {item.batch}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0">
                      <div className="flex text-amber-400">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
                        {language === 'hi' ? 'प्रमाणित पूर्व छात्र' : 'STPI Deoghar Alum'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};


