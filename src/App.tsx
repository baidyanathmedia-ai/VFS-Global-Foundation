import React, { useState, useEffect } from 'react';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CoursesSection } from './components/CoursesSection';
import { ScheduleSection } from './components/ScheduleSection';
import { AdmissionSection } from './components/AdmissionSection';
import { GallerySection } from './components/GallerySection';
import { LeadershipSection } from './components/LeadershipSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { SuccessStoriesSection } from './components/SuccessStoriesSection';
import { VideoShowcaseSection } from './components/VideoShowcaseSection';
import { NoticeBoard } from './components/NoticeBoard';
import { ApplySection } from './components/ApplySection';
import { CtaSection } from './components/CtaSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { BottomMarqueeSection } from './components/BottomMarqueeSection';
import { Footer } from './components/Footer';
import { ApplyModal } from './components/ApplyModal';
import { SectionDivider } from './components/SectionDivider';
import { SectionReveal } from './components/SectionReveal';
import { 
  ArrowRight, 
  ChevronUp, 
  MessageCircle, 
  GraduationCap, 
  Award, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Camera, 
  Bell, 
  HelpCircle,
  Users,
  Briefcase,
  Film
} from 'lucide-react';
import { CONTACT_CONFIG } from './data/academyData';

export default function App() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<string | undefined>();
  const [activeSection, setActiveSection] = useState('home');
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  const handleOpenApply = (courseId?: string) => {
    setSelectedCourseForModal(courseId);
    setIsApplyModalOpen(true);
  };

  const handleCloseApply = () => {
    setIsApplyModalOpen(false);
    setSelectedCourseForModal(undefined);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Floating bar toggle after scrolling past Hero
      setShowFloatingBar(window.scrollY > 500);

      // Section intersection detection for navbar
      const sections = [
        'home',
        'about',
        'why-choose-us',
        'courses',
        'schedule',
        'admission',
        'gallery',
        'leadership',
        'testimonials',
        'success-stories',
        'video-showcase',
        'notices',
        'apply-now',
        'faqs',
        'contact'
      ];

      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col transition-colors duration-200">
      {/* Scroll Progress Bar at Top of Viewport */}
      <ReadingProgressBar />

      {/* Sticky Header */}
      <Header onOpenApply={handleOpenApply} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero onOpenApply={handleOpenApply} />

        {/* 2. Responsive Animated Courses & Highlights Marquee Section */}
        <BottomMarqueeSection onOpenApply={handleOpenApply} />

        {/* Divider 1: Transition from Dark Marquee to Light/Dark About */}
        <SectionDivider
          id="divider-marquee-about"
          variant="wave"
          tone="dark-to-light"
        />

        {/* 3. About Academy & STPI Location Section ("Vocational Excellence at STPI Deoghar") */}
        <SectionReveal>
          <AboutSection />
        </SectionReveal>

        {/* Divider 2: About to Why Choose Us */}
        <SectionDivider
          id="divider-about-why"
          variant="diamond-crest"
          accent="blue"
          icon={<Award className="w-3.5 h-3.5" />}
          className="bg-white dark:bg-slate-950"
        />

        {/* 4. Why Choose VFS Global Academy */}
        <SectionReveal>
          <WhyChooseUs />
        </SectionReveal>

        {/* Divider 3: Why Choose Us to Courses */}
        <SectionDivider
          id="divider-why-courses"
          variant="glow-line"
          accent="emerald"
          className="bg-slate-50 dark:bg-slate-900/60"
        />

        {/* 5. Certificate Courses Section */}
        <SectionReveal>
          <CoursesSection onOpenApply={handleOpenApply} />
        </SectionReveal>

        {/* Divider 4: Courses to Schedule */}
        <SectionDivider
          id="divider-courses-schedule"
          variant="badge-crest"
          accent="blue"
          icon={<Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
          badgeText="STPI Deoghar Training Schedule"
          className="bg-slate-50 dark:bg-slate-900/60"
        />

        {/* 6. Course Schedule & Timings */}
        <SectionReveal>
          <ScheduleSection />
        </SectionReveal>

        {/* Divider 5: Schedule to Admissions */}
        <SectionDivider
          id="divider-schedule-admissions"
          variant="diamond-crest"
          accent="cyan"
          icon={<ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />}
          className="bg-white dark:bg-slate-950"
        />

        {/* 7. Admissions Open & Document Verification Checklist */}
        <SectionReveal>
          <AdmissionSection onOpenApply={() => handleOpenApply()} />
        </SectionReveal>

        {/* Divider 6: Admissions to Gallery */}
        <SectionDivider
          id="divider-admissions-gallery"
          variant="glow-line"
          accent="blue"
          className="bg-slate-50 dark:bg-slate-900/60"
        />

        {/* 8. Authentic Campus & Activities Photo Gallery */}
        <SectionReveal>
          <GallerySection onOpenApply={handleOpenApply} />
        </SectionReveal>

        {/* Divider 7: Smooth curve into Leadership (Dark Canvas) */}
        <SectionDivider
          id="divider-gallery-leadership"
          variant="curve"
          tone="light-to-dark"
        />

        {/* 9. Leadership & Faculty Section */}
        <SectionReveal>
          <LeadershipSection onOpenApply={handleOpenApply} />
        </SectionReveal>

        {/* Divider 8: Smooth curve transition from Leadership to Testimonials */}
        <SectionDivider
          id="divider-leadership-testimonials"
          variant="curve"
          tone="dark-to-slate"
          flip
        />

        {/* 10. Student Testimonials */}
        <SectionReveal>
          <TestimonialsSection />
        </SectionReveal>

        {/* Divider 9: Testimonials to Success Stories */}
        <SectionDivider
          id="divider-testimonials-success"
          variant="diamond-crest"
          accent="emerald"
          icon={<Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
          badgeText="Alumni Career Outcomes"
          className="bg-slate-50 dark:bg-slate-900/60"
        />

        {/* 11. Alumni Success Stories & Case Studies */}
        <SectionReveal>
          <SuccessStoriesSection onOpenApply={handleOpenApply} />
        </SectionReveal>

        {/* Divider 10: Success Stories to Video Showcase */}
        <SectionDivider
          id="divider-success-videos"
          variant="glow-line"
          accent="blue"
          className="bg-white dark:bg-slate-950"
        />

        {/* VIDEO SHOWCASE SECTION: Watch Our Latest Videos (Reel-style carousel) */}
        <SectionReveal>
          <VideoShowcaseSection onOpenApply={handleOpenApply} />
        </SectionReveal>

        {/* Divider 11: Video Showcase to Notice Board */}
        <SectionDivider
          id="divider-videos-notices"
          variant="badge-crest"
          accent="amber"
          icon={<Bell className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
          badgeText="Official Campus Notice Board"
          className="bg-slate-900"
        />

        {/* 12. Dynamic Notice Board */}
        <SectionReveal>
          <NoticeBoard />
        </SectionReveal>

        {/* Divider 10: Notice Board to Registration Portal */}
        <SectionDivider
          id="divider-notices-apply"
          variant="glow-line"
          accent="emerald"
          className="bg-white dark:bg-slate-950"
        />

        {/* 12. Full On-Page Registration Form Portal */}
        <SectionReveal>
          <ApplySection />
        </SectionReveal>

        {/* Divider 11: Dynamic angled slant into CTA Banner */}
        <SectionDivider
          id="divider-apply-cta"
          variant="slanted"
          tone="slate-to-dark"
        />

        {/* 13. Final CTA Banner: LEARN. GROW. ACHIEVE. */}
        <SectionReveal>
          <CtaSection onOpenApply={handleOpenApply} />
        </SectionReveal>

        {/* Divider 12: Smooth wave transition from CTA Banner into FAQs */}
        <SectionDivider
          id="divider-cta-faqs"
          variant="wave"
          tone="dark-to-light"
        />

        {/* 14. Frequently Asked Questions */}
        <SectionReveal>
          <FaqSection />
        </SectionReveal>

        {/* Divider 13: Architectural angled cut into Contact & Map Section */}
        <SectionDivider
          id="divider-faqs-contact"
          variant="slanted"
          tone="light-to-dark"
          flip
        />

        {/* 15. Contact Academy & STPI Map */}
        <SectionReveal>
          <ContactSection />
        </SectionReveal>
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick Registration Modal */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={handleCloseApply}
        preselectedCourseId={selectedCourseForModal}
      />

      {/* Floating Bottom Quick Action Bar on Scroll */}
      {showFloatingBar && (
        <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3 animate-fadeIn">
          {/* Quick WhatsApp Inquiry */}
          <a
            id="floating-whatsapp-btn"
            href={`https://wa.me/${CONTACT_CONFIG.WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(
              CONTACT_CONFIG.WHATSAPP_MESSAGE_PREFILL
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
            aria-label="Inquire on WhatsApp"
            title="Inquire on WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </a>

          {/* Quick Apply Button */}
          <button
            id="floating-apply-btn"
            onClick={() => handleOpenApply()}
            className="px-5 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-2xl flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer border-2 border-white/20"
          >
            <span>APPLY NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
