import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Target, 
  GraduationCap, 
  ExternalLink,
  Eye 
} from 'lucide-react';
import { CONTACT_CONFIG, GALLERY_ITEMS } from '../data/academyData';
import { GalleryItem } from '../types';
import { LightboxModal } from './LightboxModal';
import { useLanguage } from '../context/LanguageContext';
import { 
  stpiConvocationCampus, 
  vfsReceptionBatch, 
  vfsCertificateAward 
} from '../assets';

export const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const openCampusPhoto = (photoId: string) => {
    const item = GALLERY_ITEMS.find(g => g.id === photoId) || GALLERY_ITEMS[0];
    setSelectedPhoto(item);
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-200">
      {/* Background Subtle Highlights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/60 dark:bg-blue-950/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t.aboutTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.aboutTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {language === 'hi' 
              ? 'VFS Global Foundation के अंतर्गत STPI देवघर में व्यावहारिक कौशल एवं संचार प्रशिक्षण।'
              : 'Empowering students with industry-relevant vocational and communication competencies under VFS Global Foundation at STPI Deoghar.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Mission Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              <p className="font-medium text-slate-800 dark:text-slate-200">
                <span className="font-bold text-blue-700 dark:text-blue-400">VFS Global Academy</span> {t.aboutDesc1}
              </p>
              
              <p>
                {t.aboutDesc2}
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 mt-0.5">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.why4Title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {language === 'hi' ? 'रोल-प्ले, सार्वजनिक संभाषण और वास्तविक कस्टमर डीलिंग अभ्यास।' : 'Roleplay sessions, public speaking, and simulated customer handling.'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 mt-0.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.why5Title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {language === 'hi' ? 'बायोडाटा निर्माण, व्यक्तित्व निखार और मॉक इंटरव्यू सत्र।' : 'Resume building, personality refinement, and mock interviews.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Verified Location Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-emerald-50/80 dark:from-slate-900 dark:to-slate-900/90 border border-blue-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-bold text-base">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>{language === 'hi' ? 'केंद्र का पता (Landmark):' : 'Centre Location:'}</span>
              </div>
              
              <div className="text-sm text-slate-800 dark:text-slate-200 space-y-1 font-medium pl-7">
                <div className="font-bold text-slate-900 dark:text-white">STPI, Deoghar (Jasidih)</div>
                <div>Near Swagat Petrol Pump</div>
                <div>Manikpur Road, After Railway Over Bridge</div>
                <div className="text-slate-700 dark:text-slate-400">Jasidih, Deoghar, Jharkhand, PIN - 814142</div>
              </div>

              <div className="pl-7 pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
                <a 
                  href={CONTACT_CONFIG.GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 underline"
                >
                  <span>{language === 'hi' ? 'गूगल मैप्स पर देखें' : 'Open in Google Maps'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span className="text-emerald-700 dark:text-emerald-400">{t.deskHours}</span>
              </div>
            </div>

          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              id="about-campus-main-photo"
              onClick={() => openCampusPhoto("gal-1")}
              className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 group cursor-pointer"
              title={language === 'hi' ? 'फुल-स्क्रीन में देखने हेतु क्लिक करें' : 'Click to enlarge full-screen'}
            >
              <img 
                src={stpiConvocationCampus} 
                alt="STPI Deoghar Centre Convocation" 
                className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                <div className="text-white flex-1">
                  <div className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-600 inline-block mb-1">
                    STPI Deoghar Campus
                  </div>
                  <h4 className="text-lg font-bold">Software Technology Parks of India</h4>
                  <p className="text-xs text-slate-200">Manikpur Road, Jasidih, Deoghar (Jharkhand)</p>
                </div>

                <div className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div 
                id="about-campus-reception-photo"
                onClick={() => openCampusPhoto("gal-4")}
                className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative h-36 group cursor-pointer"
                title={language === 'hi' ? 'फुल-स्क्रीन में देखने हेतु क्लिक करें' : 'Click to enlarge full-screen'}
              >
                <img 
                  src={vfsReceptionBatch} 
                  alt="VFS Academy Reception Desk" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/50 p-2.5 flex items-end justify-between">
                  <span className="text-xs font-bold text-white">{language === 'hi' ? 'अकादमी रिसेप्शन डेस्क' : 'Academy Reception'}</span>
                  <Eye className="w-3.5 h-3.5 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div 
                id="about-campus-cert-photo"
                onClick={() => openCampusPhoto("gal-2")}
                className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative h-36 group cursor-pointer"
                title={language === 'hi' ? 'फुल-स्क्रीन में देखने हेतु क्लिक करें' : 'Click to enlarge full-screen'}
              >
                <img 
                  src={vfsCertificateAward} 
                  alt="Certificate Distribution" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/50 p-2.5 flex items-end justify-between">
                  <span className="text-xs font-bold text-white">{language === 'hi' ? 'सर्टिफिकेट वितरण' : 'Certificate Ceremony'}</span>
                  <Eye className="w-3.5 h-3.5 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Lightbox Modal for Campus Photos */}
      {selectedPhoto && (
        <LightboxModal
          item={selectedPhoto}
          items={GALLERY_ITEMS}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={(index) => setSelectedPhoto(GALLERY_ITEMS[index])}
        />
      )}
    </section>
  );
};
