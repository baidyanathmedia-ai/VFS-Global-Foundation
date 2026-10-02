import React, { useState } from 'react';
import { 
  Bell, 
  ChevronRight, 
  X, 
  Clock,
  Pin
} from 'lucide-react';
import { NOTICES_DATA, CONTACT_CONFIG } from '../data/academyData';
import { Notice } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const NoticeBoard: React.FC = () => {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const { t, language } = useLanguage();

  return (
    <section id="notices" className="py-20 bg-white dark:bg-slate-950 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 text-xs font-bold uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>{t.noticesTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.noticesTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {t.noticesSubtitle}
          </p>
        </div>

        {/* Notice Board Container */}
        <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {/* Header Bar with Pin */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
                <Pin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {language === 'hi' ? 'VFS Global Academy STPI देवघर सूचनाएं' : 'VFS Global Academy STPI Deoghar Notices'}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'hi' ? 'दस्तावेज़ जमा समय: सुबह 10:00 से दोपहर 01:00' : `Document Desk Hours: ${CONTACT_CONFIG.DOCUMENT_SUBMISSION_TIMING}`}
                </span>
              </div>
            </div>

            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
              {language === 'hi' ? 'ताज़ा सूचनाएं' : 'Live Feed'}
            </span>
          </div>

          {/* Notices List */}
          <div className="divide-y divide-slate-200 dark:divide-slate-800 mt-4">
            {NOTICES_DATA.map((notice) => (
              <div
                key={notice.id}
                onClick={() => setSelectedNotice(notice)}
                className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group cursor-pointer hover:bg-white dark:hover:bg-slate-800/80 p-4 rounded-xl transition-all"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {notice.isUrgent && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white animate-pulse">
                        {language === 'hi' ? 'अति महत्वपूर्ण' : 'URGENT'}
                      </span>
                    )}
                    {notice.isNew && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">
                        {language === 'hi' ? 'नवीन' : 'NEW'}
                      </span>
                    )}
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {notice.date}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {notice.category}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {notice.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    {notice.summary}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>{language === 'hi' ? 'विवरण पढ़ें' : 'Read Notice'}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedNotice(null)}
        >
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                  {selectedNotice.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedNotice.date}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {selectedNotice.title}
              </h3>
            </div>

            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p className="font-medium text-slate-800 dark:text-slate-200">
                {selectedNotice.summary}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-900 dark:text-white">
                  {language === 'hi' ? 'महत्वपूर्ण निर्देश:' : 'Important Instructions:'}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {selectedNotice.details.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'hi' ? 'जारीकर्ता: केंद्र प्रशासन, STPI देवघर' : 'Issued by: Centre Administration, STPI Deoghar'}
              </span>
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
