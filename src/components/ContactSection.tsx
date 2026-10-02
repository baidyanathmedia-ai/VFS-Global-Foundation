import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  ExternalLink, 
  CheckCircle2, 
  Building,
  HelpCircle
} from 'lucide-react';
import { CONTACT_CONFIG } from '../data/academyData';
import { ContactFormData } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    courseInterest: 'Travel & Hospitality Management',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
    }, 700);
  };

  // WhatsApp quick inquiry URL generator
  const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(
    CONTACT_CONFIG.WHATSAPP_MESSAGE_PREFILL
  )}`;

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5" />
            <span>{t.contactTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t.contactTitle}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Location & Placeholders Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Centre Location Card */}
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-7 space-y-5 backdrop-blur-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {language === 'hi' ? 'VFS Global Foundation के अधीन संचालित' : 'Operated under VFS Global Foundation'}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {language === 'hi' ? 'केंद्र का पता एवं कार्यालय समय' : 'Centre Location & Office Hours'}
                </h3>
              </div>

              {/* Exact Address formatted as required */}
              <div className="flex items-start gap-3.5 text-slate-300 text-sm">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
                <div className="space-y-1">
                  <div className="font-bold text-white">VFS Global Foundation</div>
                  <div className="font-semibold text-emerald-300">STPI, Deoghar (Jasidih)</div>
                  <div>{language === 'hi' ? 'स्वागत पेट्रोल पंप के समीप' : 'Near Swagat Petrol Pump'}</div>
                  <div>{language === 'hi' ? 'मणिकपुर रोड' : 'Manikpur Road'}</div>
                  <div>{language === 'hi' ? 'रेलवे ओवर ब्रिज के बाद' : 'After Railway Over Bridge'}</div>
                  <div>{language === 'hi' ? 'जसीडीह, देवघर' : 'Jasidih, Deoghar'}</div>
                  <div className="text-slate-200 font-medium">{language === 'hi' ? 'झारखंड, भारत' : 'Jharkhand, India'}</div>
                </div>
              </div>

              {/* Office Timing */}
              <div className="flex items-center gap-3.5 text-slate-300 text-sm pt-2 border-t border-slate-700">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">{language === 'hi' ? 'कार्यालय एवं डेस्क समय:' : 'Office & Desk Timing:'}</div>
                  <div className="font-bold text-emerald-300 text-base">
                    {CONTACT_CONFIG.OFFICE_TIMINGS}
                  </div>
                </div>
              </div>

              {/* Direct Contact Details */}
              <div className="pt-2 border-t border-slate-700 space-y-3">
                <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  {language === 'hi' ? 'सीधा संपर्क विवरण' : 'Direct Contact Details'}
                </div>

                {/* Phone number */}
                <div className="flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[11px]">{language === 'hi' ? 'फोन पूछताछ एवं कॉल:' : 'Phone & Direct Call:'}</span>
                      <span className="font-bold text-white text-sm">{CONTACT_CONFIG.PHONE_DISPLAY}</span>
                    </div>
                  </div>
                  <a
                    href={`tel:${CONTACT_CONFIG.PHONE_NUMBER.replace(/\s+/g, '')}`}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{language === 'hi' ? 'कॉल करें' : 'Call'}</span>
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">{language === 'hi' ? 'ईमेल डेस्क:' : 'Email Desk:'}</span>
                    <span className="font-semibold text-white">{CONTACT_CONFIG.EMAIL_ADDRESS}</span>
                  </div>
                </div>

                {/* Multi-channel buttons: WhatsApp & SMS */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    id="whatsapp-inquiry-btn"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{language === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
                  </a>

                  <a
                    id="sms-inquiry-btn"
                    href={`sms:${CONTACT_CONFIG.PHONE_NUMBER.replace(/\s+/g, '')}?body=${encodeURIComponent(CONTACT_CONFIG.WHATSAPP_MESSAGE_PREFILL)}`}
                    className="py-3 px-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>{language === 'hi' ? 'SMS संदेश' : 'SMS Message'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map Container */}
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-lg">
              <div className="p-4 bg-slate-800 flex items-center justify-between border-b border-slate-700 text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'hi' ? 'STPI देवघर केंद्र लोकेशन मैप' : 'STPI Deoghar Centre Location Map'}</span>
                </span>
                <a
                  href={CONTACT_CONFIG.GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 flex items-center gap-1 text-[11px] underline"
                >
                  <span>{language === 'hi' ? 'पूरा मैप खोलें' : 'Open Full Map'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="h-52 w-full bg-slate-900 relative">
                <iframe
                  title="STPI Deoghar Location Map"
                  src={CONTACT_CONFIG.GOOGLE_MAP_LOCATION}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact / Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                {language === 'hi' ? 'संदेश भेजें' : 'Send an Inquiry'}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                {language === 'hi' ? 'काउंसलर्स से संपर्क करें' : 'Get In Touch with Centre Counselors'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {language === 'hi'
                  ? 'कोर्स पात्रता, बैच समय या दस्तावेज़ सत्यापन के बारे में कोई प्रश्न है? अपना विवरण नीचे भेजें।'
                  : 'Have questions regarding course eligibility, batch slots, or document verification? Submit your details below.'}
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-700/80 text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">
                  {language === 'hi' ? 'पूछताछ संदेश प्राप्त हुआ' : 'Inquiry Received'}
                </h4>
                <p className="text-xs sm:text-sm text-emerald-200 max-w-md mx-auto">
                  {language === 'hi'
                    ? `धन्यवाद, ${formData.name}। STPI देवघर की टीम को आपका संदेश मिल गया है और वे कार्यालय समय (सुबह 10:00 से दोपहर 01:00) में आपसे संपर्क करेंगे।`
                    : `Thank you, ${formData.name}. Our academy team at STPI Deoghar has received your message and will get in touch with you during office hours (10:00 AM – 01:00 PM).`}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  {language === 'hi' ? 'दूसरा संदेश भेजें' : 'Send Another Inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fullName} <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={language === 'hi' ? 'अभ्यर्थी / अभिभावक का नाम' : 'Candidate / Guardian Name'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.mobileNumber} <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={language === 'hi' ? '10 अंकों का मोबाइल नंबर' : '10-digit Mobile Number'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.emailAddress}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Course Interest */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.selectCourse}
                    </label>
                    <select
                      name="courseInterest"
                      value={formData.courseInterest}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Travel & Hospitality Management">
                        {language === 'hi' ? 'ट्रेवल एवं हॉस्पिटैलिटी मैनेजमेंट' : 'Travel & Hospitality Management'}
                      </option>
                      <option value="Language & Communication">
                        {language === 'hi' ? 'लैंग्वेज एवं कम्युनिकेशन' : 'Language & Communication'}
                      </option>
                      <option value="Both Courses / General Inquiry">
                        {language === 'hi' ? 'दोनों कोर्स / सामान्य पूछताछ' : 'Both Courses / General Inquiry'}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'hi' ? 'आपका संदेश / प्रश्न' : 'Your Message / Question'}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={language === 'hi' ? 'प्रवेश, बैच समय या आवश्यक दस्तावेजों के संबंध में अपना प्रश्न लिखें...' : 'Write your questions regarding admission, batch timings, or required documents...'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={isSending}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSending ? (
                    <span>{language === 'hi' ? 'संदेश भेजा जा रहा है...' : 'Sending Message...'}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{language === 'hi' ? 'केंद्र को पूछताछ भेजें' : 'Submit Inquiry to Centre'}</span>
                    </>
                  )}
                </button>

              </form>
            )}

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700 text-xs text-slate-400 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
              <span>
                {language === 'hi'
                  ? 'आप STPI देवघर में दस्तावेज़ जमा समय (सुबह 10:00 से दोपहर 01:00) के दौरान सीधे भी आ सकते हैं।'
                  : 'You can also visit directly during document submission hours (10:00 AM – 01:00 PM) at STPI Deoghar.'}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
