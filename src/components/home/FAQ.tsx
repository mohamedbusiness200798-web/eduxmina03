import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "كيف يمكنني التسجيل؟",
    a: "يمكنك التسجيل بسهولة عبر ملء استمارة التسجيل في هذا الموقع. اختر الدورة المناسبة، أدخل بياناتك، وسنتواصل معك لتأكيد مكانك."
  },
  {
    q: "كيف أعرف مستواي في اللغة الإنجليزية؟",
    a: "إذا لم تكن متأكداً من مستواك، يمكنك اختيار 'لا أعرف' في استمارة التسجيل. سنجري لك تقييماً بسيطاً لتحديد المستوى المناسب لك في الحصة الأولى لضمان توجيهك للقسم الصحيح."
  },
  {
    q: "هل الدروس حضورية أم عبر الإنترنت (أونلاين)؟",
    a: "تُقام الدروس بشكل أساسي حضورياً في مركزنا بولاية الأغواط لتوفير أفضل تجربة تعليمية تفاعلية. وقد تتوفر خيارات الدروس عبر الإنترنت لبعض البرامج المحددة."
  },
  {
    q: "كم يستغرق من الوقت لتحسين لغتي الإنجليزية؟",
    a: "يعتمد التقدم على التزام الطالب ومستوى الدورة. ولكن، يلاحظ معظم طلابنا تحسناً ملحوظاً في التحدث والثقة بالنفس خلال الـ 8 إلى 12 أسبوعاً الأولى."
  },
  {
    q: "هل يتم توفير الكتب والمواد التعليمية؟",
    a: "نعم، نُوفر لطلابنا جميع المواد التعليمية اللازمة، بما في ذلك أوراق العمل، والموارد الرقمية، والتمارين التفاعلية المصممة خصيصاً لتناسب كل مستوى."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 px-6 bg-transparent relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-text mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600">الأسئلة الأكثر شيوعاً حول الدراسة معنا.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand-primary/30 shadow-sm"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-right focus:outline-none"
                dir="rtl"
              >
                <span className="font-bold text-brand-text pl-8">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${openIndex === index ? 'bg-brand-primary text-white rotate-180' : 'bg-brand-bg text-slate-500'}`}>
                  <ChevronDown size={18} />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 mt-2 pt-4 text-right" dir="rtl">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
