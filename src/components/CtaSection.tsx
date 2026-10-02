import React from 'react';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CtaSectionProps {
  onOpenApply: (courseId?: string) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenApply }) => {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950 text-white relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>VFS Global Academy • STPI Deoghar</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
          LEARN. GROW. ACHIEVE.
        </h2>

        {/* Supporting Text */}
        <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          {language === 'hi' 
            ? 'VFS Global Academy से जुड़ें और अपने उज्ज्वल भविष्य के लिए आवश्यक कौशल, आत्मविश्वास और व्यावहारिक ज्ञान विकसित करें।'
            : 'Join VFS Global Academy and develop the skills, confidence and professional knowledge needed for your future.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            id="cta-apply-now-btn"
            onClick={() => onOpenApply()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-600/30 transition-transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer border-2 border-white/20"
          >
            <span>APPLY NOW</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            id="cta-contact-us-btn"
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 hover:text-white font-bold text-sm sm:text-base border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>CONTACT US</span>
          </a>
        </div>

      </div>
    </section>
  );
};
