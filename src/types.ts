export interface Course {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  classesPerWeek: string;
  timings: string;
  description: string;
  topics: string[];
  careerOutcomes: string[];
  batchSize: number;
  featured?: boolean;
  image?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Training Sessions' | 'Certificate Distribution' | 'Student Activities' | 'Educational Visits' | 'Campus Life';
  description: string;
  image: string;
  location?: string;
  date?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  course: string;
  batch: string;
  quote: string;
  rating: number;
  avatarBg?: string;
}

export interface SuccessStoryVideoClip {
  title: string;
  duration?: string;
  platform: 'instagram' | 'facebook' | 'youtube' | 'mp4';
  url: string;
  embedUrl?: string;
  thumbnail?: string;
  caption?: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  currentRole: string;
  company: string;
  location?: string;
  category: 'Aviation' | 'Hospitality' | 'Visa & Consular' | 'Travel & Tourism';
  course: string;
  batch: string;
  challenge: string;
  transformation: string;
  currentImpact: string;
  keyMetric?: string;
  avatarBg?: string;
  rating?: number;
  highlights?: string[];
  videoClip?: SuccessStoryVideoClip;
}

export interface BatchStudentAchievement {
  id: string;
  number: string; // "01" through "08"
  name: string;
  role: string;
  organization: string;
  fullDesignation: string; // "Founder — Baidyanath Media Agency"
  story: string;
  storyHi?: string;
  batch: string; // e.g. "Batch 7"
  initials: string;
  avatarUrl?: string;
  avatarBg: string;
  domain: string;
}

export interface ReelVideoItem {
  id: string;
  cardNumber: string; // e.g. "VIDEO 01", "VIDEO 02"
  title: string;
  titleHi?: string;
  subtitle: string;
  subtitleHi?: string;
  platform: 'instagram' | 'facebook' | 'mp4';
  platformLabel: string;
  url: string;
  embedUrl?: string;
  thumbnail: string;
  description: string;
  tags: string[];
  stats: {
    views?: string;
    likes?: string;
    shares?: string;
  };
  duration?: string;
  isUploadable?: boolean;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'Admission' | 'Schedule' | 'Exam & Cert' | 'General';
  isNew?: boolean;
  isUrgent?: boolean;
  summary: string;
  details: string[];
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface LeadershipProfile {
  name: string;
  role: string;
  organization: string;
  location: string;
  bio: string;
  guidanceAreas: string[];
  quote: string;
  image: string;
  secondaryImage?: string;
  secondaryImageTitle?: string;
}

export interface FacultyProfile {
  id: string;
  name: string;
  role: string;
  organization: string;
  location: string;
  bio: string;
  expertiseAreas: string[];
  quote: string;
  image: string;
  secondaryImage?: string;
  secondaryImageTitle?: string;
  badge?: string;
}

export interface TeachingApproachItem {
  id: number;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
}

export interface ApplicationFormData {
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
  highestQualification: string;
  selectedCourse: string;
  markSheetFile: File | null;
  markSheetFileName?: string;
  aadhaarFile: File | null;
  aadhaarFileName?: string;
  agreedToTerms: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  courseInterest: string;
  message: string;
}
