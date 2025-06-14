import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      question: t('faq.question1'),
      answer: t('faq.answer1'),
    },
    {
      question: t('faq.question2'),
      answer: t('faq.answer2'),
    },
    {
      question: t('faq.question3'),
      answer: t('faq.answer3'),
    },
    {
      question: t('faq.question4'),
      answer: t('faq.answer4'),
    },
    {
      question: t('faq.question5'),
      answer: t('faq.answer5'),
    },
    {
      question: t('faq.question6'),
      answer: t('faq.answer6'),
    },
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-secondary-700">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 
            className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-accent-500"
            data-aos="fade-up"
          >
            <span className="text-gradient">{t('faq.title')}</span>
          </h2>
          <p 
            className="text-lg md:text-xl text-accent-500 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="card mb-4"
              data-aos="fade-up"
              data-aos-delay={300 + index * 100}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left p-6 flex items-center justify-between hover:bg-secondary-600 transition-colors duration-200"
              >
                <h3 className="font-montserrat font-semibold text-lg text-accent-500 pr-4">
                  {item.question}
                </h3>
                <div className={`transform transition-transform duration-200 flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  <svg 
                    className="w-6 h-6 text-primary-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-secondary-500 pt-4">
                    <p className="text-accent-500 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div 
            className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <h3 className="font-montserrat font-bold text-2xl mb-4 text-white">
              💬 {t('faq.ctaTitle')}
            </h3>
            <p className="text-white mb-6 opacity-90">
              {t('faq.ctaDescription')}
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-white text-primary-500 font-bold py-3 px-8 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
            >
              {t('common.contactUs')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
