import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, GraduationCap, ArrowLeft, BookOpen, Layers, Award } from 'lucide-react';
import { useCMS } from '../../contexts/CMSContext';

// Use the official Instagram profile image provided by the user
const aminaInstagramImageUrl = "https://scontent.cdninstagram.com/v/t51.82787-19/705749231_17951208918170885_2262895318284253937_n.jpg?_nc_cat=105&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=PmM_qnXZp_MQ7kNvwFExOiE&_nc_oc=AdrQ6B5ZolSZiN4f_I03-IoZh_o6n0i-9QM578p7xNmFf3wFOLBF1XyxeEnwXdkJsJ4&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=dajdDUXxX0d6b7eQ8MLKFA&_nc_ss=7f6a8&oh=00_Af8eq9ZvwLKNl4cbzjyy3aLJxp0ZE__wmX0bB3v6lhSfGQ&oe=6A2961A0";

export default function WelcomeBanner() {
  const { content } = useCMS();

  return (
    <section id="welcome-banner" className="py-12 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-24 h-24 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/70 backdrop-blur-md rounded-3xl border border-slate-100 p-8 md:p-12 shadow-xl shadow-brand-primary/5 relative overflow-hidden"
        >
          {/* Subtle decorative badges */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-primary/10 to-transparent rounded-tr-3xl rounded-bl-[100px] pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
            {/* Visual Column (Teacher Portrait) */}
            <motion.div 
              className="w-full md:w-2/5 flex flex-col items-center justify-center relative shrink-0"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="relative group/avatar">
                {/* Outer pulsing ring */}
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-brand-primary/30 to-brand-accent/30 opacity-70 blur-md group-hover/avatar:opacity-100 group-hover/avatar:scale-105 transition duration-500"></div>
                
                {/* White border card */}
                <div className="relative bg-white p-2 rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                  <img 
                    src={aminaInstagramImageUrl} 
                    alt="Miss Amina" 
                    referrerPolicy="no-referrer"
                    className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-xl transform hover:scale-[1.02] transition-transform duration-500 ease-out" 
                  />
                </div>

                {/* Overlaid tags for a premium educational platform feel */}
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-brand-primary text-white text-xs font-semibold rounded-full shadow-md whitespace-nowrap flex items-center gap-1.5 uppercase tracking-wide">
                  <Award size={14} className="text-brand-accent animate-pulse" />
                  أستاذة أمينة • Miss Amina
                </span>
              </div>
            </motion.div>

            {/* Invitation/Introduction Text Column */}
            <div className="flex-1 text-center md:text-right" dir="rtl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 text-brand-primary text-sm font-semibold rounded-full mb-5">
                <Sparkles size={16} className="text-brand-accent fill-brand-accent" />
                <span>مرحباً بكم في الأكاديمية الرسمية</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 leading-tight mb-4">
                تعلّم اللغة الإنجليزية بثقة <span className="text-brand-primary bg-gradient-to-r from-brand-primary to-blue-600 bg-clip-text text-transparent">خطوة بخطوة</span>
              </h1>

              <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed max-w-2xl">
                أهلاً بكم في عالم تعلّم اللغة الإنجليزية الممتع والمنهجي. نحن هنا لمساعدتكم في تحسين مهارات التواصل، بناء الثقة، والوصول إلى الطلاقة التامة بأحدث الأساليب التفاعلية والعملية.
              </p>

              {/* Three clear informational cards to help visitors see clearly 'رؤية واضحة' */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-right">
                <div className="p-4 bg-brand-bg/50 hover:bg-brand-bg rounded-2xl border border-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-3 mr-0 ml-auto">
                    <BookOpen size={18} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">دورات تفاعلية</h3>
                  <p className="text-xs text-slate-500 leading-normal">منهجية مبسطة تركّز على الفهم والتطبيق المباشر.</p>
                </div>

                <div className="p-4 bg-brand-bg/50 hover:bg-brand-bg rounded-2xl border border-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-3 mr-0 ml-auto">
                    <Layers size={18} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">مستويات مدروسة</h3>
                  <p className="text-xs text-slate-500 leading-normal">تصنيف منهجي دقيق يناسب المبتدئين والمحترفين.</p>
                </div>

                <div className="p-4 bg-brand-bg/50 hover:bg-brand-bg rounded-2xl border border-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/20 text-brand-accent flex items-center justify-center mb-3 mr-0 ml-auto">
                    <GraduationCap size={18} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">متابعة مستمرة</h3>
                  <p className="text-xs text-slate-500 leading-normal">دعم مخصص وتقييم دوري لضمان بلوغ أهدافك.</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a 
                  href="#courses"
                  className="px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-medium rounded-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center gap-2 group text-sm"
                >
                  <span>استكشف الدورات المتاحة</span>
                  <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
                </a>

                <a 
                  href="#registration"
                  className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 transition-all text-sm"
                >
                  سجّل معنا الآن
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
