import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { useLanguage } from '@/context/LanguageContext';

// Define IssueCategory type locally since it is not exported from @/types
type IssueCategory = {
  id: string;
  title: string;
  description: string;
  icon: string;
  stats: {
    current: string;
    target: string;
    trend: string;
    urgency: string;
  };
  impacts: string[];
  solutions: string[];
};

const IssuesPage: React.FC = () => {
  const { language, t } = useLanguage();

  // Mock data for climate issues with language support
  const issueCategories: IssueCategory[] = [
    {
      id: 'temperature',
      title: t('issues.temperature.title'),
      description: t('issues.temperature.description'),
      icon: '🌡️',
      stats: {
        current: '1.2°C',
        target: '1.5°C',
        trend: t('issues.temperature.trend'),
        urgency: t('issues.temperature.urgency')
      },
      impacts: language === 'tr' ? [
        'Kutup buzullarının erimesi',
        'Deniz seviyesinin yükselmesi',
        'Aşırı hava olaylarının artması',
        'Tarımsal verimlilikte düşüş'
      ] : [
        'Melting of polar ice caps',
        'Rising sea levels',
        'Increase in extreme weather events',
        'Decreased agricultural productivity'
      ],
      solutions: language === 'tr' ? [
        'Yenilenebilir enerji kullanımı',
        'Enerji verimliliği',
        'Karbon ayak izini azaltma',
        'Sürdürülebilir ulaşım'
      ] : [
        'Use of renewable energy',
        'Energy efficiency',
        'Reducing carbon footprint',
        'Sustainable transportation'
      ]
    },
    {
      id: 'emissions',
      title: t('issues.emissions.title'),
      description: t('issues.emissions.description'),
      icon: '🏭',
      stats: {
        current: '421 ppm',
        target: '350 ppm',
        trend: t('issues.emissions.trend'),
        urgency: t('issues.emissions.urgency')
      },
      impacts: language === 'tr' ? [
        'Sera etkisinin güçlenmesi',
        'Okyanus asidifikasyonu',
        'Ekosistemlerin bozulması',
        'İnsan sağlığına etkileri'
      ] : [
        'Strengthening of greenhouse effect',
        'Ocean acidification',
        'Ecosystem degradation',
        'Effects on human health'
      ],
      solutions: language === 'tr' ? [
        'Fosil yakıt kullanımını azaltma',
        'Karbon yakalama teknolojileri',
        'Orman koruma ve ağaçlandırma',
        'Döngüsel ekonomi modeli'
      ] : [
        'Reducing fossil fuel use',
        'Carbon capture technologies',
        'Forest conservation and afforestation',
        'Circular economy model'
      ]
    },
    {
      id: 'biodiversity',
      title: t('issues.biodiversity.title'),
      description: t('issues.biodiversity.description'),
      icon: '🦋',
      stats: {
        current: language === 'tr' ? '%68 azalma' : '68% decline',
        target: t('issues.biodiversity.target'),
        trend: t('issues.biodiversity.trend'),
        urgency: t('issues.biodiversity.urgency')
      },
      impacts: language === 'tr' ? [
        'Habitat kaybı',
        'Gıda zincirinin bozulması',
        'Polinasyon problemleri',
        'Genetik çeşitliliğin azalması'
      ] : [
        'Habitat loss',
        'Food chain disruption',
        'Pollination problems',
        'Decrease in genetic diversity'
      ],
      solutions: language === 'tr' ? [
        'Korunan alan oranını artırma',
        'Sürdürülebilir tarım',
        'Habitat restorasyonu',
        'Tür koruma programları'
      ] : [
        'Increasing protected area ratio',
        'Sustainable agriculture',
        'Habitat restoration',
        'Species conservation programs'
      ]
    },
    {
      id: 'water',
      title: t('issues.water.title'),
      description: t('issues.water.description'),
      icon: '💧',
      stats: {
        current: language === 'tr' ? '2.2 milyar' : '2.2 billion',
        target: t('issues.water.target'),
        trend: t('issues.water.trend'),
        urgency: t('issues.water.urgency')
      },
      impacts: language === 'tr' ? [
        'Kuraklık artışı',
        'Su kalitesinde düşüş',
        'Tarımsal üretimde sorunlar',
        'Sağlık problemleri'
      ] : [
        'Increase in drought',
        'Decline in water quality',
        'Problems in agricultural production',
        'Health problems'
      ],
      solutions: language === 'tr' ? [
        'Su verimliliği',
        'Yağmur suyu toplama',
        'Atık su arıtımı',
        'Su korunma teknolojileri'
      ] : [
        'Water efficiency',
        'Rainwater harvesting',
        'Wastewater treatment',
        'Water conservation technologies'
      ]
    }
  ];

  return (
    <Layout>
      <Head>
        <title>{t('issues.title')}</title>
        <meta name="description" content={t('issues.description')} />
      </Head>

      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('issues.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {t('issues.heroDescription')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="font-semibold">{t('issues.lastDecade')}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="font-semibold">{t('issues.co2Level')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Issues Grid */}
      <section className="section-padding bg-secondary-700">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {issueCategories.map((issue, index) => (
              <div 
                key={issue.id} 
                className="card bg-secondary-600 border-l-4 border-primary-500"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{issue.icon}</span>
                    <h3 className="text-2xl font-bold text-accent-500">{issue.title}</h3>
                  </div>
                  
                  <p className="text-accent-500 mb-6 opacity-90">
                    {issue.description}
                  </p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-secondary-600 rounded-lg">
                    <div>
                      <div className="text-sm text-accent-500">{t('issues.currentStatus')}</div>
                      <div className="text-lg font-semibold text-accent-500">{issue.stats.current}</div>
                    </div>
                    <div>
                      <div className="text-sm text-accent-500">{t('issues.target')}</div>
                      <div className="text-lg font-semibold text-accent-500">{issue.stats.target}</div>
                    </div>
                    <div>
                      <div className="text-sm text-accent-500">{t('issues.trend')}</div>
                      <div className={`text-lg font-semibold ${
                        issue.stats.trend === 'Artış' || issue.stats.trend === 'Increasing' ? 'text-red-600' : 'text-amber-600'
                      }`}>
                        {issue.stats.trend}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-accent-500">{t('issues.urgency')}</div>
                      <div className={`text-lg font-semibold ${
                        issue.stats.urgency === 'Kritik' || issue.stats.urgency === 'Critical' ? 'text-red-600' : 
                        issue.stats.urgency === 'Yüksek' || issue.stats.urgency === 'High' ? 'text-orange-600' : 'text-amber-600'
                      }`}>
                        {issue.stats.urgency}
                      </div>
                    </div>
                  </div>
                  
                  {/* Impacts */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary-500 mb-3">{t('issues.impacts')}:</h4>
                    <ul className="space-y-1">
                      {issue.impacts.map((impact, idx) => (
                        <li key={idx} className="text-sm text-accent-500 flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2 flex-shrink-0"></span>
                          {impact}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Solutions */}
                  <div>
                    <h4 className="font-semibold text-primary-500 mb-3">{t('issues.solutions')}:</h4>
                    <ul className="space-y-1">
                      {issue.solutions.map((solution, idx) => (
                        <li key={idx} className="text-sm text-accent-500 flex items-center">
                          <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 flex-shrink-0"></span>
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IssuesPage;
