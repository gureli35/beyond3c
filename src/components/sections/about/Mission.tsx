import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Mission: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="section-padding bg-secondary-500">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-accent-500">
              {t('about.mission')}
            </h2>
            <p className="text-lg md:text-xl text-accent-500 mb-8 leading-relaxed">
              {t('about.missionDescription')}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2 text-accent-500">{t('about.goal1.title')}</h3>
                  <p className="text-accent-500">
                    {t('about.goal1.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2 text-accent-500">{t('about.goal2.title')}</h3>
                  <p className="text-accent-500">
                    {t('about.goal2.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2 text-accent-500">{t('about.goal3.title')}</h3>
                  <p className="text-accent-500">
                    {t('about.goal3.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div data-aos="fade-left">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-secondary-600 rounded-lg border border-primary-500">
                <div className="text-4xl font-bold text-primary-500 mb-2">2°C</div>
                <div className="text-accent-500 font-medium">{t('about.stats.criticalThreshold')}</div>
              </div>
              <div className="text-center p-6 bg-secondary-600 rounded-lg border border-primary-500">
                <div className="text-4xl font-bold text-primary-500 mb-2">2030</div>
                <div className="text-accent-500 font-medium">{t('about.stats.targetYear')}</div>
              </div>
              <div className="text-center p-6 bg-secondary-600 rounded-lg border border-primary-500">
                <div className="text-4xl font-bold text-primary-500 mb-2">81</div>
                <div className="text-accent-500 font-medium">{t('about.stats.cityScope')}</div>
              </div>
              <div className="text-center p-6 bg-secondary-600 rounded-lg border border-primary-500">
                <div className="text-4xl font-bold text-primary-500 mb-2">Gen Z</div>
                <div className="text-accent-500 font-medium">{t('about.stats.targetAudience')}</div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary-500 rounded-lg text-white">
              <h3 className="font-montserrat font-bold text-xl mb-4 flex items-center">
                🎯 {t('about.visionTitle')}
              </h3>
              <p className="leading-relaxed">
                {t('about.visionDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
