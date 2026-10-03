import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Building2,
  ExternalLink
} from 'lucide-react';
import { BATCH_7_ACHIEVEMENTS_DATA } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';

interface BatchSevenAchievementsSectionProps {
  onOpenApply?: () => void;
}

export const BatchSevenAchievementsSection: React.FC<BatchSevenAchievementsSectionProps> = ({ 
  onOpenApply 
}) => {
  const { language } = useLanguage();

  const handleScrollToAllAchievements = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('testimonials');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="batch-7" 
      className="py-20 bg-slate-50/70 dark:bg-slate-900/60 relative overflow-hidden transition-colors duration-200 border-y border-slate-200/80 dark:border-slate-800/80"
    >
      {/* Background Subtle Highlights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{language === 'hi' ? 'वीएफएस ग्लोबल अकादमी देवघर • बैच शोकेस' : 'VFS Global Academy Deoghar • Batch Showcase'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'hi' ? 'बैच 7 — छात्र उपलब्धियां' : 'Batch 7 — Student Achievements'}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-medium">
            {language === 'hi' 
              ? 'हमारे बैच 7 के विद्यार्थियों के सीखने, प्रगति और उपलब्धियों का उत्सव।'
              : 'Celebrating the learning, growth and achievements of our Batch 7 students.'}
          </p>
        </div>

        {/* 8 Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BATCH_7_ACHIEVEMENTS_DATA.map((student, index) => (
            <div
              key={student.id}
              className="group relative bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Subtle Top Glowing Line Accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

              <div>
                {/* Card Top: Small Batch 7 Badge & Verification Icon */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/70 dark:border-blue-800/60 font-extrabold text-[11px] tracking-wide uppercase shadow-2xs">
                    <Award className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    <span>{student.batch}</span>
                  </span>

                  <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 font-mono">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Profile Photo / Avatar */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative shrink-0">
                    {student.avatarUrl ? (
                      <img 
                        src={student.avatarUrl} 
                        alt={student.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20 group-hover:ring-blue-500/50 transition-all shadow-md"
                        loading="lazy"
                      />
                    ) : (
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${student.avatarBg} text-white flex items-center justify-center font-extrabold text-lg shadow-md ring-2 ring-white/10 group-hover:scale-105 transition-transform duration-300`}>
                        {student.initials}
                      </div>
                    )}
                    <span 
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white dark:ring-slate-950 shadow-xs"
                      title="Verified Batch 7 Alumnus"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 block truncate">
                      {student.domain}
                    </span>
                    {/* Name Displayed Prominently */}
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {student.name}
                    </h3>
                  </div>
                </div>

                {/* Current Role / Profession — Uniform Format: Name + Current Role/Profession */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="text-[11px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider mb-1 flex items-center gap-1.5">
                    <Briefcase className="w-3 h-3 text-slate-400" />
                    <span>Current Role & Organization</span>
                  </div>
                  
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                    <span className="font-bold text-slate-900 dark:text-white">{student.role}</span>
                    <span className="text-slate-400 dark:text-slate-500 mx-1.5">—</span>
                    <span className="text-slate-700 dark:text-slate-300">{student.organization}</span>
                  </p>
                </div>
              </div>

              {/* Card Footer Indicator */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  <span>STPI Deoghar Alum</span>
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  Verified <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom Actions: View All Achievements & Join Next Batch */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              {language === 'hi' 
                ? 'वीएफएस ग्लोबल अकादमी, एसटीपीआई देवघर से प्रशिक्षित छात्र-छात्राएं विभिन्न उद्योगों में नेतृत्व कर रहे हैं।'
                : 'Graduates trained at VFS Global Academy, STPI Deoghar are excelling across high-growth careers.'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View All Achievements Button */}
            <a
              href="#testimonials"
              onClick={handleScrollToAllAchievements}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer group"
            >
              <span>{language === 'hi' ? 'सभी उपलब्धियां देखें' : 'View All Achievements'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {onOpenApply && (
              <button
                type="button"
                onClick={onOpenApply}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-blue-600/20 hover:scale-[1.02] cursor-pointer"
              >
                <span>{language === 'hi' ? 'प्रवेश के लिए आवेदन करें' : 'Apply For Next Batch'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
