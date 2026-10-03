import React from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight
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
          <div className="inline-flex items-center gap-2 text-blue-700 dark:text-blue-400 text-xs font-semibold tracking-wide">
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>VFS Global Academy Deoghar</span>
            <span aria-hidden="true">·</span>
            <span>Batch 7 Alumni Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight text-balance">
            Batch 7 — Student Achievements
          </h2>

          <p className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-400">
            Celebrating Learning, Growth &amp; Professional Journeys
          </p>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Our Batch 7 students have taken their learning, communication skills and professional confidence into different career paths and professional fields.
          </p>
        </div>

        {/* 8 Student Journey Cards Grid (01 to 08) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {BATCH_7_ACHIEVEMENTS_DATA.map((student) => (
            <article
              key={student.id}
              className="group relative bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

              <div>
                {/* Top Metadata Row (Clean Unboxed Text) */}
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-2 font-medium">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                      {student.number}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{student.batch}</span>
                    <span aria-hidden="true">·</span>
                    <span>{student.domain}</span>
                  </div>
                  <span className="text-slate-400 dark:text-slate-500 font-medium">
                    STPI Deoghar
                  </span>
                </div>

                {/* Profile Identity Header: Avatar + "01. Name" + "Role — Organization" */}
                <div className="flex items-start gap-4 pb-5 border-b border-slate-100 dark:border-slate-800/80">
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
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <span className="font-mono text-blue-600 dark:text-blue-400 mr-1.5 tabular-nums">
                        {student.number}.
                      </span>
                      {student.name}
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 mt-1 leading-snug">
                      {student.fullDesignation}
                    </p>
                  </div>
                </div>

                {/* Professional Journey Narrative */}
                <p className="mt-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {student.story}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Closing Statement Banner: "Batch 7 — Different Fields, One Journey of Growth" */}
        <div className="mt-14 pt-10 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-2.5">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Batch 7 — Different Fields, One Journey of Growth
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                From entrepreneurship and education to communication, business, safety and engineering, our Batch 7 students continue to take their learning forward into diverse professional journeys.
              </p>
            </div>

            {onOpenApply && (
              <div className="shrink-0">
                <button
                  type="button"
                  onClick={onOpenApply}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-md shadow-blue-600/20 hover:scale-[1.02] cursor-pointer"
                >
                  <span>{language === 'hi' ? 'प्रवेश के लिए आवेदन करें' : 'Apply For Next Batch'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
