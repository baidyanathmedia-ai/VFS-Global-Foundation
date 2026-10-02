import React, { useState } from 'react';
import { 
  ImageIcon, 
  Eye, 
  MapPin, 
  Award
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/academyData';
import { GalleryItem } from '../types';
import { LightboxModal } from './LightboxModal';
import { useLanguage } from '../context/LanguageContext';

type CategoryFilter = 'All' | 'Training Sessions' | 'Certificate Distribution' | 'Student Activities' | 'Educational Visits' | 'Campus Life';

interface GallerySectionProps {
  onOpenApply?: (courseId?: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenApply }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const { t, language } = useLanguage();

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'All', label: language === 'hi' ? 'सभी फोटो' : 'All' },
    { key: 'Training Sessions', label: language === 'hi' ? 'ट्रेनिंग सत्र' : 'Training Sessions' },
    { key: 'Certificate Distribution', label: language === 'hi' ? 'सर्टिफिकेट वितरण' : 'Certificate Distribution' },
    { key: 'Student Activities', label: language === 'hi' ? 'छात्र गतिविधियां' : 'Student Activities' },
    { key: 'Educational Visits', label: language === 'hi' ? 'शैक्षणिक भ्रमण' : 'Educational Visits' },
    { key: 'Campus Life', label: language === 'hi' ? 'कैंपस लाइफ' : 'Campus Life' }
  ];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const handleOpenLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const handleNavigateLightbox = (index: number) => {
    setSelectedItem(filteredItems[index]);
  };

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-slate-950 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{t.galleryTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.galleryTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {t.gallerySubtitle}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((catObj) => {
            const count = catObj.key === 'All' ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter(i => i.category === catObj.key).length;
            const isActive = activeCategory === catObj.key;

            return (
              <button
                key={catObj.key}
                onClick={() => setActiveCategory(catObj.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-transparent dark:border-slate-800'
                }`}
              >
                <span>{catObj.label}</span>
                <span className={`px-1.5 py-0.2 text-[11px] rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Interactive Helper Hint */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
          <Eye className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>
            {language === 'hi'
              ? 'फुल-स्क्रीन व्यू, नेविगेशन एरो और ज़ूम टूल्स हेतु किसी भी तस्वीर पर क्लिक करें'
              : 'Click any photo to open full-screen lightbox with navigation arrows, zoom & slideshow'}
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              role="button"
              tabIndex={0}
              onClick={() => handleOpenLightbox(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenLightbox(item);
                }
              }}
              className="group relative bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-80 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Enlarge photo ${index + 1}: ${item.title}`}
            >
              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden bg-slate-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Category Pill on top */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Quick Zoom Overlay Icon Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md flex items-center gap-1 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 border border-white/20">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {language === 'hi' ? 'फुल स्क्रीन' : 'Fullscreen'}
                  </span>
                </div>

                {/* Caption on bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white space-y-1">
                  {item.location && (
                    <div className="text-[11px] text-blue-300 flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                  )}
                  <h3 className="text-sm font-bold leading-snug line-clamp-2 text-white group-hover:text-blue-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-emerald-300 font-medium">
                    <span>{language === 'hi' ? 'फुल-स्क्रीन विवरण देखें' : 'Click to enlarge full-screen'}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Preview Modal */}
      {selectedItem && (
        <LightboxModal
          item={selectedItem}
          items={filteredItems}
          onClose={() => setSelectedItem(null)}
          onNavigate={handleNavigateLightbox}
          onOpenApply={onOpenApply}
        />
      )}
    </section>
  );
};
