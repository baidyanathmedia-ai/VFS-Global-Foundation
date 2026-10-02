import React from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  MapPin, 
  Clock
} from 'lucide-react';
import { COURSES_DATA } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';
import { VfsLogo } from './VfsLogo';
import { stpiConvocationCampus } from '../assets';

interface HeroProps {
  onOpenApply: (courseId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApply }) => {
  const { t, language } = useLanguage();

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Background Glows & Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-emerald-700/10 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      {/* Background Image with High-End Overlay */}
      <div className="absolute inset-0 opacity-25 mix-blend-luminosity overflow-hidden">
        <img 
          src={stpiConvocationCampus} 
          alt="VFS Global Academy STPI Deoghar Convocation" 
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Institute Tag Badge with Official Logo Mark */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-blue-500/30 text-blue-200 text-xs sm:text-sm font-medium backdrop-blur-md shadow-lg shadow-blue-900/20">
              <VfsLogo variant="dark" shieldOnly size="sm" />
              <span className="font-semibold text-white">VFS Global Academy</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-emerald-400 font-medium">STPI Deoghar Centre</span>
            </div>

            {/* Main Required Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              {t.heroHeadlineMain}{' '}
              <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent">
                {t.heroHeadlineHighlight}
              </span>
            </h1>

            {/* Main Required Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              {t.heroSubheadline}
            </p>

            {/* Centre Location Pill */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>STPI Deoghar (Jasidih), Jharkhand</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>{language === 'hi' ? '3 माह सर्टिफिकेट कोर्सेज' : '3 Months Certificate Courses'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                id="hero-apply-now-btn"
                onClick={() => onOpenApply()}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <span>{t.heroApplyBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                id="hero-explore-courses-btn"
                href="#courses"
                className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2 text-base"
              >
                <BookOpen className="w-5 h-5 text-blue-300" />
                <span>{t.heroExploreCoursesBtn}</span>
              </a>
            </div>

            {/* Key Assurance Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-left">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-emerald-400">{t.heroStat1Value}</span>
                <span className="text-xs text-slate-400">{t.heroStat1Label}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-sky-400">{t.heroStat3Value}</span>
                <span className="text-xs text-slate-400">{t.heroStat3Label}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-blue-300">{language === 'hi' ? 'शुक्र, शनि, रवि' : 'Fri, Sat, Sun'}</span>
                <span className="text-xs text-slate-400">{language === 'hi' ? 'सप्ताहांत कक्षाएं' : 'Weekend Classes'}</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition duration-1000"></div>
              
              <div className="relative bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur-xl space-y-4">
                {/* Visual Header Image */}
                <div className="relative h-48 rounded-xl overflow-hidden border border-slate-700">
                  <img 
                    src={stpiConvocationCampus} 
                    alt="STPI Deoghar Academy Centre Convocation" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex items-end p-3">
                    <div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-600/90 text-white">
                        {t.aboutStpiBadge}
                      </span>
                      <p className="text-sm font-bold text-white mt-1">
                        STPI, Deoghar (Jasidih), Jharkhand
                      </p>
                    </div>
                  </div>
                </div>

                {/* Course Quick Preview List */}
                <div className="space-y-2.5 pt-1">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {language === 'hi' ? 'सर्टिफिकेट कोर्सेज' : 'Certificate Programmes'}
                  </div>

                  {COURSES_DATA.map((course) => (
                    <div 
                      key={course.id}
                      onClick={() => onOpenApply(course.id)}
                      className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 transition-all cursor-pointer group flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {course.id === 'travel-hospitality' ? t.course1Title : t.course2Title}
                        </h3>
                        <p className="text-xs text-slate-400 flex items-center gap-2">
                          <span>{language === 'hi' ? '3 माह' : course.duration}</span>
                          <span>•</span>
                          <span>{language === 'hi' ? 'सप्ताह में 3 दिन' : course.classesPerWeek}</span>
                        </p>
                      </div>
                      <span className="text-xs font-medium text-emerald-400 group-hover:translate-x-1 transition-transform">
                        {language === 'hi' ? 'आवेदन करें →' : 'Apply →'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Admissions Open Notice Banner */}
                <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
                  <div className="text-xs text-emerald-200">
                    <span className="font-bold text-white">{t.heroBatchAlert}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
