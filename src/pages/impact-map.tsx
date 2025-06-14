import React, { useState } from 'react';
import Layout from '@/components/Layout';
import InteractiveMap from '@/components/map/InteractiveMap';
import MapFilters from '@/components/map/MapFilters';
import ActionList from '@/components/map/ActionList';
import { FilterOptions } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

const ImpactMapPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
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

        {/* Controls */}
        <section className="bg-secondary-500 border-b">
          <div className="container-custom py-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <MapFilters 
                filters={filters}
                onFiltersChange={setFilters}
              />
              
              <div className="flex bg-secondary-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'map'
                      ? 'bg-primary-500 text-white'
                      : 'text-accent-500 hover:bg-secondary-600'
                  }`}
                >
                  {t('impactMap.mapView')}
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary-500 text-white'
                      : 'text-accent-500 hover:bg-secondary-600'
                  }`}
                >
                  {t('impactMap.listView')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="flex-1">
          {viewMode === 'map' ? (
            <InteractiveMap filters={filters} />
          ) : (
            <ActionList filters={filters} />
          )}
        </section>
      </div>
    </Layout>
  );
};

export default ImpactMapPage;
