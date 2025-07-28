import React from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/context/LanguageContext';

const ImpactMapPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Layout
      title={t('impactMap.title')}
      description={t('impactMap.description')}
    >
      <div className="min-h-screen bg-secondary-600">
        {/* Header */}
        <section className="bg-primary-500 text-white py-12 relative clip-diagonal">
          <div className="absolute inset-0 bg-pattern opacity-20"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-4xl">
              <div className="mb-6">
                <span className="bg-secondary-700 text-primary-500 py-1 px-4 font-bold text-sm uppercase tracking-wider">
                  {t('nav.takeAction')}
                </span>
              </div>
              
              <h1 className="font-montserrat font-black text-4xl md:text-6xl mb-6 text-white">
                {t('impactMap.heroTitle')}
              </h1>
              
              <div className="propaganda-box inline-block mb-6">
                <p className="propaganda-text">{t('impactMap.heroSubtitle')}</p>
              </div>
              
              <p className="text-xl text-accent-500 max-w-3xl border-l-4 border-primary-500 pl-4">
                {t('impactMap.heroDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* MapHub Embedded Map */}
        <section className="flex-1 bg-white">
          <div className="w-full" style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
            <iframe
              width="100%"
              height="100%"
              src="https://maphub.net/embed_h/V4pDJFnUfwLiqcxu?panel=1&panel_closed=1"
              frameBorder="0"
              title="Beyond2C Impact Map"
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ImpactMapPage;
