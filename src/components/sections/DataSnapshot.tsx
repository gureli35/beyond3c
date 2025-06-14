import React from 'react';
import Card from '@/components/ui/Card';
import { useLanguage } from '@/context/LanguageContext';

interface ClimateStats {
  temperature: string;
  emissions: string;
  timeLeft: string;
  actions: string;
}

const DataSnapshot: React.FC = () => {
  const { t, language } = useLanguage();
  
  const stats: ClimateStats = {
    temperature: '+1.1°C',
    emissions: '36.3 Gt',
    timeLeft: language === 'tr' ? '7 yıl' : '7 years',
    actions: '2,847',
  };

  const statCards = [
    {
      title: t('dataSnapshot.globalTemperature'),
      value: stats.temperature,
      description: t('dataSnapshot.comparedTo'),
      trend: 'up',
      color: 'text-red-600',
    },
    {
      title: t('dataSnapshot.annualCO2'),
      value: stats.emissions,
      description: t('dataSnapshot.globalTotal'),
      trend: 'up',
      color: 'text-orange-600',
    },
    {
      title: t('dataSnapshot.timeRemaining'),
      value: stats.timeLeft,
      description: t('dataSnapshot.atCurrentRate'),
      trend: 'down',
      color: 'text-red-700',
    },
    {
      title: t('dataSnapshot.communityActions'),
      value: stats.actions,
      description: t('dataSnapshot.registeredOnPlatform'),
      trend: 'up',
      color: 'text-green-600',
    },
  ];

  return (
    <section className="section-padding bg-black">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 
            className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-accent-500"
            data-aos="fade-up"
          >
            {t('dataSnapshot.title')} <span className="text-gradient">Şu Anda</span>
          </h2>
          <p 
            className="text-lg md:text-xl text-accent-500 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t('dataSnapshot.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statCards.map((stat, index) => (
            <div
              key={stat.title}
              data-aos="fade-up"
              data-aos-delay={300 + index * 100}
              className="card text-center"
            >
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
                {stat.trend === 'up' && (
                  <span className="text-red-500 text-2xl ml-2">↗</span>
                )}
                {stat.trend === 'down' && (
                  <span className="text-red-500 text-2xl ml-2">↘</span>
                )}
              </div>
              <h3 className="font-montserrat font-semibold text-lg mb-2 text-accent-500">
                {stat.title}
              </h3>
              <p className="text-accent-500 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div 
            className="propaganda-box transform skew-x-0 max-w-4xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <h3 className="font-montserrat font-semibold text-xl mb-3 text-accent-500">
              {t('dataSnapshot.emergency')}
            </h3>
            <p className="text-accent-500 mb-4">
              {t('dataSnapshot.parisAgreement')}
            </p>
            <a 
              href="/data-hub" 
              className="text-primary-500 hover:text-accent-500 font-medium underline"
            >
              {t('dataSnapshot.exploreData')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataSnapshot;
