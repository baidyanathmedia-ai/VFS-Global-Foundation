import React from 'react';
import { 
  GraduationCap, 
  Plane, 
  MessageSquare, 
  Phone, 
  Building2, 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Send,
  Users,
  Award
} from 'lucide-react';
import { CONTACT_CONFIG } from '../data/academyData';

interface BottomMarqueeSectionProps {
  onOpenApply: (courseId?: string) => void;
}

export const BottomMarqueeSection: React.FC<BottomMarqueeSectionProps> = ({ onOpenApply }) => {
  const phoneCallLink = `tel:${CONTACT_CONFIG.PHONE_NUMBER.replace(/\s+/g, '')}`;
  const whatsappLink = `https://wa.me/${CONTACT_CONFIG.WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(CONTACT_CONFIG.WHATSAPP_MESSAGE_PREFILL)}`;
  const smsLink = `sms:${CONTACT_CONFIG.PHONE_NUMBER.replace(/\s+/g, '')}?body=${encodeURIComponent(CONTACT_CONFIG.WHATSAPP_MESSAGE_PREFILL)}`;

  const marqueeTrack1 = [
    {
      id: 'm1',
      badge: 'ADMISSIONS OPEN',
      badgeColor: 'bg-emerald-500 text-white',
      title: 'Batch Enrollment in Progress',
      subtitle: 'STPI Deoghar Centre | Strictly 30 Seats',
      icon: <GraduationCap className="w-5 h-5 text-emerald-400" />,
      actionType: 'apply',
      actionLabel: 'Apply Online',
      accent: 'border-emerald-500/40 bg-slate-900/90'
    },
    {
      id: 'm2',
      badge: '3-MONTH CERTIFICATE',
      badgeColor: 'bg-blue-600 text-white',
      title: 'Travel & Hospitality Management',
      subtitle: 'Tourism, Airlines, Hotel Ops & Guest Care',
      icon: <Plane className="w-5 h-5 text-blue-400" />,
      actionType: 'course-travel',
      actionLabel: 'View Course',
      accent: 'border-blue-500/40 bg-slate-900/90'
    },
    {
      id: 'm3',
      badge: 'CAREER SKILLS',
      badgeColor: 'bg-purple-600 text-white',
      title: 'Language & Communication Skills',
      subtitle: 'Fluent English, Personality & Interview Prep',
      icon: <MessageSquare className="w-5 h-5 text-purple-400" />,
      actionType: 'course-comm',
      actionLabel: 'Explore Course',
      accent: 'border-purple-500/40 bg-slate-900/90'
    },
    {
      id: 'm4',
      badge: 'CAMPUS LOCATION',
      badgeColor: 'bg-amber-500 text-slate-950 font-bold',
      title: 'STPIA & STPI Deoghar Campus',
      subtitle: 'Software Technology Parks of India, Jasidih',
      icon: <Building2 className="w-5 h-5 text-amber-400" />,
      actionType: 'location',
      actionLabel: 'View Map',
      accent: 'border-amber-500/40 bg-slate-900/90'
    },
    {
      id: 'm5',
      badge: 'CALL HELPLINE',
      badgeColor: 'bg-sky-500 text-white',
      title: '+91 94311 76637',
      subtitle: 'Direct Centre Desk | 10:00 AM – 01:00 PM',
      icon: <Phone className="w-5 h-5 text-sky-400" />,
      actionType: 'call',
      actionLabel: 'Call Now',
      accent: 'border-sky-500/40 bg-slate-900/90'
    },
    {
      id: 'm6',
      badge: 'WHATSAPP DESK',
      badgeColor: 'bg-emerald-600 text-white',
      title: '+91 94311 76637',
      subtitle: 'Instant Admission Assistance & Prospectus',
      icon: <Send className="w-5 h-5 text-emerald-400" />,
      actionType: 'whatsapp',
      actionLabel: 'Chat WhatsApp',
      accent: 'border-emerald-500/40 bg-slate-900/90'
    }
  ];

  const marqueeTrack2 = [
    {
      id: 'm7',
      badge: 'TRAINING TIMETABLE',
      badgeColor: 'bg-indigo-600 text-white',
      title: 'Friday, Saturday & Sunday',
      subtitle: '10:00 AM to 01:00 PM (3 Hours Daily)',
      icon: <Calendar className="w-5 h-5 text-indigo-400" />,
      actionType: 'schedule',
      actionLabel: 'Schedule',
      accent: 'border-indigo-500/40 bg-slate-900/90'
    },
    {
      id: 'm8',
      badge: 'STRICT COHORT',
      badgeColor: 'bg-rose-600 text-white',
      title: 'Max 30 Students Per Batch',
      subtitle: 'First-Come, First-Served Document Verification',
      icon: <Users className="w-5 h-5 text-rose-400" />,
      actionType: 'apply',
      actionLabel: 'Book Seat',
      accent: 'border-rose-500/40 bg-slate-900/90'
    },
    {
      id: 'm9',
      badge: 'GOVT RECOGNIZED CAMPUS',
      badgeColor: 'bg-teal-600 text-white',
      title: 'VFS Global Foundation at STPI',
      subtitle: 'High-Tech AC Classrooms & Presentation Lab',
      icon: <Award className="w-5 h-5 text-teal-400" />,
      actionType: 'about',
      actionLabel: 'About Us',
      accent: 'border-teal-500/40 bg-slate-900/90'
    },
    {
      id: 'm10',
      badge: 'QUICK INQUIRY',
      badgeColor: 'bg-emerald-500 text-white',
      title: 'WhatsApp Admission Desk',
      subtitle: 'Message +91 94311 76637 for syllabus',
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
      actionType: 'whatsapp',
      actionLabel: 'Message Us',
      accent: 'border-emerald-500/40 bg-slate-900/90'
    },
    {
      id: 'm11',
      badge: 'DOCUMENTS REQUIRED',
      badgeColor: 'bg-cyan-600 text-white',
      title: '10th/12th Marksheet & Aadhaar',
      subtitle: 'Photocopies + 2 Passport Photos for Admission',
      icon: <CheckCircle2 className="w-5 h-5 text-cyan-400" />,
      actionType: 'admission',
      actionLabel: 'Checklist',
      accent: 'border-cyan-500/40 bg-slate-900/90'
    }
  ];

  const handleAction = (type: string) => {
    if (type === 'apply') {
      onOpenApply();
    } else if (type === 'course-travel') {
      onOpenApply('travel-hospitality');
    } else if (type === 'course-comm') {
      onOpenApply('language-communication');
    } else if (type === 'call') {
      window.location.href = phoneCallLink;
    } else if (type === 'whatsapp') {
      window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    } else if (type === 'location') {
      window.open(CONTACT_CONFIG.GOOGLE_MAPS_LINK, '_blank', 'noopener,noreferrer');
    } else if (type === 'schedule') {
      document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'about') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'admission') {
      document.getElementById('admission')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderCard = (item: typeof marqueeTrack1[0]) => (
    <div
      key={item.id}
      onClick={() => handleAction(item.actionType)}
      className={`group flex items-center gap-3.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl border ${item.accent} backdrop-blur-md shadow-lg shadow-black/30 hover:scale-[1.03] transition-all duration-200 cursor-pointer min-w-[280px] sm:min-w-[340px] max-w-[380px]`}
    >
      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:scale-110 transition-all shrink-0">
        {item.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${item.badgeColor} tracking-wider`}>
            {item.badge}
          </span>
        </div>
        <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-blue-300 transition-colors">
          {item.title}
        </h4>
        <p className="text-[11px] sm:text-xs text-slate-400 truncate">
          {item.subtitle}
        </p>
      </div>

      <div className="shrink-0 text-slate-400 group-hover:text-white transition-colors">
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );

  return (
    <section 
      id="live-marquee-section" 
      className="py-12 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-white relative overflow-hidden border-t border-slate-800"
    >
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Live Academy Highlights & Quick Connect</span>
        </div>
        <h3 className="text-lg sm:text-2xl font-bold text-white">
          Active Admissions, Courses & Direct Helpline
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mt-1">
          Interactive real-time updates for VFS Global Academy at STPI Deoghar. Tap any highlight card below to connect directly or register.
        </p>
      </div>

      {/* Marquee Row 1 (Scrolling Left) */}
      <div className="relative w-full overflow-hidden mb-4 pause-on-hover py-1">
        {/* Subtle Edge Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-left flex gap-4">
          {marqueeTrack1.map(renderCard)}
          {marqueeTrack1.map((item) => renderCard({ ...item, id: `${item.id}-dup` }))}
        </div>
      </div>

      {/* Marquee Row 2 (Scrolling Right) */}
      <div className="relative w-full overflow-hidden pause-on-hover py-1">
        {/* Subtle Edge Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-right flex gap-4">
          {marqueeTrack2.map(renderCard)}
          {marqueeTrack2.map((item) => renderCard({ ...item, id: `${item.id}-dup` }))}
        </div>
      </div>

      {/* Fast Mobile Quick Action Strip */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-emerald-950/80 border border-slate-700/80 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-300 font-semibold">
                STPI Deoghar Admission Desk
              </div>
              <div className="text-sm font-extrabold text-white flex items-center gap-2">
                <span>+91 94311 76637</span>
                <span className="text-[11px] font-normal text-emerald-400">(10:00 AM – 01:00 PM)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
            <a
              href={phoneCallLink}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenApply()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
