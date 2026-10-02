import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Building
} from 'lucide-react';
import { ADMISSION_DATA } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';
import { vfsCertificateAward } from '../assets';

interface AdmissionSectionProps {
  onOpenApply: () => void;
}

export const AdmissionSection: React.FC<AdmissionSectionProps> = ({ onOpenApply }) => {
  const { t, language } = useLanguage();

  const documents = [
    {
      title: language === 'hi' ? '1. आधार कार्ड' : '1. Aadhaar Card',
      mandatory: true,
      description: language === 'hi' ? 'पहचान एवं निवास सत्यापन हेतु स्व-सत्यापित फोटोकॉपी (ज़ेरॉक्स)।' : 'Clear photocopy for identity and residence verification.'
    },
    {
      title: language === 'hi' ? '2. शैक्षणिक अंकपत्र / प्रमाणपत्र' : '2. Educational Marksheets / Certificates',
      mandatory: true,
      description: language === 'hi' ? '10वीं / 12वीं / स्नातक अंकपत्र की प्रति।' : 'Photocopies of 10th / 12th / Graduation or highest qualification.'
    },
    {
      title: language === 'hi' ? '3. हालिया पासपोर्ट साइज फोटो' : '3. Recent Passport Size Photographs',
      mandatory: true,
      description: language === 'hi' ? 'प्रवेश फॉर्म एवं स्टूडेंट आईडी कार्ड हेतु 2-3 रंगीन फोटो।' : '2-3 colored passport size photographs for student ID and record.'
    },
    {
      title: language === 'hi' ? '4. सीवी / बायोडाटा (यदि उपलब्ध हो)' : '4. Updated Resume / CV (Optional)',
      mandatory: false,
      description: language === 'hi' ? 'कैरियर प्लेसमेंट एवं काउंसलिंग सहायता के लिए।' : 'Helps our coordinators assess prior experience and placement guidance.'
    }
  ];

  return (
    <section id="admission" className="py-20 bg-slate-50 dark:bg-slate-900/60 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.admissionsTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.admissionsTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.admissionsSubtitle}
          </p>
        </div>

        {/* Highlighted "Limited Seats Available" Banner */}
        <div className="mb-12 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-6 sm:p-7 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 mx-auto md:mx-0">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
              <div className="space-y-1">
                <div className="inline-block px-2.5 py-0.5 rounded bg-black/20 text-xs font-bold uppercase tracking-wider">
                  {language === 'hi' ? 'सीट सूचना' : 'Urgent Batch Advisory'}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {t.admissionsNoticeTitle}
                </h3>
                <p className="text-amber-100 text-xs sm:text-sm max-w-2xl">
                  {t.admissionsNoticeDesc}
                </p>
              </div>
            </div>

            {/* Live Batch Capacity Indicator */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 text-center shrink-0 w-full md:w-auto border border-white/20">
              <div className="text-xs font-semibold text-amber-200">{language === 'hi' ? 'वर्तमान बैच क्षमता' : 'Current Batch Capacity'}</div>
              <div className="text-2xl font-extrabold text-white mt-0.5">
                30 {language === 'hi' ? 'सीटें' : 'Seats'} <span className="text-xs font-normal text-amber-200">/ {language === 'hi' ? 'बैच' : 'Batch'}</span>
              </div>
              <div className="w-48 bg-white/20 h-2 rounded-full mt-2 overflow-hidden mx-auto">
                <div 
                  className="bg-emerald-400 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${ADMISSION_DATA.currentBatchCapacityPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-amber-200 font-medium mt-1.5">
                {language === 'hi' ? 'पहले आओ, पहले पाओ सत्यापन' : 'First-Come, First-Served Verification'}
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Required Documents + Submission Timing Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Required Documents Checklist */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>{t.admissionsReqDocsTitle}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {language === 'hi' 
                  ? 'कृपया त्वरित सत्यापन के लिए मूल दस्तावेजों के साथ स्व-सत्यापित फोटोकॉपी (ज़ेरॉक्स) साथ लाएं।'
                  : 'Please bring self-attested photocopies (Xerox) along with original documents for instant desk verification.'}
              </p>
            </div>

            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div 
                  key={doc.title} 
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50/50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/70 transition-colors flex items-start gap-3.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{doc.title}</h4>
                      {doc.mandatory ? (
                        <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900/60">
                          {language === 'hi' ? 'अनिवार्य' : 'Required'}
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                          {language === 'hi' ? 'वैकल्पिक' : 'Optional'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{doc.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                id="admission-apply-online-btn"
                onClick={onOpenApply}
                className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>{t.applyOnlineBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'hi' ? 'केंद्र आने से पहले ऑनलाइन फॉर्म भी भर सकते हैं।' : 'You can also submit your application online before visiting the centre.'}
              </span>
            </div>
          </div>

          {/* Right: Centre Location & Certification Assistance */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Centre Submission Location Callout */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{language === 'hi' ? 'दस्तावेज़ जमा केंद्र:' : 'Document Submission Centre:'}</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pl-6">
                <p className="font-semibold text-slate-800 dark:text-slate-200">VFS Global Academy / VFS Global Foundation</p>
                <p>STPI, Deoghar (Jasidih), Near Swagat Petrol Pump</p>
                <p>Manikpur Road, After Railway Over Bridge, Jasidih</p>
                <p className="text-emerald-700 dark:text-emerald-400 font-medium pt-1">{t.deskHours}</p>
              </div>
            </div>

            {/* Official Certification Preview Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-900 text-white group">
              <img 
                src={vfsCertificateAward} 
                alt="VFS Global Foundation Official Certificate Award" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-4">
                <div>
                  <div className="text-[11px] font-bold text-emerald-400">
                    {language === 'hi' ? 'मान्यता प्राप्त प्रमाण पत्र' : 'Recognized Certification'}
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {language === 'hi' ? 'VFS Global Foundation सर्टिफिकेट अवार्ड' : 'VFS Global Foundation Certificate Award'}
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    {language === 'hi' ? 'सफलतापूर्वक कोर्स पूर्ण करने पर आधिकारिक प्रमाणपत्र प्रदान किया जाता है।' : 'Issued to students upon successful completion of curriculum & assessments.'}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
