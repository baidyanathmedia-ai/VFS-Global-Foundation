import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Phone,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { CONTACT_CONFIG } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';
import { VfsLogo } from './VfsLogo';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  onOpenApply: (courseId?: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenApply, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    let lastScrollY = Math.max(0, window.scrollY);
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      
      // Update background blur and shadow when scrolled past top threshold
      setIsScrolled(currentScrollY > 20);

      // Always show at the top of the page
      if (currentScrollY <= 40) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      // If mobile dropdown menu is open, keep header visible
      if (mobileMenuOpen) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      // Ignore overscroll bounces at the bottom of the page
      if (currentScrollY >= maxScrollY - 10) {
        ticking = false;
        return;
      }

      const deltaY = currentScrollY - lastScrollY;

      // Minimum scroll delta threshold (6px) to avoid jitter on micro-movements
      if (Math.abs(deltaY) >= 6) {
        if (deltaY > 0 && currentScrollY > 80) {
          // Scrolling DOWN -> smoothly hide header upward (remains hidden when scrolling stops)
          setIsVisible(false);
        } else if (deltaY < 0) {
          // Scrolling UP -> smoothly reveal header (remains visible when scrolling stops)
          setIsVisible(true);
        }
        lastScrollY = currentScrollY;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Dismiss drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: t.navHome, href: '#home', id: 'home' },
    { name: t.navAbout, href: '#about', id: 'about' },
    { name: t.navCourses, href: '#courses', id: 'courses' },
    { name: t.navSchedule, href: '#schedule', id: 'schedule' },
    { name: t.navAdmission, href: '#admission', id: 'admission' },
    { name: t.navGallery, href: '#gallery', id: 'gallery' },
    { name: t.navLeadership, href: '#leadership', id: 'leadership' },
    { name: t.navNotices, href: '#notices', id: 'notices' },
    { name: t.navContact, href: '#contact', id: 'contact' },
  ];

  const whatsappLink = `https://wa.me/${CONTACT_CONFIG.WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(CONTACT_CONFIG.WHATSAPP_MESSAGE_PREFILL)}`;
  const phoneCallLink = `tel:${CONTACT_CONFIG.PHONE_NUMBER.replace(/\s+/g, '')}`;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transform transition-transform duration-300 ease-in-out will-change-transform ${
        isVisible ? 'translate-y-0 pointer-events-auto' : '-translate-y-full shadow-none pointer-events-none'
      }`}>
        {/* Main Navigation Bar */}
        <nav className={`transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200 dark:border-slate-800' 
            : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm py-3.5 border-b border-slate-100 dark:border-slate-800/80'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Official Logo & Academy Branding */}
              <a href="#home" className="flex items-center group">
                <VfsLogo variant="auto" size="md" showSubtitle={true} />
              </a>

              {/* Desktop Navigation Links (Large Screens) */}
              <div className="hidden xl:flex items-center space-x-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      className={`px-2.5 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'text-blue-700 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/60 font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>

              {/* Desktop Quick Actions, Theme Toggle & CTA Button */}
              <div className="hidden sm:flex items-center gap-2 sm:gap-2.5">
                {/* Language Switcher */}
                <LanguageSwitcher variant="header" />

                {/* Dark Mode Toggle Button */}
                <ThemeToggle />

                {/* Direct Phone Call Button */}
                <a
                  href={phoneCallLink}
                  className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
                  title="Call Admission Desk"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>+91 94311 76637</span>
                </a>

                {/* Direct WhatsApp Pill */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors"
                  title="WhatsApp Inquiry"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>WhatsApp</span>
                </a>

                <button
                  id="header-apply-btn"
                  onClick={() => onOpenApply()}
                  className="relative inline-flex items-center justify-center px-4 py-2 sm:px-4.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition-all bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-emerald-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>{t.applyNowBtn}</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>

                {/* Tablet Menu Toggle (Between sm and xl) */}
                <button
                  id="tablet-menu-toggle"
                  onClick={() => setMobileMenuOpen(true)}
                  className="xl:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
                  aria-label="Open Navigation Menu"
                  aria-expanded={mobileMenuOpen}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Actions (Under 640px): Theme, Call & Menu Toggle */}
              <div className="flex items-center gap-1.5 sm:hidden">
                <ThemeToggle />
                <a
                  href={phoneCallLink}
                  className="p-2 rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700"
                  title="Call Desk"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  id="mobile-menu-toggle"
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
                  aria-label="Open Navigation Menu"
                  aria-expanded={mobileMenuOpen}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Slide-in Drawer Backdrop Overlay */}
      <div 
        id="mobile-drawer-backdrop"
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 transition-opacity duration-300 xl:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in Drawer Panel */}
      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Drawer"
        className={`fixed top-0 right-0 bottom-0 w-full max-w-xs sm:max-w-sm bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-out xl:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div onClick={() => setMobileMenuOpen(false)}>
            <VfsLogo variant="auto" size="sm" showSubtitle={true} />
          </div>
          <button
            id="mobile-drawer-close"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close navigation drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Direct Quick Contact Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={phoneCallLink}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Desk</span>
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-bold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Preferences: Language & Theme */}
          <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
            <LanguageSwitcher variant="mobile" />
            <ThemeToggle variant="mobile" />
          </div>

          {/* Navigation Menu Links */}
          <nav className="pt-2 border-t border-slate-100 dark:border-slate-800" aria-label="Mobile Drawer Navigation">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 pb-2">
              Navigation Menu
            </div>
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3.5 py-2.5 text-sm font-medium rounded-xl flex items-center justify-between transition-colors ${
                      isActive
                        ? 'text-blue-700 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/60 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  </a>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Drawer Sticky Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 space-y-2.5">
          <button
            id="mobile-drawer-apply-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenApply();
            }}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-[0.98]"
          >
            <span>{t.applyNowBtn}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="text-center text-[11px] text-slate-500 dark:text-slate-400">
            STPI Deoghar Campus | 10:00 AM – 01:00 PM (Fri–Sun)
          </div>
        </div>
      </aside>
    </>
  );
};


