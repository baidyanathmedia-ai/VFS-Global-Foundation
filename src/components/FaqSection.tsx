import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQS_DATA } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);
  const { t, language } = useLanguage();

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const getFaqQuestion = (faq: typeof FAQS_DATA[0]) => {
    if (language !== 'hi') return faq.question;
    switch(faq.id) {
      case 1: return 'VFS Global Academy STPI देवघर क्या है?';
      case 2: return 'प्रशिक्षण केंद्र का सही पता व स्थान क्या है?';
      case 3: return 'प्रत्येक बैच में कितने छात्रों को प्रवेश मिलता है?';
      case 4: return 'दस्तावेज़ जमा करने और सत्यापन का समय क्या है?';
      case 5: return 'प्रवेश के लिए कौन से दस्तावेज़ आवश्यक हैं?';
      case 6: return 'सर्टिफिकेट कौन जारी करता है?';
      case 7: return 'साप्ताहिक कक्षा का समय क्या है?';
      case 8: return 'कोर्स की अवधि क्या है?';
      default: return faq.question;
    }
  };

  const getFaqAnswer = (faq: typeof FAQS_DATA[0]) => {
    if (language !== 'hi') return faq.answer;
    switch(faq.id) {
      case 1: return 'VFS Global Academy, VFS Global Foundation के अंतर्गत संचालित एक प्रमुख कौशल विकास संस्थान है, जो युवाओं को यात्रा, आतिथ्य, संचार और वैश्विक ग्राहक सेवा में सशक्त बनाता है।';
      case 2: return 'हमारा केंद्र STPI देवघर (जसीडीह), स्वागत पेट्रोल पंप के समीप, मणिकपुर रोड, देवघर 814142, झारखंड पर स्थित है।';
      case 3: return 'कक्षा में गुणवत्ता और व्यक्तिगत मार्गदर्शन बनाए रखने के लिए प्रति बैच अधिकतम 30 छात्रों की सख्त सीमा रखी गई है।';
      case 4: return 'दस्तावेज़ सत्यापन और आवेदन जमा करने का समय सुबह 10:00 बजे से दोपहर 01:00 बजे तक (सोमवार से शनिवार) है।';
      case 5: return 'आवश्यक दस्तावेज़: 10वीं/12वीं अंक पत्र, आधार कार्ड की प्रति, 3 पासपोर्ट आकार फोटो और बैंक पासबुक कॉपी।';
      case 6: return 'सफलतापूर्वक मूल्यांकन पूरा करने पर छात्रों को VFS Global Foundation द्वारा मान्यता प्राप्त व्यावसायिक सर्टिफिकेट प्रदान किया जाता है।';
      case 7: return 'कक्षाएं सोमवार से शुक्रवार (सुबह 9:30 से दोपहर 1:30) आयोजित की जाती हैं। शनिवार को स्पेशल मेंटरिंग व गेस्ट लेक्चर होते हैं।';
      case 8: return 'दोनों प्रमुख सर्टिफिकेट कोर्स 3 महीने (12 सप्ताह) के गहन व्यावहारिक मॉड्यूल पर आधारित हैं।';
      default: return faq.answer;
    }
  };

  return (
    <section id="faqs" className="py-20 bg-white dark:bg-slate-950 relative transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faqTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.faqTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {t.faqSubtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQS_DATA.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-blue-300 dark:border-blue-800/80 bg-blue-50/50 dark:bg-blue-950/30 shadow-sm' 
                    : 'border-slate-200 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-extrabold flex items-center justify-center shrink-0">
                      {faq.id}
                    </span>
                    <span>{getFaqQuestion(faq)}</span>
                  </span>
                  
                  <div className={`p-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 shadow-xs transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed pl-16 border-t border-blue-100/60 dark:border-slate-800 animate-fadeIn">
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      {getFaqAnswer(faq)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Assistance Prompt */}
        <div className="mt-10 text-center text-xs sm:text-sm text-slate-600">
          {language === 'hi' ? (
            <>
              अन्य कोई प्रश्न? हमारे केंद्र <strong>STPI देवघर</strong> पर <strong>सुबह 10:00 से दोपहर 01:00</strong> के बीच संपर्क करें।
            </>
          ) : (
            <>
              Have more questions? Visit our admission desk at <strong>STPI Deoghar</strong> between <strong>10:00 AM to 01:00 PM</strong> or contact our team.
            </>
          )}
        </div>

      </div>
    </section>
  );
};
