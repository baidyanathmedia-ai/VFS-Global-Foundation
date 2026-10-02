import React from 'react';
import { 
  Briefcase, 
  Award, 
  Users, 
  BookOpen, 
  MessageSquare, 
  TrendingUp,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhyChooseUs: React.FC = () => {
  const { t, language } = useLanguage();

  const cards = [
    {
      title: t.why1Title,
      description: t.why1Desc,
      icon: <Briefcase className="w-6 h-6 text-blue-600" />
    },
    {
      title: t.why2Title,
      description: t.why2Desc,
      icon: <Award className="w-6 h-6 text-emerald-600" />
    },
    {
      title: t.why3Title,
      description: t.why3Desc,
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      title: t.why4Title,
      description: t.why4Desc,
      icon: <BookOpen className="w-6 h-6 text-emerald-600" />
    },
    {
      title: t.why5Title,
      description: t.why5Desc,
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />
    },
    {
      title: t.why6Title,
      description: t.why6Desc,
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-slate-50 dark:bg-slate-900/60 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.whyTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.whyTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.whySubtitle}
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={card.title}
              id={`why-choose-card-${index + 1}`}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-7 shadow-sm hover:shadow-xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-400/60 dark:hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <CheckCircle className="w-4 h-4 mr-1.5 text-emerald-500" />
                <span>{language === 'hi' ? 'सत्यापित अकादमी मानक' : 'Verified Academy Standard'}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
