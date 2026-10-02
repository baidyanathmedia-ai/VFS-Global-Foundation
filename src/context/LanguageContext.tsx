import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi';

export interface Translations {
  // Navigation & Top Bar
  admissionsOpenBadge: string;
  topBarNotice: string;
  deskHours: string;
  jasidihLocation: string;
  navHome: string;
  navAbout: string;
  navWhyChooseUs: string;
  navCourses: string;
  navSchedule: string;
  navAdmission: string;
  navGallery: string;
  navLeadership: string;
  navTestimonials: string;
  navVideos: string;
  navNotices: string;
  navFaq: string;
  navContact: string;
  applyNowBtn: string;
  switchLang: string;

  // Hero Section
  heroBadge: string;
  heroHeadlineMain: string;
  heroHeadlineHighlight: string;
  heroSubheadline: string;
  heroBatchAlert: string;
  heroExploreCoursesBtn: string;
  heroApplyBtn: string;
  heroStat1Value: string;
  heroStat1Label: string;
  heroStat2Value: string;
  heroStat2Label: string;
  heroStat3Value: string;
  heroStat3Label: string;
  heroStat4Value: string;
  heroStat4Label: string;

  // About Section
  aboutTag: string;
  aboutTitle: string;
  aboutDesc1: string;
  aboutDesc2: string;
  aboutStpiBadge: string;
  aboutStpiTitle: string;
  aboutStpiDesc: string;
  aboutLandmarkLabel: string;
  aboutTimingsLabel: string;

  // Why Choose Us
  whyTag: string;
  whyTitle: string;
  whySubtitle: string;
  why1Title: string;
  why1Desc: string;
  why2Title: string;
  why2Desc: string;
  why3Title: string;
  why3Desc: string;
  why4Title: string;
  why4Desc: string;
  why5Title: string;
  why5Desc: string;
  why6Title: string;
  why6Desc: string;

  // Courses
  coursesTag: string;
  coursesTitle: string;
  coursesSubtitle: string;
  courseDurationLabel: string;
  courseScheduleLabel: string;
  courseBatchLabel: string;
  courseKeyTopicsLabel: string;
  courseCareerOutcomesLabel: string;
  courseEnrollBtn: string;
  course1Title: string;
  course1Subtitle: string;
  course1Desc: string;
  course2Title: string;
  course2Subtitle: string;
  course2Desc: string;

  // Schedule
  scheduleTag: string;
  scheduleTitle: string;
  scheduleSubtitle: string;
  scheduleDaysHeading: string;
  scheduleDaysSubheading: string;
  scheduleTimeHeading: string;
  scheduleTimeSubheading: string;
  scheduleDurationHeading: string;
  scheduleDurationSubheading: string;

  // Admission & Notice
  admissionsTag: string;
  admissionsTitle: string;
  admissionsSubtitle: string;
  admissionTag: string;
  admissionTitle: string;
  admissionSubtitle: string;
  admissionsNoticeTitle: string;
  admissionsNoticeDesc: string;
  admissionsReqDocsTitle: string;
  applyOnlineBtn: string;
  admissionsDocSubTimeLabel: string;
  seatLimitAlertTitle: string;
  seatLimitAlertDesc: string;
  docsRequiredTitle: string;
  doc1: string;
  doc2: string;
  doc3: string;
  doc4: string;
  submissionDeskTitle: string;
  submissionDeskDesc: string;

  // Gallery
  galleryTag: string;
  galleryTitle: string;
  gallerySubtitle: string;

  // Leadership
  leadershipTag: string;
  leadershipTitle: string;
  leadershipSubtitle: string;
  leadershipQuote: string;
  leadershipBio: string;
  leadershipRole: string;

  // Testimonials
  testimonialsTag: string;
  testimonialsTitle: string;
  testimonialsSubtitle: string;

  // Success Stories
  successStoriesTag: string;
  successStoriesTitle: string;
  successStoriesSubtitle: string;

  // Notice & FAQs
  noticesTag: string;
  noticesTitle: string;
  noticesSubtitle: string;
  faqTag: string;
  faqTitle: string;
  faqSubtitle: string;
  faqsTag: string;
  faqsTitle: string;
  contactTag: string;
  contactTitle: string;
  contactSubtitle: string;

  // Apply Form
  applyTag: string;
  applyTitle: string;
  applySubtitle: string;
  fullName: string;
  fatherName: string;
  mobileNumber: string;
  emailAddress: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  district: string;
  state: string;
  selectCourse: string;
  qualification: string;
  termsDeclaration: string;
  submitApplication: string;

  // Floating Actions
  inquireWhatsApp: string;
  callDesk: string;
}

const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    admissionsOpenBadge: "ADMISSIONS OPEN",
    topBarNotice: "Certificate Courses in Travel, Hospitality & Communication | STPI Deoghar",
    deskHours: "Desk: 10:00 AM – 01:00 PM (Daily)",
    jasidihLocation: "Jasidih, Deoghar",
    navHome: "Home",
    navAbout: "About Us",
    navWhyChooseUs: "Why Choose Us",
    navCourses: "Courses",
    navSchedule: "Schedule",
    navAdmission: "Admission",
    navGallery: "Gallery",
    navLeadership: "Leadership",
    navTestimonials: "Testimonials",
    navVideos: "Videos",
    navNotices: "Notices",
    navFaq: "FAQs",
    navContact: "Contact",
    applyNowBtn: "APPLY NOW",
    switchLang: "Language",

    heroBadge: "STPI Deoghar (Jasidih) Centre",
    heroHeadlineMain: "Build Your Future with Travel, Hospitality &",
    heroHeadlineHighlight: "Communication Skills",
    heroSubheadline: "Empowering youth in Deoghar & Jharkhand with industry-aligned certificate courses under VFS Global Foundation. 3-month hands-on career training at STPI Jasidih.",
    heroBatchAlert: "Admissions Open for New Batch | Strictly Maximum 30 Students per Batch",
    heroExploreCoursesBtn: "Explore Courses",
    heroApplyBtn: "Apply for Admission",
    heroStat1Value: "3 Months",
    heroStat1Label: "Fast-Track Certification",
    heroStat2Value: "3 Days/Week",
    heroStat2Label: "Fri, Sat & Sun (10 AM - 1 PM)",
    heroStat3Value: "Max 30",
    heroStat3Label: "Students per Batch",
    heroStat4Value: "100% Practical",
    heroStat4Label: "Career & Interview Skills",

    aboutTag: "About The Academy",
    aboutTitle: "Vocational Excellence at STPI Deoghar",
    aboutDesc1: "VFS Global Academy, operating under the aegis of VFS Global Foundation, is dedicated to empowering students and career aspirants across Deoghar, Santhal Pargana, and Jharkhand.",
    aboutDesc2: "Located at the Software Technology Parks of India (STPI) Jasidih campus, our programs bridge academic knowledge with high-demand professional skills in global travel, hospitality customer experience, and executive English communication.",
    aboutStpiBadge: "Centre Location",
    aboutStpiTitle: "STPI Deoghar (Jasidih) Campus",
    aboutStpiDesc: "Modern, tech-enabled training classrooms with air conditioning, audio-visual presentation systems, and interactive learning environments.",
    aboutLandmarkLabel: "Landmark: Near Swagat Petrol Pump, Manikpur Road, After Railway Over Bridge, Jasidih",
    aboutTimingsLabel: "Office & Document Desk: 10:00 AM to 01:00 PM (Daily)",

    whyTag: "Why Choose Us",
    whyTitle: "Designed for Real-World Career Success",
    whySubtitle: "Six key pillars that make VFS Global Academy at STPI Deoghar the premier vocational learning destination.",
    why1Title: "Industry-Oriented Training",
    why1Desc: "Curriculum designed around modern travel sector, hospitality workflows, and professional communication standards.",
    why2Title: "Certificate Courses",
    why2Desc: "Prestigious foundation certificates that add substantial weight to your CV and job applications.",
    why3Title: "Experienced Trainers",
    why3Desc: "Guidance from seasoned instructors with rich corporate experience and dedicated student mentorship.",
    why4Title: "Practical Learning",
    why4Desc: "Role plays, mock customer scenarios, front desk simulations, and interactive public speaking drills.",
    why5Title: "Communication Skill Development",
    why5Desc: "Focused emphasis on fluent spoken English, personality development, body language, and interview cracking.",
    why6Title: "Career-Focused Education",
    why6Desc: "Personalized resume building, interview preparation, and vocational readiness for airlines, hotels, and corporates.",

    coursesTag: "Program Offerings",
    coursesTitle: "3-Month Certificate Courses",
    coursesSubtitle: "Intensive 3-month certificate programs conducted on Friday, Saturday, and Sunday (10:00 AM to 01:00 PM) at STPI Deoghar.",
    courseDurationLabel: "Duration",
    courseScheduleLabel: "Weekly Schedule",
    courseBatchLabel: "Batch Capacity",
    courseKeyTopicsLabel: "Key Curriculum Modules",
    courseCareerOutcomesLabel: "Career Pathways & Roles",
    courseEnrollBtn: "Apply for this Course",
    course1Title: "Travel & Hospitality Management",
    course1Subtitle: "Learn | Explore | Excel in Global Tourism & Hospitality",
    course1Desc: "Comprehensive vocational training covering the international travel ecosystem, hotel front office operations, guest relationship mastery, corporate etiquette, and destination management.",
    course2Title: "Language & Communication",
    course2Subtitle: "Speak with Confidence | Communicate with Impact | Succeed in Career",
    course2Desc: "Master fluent English speaking, executive corporate correspondence, personality enrichment, job interview techniques, and public presentation confidence.",

    scheduleTag: "Timetable & Structure",
    scheduleTitle: "Weekend Training Schedule",
    scheduleSubtitle: "Specially structured 3-day weekly sessions allowing college students, working professionals, and job seekers to attend without disrupting weekday routines.",
    scheduleDaysHeading: "3 Days Every Week",
    scheduleDaysSubheading: "Friday, Saturday & Sunday",
    scheduleTimeHeading: "3 Hours Daily",
    scheduleTimeSubheading: "10:00 AM to 01:00 PM",
    scheduleDurationHeading: "3 Months Duration",
    scheduleDurationSubheading: "Complete Foundation & Practical Drills",

    admissionsTag: "Admissions Desk",
    admissionsTitle: "Admission Process & Requirements",
    admissionsSubtitle: "Join the upcoming cohort at STPI Deoghar. Follow the straightforward registration and document verification process.",
    admissionTag: "Admissions Desk",
    admissionTitle: "Admission Process & Requirements",
    admissionSubtitle: "Join the upcoming cohort at STPI Deoghar. Follow the straightforward registration and document verification process.",
    admissionsNoticeTitle: "STRICT BATCH SIZE LIMIT: MAXIMUM 30 STUDENTS",
    admissionsNoticeDesc: "To ensure individualized attention, mock drills, and quality mentorship, admissions are granted on a first-come, first-served basis strictly up to 30 seats per batch.",
    admissionsReqDocsTitle: "Documents Required for Admission",
    applyOnlineBtn: "Apply for Admission",
    admissionsDocSubTimeLabel: "Daily Document Submission Desk: 10:00 AM to 01:00 PM",
    seatLimitAlertTitle: "STRICT BATCH SIZE LIMIT: MAXIMUM 30 STUDENTS",
    seatLimitAlertDesc: "To ensure individualized attention, mock drills, and quality mentorship, admissions are granted on a first-come, first-served basis strictly up to 30 seats per batch.",
    docsRequiredTitle: "Documents Required for Admission",
    doc1: "Self-attested Photocopy of Class 10th Marksheet & Certificate",
    doc2: "Self-attested Photocopy of Class 12th / Intermediate Marksheet",
    doc3: "Self-attested Photocopy of Graduation / Highest Educational Marksheet (if applicable)",
    doc4: "Clear Photocopy of Aadhaar Card (ID Proof) & 2 Passport Size Photographs",
    submissionDeskTitle: "Daily Document Submission Desk",
    submissionDeskDesc: "Submit your physical document photocopies directly at STPI Deoghar Centre Desk between 10:00 AM and 01:00 PM.",

    galleryTag: "Campus Life",
    galleryTitle: "Authentic Campus & Activities",
    gallerySubtitle: "Take a tour through training sessions, interactive classroom drills, student workshops, and campus activities at STPI Deoghar.",

    leadershipTag: "Academic Leadership",
    leadershipTitle: "Message from Centre Head",
    leadershipSubtitle: "Guiding the youth of Jharkhand towards global competence and vocational success.",
    leadershipQuote: "“Empowering young learners through skill development, professional training and communication education.”",
    leadershipBio: "Under the leadership of Ramsewak Gunjan (Centre Head, VFS Global Foundation, STPI Deoghar), our mission is to make world-class vocational and communicative training accessible to the aspiring youth of Deoghar and Jharkhand.",
    leadershipRole: "Centre Head, VFS Global Foundation (STPI Deoghar)",

    testimonialsTag: "Student Stories",
    testimonialsTitle: "What Our Students & Alumni Say",
    testimonialsSubtitle: "Real experiences from graduates who accelerated their careers and confidence at VFS Global Academy.",

    successStoriesTag: "Career Placements",
    successStoriesTitle: "Alumni Success Stories & Case Studies",
    successStoriesSubtitle: "Case study snapshots of graduates from STPI Deoghar excelling in global airlines, luxury hospitality, and international travel services.",

    noticesTag: "Announcements",
    noticesTitle: "Academy Notice Board",
    noticesSubtitle: "Official batch announcements, document verification deadlines, and holiday notices for STPI Deoghar.",

    faqTag: "Got Questions?",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Essential information regarding our course structure, schedule, documents, and batch admission rules.",
    faqsTag: "Got Questions?",
    faqsTitle: "Frequently Asked Questions",

    contactTag: "Connect With Us",
    contactTitle: "Visit STPI Deoghar or Contact Desk",
    contactSubtitle: "Reach out to our STPI Deoghar centre team for admission assistance, batch schedules, or course guidance.",

    applyTag: "Application Form",
    applyTitle: "Online Admission Registration",
    applySubtitle: "Fill out the registration form below to secure your seat for the upcoming 3-month certificate cohort at STPI Deoghar.",
    fullName: "Full Name",
    fatherName: "Father's / Guardian's Name",
    mobileNumber: "Mobile Number",
    emailAddress: "Email Address",
    dob: "Date of Birth",
    gender: "Gender",
    address: "Complete Residential Address",
    city: "City / Town",
    district: "District",
    state: "State",
    selectCourse: "Select Certificate Course",
    qualification: "Highest Educational Qualification",
    termsDeclaration: "I hereby confirm that the information provided is accurate, and I agree to submit required educational document photocopies during desk hours at STPI Deoghar.",
    submitApplication: "Submit Registration Application",

    inquireWhatsApp: "WhatsApp Inquiry",
    callDesk: "Call Centre Desk"
  },
  hi: {
    admissionsOpenBadge: "नामांकन जारी है",
    topBarNotice: "ट्रेवल, हॉस्पिटैलिटी एवं कम्युनिकेशन में सर्टिफिकेट कोर्स | STPI देवघर",
    deskHours: "हेल्पडेस्क: सुबह 10:00 से दोपहर 01:00 बजे (प्रतिदिन)",
    jasidihLocation: "जसीडीह, देवघर",
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navWhyChooseUs: "विशेषताएं",
    navCourses: "कोर्सेज",
    navSchedule: "समय सारिणी",
    navAdmission: "नामांकन",
    navGallery: "गैलरी",
    navLeadership: "नेतृत्व संदेश",
    navTestimonials: "प्रशंसापत्र",
    navVideos: "वीडियो",
    navNotices: "सूचनाएं",
    navFaq: "प्रश्नोत्तरी",
    navContact: "संपर्क",
    applyNowBtn: "आवेदन करें",
    switchLang: "भाषा",

    heroBadge: "STPI देवघर (जसीडीह) केंद्र",
    heroHeadlineMain: "ट्रेवल, हॉस्पिटैलिटी एवं",
    heroHeadlineHighlight: "कम्युनिकेशन स्किल्स से बनाएं अपना भविष्य",
    heroSubheadline: "VFS Global Foundation के अंतर्गत देवघर एवं झारखंड के युवाओं को रोजगारपरक सर्टिफिकेट कोर्सेज। STPI जसीडीह में 3 महीने का व्यावहारिक व करियर-उन्मुख प्रशिक्षण।",
    heroBatchAlert: "नए बैच हेतु प्रवेश प्रारंभ | प्रति बैच अधिकतम 30 छात्र (सीमित सीटें)",
    heroExploreCoursesBtn: "कोर्स विवरण देखें",
    heroApplyBtn: "नामांकन हेतु आवेदन करें",
    heroStat1Value: "3 माह",
    heroStat1Label: "सर्टिफिकेट पाठ्यक्रम",
    heroStat2Value: "सप्ताह में 3 दिन",
    heroStat2Label: "शुक्र, शनि एवं रवि (सुबह 10 से दोपहर 1)",
    heroStat3Value: "अधिकतम 30",
    heroStat3Label: "प्रति बैच छात्र संख्या",
    heroStat4Value: "100% व्यावहारिक",
    heroStat4Label: "इंटरव्यू व करियर तैयारी",

    aboutTag: "अकादमी के बारे में",
    aboutTitle: "STPI देवघर में गुणवत्तापूर्ण कौशल प्रशिक्षण",
    aboutDesc1: "VFS Global Foundation के तत्वावधान में संचालित VFS Global Academy देवघर, संथाल परगना और संपूर्ण झारखंड के युवाओं को सशक्त बनाने हेतु समर्पित है।",
    aboutDesc2: "सॉफ्टवेयर टेक्नोलॉजी पार्क्स ऑफ इंडिया (STPI) जसीडीह परिसर में स्थित हमारी अकादमी आधुनिक ट्रेवल, हॉस्पिटैलिटी और प्रभावी अंग्रेजी कम्युनिकेशन में व्यावहारिक प्रशिक्षण प्रदान करती है।",
    aboutStpiBadge: "केंद्र का स्थान",
    aboutStpiTitle: "STPI देवघर (जसीडीह) कैंपस",
    aboutStpiDesc: "वातानुकूलित आधुनिक क्लासरूम, ऑडियो-विजुअल प्रेजेंटेशन एवं परिचर्चा हेतु सुसज्जित आधुनिक प्रशिक्षण वातावरण।",
    aboutLandmarkLabel: "पता: स्वागत पेट्रोल पंप के पास, मानिकपुर रोड, रेलवे ओवर ब्रिज के आगे, जसीडीह",
    aboutTimingsLabel: "कार्यालय व दस्तावेज जमा समय: सुबह 10:00 बजे से दोपहर 01:00 बजे तक (प्रतिदिन)",

    whyTag: "अकादमी की विशेषताएं",
    whyTitle: "सफलता एवं करियर के लिए विशेष रूप से निर्मित",
    whySubtitle: "छह प्रमुख विशेषताएं जो STPI देवघर स्थित VFS Global Academy को श्रेष्ठ बनाती हैं।",
    why1Title: "उद्योग-उन्मुख प्रशिक्षण",
    why1Desc: "ट्रेवल, हॉस्पिटैलिटी व कॉर्पोरेट जगत की वर्तमान आवश्यकताओं पर आधारित पाठ्यक्रम।",
    why2Title: "सर्टिफिकेट कोर्सेज",
    why2Desc: "प्रतिष्ठित फाउंडेशन सर्टिफिकेट जो आपके बायोडाटा (CV) और करियर को नई मजबूती प्रदान करता है।",
    why3Title: "अनुभवी प्रशिक्षक",
    why3Desc: "अनुभवी ट्रेनर्स द्वारा व्यक्तिगत मार्गदर्शन, संवाद कौशल और व्यावहारिक अभ्यास।",
    why4Title: "व्यावहारिक शिक्षण",
    why4Desc: "मॉक कस्टमर डीलिंग, फ्रंट डेस्क सिमुलेशन और सार्वजनिक भाषण (Public Speaking) का नियमित अभ्यास।",
    why5Title: "कम्युनिकेशन स्किल विकास",
    why5Desc: "धाराप्रवाह अंग्रेजी बोलना, बॉडी लैंग्वेज, आत्मविश्वास और साक्षात्कार (Interview) की पूरी तैयारी।",
    why6Title: "करियर-केंद्रित शिक्षा",
    why6Desc: "होटल, एयरलाइंस, ट्रेवल एजेंसियों एवं कॉर्पोरेट कंपनियों में रोजगार हेतु व्यावहारिक तैयारी।",

    coursesTag: "उपलब्ध पाठ्यक्रम",
    coursesTitle: "3-माह के सर्टिफिकेट कोर्सेज",
    coursesSubtitle: "STPI देवघर में शुक्रवार, शनिवार एवं रविवार को सुबह 10:00 से दोपहर 01:00 बजे तक आयोजित गहन 3-महीने के सर्टिफिकेट कार्यक्रम।",
    courseDurationLabel: "अवधि",
    courseScheduleLabel: "सप्ताहिक समय",
    courseBatchLabel: "बैच क्षमता",
    courseKeyTopicsLabel: "प्रमुख पाठ्यक्रम विषय",
    courseCareerOutcomesLabel: "करियर अवसर व पद",
    courseEnrollBtn: "इस कोर्स के लिए आवेदन करें",
    course1Title: "ट्रेवल एवं हॉस्पिटैलिटी मैनेजमेंट",
    course1Subtitle: "सीखें | आगे बढ़ें | ग्लोबल ट्रेवल एवं हॉस्पिटैलिटी में बनाएं करियर",
    course1Desc: "ट्रेवल उद्योग, होटल फ्रंट ऑफिस, गेस्ट रिलेशनशिप, कॉर्पोरेट शिष्टाचार और पर्यटन प्रबंधन में पूर्ण व्यावहारिक प्रशिक्षण।",
    course2Title: "लैंग्वेज एवं कम्युनिकेशन",
    course2Subtitle: "आत्मविश्वास से बोलें | प्रभावी संवाद करें | करियर में सफलता पाएं",
    course2Desc: "धाराप्रवाह अंग्रेजी संभाषण, कॉर्पोरेट पत्राचार, व्यक्तित्व विकास, जॉब इंटरव्यू तैयारी और स्टेज प्रेजेंस में महारत।",

    scheduleTag: "समय सारिणी एवं प्रारूप",
    scheduleTitle: "सप्ताहांत (Weekend) प्रशिक्षण समय",
    scheduleSubtitle: "सप्ताह में 3 दिन की विशेष रूप से तैयार समय सारिणी ताकि कॉलेज के छात्र और युवा बिना किसी बाधा के प्रशिक्षण प्राप्त कर सकें।",
    scheduleDaysHeading: "सप्ताह में 3 दिन",
    scheduleDaysSubheading: "शुक्रवार, शनिवार एवं रविवार",
    scheduleTimeHeading: "प्रतिदिन 3 घंटे",
    scheduleTimeSubheading: "सुबह 10:00 से दोपहर 01:00 बजे",
    scheduleDurationHeading: "3 माह की अवधि",
    scheduleDurationSubheading: "संपूर्ण थ्योरी एवं व्यावहारिक अभ्यास",

    admissionsTag: "नामांकन डेस्क",
    admissionsTitle: "नामांकन प्रक्रिया एवं आवश्यक दस्तावेज",
    admissionsSubtitle: "STPI देवघर में आगामी बैच में शामिल हों। सरल ऑनलाइन व ऑफलाइन नामांकन प्रक्रिया।",
    admissionTag: "नामांकन डेस्क",
    admissionTitle: "नामांकन प्रक्रिया एवं आवश्यक दस्तावेज",
    admissionSubtitle: "STPI देवघर में आगामी बैच में शामिल हों। सरल ऑनलाइन व ऑफलाइन नामांकन प्रक्रिया।",
    admissionsNoticeTitle: "सीमित सीटें: प्रति बैच अधिकतम केवल 30 छात्र",
    admissionsNoticeDesc: "प्रत्येक छात्र को व्यक्तिगत ध्यान और गुणवत्तापूर्ण प्रशिक्षण सुनिश्चित करने के लिए सीटें पहले आओ-पहले पाओ के आधार पर 30 तक सीमित हैं।",
    admissionsReqDocsTitle: "नामांकन हेतु आवश्यक दस्तावेज",
    applyOnlineBtn: "नामांकन हेतु आवेदन करें",
    admissionsDocSubTimeLabel: "दस्तावेज सत्यापन व जमा समय: सुबह 10:00 से दोपहर 01:00 बजे",
    seatLimitAlertTitle: "सीमित सीटें: प्रति बैच अधिकतम केवल 30 छात्र",
    seatLimitAlertDesc: "प्रत्येक छात्र को व्यक्तिगत ध्यान और गुणवत्तापूर्ण प्रशिक्षण सुनिश्चित करने के लिए सीटें पहले आओ-पहले पाओ के आधार पर 30 तक सीमित हैं।",
    docsRequiredTitle: "नामांकन हेतु आवश्यक दस्तावेज",
    doc1: "10वीं (मैट्रिक) की मार्कशीट और सर्टिफिकेट की स्व-हस्ताक्षरित छायाप्रति",
    doc2: "12वीं (इंटरमीडिएट) की मार्कशीट की स्व-हस्ताक्षरित छायाप्रति",
    doc3: "स्नातक / उच्चतम शैक्षणिक योग्यता की मार्कशीट की छायाप्रति (यदि लागू हो)",
    doc4: "आधार कार्ड की साफ फोटोकॉपी एवं 2 पासपोर्ट साइज रंगीन फोटो",
    submissionDeskTitle: "दस्तावेज सत्यापन एवं जमा डेस्क",
    submissionDeskDesc: "अपने दस्तावेजों की फोटोकॉपी STPI देवघर केंद्र पर सुबह 10:00 से दोपहर 01:00 बजे के बीच सीधे जमा करें।",

    galleryTag: "कैंपस जीवन",
    galleryTitle: "गतिविधियां एवं क्लासरूम गैलरी",
    gallerySubtitle: "STPI देवघर केंद्र पर आयोजित प्रशिक्षण सत्रों, इंटरेक्टिव क्लासरूम अभ्यास और छात्र वर्कशॉप की वास्तविक झलकियां।",

    leadershipTag: "शैक्षणिक नेतृत्व",
    leadershipTitle: "केंद्र प्रमुख का संदेश",
    leadershipSubtitle: "झारखंड के युवाओं को वैश्विक क्षमता और व्यावसायिक सफलता की ओर अग्रसर करना।",
    leadershipQuote: "“कौशल विकास, व्यावसायिक प्रशिक्षण और प्रभावी संवाद शिक्षा के माध्यम से युवा पीढ़ी का सशक्तिकरण।”",
    leadershipBio: "रामसेवक गुंजन (सेंटर हेड, VFS Global Foundation, STPI देवघर) के नेतृत्व में हमारा ध्येय देवघर एवं झारखंड के महत्वाकांक्षी युवाओं को विश्वस्तरीय रोजगारपरक प्रशिक्षण प्रदान करना है।",
    leadershipRole: "सेंटर हेड, VFS Global Foundation (STPI देवघर)",

    testimonialsTag: "छात्र अनुभव",
    testimonialsTitle: "हमारे छात्र एवं पूर्व छात्र क्या कहते हैं",
    testimonialsSubtitle: "उन छात्रों के वास्तविक अनुभव जिन्होंने VFS Global Academy से अपने आत्मविश्वास और करियर को नई दिशा दी।",

    successStoriesTag: "करियर सफलता",
    successStoriesTitle: "पूर्व छात्रों की सफलता की कहानियां व केस स्टडीज",
    successStoriesSubtitle: "STPI देवघर से प्रशिक्षित छात्रों की वास्तविक सफलता, जो आज प्रमुख एयरलाइंस, फाइव-स्टार होटल्स और ट्रेवल सेवाओं में कार्यरत हैं।",

    noticesTag: "नवीनतम सूचनाएं",
    noticesTitle: "अकादमी नोटिस बोर्ड",
    noticesSubtitle: "STPI देवघर केंद्र के लिए आधिकारिक बैच घोषणाएं, दस्तावेज सत्यापन की अंतिम तिथियां और अवकाश सूचनाएं।",

    faqTag: "अक्सर पूछे जाने वाले प्रश्न",
    faqTitle: "महत्वपूर्ण प्रश्न एवं उत्तर",
    faqSubtitle: "कोर्स संरचना, समय सारिणी, आवश्यक दस्तावेज एवं प्रवेश नियमों के बारे में आवश्यक जानकारी।",
    faqsTag: "अक्सर पूछे जाने वाले प्रश्न",
    faqsTitle: "महत्वपूर्ण प्रश्न एवं उत्तर",

    contactTag: "संपर्क करें",
    contactTitle: "STPI देवघर केंद्र आएं या संपर्क करें",
    contactSubtitle: "प्रवेश सहायता, बैच शेड्यूल या कोर्स संबंधी मार्गदर्शन के लिए हमारी STPI देवघर टीम से संपर्क करें।",

    applyTag: "आवेदन प्रपत्र",
    applyTitle: "ऑनलाइन नामांकन पंजीकरण",
    applySubtitle: "STPI देवघर में आगामी 3-माह के सर्टिफिकेट बैच में अपना स्थान सुरक्षित करने के लिए नीचे दिए गए फॉर्म को भरें।",
    fullName: "पूरा नाम",
    fatherName: "पिता / अभिभावक का नाम",
    mobileNumber: "मोबाइल नंबर",
    emailAddress: "ईमेल पता",
    dob: "जन्म तिथि",
    gender: "लिंग",
    address: "स्थाई / वर्तमान पता",
    city: "शहर / कस्बा",
    district: "जिला",
    state: "राज्य",
    selectCourse: "सर्टिफिकेट कोर्स का चयन करें",
    qualification: "उच्चतम शैक्षणिक योग्यता",
    termsDeclaration: "मैं पुष्टि करता/करती हूँ कि दी गई जानकारी पूर्णतः सत्य है और मैं STPI देवघर केंद्र पर कार्यालय समय में दस्तावेजों की प्रतियां जमा करने के लिए सहमत हूँ।",
    submitApplication: "नामांकन आवेदन जमा करें",

    inquireWhatsApp: "व्हाट्सएप पर जानकारी लें",
    callDesk: "हेल्पडेस्क पर कॉल करें"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('vfs_deoghar_lang');
    return saved === 'hi' || saved === 'en' ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vfs_deoghar_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: TRANSLATIONS[language]
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
