import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="hero-gradient text-white relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="container-custom relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="propaganda-banner mb-8 inline-block" data-aos="fade-down">
            {t('hero.criticalThreshold')}
          </div>
          
          <h1 
            className="font-montserrat font-black text-5xl md:text-8xl mb-8 text-shadow-red tracking-tight leading-tight"
            data-aos="fade-up"
          >
            <span className="text-primary-500">BEYOND</span><span className="text-white">2C</span>
          </h1>
          
          <div className="bg-secondary-500 p-4 mb-8 inline-block transform -skew-x-6 border-l-4 border-primary-500" data-aos="fade-up" data-aos-delay="200">
            <p className="text-xl md:text-3xl font-bold text-accent-500 transform skew-x-6">
              {t('hero.tomorrowTooLate')}
            </p>
          </div>
          
          <p 
            className="text-lg md:text-xl mb-12 text-accent-500 max-w-3xl mx-auto border-diagonal"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {t('hero.description')}
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <Link href="/take-action">
              <Button variant="primary" size="large" className="w-full sm:w-auto px-8 py-4 text-lg font-bold tracking-wider">
                {t('nav.takeAction')}
              </Button>
            </Link>
            
            <Link href="/impact-map">
              <Button variant="outline" size="large" className="w-full sm:w-auto px-8 py-4 text-lg font-bold tracking-wider">
                {t('nav.impactMap')}
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-8" data-aos="fade-up" data-aos-delay="800">
            <div className="text-center">
              <div className="number-callout">2°C</div>
              <div className="text-sm uppercase font-bold mt-1">{t('hero.criticalThresholdLabel')}</div>
            </div>
            <div className="text-center">
              <div className="number-callout">7</div>
              <div className="text-sm uppercase font-bold mt-1">{t('hero.yearsLeft')}</div>
            </div>
            <div className="text-center">
              <div className="number-callout">Z</div>
              <div className="text-sm uppercase font-bold mt-1">{t('hero.generation')}</div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className="text-center mt-16"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <div className="animate-bounce">
            <svg 
              className="w-6 h-6 mx-auto text-white opacity-75" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
