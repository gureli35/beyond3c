import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';

// Helper function for consistent date formatting
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  location: string;
  publishDate: string;
  image: string;
  tags: string[];
  featured: boolean;
}

const VoicesPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const { language, t } = useLanguage();

  const stories: Story[] = [
    {
      id: '1',
      title: t('voices.story1Title'),
      excerpt: t('voices.story1Excerpt'),
      content: '',
      author: language === 'tr' ? 'Elif Yılmaz' : 'Elif Yilmaz',
      location: language === 'tr' ? 'İstanbul, Türkiye' : 'Istanbul, Turkey',
      publishDate: '2024-05-15',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&q=80',
      tags: [t('voices.categoryTransportation'), t('voices.categoryYouth'), t('voices.categoryMunicipality')],
      featured: true,
    },
    {
      id: '2',
      title: t('voices.story2Title'),
      excerpt: t('voices.story2Excerpt'),
      content: '',
      author: 'Mehmet Kaya',
      location: language === 'tr' ? 'Konya, Türkiye' : 'Konya, Turkey',
      publishDate: '2024-05-10',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&q=80',
      tags: [t('voices.categoryEnergy'), t('voices.categoryRural'), t('voices.categorySolar')],
      featured: false,
    },
    {
      id: '3',
      title: t('voices.story3Title'),
      excerpt: t('voices.story3Excerpt'),
      content: '',
      author: language === 'tr' ? 'Zeynep Özkan' : 'Zeynep Ozkan',
      location: language === 'tr' ? 'İzmir, Türkiye' : 'Izmir, Turkey',
      publishDate: '2024-04-28',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80',
      tags: [t('voices.categorySchool'), t('voices.categoryOrganic'), t('voices.categoryAwareness')],
      featured: false,
    }
  ];

  const categories = [
    'all',
    t('voices.categoryYouth'),
    t('voices.categoryEnergy'),
    t('voices.categoryTransportation'),
    t('voices.categoryEducation'),
    t('voices.categoryTechnology')
  ];
  
  const filteredStories = filter === 'all' 
    ? stories 
    : stories.filter(story => story.tags.includes(filter));

  const featuredStories = stories.filter(story => story.featured);

  return (
    <Layout
      title={t('voices.title')}
      description={t('voices.description')}
    >
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="propaganda-banner mb-8 inline-block" data-aos="fade-down">
              {t('voices.bannerText')}
            </div>
            
            <h1 
              className="font-montserrat font-black text-5xl md:text-7xl mb-8 text-shadow-red tracking-tight leading-tight uppercase"
              data-aos="fade-up"
            >
              {t('voices.heroTitle')}
            </h1>
            
            <div className="bg-secondary-600 p-4 mb-8 inline-block transform -skew-x-6 border-l-4 border-primary-500" data-aos="fade-up" data-aos-delay="200">
              <p className="text-xl md:text-2xl font-bold text-white transform skew-x-6">
                {t('voices.heroSubtitle')}
              </p>
            </div>
            
            <p 
              className="text-lg md:text-xl mb-10 text-accent-500 max-w-3xl mx-auto border-diagonal"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {t('voices.heroDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Link href="/contact">
                <Button variant="primary" size="large" className="w-full sm:w-auto px-8 py-4 text-lg font-bold tracking-wider">
                  {t('voices.submitStory')}
                </Button>
              </Link>
              <Button variant="outline" size="large" className="w-full sm:w-auto px-8 py-4 text-lg font-bold tracking-wider border-white text-white hover:bg-white hover:text-primary-500">
                {t('voices.exploreAllStories')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="section-padding bg-secondary-800 diagonal-split">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="slashed-heading font-montserrat font-black text-4xl md:text-5xl text-accent-500 mb-6 tracking-wide">
              {t('voices.featuredStories')}
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredStories.map((story, index) => (
              <div 
                key={story.id}
                className="propaganda-box transform hover:-translate-y-2 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-0 right-0 bg-primary-500 text-white px-3 py-1 font-bold text-sm uppercase">
                    {story.location.split(',')[0]}
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-3">
                    {story.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="inline-block bg-primary-500 text-white text-xs font-bold px-3 py-1 mr-2 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-accent-500 border-diagonal">
                    {story.title}
                  </h3>
                  
                  <p className="text-accent-500 mb-4 flex-1">
                    {story.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm border-t border-primary-500 pt-3">
                      <span className="font-bold text-primary-500">{story.author}</span>
                      <span className="text-accent-500">{formatDate(story.publishDate)}</span>
                    </div>
                    
                    <Link 
                      href={`/voices/${story.id}`} 
                      className="mt-4 inline-block text-primary-500 hover:text-accent-500 font-bold uppercase text-sm tracking-wider"
                    >
                      {t('voices.readStory')} &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-secondary-700 relative">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <h3 className="font-montserrat font-black text-3xl text-accent-500 mb-6 tracking-wide uppercase">
              {t('voices.allStories')}
            </h3>
            <div className="w-20 h-1 bg-primary-500 mx-auto mb-8"></div>
            
            <div className="propaganda-box inline-block p-2 mb-6">
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-6 py-3 font-bold uppercase tracking-wider transition-all duration-200 ${
                      filter === category
                        ? 'bg-primary-500 text-white'
                        : 'bg-secondary-700 text-accent-500 hover:bg-secondary-600 border border-primary-500'
                    }`}
                  >
                    {category === 'all' ? t('voices.allCategory') : category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story, index) => (                <div 
                key={story.id}
                className="bg-secondary-700 border-l-4 border-primary-500 shadow-lg transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-0 right-0 bg-primary-500 text-white px-3 py-1 font-bold text-sm uppercase">
                    {story.location.split(',')[0]}
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-3">
                    {story.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="inline-block bg-primary-500 text-white text-xs font-bold px-3 py-1 mr-2 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-accent-500">
                    {story.title}
                  </h3>
                  
                  <p className="text-accent-500 opacity-80 mb-4 flex-1 text-sm">
                    {story.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm border-t border-primary-500 pt-3">
                      <span className="font-bold text-primary-500">{story.author}</span>
                      <span className="text-accent-500">{formatDate(story.publishDate)}</span>
                    </div>
                    
                    <Link 
                      href={`/voices/${story.id}`} 
                      className="mt-4 inline-block text-primary-500 hover:text-accent-500 font-bold uppercase text-sm tracking-wider"
                    >
                      {t('voices.readStory')} &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <Button variant="primary" size="large" className="px-8 py-4 font-bold uppercase tracking-wider">
              {t('voices.loadMoreStories')}
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-500 text-white section-padding clip-diagonal">
        <div className="container-custom text-center">
          <h2 className="font-montserrat font-black text-4xl mb-8 text-shadow uppercase tracking-wider">
            {t('voices.shareStoryTitle')}
          </h2>
          
          <div className="propaganda-box inline-block p-4 mb-8 max-w-3xl bg-secondary-600 border-primary-500">
            <p className="text-xl tracking-wide font-bold transform skew-x-0">
              {t('voices.shareStoryDescription')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
            <Link href="/contact">
              <Button variant="secondary" size="large" className="px-8 py-4 font-bold uppercase tracking-wider">
                {t('voices.submitStory')}
              </Button>
            </Link>
            <Link href="/take-action">
              <Button 
                variant="outline" 
                size="large" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 px-8 py-4 font-bold uppercase tracking-wider"
              >
                {t('nav.takeAction')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VoicesPage;
