import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useCMS } from '../../contexts/CMSContext';
import { Sparkles, Star, CheckCircle, GraduationCap, Award, BookOpen, ArrowUpLeft, Users, Clock } from 'lucide-react';

// Use the exact local Instagram avatar and high-quality brown hijab image
import aminaInstagramProfile from '../../assets/images/teacher_amina_instagram_profile.jpg';
import aminaBrownHijab from '../../assets/images/teacher_amina_real_brown_hijab_1780717175166.png';

const defaultTeacherImage = aminaBrownHijab;

export default function Hero() {
  const { content } = useCMS();

  const getCleanImage = (url: string | undefined): string => {
    if (!url) return defaultTeacherImage;
    if (url.startsWith('data:image/')) return url;
    const lower = url.toLowerCase();
    if (
      lower.includes('miss-amina.jpg') ||
      lower.includes('teacher_amina_1780714114607') ||
      ((lower.includes('fbcdn') || lower.includes('instagram')) && !lower.includes('oe=6a29d220'))
    ) {
      return defaultTeacherImage;
    }
    return url;
  };

  const [imgSrc, setImgSrc] = useState<string>(getCleanImage(content.aboutImage));

  useEffect(() => {
    setImgSrc(getCleanImage(content.aboutImage));
  }, [content.aboutImage]);

  return (
    <section id="hero" className="relative py-12 lg:py-20 px-6 overflow-hidden">
      {/* Dynamic ambient backgrounds */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-48 h-48 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16" dir="rtl">
          
          {/* Right Column: High Quality Text Content, RTL Oriented */}
          <div className="flex-1 text-center lg:text-right">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs sm:text-sm mb-6 border border-brand-primary/20 backdrop-blur-sm shadow-sm"
            >
              <Sparkles size={16} className="text-brand-accent fill-brand-accent animate-pulse" />
              <span>مرحباً بكم في الأكاديمية الرسمية للأستاذة أمينة</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-brand-text leading-[1.2] mb-6 tracking-tight"
            >
              طريقك السريع لتحدّث <br />
              <span className="text-brand-primary bg-gradient-to-r from-brand-primary to-blue-600 bg-clip-text text-transparent font-bold">الإنكليزية كالمحترفين</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              نقدم لكم برامج تعليمية مخصصة ومصممة بدقة لتلبية احتياجاتكم. تعلموا اللغة الإنجليزية بثقة، وارفعوا مهاراتكم الحوارية والمهنية بأسلوب عملي يحقق طموحاتكم.
            </motion.p>
            
            {/* Quick Benefits Highlights */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-xl mx-auto lg:mx-0 text-right"
            >
              <div className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-md rounded-xl border border-slate-100 shadow-sm">
                <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                  <Users size={16} />
                </span>
                <span className="text-xs font-bold text-slate-700">مجموعات وفئات منظمة</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-md rounded-xl border border-slate-100 shadow-sm">
                <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <Clock size={16} />
                </span>
                <span className="text-xs font-bold text-slate-700">توقيت مرن ومناسب</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-md rounded-xl border border-slate-100 shadow-sm">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                  <CheckCircle size={16} />
                </span>
                <span className="text-xs font-bold text-slate-700">متابعة شخصية ودعم</span>
              </div>
            </motion.div>
            
            {/* Call To Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a 
                href="#registration" 
                className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl shadow-lg shadow-brand-primary/20 hover:bg-opacity-90 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2 group"
              >
                <span>سجّل معنا الآن مجاناً</span>
                <ArrowUpLeft size={16} className="transform group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
              </a>
              <a 
                href="#courses" 
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm font-bold rounded-2xl transition-all text-sm flex items-center justify-center"
              >
                استكشف الدورات والمستويات
              </a>
            </motion.div>
          </div>

          {/* Left Column: Visual Portrait Card (Gives visual prominence on mobile/desktop) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-5/12 flex justify-center relative"
          >
            <div className="relative w-full max-w-[360px] md:max-w-[400px]">
              {/* Double Decorative Ring with Gradient */}
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-brand-primary to-brand-accent opacity-20 blur-lg animate-pulse" />
              <div className="absolute -inset-1 rounded-[2.25rem] bg-gradient-to-tr from-brand-primary via-blue-200 to-brand-accent opacity-50" />
              
              {/* Image Container with high quality frame */}
              <div className="relative bg-white p-3 rounded-[2.15rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-50">
                  <img 
                    src={imgSrc} 
                    onError={() => {
                      console.log("Image load failed, falling back to local Instagram profile image");
                      setImgSrc(aminaInstagramProfile);
                    }} 
                    referrerPolicy="no-referrer" 
                    alt="Miss Amina" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  />
                  
                  {/* Status Overlay */}
                  <span className="absolute bottom-3 right-3 px-3.5 py-1.5 bg-brand-primary/95 backdrop-blur-sm text-white text-xs font-semibold rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wide">
                    <Award size={14} className="text-brand-accent animate-spin-slow" />
                    <span>أستاذة أمينة • Miss Amina</span>
                  </span>
                </div>

                {/* Sub-card highlights under the avatar */}
                <div className="pt-4 pb-1 grid grid-cols-2 gap-3 divide-x divide-slate-100 divide-x-reverse" dir="rtl">
                  <div className="text-center">
                    <div className="text-xl font-bold text-brand-primary">100%</div>
                    <div className="text-[10px] text-slate-500 font-bold">نسبة نجاح تامة</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-brand-accent text-yellow-500 flex items-center justify-center gap-0.5">
                      <span>5.0</span>
                      <Star size={14} className="fill-brand-accent text-brand-accent" />
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold">تقييم الطلاب</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge Left: Interactive Methodology */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-12 -left-8 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20"
                dir="rtl"
              >
                <div className="w-9 h-9 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shadow-inner">
                  <BookOpen size={18} />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-800">منهاج تفاعلي</div>
                  <div className="text-[9px] text-slate-400 font-bold">بمستويات مدروسة</div>
                </div>
              </motion.div>
              
              {/* Floating Badge Right: Expert Native Approach */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-16 -right-6 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20"
                dir="rtl"
              >
                <div className="w-9 h-9 bg-brand-secondary text-brand-primary rounded-xl flex items-center justify-center shadow-inner">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <div className="font-bold text-xs text-brand-text">أستاذة معتمدة</div>
                  <div className="text-[9px] text-slate-400 font-bold">متابعة شخصية</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
