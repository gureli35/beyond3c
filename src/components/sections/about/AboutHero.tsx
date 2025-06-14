import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const AboutHero: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="hero-gradient text-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="propaganda-banner mb-8 inline-block" data-aos="fade-down">
            {t('about.mission')}
          </div>
          
          <h1 
            className="font-montserrat font-black text-5xl md:text-7xl mb-8 text-shadow-red tracking-tight"
            data-aos="fade-up"
          >
            {t('about.whoAreWe')}
          </h1>
          
          <p 
            className="text-xl md:text-2xl mb-10 text-accent-500 leading-relaxed diagonal-border"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t('about.subtitle')}
          </p>
          
          <div 
            className="propaganda-box text-left transform skew-x-0"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <blockquote className="text-lg md:text-xl text-accent-500 font-bold leading-relaxed">
              {t('about.missionStatement')}
            </blockquote>
            <cite className="block mt-4 text-accent-500 font-semibold">
              — Beyond2C
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
