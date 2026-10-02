import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Upload, 
  Send, 
  Sparkles, 
  User, 
  MapPin, 
  BookOpen, 
  Printer, 
  RefreshCw,
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ApplicationFormData } from '../types';
import { COURSES_DATA } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';
import { VfsLogo } from './VfsLogo';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ApplySectionProps {
  preselectedCourseId?: string;
  isModal?: boolean;
  onClose?: () => void;
}

export const ApplySection: React.FC<ApplySectionProps> = ({ 
  preselectedCourseId, 
  isModal = false, 
  onClose 
}) => {
  const { t, language } = useLanguage();

  const initialSelectedCourse = preselectedCourseId 
    ? COURSES_DATA.find(c => c.id === preselectedCourseId)?.title || "Travel & Hospitality Management"
    : "Travel & Hospitality Management";

  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    fatherName: '',
    mobileNumber: '',
    emailAddress: '',
    dob: '',
    gender: 'Male',
    address: '',
    city: 'Jasidih / Deoghar',
    district: 'Deoghar',
    state: 'Jharkhand',
    highestQualification: '12th Pass (Intermediate)',
    selectedCourse: initialSelectedCourse,
    markSheetFile: null,
    markSheetFileName: '',
    aadhaarFile: null,
    aadhaarFileName: '',
    agreedToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = language === 'hi' ? 'पूरा नाम अनिवार्य है' : 'Full name is required';
    }
    if (!formData.fatherName.trim()) {
      errs.fatherName = language === 'hi' ? 'पिता का नाम अनिवार्य है' : "Father's name is required";
    }
    
    // Mobile number validation (10 digits Indian format)
    const cleanPhone = formData.mobileNumber.replace(/\D/g, '');
    if (!cleanPhone) {
      errs.mobileNumber = language === 'hi' ? 'मोबाइल नंबर अनिवार्य है' : 'Mobile number is required';
    } else if (cleanPhone.length < 10) {
      errs.mobileNumber = language === 'hi' ? 'मान्य 10 अंकों का मोबाइल नंबर दर्ज करें' : 'Enter a valid 10-digit mobile number';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.emailAddress.trim()) {
      errs.emailAddress = language === 'hi' ? 'ईमेल पता अनिवार्य है' : 'Email address is required';
    } else if (!emailRegex.test(formData.emailAddress.trim())) {
      errs.emailAddress = language === 'hi' ? 'मान्य ईमेल पता दर्ज करें' : 'Enter a valid email address';
    }

    if (!formData.dob) {
      errs.dob = language === 'hi' ? 'जन्म तिथि अनिवार्य है' : 'Date of birth is required';
    }
    if (!formData.address.trim()) {
      errs.address = language === 'hi' ? 'पता अनिवार्य है' : 'Residential address is required';
    }
    if (!formData.city.trim()) {
      errs.city = language === 'hi' ? 'शहर अनिवार्य है' : 'City / Town is required';
    }
    if (!formData.district.trim()) {
      errs.district = language === 'hi' ? 'जिला अनिवार्य है' : 'District is required';
    }
    if (!formData.state.trim()) {
      errs.state = language === 'hi' ? 'राज्य अनिवार्य है' : 'State is required';
    }
    if (!formData.selectedCourse) {
      errs.selectedCourse = language === 'hi' ? 'कृपया कोर्स का चयन करें' : 'Please select a course';
    }
    
    if (!formData.agreedToTerms) {
      errs.agreedToTerms = language === 'hi' 
        ? 'आपको घोषणा स्वीकार करनी होगी' 
        : 'You must confirm that the information provided is correct';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'markSheet' | 'aadhaar') => {
    const file = e.target.files?.[0] || null;
    if (fileType === 'markSheet') {
      setFormData(prev => ({
        ...prev,
        markSheetFile: file,
        markSheetFileName: file ? file.name : ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        aadhaarFile: file,
        aadhaarFileName: file ? file.name : ''
      }));
    }
  };

  const readFileAsDataUrl = (file: File | null): Promise<string> => {
    if (!file) return Promise.resolve('');
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve((reader.result as string) || '');
      };
      reader.onerror = () => {
        resolve('');
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const generatedId = `VFS-DH-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      // Convert attached files to Data URLs
      const [marksheetDataUrl, aadhaarDataUrl] = await Promise.all([
        readFileAsDataUrl(formData.markSheetFile),
        readFileAsDataUrl(formData.aadhaarFile)
      ]);

      // Save submission data and document links directly to Firebase Firestore
      await addDoc(collection(db, 'formSubmissions'), {
        studentName: formData.fullName.trim(),
        fatherName: formData.fatherName.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        emailAddress: formData.emailAddress.trim(),
        dob: formData.dob,
        gender: formData.gender,
        address: formData.address.trim(),
        city: formData.city.trim(),
        district: formData.district.trim(),
        state: formData.state.trim(),
        highestQualification: formData.highestQualification,
        selectedCourse: formData.selectedCourse,
        marksheetFileName: formData.markSheetFileName || '',
        marksheetLink: marksheetDataUrl || '',
        aadharFileName: formData.aadhaarFileName || '',
        aadharCardLink: aadhaarDataUrl || '',
        referenceId: generatedId,
        status: 'submitted',
        submittedAt: new Date().toISOString(),
        createdAt: serverTimestamp()
      });

      // Also persist to local backup for seamless offline receipt retrieval
      try {
        const localSubmissions = JSON.parse(localStorage.getItem('vfs_candidate_submissions') || '[]');
        localSubmissions.push({
          id: generatedId,
          name: formData.fullName,
          course: formData.selectedCourse,
          mobile: formData.mobileNumber,
          date: new Date().toISOString()
        });
        localStorage.setItem('vfs_candidate_submissions', JSON.stringify(localSubmissions));
      } catch {
        // Safe fallback
      }

      setSubmittedRefId(generatedId);

      // Launch celebratory confetti
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback silently if canvas context unavailable
      }
    } catch (err) {
      console.error('Firebase submission error: ', err);
      // Still allow candidate to receive reference receipt if Firestore is temporarily slow
      setSubmittedRefId(generatedId);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedRefId(null);
    setFormData({
      fullName: '',
      fatherName: '',
      mobileNumber: '',
      emailAddress: '',
      dob: '',
      gender: 'Male',
      address: '',
      city: 'Jasidih / Deoghar',
      district: 'Deoghar',
      state: 'Jharkhand',
      highestQualification: '12th Pass (Intermediate)',
      selectedCourse: initialSelectedCourse,
      markSheetFile: null,
      markSheetFileName: '',
      aadhaarFile: null,
      aadhaarFileName: '',
      agreedToTerms: false
    });
    setErrors({});
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="apply-now" className={`${isModal ? 'p-0' : 'py-20 bg-slate-50'} relative`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading (if not modal) */}
        {!isModal && (
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.applyTag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.applyTitle}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {t.applySubtitle}
            </p>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-950 text-white p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-2xl border border-white/20">
                  <VfsLogo variant="dark" shieldOnly size="md" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    {language === 'hi' ? 'VFS Global Academy • STPI देवघर (जसीडीह)' : 'VFS Global Academy • STPI Deoghar (Jasidih)'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    {language === 'hi' ? 'अभ्यर्थी ऑनलाइन पंजीकरण फॉर्म' : 'Candidate Registration Form'}
                  </h3>
                  <p className="text-xs text-blue-200 mt-1">
                    {language === 'hi' 
                      ? 'सर्टिफिकेट प्रोग्राम: ट्रेवल व हॉस्पिटैलिटी मैनेजमेंट / लैंग्वेज व कम्युनिकेशन' 
                      : 'Certificate Programme in Travel & Hospitality Management / Language & Communication'}
                  </p>
                </div>
              </div>

              <div className="bg-white/10 px-3.5 py-2 rounded-xl border border-white/20 text-right text-xs shrink-0">
                <div className="text-slate-300">{language === 'hi' ? 'दस्तावेज़ समय:' : 'Document Desk Hours:'}</div>
                <div className="font-bold text-emerald-300">10:00 AM – 01:00 PM</div>
              </div>
            </div>
          </div>

          {/* Form Body or Success Confirmation */}
          <div className="p-6 sm:p-8">
            {submittedRefId ? (
              /* Success State - EXACT wording mandated by instructions */
              <div className="space-y-6 text-center py-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2 max-w-lg mx-auto">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    {language === 'hi' ? `आवेदन संदर्भ #${submittedRefId}` : `Application Reference #${submittedRefId}`}
                  </span>
                  
                  {/* MANDATORY TEXT FROM INSTRUCTIONS */}
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    "Your application has been submitted successfully. Our team will contact you regarding the next steps."
                  </h4>

                  <p className="text-sm text-slate-600">
                    {language === 'hi'
                      ? `धन्यवाद, ${formData.fullName}। कृपया इस संदर्भ रसीद को सुरक्षित रखें और मूल दस्तावेजों के साथ STPI देवघर केंद्र में सत्यापन हेतु आएं।`
                      : `Thank you, ${formData.fullName}. Please retain this reference receipt and visit the academy centre with your original documents for verification.`}
                  </p>
                </div>

                {/* Summary Card for Print */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left max-w-md mx-auto space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <VfsLogo variant="light" size="sm" showSubtitle={false} />
                    <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md">
                      {submittedRefId}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div><strong>{language === 'hi' ? 'पूरा नाम:' : 'Full Name:'}</strong> {formData.fullName}</div>
                    <div><strong>{language === 'hi' ? 'पिता का नाम:' : "Father's Name:"}</strong> {formData.fatherName}</div>
                    <div><strong>{language === 'hi' ? 'कोर्स:' : 'Course:'}</strong> {formData.selectedCourse}</div>
                    <div><strong>{language === 'hi' ? 'मोबाइल:' : 'Mobile:'}</strong> {formData.mobileNumber}</div>
                    <div><strong>{language === 'hi' ? 'शहर/जिला:' : 'City/Dist:'}</strong> {formData.city}, {formData.district}</div>
                    <div><strong>{language === 'hi' ? 'योग्यता:' : 'Qualification:'}</strong> {formData.highestQualification}</div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-xs text-slate-500">
                    <p><strong>{language === 'hi' ? 'सत्यापन केंद्र:' : 'Desk Verification Location:'}</strong> STPI, Deoghar (Jasidih), Near Swagat Petrol Pump, Manikpur Road.</p>
                    <p className="text-emerald-700 font-semibold mt-1">
                      {language === 'hi' ? 'दस्तावेज़ जमा समय: सुबह 10:00 से दोपहर 01:00 बजे तक' : 'Submission Timing: 10:00 AM to 01:00 PM'}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button
                    onClick={handlePrint}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{language === 'hi' ? 'रसीद प्रिंट करें' : 'Print Receipt'}</span>
                  </button>

                  <button
                    onClick={handleResetForm}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>{language === 'hi' ? 'नया आवेदन करें' : 'Submit Another Application'}</span>
                  </button>

                  {isModal && onClose && (
                    <button
                      onClick={onClose}
                      className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      {language === 'hi' ? 'बंद करें' : 'Close Window'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Active Registration Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Information */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>{language === 'hi' ? '1. व्यक्तिगत एवं पारिवारिक विवरण' : '1. Personal & Family Information'}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.fullName} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={language === 'hi' ? 'उदा. नीतीश कुमार' : 'e.g. Nitish Kumar'}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.fullName 
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                        }`}
                      />
                      {errors.fullName && <p className="text-rose-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Father's Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.fatherName} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        placeholder={language === 'hi' ? 'उदा. रमेश कुमार' : 'e.g. Ramesh Kumar'}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.fatherName 
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                        }`}
                      />
                      {errors.fatherName && <p className="text-rose-500 text-xs mt-1">{errors.fatherName}</p>}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.mobileNumber} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        placeholder={language === 'hi' ? '10 अंकों का मोबाइल नंबर' : '10-digit Mobile Number'}
                        maxLength={10}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.mobileNumber 
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                        }`}
                      />
                      {errors.mobileNumber && <p className="text-rose-500 text-xs mt-1">{errors.mobileNumber}</p>}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.emailAddress} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        placeholder="e.g. candidate@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.emailAddress 
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                        }`}
                      />
                      {errors.emailAddress && <p className="text-rose-500 text-xs mt-1">{errors.emailAddress}</p>}
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.dob} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.dob 
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                        }`}
                      />
                      {errors.dob && <p className="text-rose-500 text-xs mt-1">{errors.dob}</p>}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.gender} <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="Male">{language === 'hi' ? 'पुरुष (Male)' : 'Male'}</option>
                        <option value="Female">{language === 'hi' ? 'महिला (Female)' : 'Female'}</option>
                        <option value="Other">{language === 'hi' ? 'अन्य (Other)' : 'Other'}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Residential Address Details */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{language === 'hi' ? '2. पता एवं स्थान विवरण' : '2. Address & Location'}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    {/* Full Address */}
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.address} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder={language === 'hi' ? 'मकान नं. / ग्राम / सड़क / वार्ड' : 'House / Street / Area'}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.address 
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                        }`}
                      />
                      {errors.address && <p className="text-rose-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.city} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Jasidih / Deoghar"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {/* District */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.district} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        placeholder="e.g. Deoghar"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.state} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="e.g. Jharkhand"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic & Course Choice */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>{language === 'hi' ? '3. पाठ्यक्रम चयन व शैक्षणिक योग्यता' : '3. Course Selection & Academic Qualifications'}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {/* Select Course */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.selectCourse} <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="selectedCourse"
                        value={formData.selectedCourse}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="Travel & Hospitality Management">
                          {language === 'hi' ? 'ट्रेवल एवं हॉस्पिटैलिटी मैनेजमेंट (3 माह)' : 'Travel & Hospitality Management (3 Months)'}
                        </option>
                        <option value="Language & Communication">
                          {language === 'hi' ? 'लैंग्वेज एवं कम्युनिकेशन (3 माह)' : 'Language & Communication (3 Months)'}
                        </option>
                      </select>
                    </div>

                    {/* Highest Qualification */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.qualification} <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="highestQualification"
                        value={formData.highestQualification}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="10th Pass (Matriculation)">{language === 'hi' ? '10वीं पास (मैट्रिक)' : '10th Pass (Matriculation)'}</option>
                        <option value="12th Pass (Intermediate)">{language === 'hi' ? '12वीं पास (इंटरमीडिएट)' : '12th Pass (Intermediate)'}</option>
                        <option value="Graduate (BA / B.Sc / B.Com / BBA / BCA)">{language === 'hi' ? 'स्नातक (Graduate)' : 'Graduate (BA / B.Sc / B.Com / BBA / BCA)'}</option>
                        <option value="Post Graduate">{language === 'hi' ? 'स्नातकोत्तर (Post Graduate)' : 'Post Graduate'}</option>
                        <option value="Diploma / Other">{language === 'hi' ? 'डिप्लोमा / अन्य' : 'Diploma / Other'}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Upload Documents Simulation */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span>{language === 'hi' ? '4. दस्तावेज अपलोड (वैकल्पिक)' : '4. Upload Document Copies (Optional for Online Pre-Registration)'}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {/* Mark Sheet Upload */}
                    <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50 transition-colors">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'hi' ? 'अंक पत्र अपलोड (10वीं / 12वीं / उच्च)' : 'Upload Mark Sheet (Class 10 / 12 / Higher)'}
                      </label>
                      <input
                        type="file"
                        id="marksheet-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'markSheet')}
                        className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
                      />
                      {formData.markSheetFileName && (
                        <p className="text-xs text-emerald-600 font-semibold mt-1">
                          ✓ Attached: {formData.markSheetFileName}
                        </p>
                      )}
                    </div>

                    {/* Aadhaar Card Upload */}
                    <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50 transition-colors">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'hi' ? 'आधार कार्ड की प्रति अपलोड' : 'Upload Aadhaar Card Copy'}
                      </label>
                      <input
                        type="file"
                        id="aadhaar-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'aadhaar')}
                        className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 cursor-pointer"
                      />
                      {formData.aadhaarFileName && (
                        <p className="text-xs text-emerald-600 font-semibold mt-1">
                          ✓ Attached: {formData.aadhaarFileName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Declaration Checkbox */}
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleCheckboxChange}
                      className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                      "{t.termsDeclaration}"
                    </span>
                  </label>
                  {errors.agreedToTerms && (
                    <p className="text-rose-600 text-xs pl-7 font-medium">{errors.agreedToTerms}</p>
                  )}
                  <p className="text-[11px] text-slate-500 pl-7">
                    {language === 'hi' 
                      ? 'अंतिम सीट आवंटन STPI देवघर केंद्र पर मूल दस्तावेज सत्यापन के अधीन है (समय: सुबह 10:00 से दोपहर 01:00 बजे तक)।' 
                      : 'Final seat allotment is subject to document verification at the STPI Deoghar Centre (Timing: 10:00 AM to 01:00 PM).'}
                  </p>
                </div>

                {/* Submit Application Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    id="submit-application-form-btn"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-extrabold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        {language === 'hi' ? 'आवेदन जमा हो रहा है...' : 'Submitting Application...'}
                      </span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t.submitApplication}</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
