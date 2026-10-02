import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowUp, 
  ExternalLink, 
  Award,
  Mail, 
  CheckCircle2, 
  Linkedin,
  Instagram,
  Facebook,
  Share2
} from 'lucide-react';
import { CONTACT_CONFIG } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';
import { VfsLogo } from './VfsLogo';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm border-t border-slate-800 relative">
      
      {/* Top Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Foundation Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-white">
              <VfsLogo variant="dark" size="md" showSubtitle={true} />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'hi'
                ? 'एसटीपीआई देवघर केंद्र में ट्रेवल, हॉस्पिटैलिटी मैनेजमेंट, भाषा और व्यावसायिक संचार में उद्योग-प्रासंगिक कौशल के साथ युवाओं को सशक्त बनाना।'
                : 'Empowering students with industry-relevant skills in Travel, Hospitality Management, Language and Professional Communication at the STPI Deoghar Centre.'}
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>{language === 'hi' ? '3 माह का सर्टिफिकेट कोर्स' : '3-Month Certificate Programmes'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>{language === 'hi' ? 'प्रति बैच अधिकतम 30 छात्र' : 'Max 30 Students Per Batch Discipline'}</span>
              </div>
            </div>

            {/* Social Media & Community Engagement Section */}
            <div className="pt-4 border-t border-slate-900">
              <div className="flex items-center gap-2 mb-2">
                <Share2 className="w-3.5 h-3.5 text-blue-400" />
                <h5 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  {language === 'hi' ? 'सोशल मीडिया पर जुड़ें' : 'Connect & Follow Us'}
                </h5>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">
                {language === 'hi'
                  ? 'कैंपस अपडेट, छात्र सफलता की कहानियां और इवेंट्स के लिए हमारे साथ जुड़ें।'
                  : 'Follow our community for campus activities, student stories, and admissions updates.'}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {/* LinkedIn */}
                <a
                  id="footer-social-linkedin"
                  href={CONTACT_CONFIG.SOCIAL_LINKS.LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn - VFS Global"
                  title="Follow on LinkedIn"
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-[#0A66C2]/20 text-slate-300 hover:text-white border border-slate-800 hover:border-[#0A66C2]/60 transition-all shadow-sm"
                >
                  <div className="p-1 rounded-md bg-[#0A66C2]/20 text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                    <Linkedin className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold">LinkedIn</span>
                </a>

                {/* Instagram */}
                <a
                  id="footer-social-instagram"
                  href={CONTACT_CONFIG.SOCIAL_LINKS.INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram - VFS Global"
                  title="Follow on Instagram"
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-pink-950/40 text-slate-300 hover:text-white border border-slate-800 hover:border-pink-500/50 transition-all shadow-sm"
                >
                  <div className="p-1 rounded-md bg-pink-500/20 text-pink-400 group-hover:bg-pink-600 group-hover:text-white transition-all">
                    <Instagram className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold">Instagram</span>
                </a>

                {/* Facebook */}
                <a
                  id="footer-social-facebook"
                  href={CONTACT_CONFIG.SOCIAL_LINKS.FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook - VFS Global"
                  title="Follow on Facebook"
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-[#1877F2]/20 text-slate-300 hover:text-white border border-slate-800 hover:border-[#1877F2]/60 transition-all shadow-sm"
                >
                  <div className="p-1 rounded-md bg-[#1877F2]/20 text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-colors">
                    <Facebook className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold">Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-blue-400 transition-colors">{t.navHome}</a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">{t.navAbout}</a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-blue-400 transition-colors">{t.navWhyChooseUs}</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-blue-400 transition-colors">{t.navCourses}</a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-blue-400 transition-colors">{t.navSchedule}</a>
              </li>
              <li>
                <a href="#admission" className="hover:text-blue-400 transition-colors">{t.navAdmission}</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic & Community */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'hi' ? 'कैंपस एवं संपर्क' : 'Campus & Support'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#gallery" className="hover:text-blue-400 transition-colors">{t.navGallery}</a>
              </li>
              <li>
                <a href="#leadership" className="hover:text-blue-400 transition-colors">{t.navLeadership}</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-blue-400 transition-colors">{t.navTestimonials}</a>
              </li>
              <li>
                <a href="#notices" className="hover:text-blue-400 transition-colors">{t.navNotices}</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-blue-400 transition-colors">{t.navFaq}</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">{t.navContact}</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Centre Location & Timing */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'hi' ? 'केंद्र का पता एवं समय' : 'Centre Location & Desk Hours'}
            </h4>
            <div className="text-xs text-slate-400 space-y-2 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>STPI, Deoghar (Jasidih)</strong><br />
                  {language === 'hi' ? 'स्वागत पेट्रोल पंप के पास, मणिकपुर रोड' : 'Near Swagat Petrol Pump, Manikpur Road'}<br />
                  {language === 'hi' ? 'रेलवे ओवर ब्रिज के बाद, जसीडीह, देवघर, झारखंड' : 'After Railway Over Bridge, Jasidih, Deoghar, Jharkhand, India'}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1 text-slate-300">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{language === 'hi' ? 'कार्यालय / डेस्क समय:' : 'Office / Desk Timing:'} <strong>10:00 AM – 01:00 PM</strong></span>
              </div>

              {/* Direct Phone & WhatsApp in Footer */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <a
                  href={`tel:${CONTACT_CONFIG.PHONE_NUMBER.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-white text-xs font-bold border border-blue-700/60 transition-colors"
                >
                  <span>📞 {CONTACT_CONFIG.PHONE_NUMBER}</span>
                </a>
                <a
                  href={`https://wa.me/${CONTACT_CONFIG.WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(CONTACT_CONFIG.WHATSAPP_MESSAGE_PREFILL)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 text-xs font-bold border border-emerald-700/60 transition-colors"
                >
                  <span>💬 WhatsApp</span>
                </a>
              </div>

              <div className="pt-1">
                <a 
                  href={CONTACT_CONFIG.GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 underline font-semibold"
                >
                  <span>{language === 'hi' ? 'गूगल मैप पर दिशा-निर्देश देखें' : 'Open Directions on Google Maps'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Official Foundation Disclaimer Box */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-300">{language === 'hi' ? 'आधिकारिक सूचना:' : 'Official Disclaimer:'}</strong>{' '}
            {language === 'hi'
              ? 'यह वेबसाइट STPI जसीडीह, देवघर (झारखंड, भारत) में VFS Global Foundation के अधीन संचालित VFS Global Academy का प्रतिनिधित्व करती है। यह पोर्टल मुख्य रूप से ट्रेवल, हॉस्पिटैलिटी मैनेजमेंट तथा लैंग्वेज एवं कम्युनिकेशन में सर्टिफिकेट प्रशिक्षण और क्षेत्रीय कौशल विकास के लिए समर्पित है।'
              : 'This website represents VFS Global Academy, operated under the VFS Global Foundation at the Software Technology Parks of India (STPI) centre in Jasidih, Deoghar (Jharkhand, India). This portal is dedicated specifically to vocational student training, certificate courses in Travel, Hospitality Management, and Language & Communication, and regional skill development initiatives.'}
          </p>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 text-center sm:text-left">
            Copyright © 2026 VFS Global Academy. All Rights Reserved.
          </p>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              {language === 'hi' ? 'फॉलो करें:' : 'Follow Us:'}
            </span>
            <a
              href={CONTACT_CONFIG.SOCIAL_LINKS.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-[#0A66C2]/20 text-slate-400 hover:text-[#0A66C2] transition-colors"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href={CONTACT_CONFIG.SOCIAL_LINKS.INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-pink-950/40 text-slate-400 hover:text-pink-400 transition-colors"
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href={CONTACT_CONFIG.SOCIAL_LINKS.FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-[#1877F2]/20 text-slate-400 hover:text-[#1877F2] transition-colors"
              aria-label="Facebook"
              title="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            id="footer-back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs transition-colors cursor-pointer"
          >
            <span>{language === 'hi' ? 'शीर्ष पर जाएं' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
