import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  CheckCircle, 
  ArrowRight, 
  Award,
  Eye
} from 'lucide-react';
import { COURSES_DATA, GALLERY_ITEMS } from '../data/academyData';
import { GalleryItem } from '../types';
import { LightboxModal } from './LightboxModal';
import { useLanguage } from '../context/LanguageContext';

interface CoursesSectionProps {
  onOpenApply: (courseId?: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onOpenApply }) => {
  const [activeCourseTab, setActiveCourseTab] = useState<string>('all');
  const [selectedCoursePhoto, setSelectedCoursePhoto] = useState<GalleryItem | null>(null);
  const { t, language } = useLanguage();

  const filteredCourses = activeCourseTab === 'all' 
    ? COURSES_DATA 
    : COURSES_DATA.filter(c => c.id === activeCourseTab);

  const openCoursePhoto = (courseId: string) => {
    // Find matching gallery photo or construct a gallery item
    const targetItem = GALLERY_ITEMS.find(g => 
      courseId === 'travel-hospitality' ? g.id === 'gal-7' || g.id === 'gal-2' : g.id === 'gal-3' || g.id === 'gal-6'
    ) || GALLERY_ITEMS[0];
    setSelectedCoursePhoto(targetItem);
  };

  return (
    <section id="courses" className="py-20 bg-slate-50 dark:bg-slate-900/60 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.coursesTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.coursesTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {t.coursesSubtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          <button
            onClick={() => setActiveCourseTab('all')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeCourseTab === 'all'
                ? 'bg-blue-700 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {language === 'hi' ? 'सभी कोर्सेज (2)' : 'All Courses (2)'}
          </button>
          <button
            onClick={() => setActiveCourseTab('travel-hospitality')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeCourseTab === 'travel-hospitality'
                ? 'bg-blue-700 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {language === 'hi' ? 'ट्रेवल एवं हॉस्पिटैलिटी' : 'Travel & Hospitality'}
          </button>
          <button
            onClick={() => setActiveCourseTab('language-communication')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeCourseTab === 'language-communication'
                ? 'bg-blue-700 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {language === 'hi' ? 'लैंग्वेज एवं कम्युनिकेशन' : 'Language & Communication'}
          </button>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {filteredCourses.map((course) => {
            const isTravel = course.id === 'travel-hospitality';
            const courseTitle = isTravel ? t.course1Title : t.course2Title;
            const courseSubtitle = isTravel ? t.course1Subtitle : t.course2Subtitle;
            const courseDesc = isTravel ? t.course1Desc : t.course2Desc;

            return (
              <div
                key={course.id}
                id={`course-card-${course.id}`}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Card Header Banner with Image */}
                  <div 
                    onClick={() => openCoursePhoto(course.id)}
                    className="relative h-56 overflow-hidden cursor-pointer"
                    title={language === 'hi' ? 'फुल-स्क्रीन में देखने हेतु क्लिक करें' : 'Click to enlarge full-screen photo'}
                  >
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${
                        isTravel ? 'bg-blue-600' : 'bg-emerald-600'
                      }`}>
                        {isTravel 
                          ? (language === 'hi' ? 'हॉस्पिटैलिटी एवं टूरिज्म' : 'Hospitality & Tourism')
                          : (language === 'hi' ? 'कम्युनिकेशन एवं सॉफ्ट स्किल्स' : 'Communication & Soft Skills')}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                          <Eye className="w-3.5 h-3.5" />
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white backdrop-blur-md border border-white/20">
                          {language === 'hi' ? '3 माह' : course.duration}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Course Title on Banner */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-extrabold tracking-tight">
                        {courseTitle}
                      </h3>
                      <p className="text-xs text-blue-200 mt-1 line-clamp-1">
                        {courseSubtitle}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 space-y-6">
                    
                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                      {courseDesc}
                    </p>

                    {/* Schedule Quick Specs */}
                    <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 text-xs">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                        <div>
                          <span className="text-slate-400 dark:text-slate-400 block">{language === 'hi' ? 'कक्षा समय:' : 'Timing:'}</span>
                          <span className="font-bold">{language === 'hi' ? 'सुबह 10:00 से दोपहर 01:00' : '10:00 AM – 01:00 PM'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <div>
                          <span className="text-slate-400 dark:text-slate-400 block">{language === 'hi' ? 'दिन:' : 'Class Days:'}</span>
                          <span className="font-bold">{language === 'hi' ? 'शुक्र, शनि एवं रवि' : 'Fri, Sat & Sun (3 Days)'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Topics Covered */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>{t.courseKeyTopicsLabel}</span>
                      </h4>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        {course.topics.map((topic, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Career Outcomes */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {t.courseCareerOutcomesLabel}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {course.careerOutcomes.map((career, i) => (
                          <span 
                            key={i} 
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                          >
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="p-6 pt-0 sm:p-7 sm:pt-0">
                  <button
                    id={`apply-now-${course.id}`}
                    onClick={() => onOpenApply(course.id)}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <span>{language === 'hi' ? `${courseTitle} के लिए आवेदन करें` : `Apply Now for ${course.title}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Certificate Verification Notice */}
        <div className="mt-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>
            {language === 'hi'
              ? '3 माह का पाठ्यक्रम पूर्ण करने एवं मूल्यांकन के उपरांत VFS Global Foundation द्वारा सर्टिफिकेट प्रदान किया जाता है।'
              : 'Certificate awarded by VFS Global Foundation upon 3-month curriculum completion and assessment.'}
          </span>
        </div>

      </div>

      {/* Lightbox Modal for Course Photos */}
      {selectedCoursePhoto && (
        <LightboxModal
          item={selectedCoursePhoto}
          items={GALLERY_ITEMS}
          onClose={() => setSelectedCoursePhoto(null)}
          onNavigate={(index) => setSelectedCoursePhoto(GALLERY_ITEMS[index])}
          onOpenApply={onOpenApply}
        />
      )}
    </section>
  );
};
