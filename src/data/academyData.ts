import { Course, GalleryItem, Testimonial, SuccessStory, BatchStudentAchievement, ReelVideoItem, Notice, FAQItem, LeadershipProfile, FacultyProfile, TeachingApproachItem } from '../types';
import {
  academicWorkshopSeminar,
  auditoriumCeremonyEvent,
  classroomSmartLecture,
  communicationSkillsTraining,
  culturalEventGathering,
  gunjanSirSecondaryAction,
  outdoorStudyVisit,
  practicalMockPresentation,
  pramodSirMentor,
  pramodSirSecondaryAction,
  ramsewakGunjanHead,
  raushanMishraMentor,
  stpiDeogharConvocationGroup,
  studentInteractionCohort,
  travelHospitalityCourse,
  vfsCertificateAward,
  vfsReceptionDeskStudents,
} from '../assets';

// ============================================================================
// OFFICIAL CONTACT CONFIGURATION (Easily update official contact details here)
// ============================================================================
export const CONTACT_CONFIG = {
  PHONE_NUMBER: "+91 94311 76637",
  PHONE_DISPLAY: "+91 94311 76637", 
  EMAIL_ADDRESS: "admissions.deoghar@vfsglobalacademy.org",
  WHATSAPP_NUMBER: "+919431176637",
  WHATSAPP_MESSAGE_PREFILL: "Hello VFS Global Academy STPI Deoghar, I would like to inquire about admission for the Certificate Courses.",
  GOOGLE_MAP_LOCATION: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.5749216012484!2d86.64724897536254!3d24.51739597815598!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x39f116503c202029%3A0x6b4f74d0e57ba5c4!2sSoftware%20Technology%20Parks%20of%20India%20(STPI)%20Deoghar!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin",
  GOOGLE_MAPS_LINK: "https://maps.google.com/?q=STPI+Deoghar+Jasidih+Jharkhand",
  
  // Official Centre Address
  ACADEMY_NAME: "VFS Global Academy",
  OPERATED_UNDER: "VFS Global Foundation",
  CENTRE_LOCATION: "STPI, Deoghar (Jasidih), Jharkhand, India",
  FULL_ADDRESS_LINES: [
    "STPI, Deoghar (Jasidih)",
    "Near Swagat Petrol Pump",
    "Manikpur Road, After Railway Over Bridge",
    "Jasidih, Deoghar, Jharkhand, PIN - 814142"
  ],
  OFFICE_TIMINGS: "10:00 AM – 01:00 PM (Monday to Sunday)",
  DOCUMENT_SUBMISSION_TIMING: "10:00 AM to 01:00 PM",
  
  // Social Media Links
  SOCIAL_LINKS: {
    LINKEDIN: "https://www.linkedin.com/company/vfs-global",
    INSTAGRAM: "https://www.instagram.com/vfsglobalofficial",
    FACEBOOK: "https://www.facebook.com/vfsglbl"
  }
};

// ============================================================================
// LEADERSHIP & FACULTY DETAILS
// ============================================================================
export const CENTRE_HEAD_INFO: LeadershipProfile = {
  name: "RAMSEWAK GUNJAN",
  role: "Centre Head",
  organization: "VFS Global Foundation",
  location: "STPI, Deoghar (Jasidih)",
  bio: "Ramsewak Gunjan serves as the Centre Head and plays an important role in guiding students throughout their learning and professional development journey. With a strong focus on communication, confidence and personality development, he encourages students to become confident, expressive and professionally prepared individuals. His mentorship focuses on helping students develop the essential skills required for academic, professional and public environments.",
  guidanceAreas: [
    "Communication Skills",
    "Voice Modulation",
    "Stage Speaking",
    "Public Speaking",
    "Presentation Skills",
    "Professional Grooming",
    "Dressing Sense",
    "Body Language",
    "Overall Expression",
    "Personality Development"
  ],
  quote: "Confidence is built through knowledge, communication and the courage to express yourself.",
  image: ramsewakGunjanHead,
  secondaryImage: gunjanSirSecondaryAction,
  secondaryImageTitle: "Executive Leadership & Mentorship"
};

export const FACULTY_MEMBERS: FacultyProfile[] = [
  {
    id: "faculty-pramod",
    name: "PRAMOD SIR",
    role: "English Communication & Personality Development Mentor",
    organization: "VFS Global Foundation",
    location: "STPI, Deoghar (Jasidih)",
    bio: "Pramod Sir is dedicated to helping students strengthen their English communication skills and develop confidence for professional and personal growth. His interactive teaching approach encourages students to speak confidently, participate actively and improve their overall communication abilities. Through practical activities, communication exercises and interactive sessions, students are encouraged to overcome hesitation and express themselves with confidence.",
    expertiseAreas: [
      "English Speaking",
      "Spoken English",
      "Self Introduction",
      "Interview Preparation",
      "Group Discussion",
      "Modern English Communication",
      "Conversation Practice",
      "Public Speaking",
      "Drama Preparation",
      "Presentation Skills",
      "Confidence Building",
      "Personality Development"
    ],
    quote: "Effective communication is not only about speaking English—it is about expressing yourself with confidence and clarity.",
    image: pramodSirMentor,
    secondaryImage: pramodSirSecondaryAction,
    secondaryImageTitle: "Interactive Spoken English & Classroom Drills",
    badge: "English & Personality Mentor"
  },
  {
    id: "faculty-raushan",
    name: "RAUSHAN MISHRA",
    role: "Technician & Travel–Hospitality Mentor",
    organization: "VFS Global Foundation",
    location: "STPI, Deoghar (Jasidih)",
    bio: "Raushan Mishra is a dedicated professional and mentor who supports students in developing practical knowledge of the travel, tourism and hospitality industry. His guidance helps learners understand important aspects of tourism, hospitality services, customer experience and professional opportunities within the industry. His teaching approach focuses on practical understanding and industry-oriented learning.",
    expertiseAreas: [
      "Travel & Tourism Fundamentals",
      "Travel Management",
      "Hotel Management",
      "Event Management",
      "Tourist Guiding",
      "Tourism Awareness",
      "Food & Hospitality",
      "Customer Service",
      "Passport Awareness",
      "Visa Process Awareness"
    ],
    quote: "Knowledge becomes meaningful when it prepares learners for real-world opportunities.",
    image: raushanMishraMentor,
    badge: "Travel & Hospitality Specialist"
  }
];

export const TEACHING_APPROACHES: TeachingApproachItem[] = [
  {
    id: 1,
    title: "PRACTICAL LEARNING",
    titleHi: "व्यावहारिक शिक्षण",
    description: "Learning through practical activities and real-world examples.",
    descriptionHi: "व्यावहारिक गतिविधियों और वास्तविक दुनिया के उदाहरणों के माध्यम से सीखना।",
    icon: "GraduationCap"
  },
  {
    id: 2,
    title: "COMMUNICATION DEVELOPMENT",
    titleHi: "संचार कौशल विकास",
    description: "Building confidence and effective communication skills.",
    descriptionHi: "आत्मविश्वास और प्रभावी संचार कौशल का निर्माण करना।",
    icon: "MessageSquare"
  },
  {
    id: 3,
    title: "PERSONALITY DEVELOPMENT",
    titleHi: "व्यक्तित्व विकास",
    description: "Improving presentation, grooming and professional behaviour.",
    descriptionHi: "प्रस्तुति, ग्रूमिंग और पेशेवर व्यवहार में सुधार।",
    icon: "Sparkles"
  },
  {
    id: 4,
    title: "INDUSTRY KNOWLEDGE",
    titleHi: "उद्योग ज्ञान एवं जागरूकता",
    description: "Providing awareness of travel, tourism and hospitality opportunities.",
    descriptionHi: "यात्रा, पर्यटन और आतिथ्य अवसरों की संपूर्ण व्यावहारिक समझ।",
    icon: "Compass"
  },
  {
    id: 5,
    title: "CAREER PREPARATION",
    titleHi: "करियर व साक्षात्कार तैयारी",
    description: "Preparing students for interviews, group discussions and professional opportunities.",
    descriptionHi: "साक्षात्कार, समूह चर्चा और पेशेवर अवसरों के लिए विद्यार्थियों को तैयार करना।",
    icon: "Briefcase"
  },
  {
    id: 6,
    title: "CONFIDENCE BUILDING",
    titleHi: "आत्मविश्वास निर्माण",
    description: "Helping students overcome hesitation and express themselves confidently.",
    descriptionHi: "छात्रों को झिझक दूर करने और आत्मविश्वास से खुद को व्यक्त करने में मदद करना।",
    icon: "ShieldCheck"
  }
];

export const COMMITMENT_GOALS = [
  {
    title: "Learn New Skills",
    titleHi: "नए कौशल सीखें",
    desc: "Industry-aligned competencies in hospitality, ticketing, and communicative fluency."
  },
  {
    title: "Build Confidence",
    titleHi: "आत्मविश्वास बनाएं",
    desc: "Overcome hesitation through stage presence, group interactions, and public speaking."
  },
  {
    title: "Improve Communication",
    titleHi: "संचार में सुधार करें",
    desc: "Master spoken English, active listening, voice modulation, and clear articulation."
  },
  {
    title: "Develop Professional Personality",
    titleHi: "व्यावसायिक व्यक्तित्व विकसित करें",
    desc: "Learn corporate grooming, dressing etiquette, body language, and professional manners."
  },
  {
    title: "Explore Career Opportunities",
    titleHi: "करियर के अवसरों को जानें",
    desc: "Gain deep awareness of hospitality, airline ground staff, customer relations, and travel desks."
  },
  {
    title: "Prepare for the Future",
    titleHi: "भविष्य के लिए तैयार हों",
    desc: "Rigorous mock interview drills, CV preparation, and professional readiness workshops."
  }
];

// Backwards compatibility alias
export const LEADERSHIP_INFO = {
  name: CENTRE_HEAD_INFO.name,
  role: CENTRE_HEAD_INFO.role,
  organization: CENTRE_HEAD_INFO.organization,
  location: CENTRE_HEAD_INFO.location,
  quote: CENTRE_HEAD_INFO.quote,
  bio: CENTRE_HEAD_INFO.bio,
  image: CENTRE_HEAD_INFO.image
};

// ============================================================================
// COURSES OFFERED
// ============================================================================
export const COURSES_DATA: Course[] = [
  {
    id: "travel-hospitality",
    title: "Travel & Hospitality Management",
    subtitle: "Learn | Explore | Excel in the Global Travel & Hospitality Industry",
    duration: "3 Months",
    classesPerWeek: "3 Days Per Week",
    timings: "10:00 AM to 01:00 PM (Fri, Sat, Sun)",
    batchSize: 30,
    featured: true,
    description: "Develop comprehensive knowledge and professional skills related to the travel and hospitality industry. Designed to prepare students for career opportunities in hotels, airlines, travel agencies, tourism boards, and guest relationship management.",
    topics: [
      "Introduction to Travel Industry",
      "Hospitality Services & Front Office Operations",
      "Customer Service & Guest Relationship Management",
      "Tourism Basics & Destination Planning",
      "Professional Behaviour & Corporate Etiquette",
      "Career Development & Industry Readiness"
    ],
    careerOutcomes: [
      "Travel Consultant / Executive",
      "Hospitality Customer Service Associate",
      "Front Desk & Guest Relations Officer",
      "Airline / Airport Ground Support Associate",
      "Tour Coordinator & Operations Assistant"
    ],
    image: travelHospitalityCourse
  },
  {
    id: "language-communication",
    title: "Language & Communication",
    subtitle: "Speak with Confidence | Communicate with Impact | Succeed in Career",
    duration: "3 Months",
    classesPerWeek: "3 Days Per Week",
    timings: "10:00 AM to 01:00 PM (Fri, Sat, Sun)",
    batchSize: 30,
    featured: true,
    description: "Improve professional communication and language skills essential for high-impact personal and career development. Build fluent spoken English, master corporate presentations, ace job interviews, and develop unshakeable professional confidence.",
    topics: [
      "Spoken Communication & Pronunciation Skills",
      "Professional & Business Correspondence",
      "Personality Development & Body Language",
      "Job Interview Preparation & Mock Interviews",
      "Workplace Communication & Team Collaboration",
      "Confidence Building & Stage Presence"
    ],
    careerOutcomes: [
      "Corporate Client Representative",
      "Public Relations & Communications Assistant",
      "Executive Support & Front-Facing Specialist",
      "Customer Experience Representative",
      "Professional Service Coordinator"
    ],
    image: communicationSkillsTraining
  }
];

// ============================================================================
// SCHEDULE SPECIFICATIONS
// ============================================================================
export const SCHEDULE_DATA = {
  duration: "3 Months",
  classesPerWeek: "3 Days Per Week",
  timing: "10:00 AM to 01:00 PM",
  days: ["Friday", "Saturday", "Sunday"],
  dailyDuration: "3 Hours",
  totalWeeklyHours: "9 Hours",
  mode: "Offline Classroom Training & Practical Labs at STPI Deoghar"
};

// ============================================================================
// ADMISSION SPECIFICATIONS & REQUIRED DOCUMENTS
// ============================================================================
export const ADMISSION_DATA = {
  status: "Admissions Open for 2026 Batches",
  maxBatchSize: 30,
  currentBatchCapacityPercent: 78,
  seatsRemaining: 7,
  submissionTiming: "10:00 AM to 01:00 PM",
  requiredDocuments: [
    {
      title: "Class 10 Mark Sheet",
      description: "Xerox copy of Class 10 (Matriculation) mark sheet for age and academic verification.",
      mandatory: true
    },
    {
      title: "Class 12 Mark Sheet",
      description: "Xerox copy of Class 12 (Intermediate/Higher Secondary) mark sheet.",
      mandatory: true
    },
    {
      title: "Higher Qualification Mark Sheets",
      description: "Graduation / Diploma mark sheets (if applicable for advanced consideration).",
      mandatory: false
    },
    {
      title: "Aadhaar Card",
      description: "Clear xerox copy of Aadhaar Card for identity and address proof.",
      mandatory: true
    }
  ],
  importantNotice: "Maximum 30 students can be accommodated in one batch. Students beyond the batch capacity may be shifted to the next batch. Early document submission is strongly advised."
};

// ============================================================================
// WHY CHOOSE US
// ============================================================================
export const WHY_CHOOSE_CARDS = [
  {
    title: "Industry-Oriented Training",
    description: "Curriculum designed to align directly with real hospitality, travel operations, and corporate communication expectations.",
    icon: "Briefcase"
  },
  {
    title: "Certificate Courses",
    description: "Prestigious certificate awarded upon successful completion by VFS Global Foundation to validate your skill set.",
    icon: "Award"
  },
  {
    title: "Experienced Trainers",
    description: "Learn from seasoned educators and industry mentors providing personalized guidance and continuous feedback.",
    icon: "Users"
  },
  {
    title: "Practical Learning",
    description: "Hands-on roleplays, simulation exercises, presentations, and group discussions rather than purely theoretical lectures.",
    icon: "BookOpen"
  },
  {
    title: "Communication Skill Development",
    description: "Intensive focus on spoken English fluency, workplace etiquette, body language, and interview presentation skills.",
    icon: "MessageSquare"
  },
  {
    title: "Career-Focused Education",
    description: "Tailored preparation with resume building, mock interviews, and confidence enhancement for global career pathways.",
    icon: "TrendingUp"
  }
];

// ============================================================================
// GALLERY ITEMS (Representing authentic academy photographs across categories)
// ============================================================================
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "STPI Deoghar Grand Convocation & Batch Cohort",
    category: "Campus Life",
    description: "Graduating students and faculty holding official certificates outside the Software Technology Parks of India (STPI) facility in Jasidih, Deoghar.",
    image: stpiDeogharConvocationGroup,
    location: "STPI Deoghar Campus",
    featured: true
  },
  {
    id: "gal-2",
    title: "Official Certificate Distribution Ceremony",
    category: "Certificate Distribution",
    description: "Distinguished guests and Centre Head awarding Certificate of Completion in Travel & Hospitality Management in front of VFS Global Foundation banner.",
    image: vfsCertificateAward,
    location: "VFS Academy Hall",
    featured: true
  },
  {
    id: "gal-3",
    title: "Grand Auditorium Stage Seminar & Cultural Event",
    category: "Student Activities",
    description: "Academy mentors and students participating in a dynamic seminar and cultural stage presentation event.",
    image: auditoriumCeremonyEvent,
    location: "Main Auditorium Hall",
    featured: true
  },
  {
    id: "gal-4",
    title: "Smart Classroom Lecture & Interactive Mentorship",
    category: "Training Sessions",
    description: "Students actively engaged during an interactive weekend training session focusing on hospitality management and communication modules with Centre Head.",
    image: classroomSmartLecture,
    location: "STPI Smart Training Room",
    featured: true
  },
  {
    id: "gal-5",
    title: "VFS Global Academy Front Reception Desk",
    category: "Campus Life",
    description: "Batch students, centre coordinators, and Centre Head gathered at the official VFS Global Academy front desk at STPI Deoghar.",
    image: vfsReceptionDeskStudents,
    location: "VFS Academy Reception",
    featured: true
  },
  {
    id: "gal-6",
    title: "Student Practical Mock Presentation & Drills",
    category: "Student Activities",
    description: "Students practicing stage confidence, mock interviews, public presentation, and communication drills in front of smart display.",
    image: practicalMockPresentation,
    location: "Interactive Training Hall",
    featured: true
  },
  {
    id: "gal-7",
    title: "Student Celebrations & Cultural Gathering",
    category: "Student Activities",
    description: "Vibrant gathering of students and mentors celebrating batch milestones and cultural cohesion.",
    image: culturalEventGathering,
    location: "STPI Activity Area",
    featured: false
  },
  {
    id: "gal-8",
    title: "Academic Workshop & Interactive Seminar",
    category: "Training Sessions",
    description: "In-depth practical seminar covering modern travel operations, customer service protocols, and spoken English.",
    image: academicWorkshopSeminar,
    location: "Seminar Hall",
    featured: false
  },
  {
    id: "gal-9",
    title: "Classroom Cohort & Active Study Session",
    category: "Training Sessions",
    description: "Dedicated weekend batch students in ergonomic chairs with notebooks engaged in communicative English and professional development.",
    image: communicationSkillsTraining,
    location: "Smart Training Room 2",
    featured: false
  },
  {
    id: "gal-10",
    title: "Interactive Student Peer Interaction & Group Work",
    category: "Student Activities",
    description: "Collaborative peer group activities helping learners build teamwork, problem solving, and articulate conversation.",
    image: studentInteractionCohort,
    location: "Discussion Lounge",
    featured: false
  },
  {
    id: "gal-11",
    title: "Travel & Hospitality Practical Workshop",
    category: "Training Sessions",
    description: "Hands-on customer service simulation and front desk guest interaction exercises conducted at the academy.",
    image: travelHospitalityCourse,
    location: "Hospitality Lab",
    featured: false
  },
  {
    id: "gal-12",
    title: "Outdoor Educational Field Study & Excursion",
    category: "Educational Visits",
    description: "Faculty mentor and student cohort on a field study and team-building educational visit in Deoghar.",
    image: outdoorStudyVisit,
    location: "Deoghar Nature Excursion",
    featured: false
  }
];

// ============================================================================
// TESTIMONIALS (Easily editable student feedback)
// ============================================================================
export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-sujit",
    name: "Sujit Kumar",
    role: "Certified Graduate",
    course: "Travel & Hospitality & Communication",
    batch: "2025-26 Batch",
    quote: "Completing the Travel & Hospitality Management and Language & Communication courses at VFS Global Academy, STPI Deoghar has been transformative. Under the constant mentorship of Gunjan Sir, Raushan Sir, and Pramod Sir, my spoken English, public presentation, and personality development reached a whole new level. Their practical industry insights gave me the real-world skills and confidence needed for accelerated career growth.",
    rating: 5,
    avatarBg: "bg-blue-600 text-white"
  },
  {
    id: "test-aman",
    name: "Aman Roy",
    role: "Certified Graduate",
    course: "Travel & Hospitality & Communication",
    batch: "2025-26 Batch",
    quote: "My experience with VFS Global Academy at STPI Deoghar was truly enriching. The personalized guidance from Gunjan Sir on leadership and etiquette, Raushan Sir on hospitality operations, and Pramod Sir on communication and confidence-building helped me overcome my hesitation. This comprehensive training equipped me with robust professional skills and strong industry readiness.",
    rating: 5,
    avatarBg: "bg-emerald-600 text-white"
  },
  {
    id: "test-1",
    name: "Nitish Kumar",
    role: "Certified Graduate",
    course: "Travel & Hospitality Management",
    batch: "2025-26 Batch",
    quote: "This training helped me improve my communication and professional confidence. The mentors at STPI Deoghar gave practical insights into tourism and hospitality that gave me the courage to apply for top service roles.",
    rating: 5,
    avatarBg: "bg-indigo-600 text-white"
  },
  {
    id: "test-2",
    name: "Megha Kumari",
    role: "Certified Graduate",
    course: "Language & Communication",
    batch: "2025-26 Batch",
    quote: "The course provided valuable knowledge about professional communication and interview readiness. Earlier I was hesitant to speak publicly, but the weekend presentations and mock interviews transformed my fluency.",
    rating: 5,
    avatarBg: "bg-purple-600 text-white"
  },
  {
    id: "test-3",
    name: "Babli Kumari",
    role: "Certificate Recipient",
    course: "Travel & Hospitality Management",
    batch: "2025-26 Batch",
    quote: "The 3-month weekend schedule was very convenient and the training environment at STPI Jasidih is state-of-the-art. I learned how customer service, front office etiquette, and guest handling work in real companies.",
    rating: 5,
    avatarBg: "bg-amber-600 text-white"
  },
  {
    id: "test-4",
    name: "Abhimanyu Kumar",
    role: "Certified Graduate",
    course: "Language & Communication",
    batch: "2025-26 Batch",
    quote: "Under the leadership of Centre Head Ramsewak Sir, every student receives personal attention. The practical activities and educational visit made learning engaging and highly memorable.",
    rating: 5,
    avatarBg: "bg-sky-600 text-white"
  }
];

// ============================================================================
// SUCCESS STORIES & CASE STUDY SNAPSHOTS (Alumni roles & corporate placements)
// ============================================================================
export const SUCCESS_STORIES_DATA: SuccessStory[] = [
  {
    id: "story-sujit",
    name: "Sujit Kumar",
    currentRole: "Airport Experience Associate",
    company: "IndiGo Airlines",
    location: "Ranchi / Kolkata Hub",
    category: "Aviation",
    course: "Travel, Hospitality & Communication",
    batch: "2025-26 Batch",
    challenge: "Faced hesitation during spontaneous English conversations and had no previous exposure to commercial airport operations.",
    transformation: "Underwent intensive boarding simulation drills, public speaking practice with Pramod Sir, and passenger protocol training from Gunjan Sir & Raushan Sir.",
    currentImpact: "Successfully coordinates terminal check-ins, boarding gates, and special passenger assistance with exceptional customer commendations.",
    keyMetric: "Airlines Selection",
    avatarBg: "bg-blue-600 text-white",
    rating: 5,
    highlights: [
      "Boarding Gate Operations & Passenger Assistance",
      "Spoken English & Aviation Fluency Mastery",
      "IndiGo Hub Customer Commendation Winner"
    ],
    videoClip: {
      title: "Sujit Kumar • IndiGo Airlines Ground Staff Journey",
      duration: "1:15 min",
      platform: "instagram",
      url: "https://www.instagram.com/reel/Dd9nQOaTRkG/?stkn=MWU2cXRwdHY1dDJ1dg==",
      embedUrl: "https://www.instagram.com/reel/Dd9nQOaTRkG/embed/",
      caption: "Airport terminal customer assistance and boarding simulation training at STPI Deoghar."
    }
  },
  {
    id: "story-aman",
    name: "Aman Roy",
    currentRole: "Guest Relations Executive",
    company: "The Leela Palaces, Hotels & Resorts",
    location: "Bengaluru",
    category: "Hospitality",
    course: "Travel & Hospitality Management",
    batch: "2025-26 Batch",
    challenge: "Struggled with corporate posture, grooming standards, and confidence when speaking before senior interview panels.",
    transformation: "Mastered 5-star hospitality guest journey standards, executive communication, and customer conflict resolution at the STPI Deoghar centre.",
    currentImpact: "Promoted to full Executive within 6 months; currently leads VIP guest arrivals, front-desk concierges, and luxury lounge operations.",
    keyMetric: "Fast-Track Promotion",
    avatarBg: "bg-emerald-600 text-white",
    rating: 5,
    highlights: [
      "VIP Arrival Protocol & Executive Concierge",
      "5-Star Luxury Etiquette & Front Desk Operations",
      "Promoted to Full Executive in First 6 Months"
    ],
    videoClip: {
      title: "Aman Roy • 5-Star Luxury Hospitality & Guest Relations",
      duration: "0:52 min",
      platform: "facebook",
      url: "https://www.facebook.com/share/v/1Dw2fGvSim/",
      embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fv%2F1Dw2fGvSim%2F&show_text=0",
      caption: "Overcoming stage hesitation and achieving front desk excellence at The Leela Palaces."
    }
  },
  {
    id: "story-priya",
    name: "Priya Kumari",
    currentRole: "Visa Operations Officer",
    company: "VFS Global Services",
    location: "Kolkata Application Centre",
    category: "Visa & Consular",
    course: "Travel & Hospitality Management",
    batch: "2025 Batch",
    challenge: "Lacked knowledge of international consular workflows, biometric data capture compliance, and cross-cultural customer etiquette.",
    transformation: "Completed dedicated modules in international document verification, applicant data security, and courteous consular customer handling.",
    currentImpact: "Processes 70+ visa applicants daily with zero compliance errors while maintaining exceptional applicant satisfaction ratings.",
    keyMetric: "Zero-Defect Verification",
    avatarBg: "bg-purple-600 text-white",
    rating: 5,
    highlights: [
      "Biometric Enrollment & Identity Security",
      "Consular SLA Compliance (70+ Files Daily)",
      "Zero-Error Cross-Verification Quality Record"
    ],
    videoClip: {
      title: "Priya Kumari • International Consular Operations",
      duration: "1:20 min",
      platform: "facebook",
      url: "https://www.facebook.com/share/v/1VT2xq78p6/",
      embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fv%2F1VT2xq78p6%2F&show_text=0",
      caption: "Biometric enrollment standards and compliance training in practice."
    }
  },
  {
    id: "story-nitish",
    name: "Nitish Kumar",
    currentRole: "Front Office Specialist",
    company: "ITC Hotels (Welcomhotel)",
    location: "Bhubaneswar / Ranchi",
    category: "Hospitality",
    course: "Travel & Hospitality Management",
    batch: "2025-26 Batch",
    challenge: "Nervous in group discussions and lacked practical understanding of hotel front-office software and guest check-in systems.",
    transformation: "Completed 36+ hours of interactive mock interview panels, hotel front-desk roleplays, and English fluency masterclasses.",
    currentImpact: "Directs hotel lobby reception, coordinates banquet corporate check-ins, and handles guest inquiries with confidence and poise.",
    keyMetric: "Campus Placement Selection",
    avatarBg: "bg-indigo-600 text-white",
    rating: 5,
    highlights: [
      "Guest Check-In & PMS Software Management",
      "Banquet Corporate Concierge Supervision",
      "Selected Directly from STPI Campus Drive"
    ],
    videoClip: {
      title: "Nitish Kumar • Hotel Front Office & Guest Check-In",
      duration: "0:45 min",
      platform: "instagram",
      url: "https://www.instagram.com/reel/Dd9nQOaTRkG/?stkn=MWU2cXRwdHY1dDJ1dg==",
      embedUrl: "https://www.instagram.com/reel/Dd9nQOaTRkG/embed/",
      caption: "Direct campus placement story at ITC Hotels from STPI Deoghar."
    }
  },
  {
    id: "story-megha",
    name: "Megha Kumari",
    currentRole: "Travel Desk & Holiday Consultant",
    company: "MakeMyTrip",
    location: "Patna Regional Centre",
    category: "Travel & Tourism",
    course: "Language & Communication",
    batch: "2025-26 Batch",
    challenge: "Felt nervous during telephone client negotiations and lacked knowledge of domestic and international tourism itineraries.",
    transformation: "Learned tourism packaging essentials, phone etiquette, and customer journey planning through weekend practical sessions at STPI Jasidih.",
    currentImpact: "Designs customized spiritual and leisure travel packages across Eastern India with a 98% client satisfaction rate.",
    keyMetric: "98% Client Satisfaction",
    avatarBg: "bg-amber-600 text-white",
    rating: 5,
    highlights: [
      "Spiritual & Heritage Tourism Itinerary Design",
      "Corporate Telephone Negotiations & Sales",
      "Maintained 98% Positive Client Review Score"
    ],
    videoClip: {
      title: "Megha Kumari • Tour and Travel Itinerary Planning",
      duration: "1:05 min",
      platform: "facebook",
      url: "https://www.facebook.com/share/p/1DqpegSRXY/",
      embedUrl: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fp%2F1DqpegSRXY%2F&show_text=true",
      caption: "Mastering practical tourism workflows and client communication."
    }
  },
  {
    id: "story-rahul",
    name: "Rahul Anand",
    currentRole: "Aviation Ground Operations Associate",
    company: "Air India SATS (AISATS)",
    location: "Delhi IGI Airport (T3)",
    category: "Aviation",
    course: "Travel, Hospitality & Communication",
    batch: "2025-26 Batch",
    challenge: "Struggled with spoken English accents and lacked clarity on international flight transit procedures and team communication.",
    transformation: "Underwent focused phonetics training, rapid-response communication drills, and ramp coordination teamwork exercises under Pramod Sir.",
    currentImpact: "Coordinates flight baggage handling, transit passenger clearances, and on-time turnarounds at Terminal 3.",
    keyMetric: "IGI Airport Placement",
    avatarBg: "bg-sky-600 text-white",
    rating: 5,
    highlights: [
      "Terminal 3 Ramp Clearance Coordination",
      "Baggage Turnaround & Time-Critical Handover",
      "Radio Phonetics & Multi-Agency Communication"
    ],
    videoClip: {
      title: "Rahul Anand • Delhi Airport T3 Ground Operations",
      duration: "0:58 min",
      platform: "instagram",
      url: "https://www.instagram.com/reel/Dd9nQOaTRkG/?stkn=MWU2cXRwdHY1dDJ1dg==",
      embedUrl: "https://www.instagram.com/reel/Dd9nQOaTRkG/embed/",
      caption: "Airport ramp transit procedures and radio communication training."
    }
  }
];

// ============================================================================
// BATCH 7 — STUDENT ACHIEVEMENTS
// ============================================================================
export const BATCH_7_ACHIEVEMENTS_DATA: BatchStudentAchievement[] = [
  {
    id: "batch7-01",
    number: "01",
    name: "Nitish SHA",
    role: "Founder",
    organization: "Baidyanath Media Agency",
    fullDesignation: "Founder — Baidyanath Media Agency",
    story: "At VFS Global Academy, Nitish developed skills in professional communication, presentation, client interaction and business understanding. He later founded Baidyanath Media Agency, helping businesses grow through Digital Marketing, AI-powered solutions and Offline Marketing, with a focus on professional brand promotion, stronger visibility and business growth.",
    batch: "Batch 7",
    initials: "NS",
    avatarBg: "from-blue-600 to-indigo-700",
    domain: "Digital & Offline Marketing"
  },
  {
    id: "batch7-02",
    number: "02",
    name: "Sujeet Gupta",
    role: "Founder",
    organization: "Sakshi Trends",
    fullDesignation: "Founder — Sakshi Trends",
    story: "Sujeet developed communication, customer interaction and professional presentation skills at VFS Global Academy. He used these skills to move towards entrepreneurship and is now the Founder of Sakshi Trends, building his own business venture.",
    batch: "Batch 7",
    initials: "SG",
    avatarBg: "from-emerald-600 to-teal-700",
    domain: "Entrepreneurship & Retail"
  },
  {
    id: "batch7-03",
    number: "03",
    name: "Abhimanyu Kumar",
    role: "Founder",
    organization: "Edu Care Jagat",
    fullDesignation: "Founder — Edu Care Jagat",
    story: "Abhimanyu developed professional communication and people-interaction skills at VFS Global Academy. He later pursued his interest in education and founded Edu Care Jagat, focused on education, guidance and learning support for students.",
    batch: "Batch 7",
    initials: "AK",
    avatarBg: "from-amber-600 to-orange-700",
    domain: "Education & Guidance"
  },
  {
    id: "batch7-04",
    number: "04",
    name: "Megha Sahi",
    role: "Mentor & Guide",
    organization: "DIA IAS Academy",
    fullDesignation: "Mentor & Guide — DIA IAS Academy",
    story: "Megha developed communication, interpersonal and professional interaction skills at VFS Global Academy. She carried these skills into the field of mentoring and is now working as a Mentor & Guide at DIA IAS Academy, supporting students through guidance and learning.",
    batch: "Batch 7",
    initials: "MS",
    avatarBg: "from-purple-600 to-pink-700",
    domain: "Mentoring & Education"
  },
  {
    id: "batch7-05",
    number: "05",
    name: "Kaushal Singh",
    role: "English Speaking Member",
    organization: "US Consultation",
    fullDesignation: "English Speaking Member — US Consultation",
    story: "Kaushal focused on English speaking, communication and professional conversation skills during his learning journey at VFS Global Academy. He developed greater confidence in professional communication and is now associated with US Consultation as an English Speaking Member.",
    batch: "Batch 7",
    initials: "KS",
    avatarBg: "from-cyan-600 to-blue-700",
    domain: "Professional Communication"
  },
  {
    id: "batch7-06",
    number: "06",
    name: "Aman Pathak",
    role: "Managing Director",
    organization: "Annapurna Sweets & Namkeen",
    fullDesignation: "Managing Director — Annapurna Sweets & Namkeen",
    story: "Aman developed an understanding of hospitality, customer interaction and professional communication at VFS Global Academy. He carried these skills into business management and is now the Managing Director of Annapurna Sweets & Namkeen, handling business and management responsibilities.",
    batch: "Batch 7",
    initials: "AP",
    avatarBg: "from-rose-600 to-red-700",
    domain: "Business & Hospitality Management"
  },
  {
    id: "batch7-07",
    number: "07",
    name: "Kalyan Sharma",
    role: "Fire Safety Officer",
    organization: "AIIMS Deoghar",
    fullDesignation: "Fire Safety Officer — AIIMS Deoghar",
    story: "Kalyan developed professional communication, workplace discipline and team interaction skills at VFS Global Academy. He continued his professional journey in the safety sector and is now working as a Fire Safety Officer at AIIMS Deoghar.",
    batch: "Batch 7",
    initials: "KS",
    avatarBg: "from-orange-600 to-amber-700",
    domain: "Safety & Healthcare Sector"
  },
  {
    id: "batch7-08",
    number: "08",
    name: "Aman Roy",
    role: "Civil Engineer",
    organization: "Internship Completed at AIIMS Deoghar",
    fullDesignation: "Civil Engineer — Internship Completed at AIIMS Deoghar",
    story: "Aman developed professional communication, workplace interaction and professional confidence at VFS Global Academy. He continued his journey in engineering, completed an internship at AIIMS Deoghar, and is pursuing his career as a Civil Engineer.",
    batch: "Batch 7",
    initials: "AR",
    avatarBg: "from-indigo-600 to-violet-700",
    domain: "Civil Engineering"
  }
];

// ============================================================================
// VIDEO SHOWCASE REELS
// ============================================================================
export const REEL_VIDEOS_DATA: ReelVideoItem[] = [
  {
    id: "fb-reel-01",
    cardNumber: "Facebook Reel 01",
    title: "Facebook Reel 01",
    titleHi: "फेसबुक रील 01",
    subtitle: "VFS Global Academy Deoghar • Campus Training & Career Readiness",
    subtitleHi: "वीएफएस ग्लोबल अकादमी देवघर • परिसर प्रशिक्षण एवं करियर तैयारी",
    platform: "facebook",
    platformLabel: "Facebook Video",
    url: "https://www.facebook.com/share/v/1Dw2fGvSim/",
    embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fv%2F1Dw2fGvSim%2F&show_text=0&autoplay=1",
    thumbnail: vfsReceptionDeskStudents,
    description: "Official Facebook video from VFS Global Academy, STPI Deoghar showcasing classroom learning, communication sessions, and student development.",
    tags: ["#VFSGlobalAcademy", "#FacebookReel", "#STPIDeoghar", "#CareerTraining"],
    stats: {
      views: "24.2K",
      likes: "1.1K",
      shares: "285"
    },
    duration: "1:02"
  },
  {
    id: "fb-reel-02",
    cardNumber: "Facebook Reel 02",
    title: "Facebook Reel 02",
    titleHi: "फेसबुक रील 02",
    subtitle: "Aviation & Hospitality Masterclass • Student Reel",
    subtitleHi: "एविएशन व हॉस्पिटैलिटी मास्टरक्लास • छात्र रील",
    platform: "instagram",
    platformLabel: "Official Reel",
    url: "https://www.instagram.com/reel/Dd9nQOaTRkG/?stkn=MWU2cXRwdHY1dDJ1dg==",
    embedUrl: "https://www.instagram.com/reel/Dd9nQOaTRkG/embed/",
    thumbnail: practicalMockPresentation,
    description: "Official Reel featuring student mock interviews, executive grooming standards, and spoken English confidence coaching at STPI Deoghar.",
    tags: ["#VFSGlobalAcademy", "#Reel02", "#AviationTraining", "#STPIDeoghar"],
    stats: {
      views: "18.4K",
      likes: "1.4K",
      shares: "320"
    },
    duration: "0:45"
  }
];

// ============================================================================
// NOTICE BOARD ANNOUNCEMENTS
// ============================================================================
export const NOTICES_DATA: Notice[] = [
  {
    id: "not-1",
    title: "Admissions Open for Certificate Courses (Batch 2026)",
    date: "Current Session",
    category: "Admission",
    isNew: true,
    isUrgent: true,
    summary: "Admissions are currently underway for Travel & Hospitality Management and Language & Communication courses at STPI Deoghar.",
    details: [
      "Seats are strictly limited to 30 candidates per batch to ensure personalized guidance.",
      "Eligible candidates should submit Xerox copies of Class 10, Class 12, Aadhaar card, and higher qualification certificates.",
      "Document submission timing: 10:00 AM to 01:00 PM at the academy centre."
    ]
  },
  {
    id: "not-2",
    title: "Class Schedule & Weekend Timings Notice",
    date: "Updated Weekly",
    category: "Schedule",
    isNew: true,
    isUrgent: false,
    summary: "Regular weekend batches are conducted on Friday, Saturday, and Sunday from 10:00 AM to 01:00 PM.",
    details: [
      "Total daily training duration: 3 Hours (10:00 AM - 01:00 PM).",
      "Punctuality is mandatory. Students must carry their academy notebooks and identity tags.",
      "Practical workshops and mock presentations are scheduled during Sunday sessions."
    ]
  },
  {
    id: "not-3",
    title: "Batch Capacity Limit & Overflow Policy",
    date: "Important Advisory",
    category: "General",
    isNew: false,
    isUrgent: false,
    summary: "A maximum of 30 students can be accommodated in one batch. Students beyond batch capacity will be allotted the upcoming batch.",
    details: [
      "Early document submission guarantees enrollment in the current active batch.",
      "Verification is conducted on a first-come, first-served basis during morning desk hours."
    ]
  }
];

// ============================================================================
// FAQS (All 6 official questions + answers)
// ============================================================================
export const FAQS_DATA: FAQItem[] = [
  {
    id: 1,
    question: "What is the course duration?",
    answer: "The course duration is 3 months for both the Certificate Course in Travel & Hospitality Management and Language & Communication."
  },
  {
    id: 2,
    question: "How many days are classes conducted?",
    answer: "Classes are conducted 3 days per week."
  },
  {
    id: 3,
    question: "What are the general class days?",
    answer: "Generally classes are conducted on Friday, Saturday and Sunday."
  },
  {
    id: 4,
    question: "What is the class timing?",
    answer: "Class timing is 10:00 AM to 01:00 PM (3 hours per training day)."
  },
  {
    id: 5,
    question: "What documents are required for admission?",
    answer: "Required documents include Xerox Copy of Class 10 Mark Sheet, Xerox Copy of Class 12 Mark Sheet, Higher Qualification Mark Sheets (if applicable), and Xerox Copy of Aadhaar Card."
  },
  {
    id: 6,
    question: "How many students can join a batch?",
    answer: "A maximum of 30 students can generally be accommodated in one batch. Students beyond the batch capacity may be shifted to the next batch."
  }
];
