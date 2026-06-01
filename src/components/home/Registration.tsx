import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../../contexts/CMSContext';

export default function Registration() {
  const { courses, addRegistration } = useCMS();
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    phone: '',
    email: '',
    englishLevel: 'beginner',
    courseSelection: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    
    if (!formData.fullName) {
      setErrorMsg('الرجاء إدخال الاسم الكامل (Full Name)');
      setIsSubmitting(false);
      return;
    }
    if (!formData.age) {
      setErrorMsg('الرجاء إدخال العمر (Age)');
      setIsSubmitting(false);
      return;
    }
    if (!formData.phone) {
      setErrorMsg('الرجاء إدخال رقم الهاتف (Phone Number)');
      setIsSubmitting(false);
      return;
    }
    if (!formData.courseSelection) {
      setErrorMsg('الرجاء اختيار الدورة (Select Course)');
      setIsSubmitting(false);
      return;
    }

    try {
      await addRegistration(formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: '', age: '', phone: '', email: '', englishLevel: 'beginner', courseSelection: '', message: ''
        });
      }, 5000);
    } catch (err: any) {
      console.error("Submit Error:", err);
      setErrorMsg(`حدث خطأ أثناء الإرسال: ${err.message || 'الرجاء المحاولة مرة أخرى'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="register" className="py-20 px-6 bg-transparent relative">
      
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-xl overflow-hidden border border-white/50 flex flex-col lg:flex-row">
          
          {/* Left Side: Call to Action */}
          <div className="bg-brand-primary p-12 lg:p-16 text-white lg:w-5/12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-accent/20 rounded-full blur-2xl -translate-x-1/2 translate-y-1/3"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Start Your English Journey Today
              </h2>
              <p className="text-indigo-100 mb-8 leading-relaxed">
                Join our classes and unlock new opportunities. Fill out the form and we will contact you shortly to confirm your registration.
              </p>
              
              <div className="flex items-center gap-4 text-indigo-100">
                <div className="w-12 h-12 rounded-full border-2 border-indigo-300 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                </div>
                <div>
                  <div className="font-bold text-white text-lg">Fast Response</div>
                  <div className="text-sm">Within 24 hours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="p-8 lg:p-16 lg:w-7/12">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-brand-text mb-2">Registration Successful!</h3>
                <p className="text-slate-600">Thank you for registering. Miss Amina will contact you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {errorMsg && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-4">
                    {errorMsg}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Full Name *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-slate-700 transition-all font-medium" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Age *</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-slate-700 transition-all font-medium" min="6" max="99" placeholder="18" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-slate-700 transition-all font-medium" placeholder="05XX XX XX XX" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Email Option</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-slate-700 transition-all font-medium" placeholder="you@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">English Level</label>
                    <select name="englishLevel" value={formData.englishLevel} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-slate-700 transition-all font-medium appearance-none">
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="unknown">I don't know</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Select Course</label>
                    <select name="courseSelection" value={formData.courseSelection} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-slate-700 transition-all font-medium appearance-none">
                      <option value="" disabled>Choose a course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.title}>{course.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Message (Optional)</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-slate-700 transition-all font-medium resize-none" placeholder="Any questions or special notes?"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center py-4 bg-brand-text text-white font-bold rounded-xl hover:bg-brand-primary disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-md mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري الإرسال...
                    </>
                  ) : (
                    'Submit Registration'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
