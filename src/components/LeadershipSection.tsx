import React, { useState } from 'react';
import { 
  Quote, 
  Award, 
  MapPin, 
  CheckCircle2, 
  GraduationCap, 
  MessageSquare, 
  Sparkles, 
  Compass, 
  Briefcase, 
  ShieldCheck, 
  Check, 
  BookOpen, 
  Users, 
  Target, 
  Mic, 
  Plane, 
  Building2, 
  ArrowRight,
  UserCheck,
  Download,
  FileDown,
  Loader2,
  FileText
} from 'lucide-react';
import { 
  CENTRE_HEAD_INFO, 
  FACULTY_MEMBERS, 
  COMMITMENT_GOALS 
} from '../data/academyData';
import { generateFacultyProfilePdf } from '../utils/generateProfilePdf';
import { useLanguage } from '../context/LanguageContext';

interface LeadershipSectionProps {
  onOpenApply?: (courseId?: string) => void;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ onOpenApply }) => {
  const { language } = useLanguage();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [activeGunjanPhoto, setActiveGunjanPhoto] = useState<'primary' | 'secondary'>('primary');
  const [activeFacultyPhotos, setActiveFacultyPhotos] = useState<Record<string, 'primary' | 'secondary'>>({
    'faculty-pramod': 'primary',
    'faculty-raushan': 'primary'
  });

  const handleDownloadCentreHeadPdf = async () => {
    setDownloadingId('head');
    try {
      await generateFacultyProfilePdf({
        name: CENTRE_HEAD_INFO.name,
        role: CENTRE_HEAD_INFO.role,
        organization: CENTRE_HEAD_INFO.organization,
        location: CENTRE_HEAD_INFO.location,
        bio: CENTRE_HEAD_INFO.bio,
        items: CENTRE_HEAD_INFO.guidanceAreas,
        itemsTitle: 'Areas of Guidance & Mentorship',
        quote: CENTRE_HEAD_INFO.quote,
        image: CENTRE_HEAD_INFO.image,
        badge: 'Academic Leadership & Centre Head'
      });
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadFacultyPdf = async (faculty: typeof FACULTY_MEMBERS[0]) => {
    setDownloadingId(faculty.id);
    try {
      await generateFacultyProfilePdf({
        name: faculty.name,
        role: faculty.role,
        organization: faculty.organization,
        location: faculty.location,
        bio: faculty.bio,
        items: faculty.expertiseAreas,
        itemsTitle: 'Areas of Industry Expertise & Mentorship',
        quote: faculty.quote,
        image: faculty.image,
        badge: faculty.badge
      });
    } catch (err) {
      console.error('Failed to generate faculty PDF:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <section id="leadership" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* ================================================================= */}
        {/* 1. SECTION TITLE & INTRODUCTORY COPY */}
        {/* ================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>{language === 'hi' ? 'अकादमिक नेतृत्व एवं मार्गदर्शक' : 'Academic Leadership & Mentors'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            MEET OUR LEADERSHIP &amp; FACULTY
          </h2>

          <p className="text-emerald-400 font-semibold text-base sm:text-lg italic">
            "Guiding students with knowledge, practical skills, confidence and professional excellence."
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
            At VFS Global Academy, STPI Deoghar (Jasidih), we believe that quality education goes beyond traditional classroom learning. Our dedicated leadership and faculty members work together to provide practical knowledge, professional communication skills, personality development and career-oriented guidance.
          </p>
        </div>

        {/* ================================================================= */}
        {/* 2. CENTRE HEAD FEATURED PROFILE CARD (RAMSEWAK GUNJAN) */}
        {/* ================================================================= */}
        <div className="relative">
          <div className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-emerald-500 rounded-full" />
            <span>CENTRE HEAD PROFILE</span>
          </div>

          <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-850 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
            {/* Subtle corner highlight */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-600/15 via-transparent to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Profile Image & Badges */}
              <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
                <div className="relative w-full max-w-xs sm:max-w-sm aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl bg-slate-800">
                  <img 
                    src={activeGunjanPhoto === 'secondary' && CENTRE_HEAD_INFO.secondaryImage ? CENTRE_HEAD_INFO.secondaryImage : CENTRE_HEAD_INFO.image} 
                    alt={CENTRE_HEAD_INFO.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-50" />
                  
                  <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                    Academic Head
                  </div>

                  {CENTRE_HEAD_INFO.secondaryImage && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md p-1 rounded-xl border border-slate-700/60 shadow-lg">
                      <button
                        type="button"
                        onClick={() => setActiveGunjanPhoto('primary')}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                          activeGunjanPhoto === 'primary' 
                            ? 'bg-emerald-500 text-white shadow' 
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                        title="View Primary Photo"
                      >
                        Photo 1
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveGunjanPhoto('secondary')}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                          activeGunjanPhoto === 'secondary' 
                            ? 'bg-emerald-500 text-white shadow' 
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                        title="View Executive Photo"
                      >
                        Photo 2
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-2 space-y-1 text-center w-full">
                  <div className="inline-block bg-emerald-600 text-white text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md mb-1">
                    {CENTRE_HEAD_INFO.role}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {CENTRE_HEAD_INFO.name}
                  </h3>
                  <div className="text-sm font-semibold text-emerald-400">
                    {CENTRE_HEAD_INFO.organization}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center justify-center gap-1.5 pb-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{CENTRE_HEAD_INFO.location}</span>
                  </div>

                  {/* Download Profile PDF Button */}
                  <button
                    id="download-centre-head-profile-btn"
                    onClick={handleDownloadCentreHeadPdf}
                    disabled={downloadingId === 'head'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-900/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer border border-emerald-400/30"
                    title="Download Profile (PDF)"
                  >
                    {downloadingId === 'head' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-200" />
                        <span>{language === 'hi' ? 'पीडीएफ तैयार हो रहा है...' : 'Generating PDF...'}</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="w-4 h-4 text-emerald-200" />
                        <span>{language === 'hi' ? 'प्रोफ़ाइल डाउनलोड करें (PDF)' : 'Download Profile (PDF)'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Bio, Areas of Guidance & Quote */}
              <div className="lg:col-span-7 space-y-6 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8">
                
                {/* Professional Quote */}
                <div className="relative bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                  <Quote className="w-8 h-8 text-blue-400/30 absolute top-3 right-3" />
                  <blockquote className="text-base sm:text-lg font-medium text-slate-100 italic relative z-10 leading-relaxed pr-6">
                    "{CENTRE_HEAD_INFO.quote}"
                  </blockquote>
                </div>

                {/* Biography */}
                <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                  <p>
                    {CENTRE_HEAD_INFO.bio}
                  </p>
                </div>

                {/* Areas of Guidance Checklist Grid */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span>Areas of Guidance</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {CENTRE_HEAD_INFO.guidanceAreas.map((area, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 bg-slate-800/60 hover:bg-slate-800 px-3 py-2 rounded-xl border border-slate-700/50 text-xs text-slate-200 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-medium">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. FACULTY PROFILES (RAUSHAN MISHRA & PRAMOD SIR) */}
        {/* ================================================================= */}
        <div className="space-y-6">
          <div className="text-xs font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-2">
            <span className="w-8 h-[2px] bg-emerald-500 rounded-full" />
            <span>FACULTY &amp; MENTORS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {FACULTY_MEMBERS.map((faculty) => (
              <div
                key={faculty.id}
                id={faculty.id}
                className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-xl flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10"
              >
                <div className="space-y-6">
                  
                  {/* Faculty Header (Photo + Name + Role) */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-lg bg-slate-800 relative">
                      <img
                        src={activeFacultyPhotos[faculty.id] === 'secondary' && faculty.secondaryImage ? faculty.secondaryImage : faculty.image}
                        alt={faculty.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                      {faculty.secondaryImage && (
                        <div className="absolute bottom-1.5 inset-x-1.5 flex items-center justify-center gap-1 bg-slate-950/85 backdrop-blur-md py-0.5 px-1 rounded-lg border border-slate-700/60 shadow">
                          <button
                            type="button"
                            onClick={() => setActiveFacultyPhotos(prev => ({ ...prev, [faculty.id]: 'primary' }))}
                            className={`px-1.5 py-0.5 text-[9px] font-bold rounded transition-all cursor-pointer ${
                              (activeFacultyPhotos[faculty.id] || 'primary') === 'primary'
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-300 hover:text-white'
                            }`}
                            title="Profile Photo"
                          >
                            P1
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveFacultyPhotos(prev => ({ ...prev, [faculty.id]: 'secondary' }))}
                            className={`px-1.5 py-0.5 text-[9px] font-bold rounded transition-all cursor-pointer ${
                              activeFacultyPhotos[faculty.id] === 'secondary'
                                ? 'bg-emerald-500 text-white'
                                : 'text-slate-300 hover:text-white'
                            }`}
                            title="Action / Mentorship Photo"
                          >
                            P2
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 text-center sm:text-left flex-1 min-w-0">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {faculty.badge || 'Faculty Mentor'}
                      </span>
                      
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {faculty.name}
                      </h3>

                      <div className="text-xs sm:text-sm font-semibold text-emerald-400">
                        {faculty.role}
                      </div>

                      <div className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1">
                        <MapPin className="w-3 h-3 text-blue-400" />
                        <span>{faculty.organization} • {faculty.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Quote */}
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
                    <blockquote className="text-xs sm:text-sm italic text-slate-200 leading-relaxed font-medium">
                      "{faculty.quote}"
                    </blockquote>
                  </div>

                  {/* Biography */}
                  <div className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    <p>{faculty.bio}</p>
                  </div>

                  {/* Areas of Expertise Grid */}
                  <div className="space-y-2.5 pt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                      <span>Areas of Expertise</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {faculty.expertiseAreas.map((exp, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-slate-800/40 hover:bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-200 transition-colors"
                        >
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{exp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Faculty Card Action Bar (Download Profile PDF) */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-400">
                    <span>Mentorship Portfolio</span>
                  </div>

                  <button
                    id={`download-profile-${faculty.id}-btn`}
                    onClick={() => handleDownloadFacultyPdf(faculty)}
                    disabled={downloadingId === faculty.id}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-blue-600/90 text-slate-200 hover:text-white border border-slate-700 hover:border-blue-500/50 text-xs font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer shadow-md"
                    title={`Download ${faculty.name} Profile PDF`}
                  >
                    {downloadingId === faculty.id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-300" />
                        <span>{language === 'hi' ? 'पीडीएफ डाउनलोड हो रहा है...' : 'Generating PDF...'}</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{language === 'hi' ? 'प्रोफ़ाइल डाउनलोड करें' : 'Download Profile'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* OUR COMMITMENT: EMPOWERING STUDENTS FOR A BETTER FUTURE */}
        {/* ================================================================= */}
        <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-emerald-950/80 border border-blue-800/40 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-8 text-center sm:text-left">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>Our Student Promise</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                EMPOWERING STUDENTS FOR A BETTER FUTURE
              </h3>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Our leadership and faculty are committed to providing students with a supportive and engaging learning environment where they can develop practical knowledge, communication skills and professional confidence.
              </p>
            </div>

            {/* 6 Goals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 text-left">
              {COMMITMENT_GOALS.map((goal, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-xl space-y-1 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <h5 className="text-sm font-bold text-white tracking-tight">
                      {goal.title}
                    </h5>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-medium pl-6">
                    {goal.titleHi}
                  </p>
                  <p className="text-xs text-slate-300 pl-6 leading-relaxed">
                    {goal.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* In-Section Quick Application Action */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Admissions Open • 3-Month Certificate Courses
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  STPI Deoghar (Jasidih) Campus • Limited Batch Size (30 Seats)
                </div>
              </div>

              <div className="flex items-center gap-3">
                {onOpenApply && (
                  <button
                    id="leadership-apply-now-btn"
                    onClick={() => onOpenApply()}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>APPLY NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                <a
                  id="leadership-contact-us-btn"
                  href="#contact"
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-colors cursor-pointer shrink-0"
                >
                  CONTACT US
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
