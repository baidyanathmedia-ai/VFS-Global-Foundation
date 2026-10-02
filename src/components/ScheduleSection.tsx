import React from 'react';
import { 
  Calendar, 
  Clock, 
  Sun, 
  Sparkles, 
  AlertCircle,
  MapPin
} from 'lucide-react';
import { SCHEDULE_DATA } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';

export const ScheduleSection: React.FC = () => {
  const { t, language } = useLanguage();

  const daysOfWeek = [
    { day: language === 'hi' ? 'सोमवार' : 'Monday', active: false, note: language === 'hi' ? 'स्वाध्याय एवं अभ्यास' : 'Self-Study & Practice' },
    { day: language === 'hi' ? 'मंगलवार' : 'Tuesday', active: false, note: language === 'hi' ? 'असाइनमेंट तैयारी' : 'Online Assignments' },
    { day: language === 'hi' ? 'बुधवार' : 'Wednesday', active: false, note: language === 'hi' ? 'रिवीजन व तैयारी' : 'Self-Study & Prep' },
    { day: language === 'hi' ? 'गुरुवार' : 'Thursday', active: false, note: language === 'hi' ? 'काउंसलिंग व पूछताछ' : 'Doubt Clearing & Desk' },
    { day: language === 'hi' ? 'शुक्रवार' : 'Friday', active: true, note: language === 'hi' ? 'मुख्य क्लासरूम सत्र' : 'Core Classroom Session', time: language === 'hi' ? '10:00 - 01:00' : '10:00 AM – 01:00 PM' },
    { day: language === 'hi' ? 'शनिवार' : 'Saturday', active: true, note: language === 'hi' ? 'प्रैक्टिकल सिमुलेशन' : 'Practical Simulation & Lab', time: language === 'hi' ? '10:00 - 01:00' : '10:00 AM – 01:00 PM' },
    { day: language === 'hi' ? 'रविवार' : 'Sunday', active: true, note: language === 'hi' ? 'रोलप्ले व प्रेजेंटेशन' : 'Interactive Workshops & Roleplay', time: language === 'hi' ? '10:00 - 01:00' : '10:00 AM – 01:00 PM' },
  ];

  return (
    <section id="schedule" className="py-20 bg-white dark:bg-slate-950 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.scheduleTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.scheduleTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {t.scheduleSubtitle}
          </p>
        </div>

        {/* Highlights Bar: 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          
          <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 text-center space-y-1 hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors">
            <div className="w-10 h-10 mx-auto rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{t.courseDurationLabel}</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t.heroStat1Value}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">{language === 'hi' ? 'फास्ट-ट्रैक सर्टिफिकेट' : 'Comprehensive training'}</div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 text-center space-y-1 hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-colors">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{t.courseScheduleLabel}</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">{t.heroStat2Value}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">{language === 'hi' ? 'शुक्र, शनि व रवि' : 'Fri, Sat & Sun'}</div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 text-center space-y-1 hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors">
            <div className="w-10 h-10 mx-auto rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center mb-3">
              <Sun className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{language === 'hi' ? 'कक्षा समय' : 'Class Timing'}</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">10 AM – 1 PM</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">{language === 'hi' ? 'सुबह 10:00 से दोपहर 01:00' : 'Morning session'}</div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 text-center space-y-1 hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-colors">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{language === 'hi' ? 'दैनिक अवधि' : 'Daily Duration'}</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">{SCHEDULE_DATA.dailyDuration}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">{language === 'hi' ? 'गहन प्रशिक्षण' : 'Intensive learning'}</div>
          </div>

        </div>

        {/* Visual Weekly Schedule Grid */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{language === 'hi' ? 'सप्ताहिक प्रशिक्षण ढांचा' : 'Weekly Training Matrix'}</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  STPI Deoghar Centre
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {language === 'hi'
                  ? 'कक्षाएं व्यावहारिक रोलप्ले, परस्पर संवाद अभ्यास और करियर मार्गदर्शन हेतु संरचित हैं।'
                  : 'Classes are structured for practical roleplays, interactive communication drills, and vocational mentorship.'}
              </p>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'hi' ? 'ऑफ़लाइन क्लासरूम मोड' : 'Offline Classroom Mode'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 mt-6">
            {daysOfWeek.map((dayItem) => (
              <div
                key={dayItem.day}
                className={`rounded-2xl p-4 flex flex-col justify-between transition-all ${
                  dayItem.active
                    ? 'bg-gradient-to-b from-blue-600/30 to-emerald-600/30 border-2 border-emerald-400/50 shadow-lg'
                    : 'bg-slate-800/40 border border-slate-800 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base text-white">{dayItem.day}</span>
                    {dayItem.active ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    ) : (
                      <span className="text-[10px] text-slate-400">{language === 'hi' ? 'अवकाश' : 'Off-class'}</span>
                    )}
                  </div>
                  
                  {dayItem.active && (
                    <div className="mt-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-800/60">
                      {dayItem.time}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-300">
                  {dayItem.note}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice Note */}
          <div className="mt-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 flex items-center gap-3 text-xs text-slate-300">
            <AlertCircle className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              {language === 'hi'
                ? 'छात्रों से अनुरोध है कि निर्धारित कक्षा के दिनों में सुबह 10:00 बजे से कम से कम 15 मिनट पूर्व STPI देवघर केंद्र पर उपस्थित हों।'
                : 'Students are requested to be present at the STPI Deoghar Centre at least 15 minutes before 10:00 AM on scheduled training days.'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
