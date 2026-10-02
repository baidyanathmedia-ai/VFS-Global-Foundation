import React from 'react';
import { 
  Quote, 
  Star, 
  MessageSquare 
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const TestimonialsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="py-20 bg-slate-50 dark:bg-slate-900/60 relative transition-colors duration-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with subtle fade-in-up */}
        <div className={`text-center max-w-3xl mx-auto space-y-3 mb-16 transition-all duration-700 ${
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.testimonialsTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.testimonialsTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {t.testimonialsSubtitle}
          </p>
        </div>

        {/* Testimonials Grid with staggered subtle fade-in-up */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((item, index) => (
            <div
              key={item.id}
              style={{ animationDelay: `${index * 80 + 100}ms` }}
              className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group ${
                isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="space-y-4">
                {/* Star rating & Course badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-transparent dark:border-blue-800/50">
                    {language === 'hi' ? 'प्रमाणित छात्र' : 'Verified Learner'}
                  </span>
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="w-6 h-6 text-slate-200 dark:text-slate-800 group-hover:text-blue-100 dark:group-hover:text-blue-900/40 transition-colors" />
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic mt-1">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              {/* Student Metadata */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${item.avatarBg || 'bg-blue-600 text-white'} flex items-center justify-center font-bold text-sm shadow-sm`}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {item.course}
                  </p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    {item.batch}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Code Notice / Helper Note for editing */}
        <div className={`mt-12 text-center text-xs text-slate-500 dark:text-slate-400 transition-all duration-700 ${
          isVisible ? 'animate-fade-in-up animation-delay-400 opacity-100' : 'opacity-0'
        }`}>
          <span className="italic">
            {language === 'hi' 
              ? 'नोट: STPI देवघर के पूर्व छात्रों के वास्तविक अनुभव।' 
              : 'Certified alumni experiences at STPI Deoghar centre under VFS Global Foundation.'}
          </span>
        </div>

      </div>
    </section>
  );
};
