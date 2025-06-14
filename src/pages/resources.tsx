import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useLanguage } from '@/context/LanguageContext';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'article' | 'tool' | 'dataset';
  url: string;
  image: string;
  category: string;
  tags: string[];
}

const ResourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeType, setActiveType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const resourcesPerPage = 6;
  const { language, t } = useLanguage();

  // Mock data for resources with language support
  const resources: Resource[] = [
    {
      id: 'resource-1',
      title: language === 'tr' ? 'İklim Krizi 101: Temel Kavramlar' : 'Climate Crisis 101: Basic Concepts',
      description: language === 'tr' 
        ? 'İklim değişikliği hakkında temel bilgileri içeren kapsamlı bir rehber. Karbon ayak izi, sera gazları ve küresel ısınma gibi temel kavramlar açıklanıyor.'
        : 'A comprehensive guide covering the basics of climate change. Concepts like carbon footprint, greenhouse gases, and global warming are explained.',
      type: 'pdf',
      url: '/resources/iklim-krizi-101.pdf',
      image: 'https://images.unsplash.com/photo-1457530378978-8bac673b8062?w=800&q=80',
      category: language === 'tr' ? 'Eğitim' : 'Education',
      tags: language === 'tr' ? ['Temel Bilgiler', 'Rehber', 'PDF'] : ['Basics', 'Guide', 'PDF'],
    },
    {
      id: 'resource-2',
      title: language === 'tr' ? 'İklim Aktivizmi Araç Kiti' : 'Climate Activism Toolkit',
      description: language === 'tr'
        ? 'Gençler için iklim kampanyası düzenleme, sosyal medya stratejileri ve etkinlik organizasyonu konularında pratik bilgiler.'
        : 'Practical information for youth on organizing climate campaigns, social media strategies, and event planning.',
      type: 'pdf',
      url: '/resources/aktivizm-araclari.pdf',
      image: 'https://images.unsplash.com/photo-1607923432780-7a9c30adcb72?w=800&q=80',
      category: language === 'tr' ? 'Aktivizm' : 'Activism',
      tags: language === 'tr' ? ['Araç Kiti', 'Kampanya', 'Gençlik'] : ['Toolkit', 'Campaign', 'Youth'],
    },
    {
      id: 'resource-3',
      title: language === 'tr' ? 'Türkiye\'de İklim Değişikliği Etkileri' : 'Climate Change Impacts in Turkey',
      description: language === 'tr'
        ? 'Türkiye\'nin farklı bölgelerinde iklim değişikliğinin şimdiki ve gelecekteki potansiyel etkileri hakkında bilimsel veri ve haritalar.'
        : 'Scientific data and maps about the current and potential future impacts of climate change in different regions of Turkey.',
      type: 'article',
      url: '/resources/turkiye-iklim-etkileri',
      image: 'https://images.unsplash.com/photo-1500740516770-92bd004b159e?w=800&q=80',
      category: language === 'tr' ? 'Bilim' : 'Science',
      tags: language === 'tr' ? ['Türkiye', 'Bilim', 'Harita'] : ['Turkey', 'Science', 'Map'],
    },
    {
      id: 'resource-4',
      title: language === 'tr' ? 'Bireysel Karbon Ayak İzi Hesaplayıcı' : 'Personal Carbon Footprint Calculator',
      description: language === 'tr'
        ? 'Günlük alışkanlıklarınız ve tüketim tercihleriniz doğrultusunda kişisel karbon ayak izinizi hesaplayın ve azaltma önerileri alın.'
        : 'Calculate your personal carbon footprint based on your daily habits and consumption preferences, and get reduction suggestions.',
      type: 'tool',
      url: '/tools/carbon-calculator',
      image: 'https://images.unsplash.com/photo-1590162686279-83d25861daed?w=800&q=80',
      category: 'Araçlar',
      tags: ['Hesaplayıcı', 'Karbon', 'İnteraktif'],
    },
    {
      id: 'resource-5',
      title: language === 'tr' ? 'Z Kuşağı ve İklim Hareketi' : 'Generation Z and the Climate Movement',
      description: language === 'tr'
        ? 'Z kuşağının iklim aktivizmindeki rolü ve küresel etkileri üzerine kapsamlı bir video belgeseli.'
        : 'A comprehensive video documentary on the role of Generation Z in climate activism and its global impacts.',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=example',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?w=800&q=80',
      category: 'Aktivizm',
      tags: ['Video', 'Z Kuşağı', 'Belgesel'],
    },
    {
      id: 'resource-6',
      title: language === 'tr' ? 'Sürdürülebilir Şehirler Rehberi' : 'Sustainable Cities Guide',
      description: language === 'tr'
        ? 'Belediyeler ve yerel yönetimler için iklim dostu şehir planlaması ve sürdürülebilir altyapı geliştirme önerileri.'
        : 'Recommendations for climate-friendly urban planning and sustainable infrastructure development for municipalities and local governments.',
      type: 'article',
      url: '/resources/surdurulebilir-sehirler',
      image: 'https://images.unsplash.com/photo-1518005068251-37900150dfca?w=800&q=80',
      category: 'Şehircilik',
      tags: ['Belediyeler', 'Sürdürülebilirlik', 'Planlama'],
    },
    {
      id: 'resource-7',
      title: language === 'tr' ? 'İklim Değişikliği ve Sağlık Raporu' : 'Climate Change and Health Report',
      description: language === 'tr'
        ? 'İklim krizinin insan sağlığı üzerindeki etkileri ve sağlık sistemlerinin adaptasyonu üzerine araştırma.'
        : 'Research on the impacts of the climate crisis on human health and the adaptation of health systems.',
      type: 'pdf',
      url: '/resources/iklim-saglik-raporu.pdf',
      image: 'https://images.unsplash.com/photo-1579154392429-0e6b4e850ad2?w=800&q=80',
      category: 'Sağlık',
      tags: ['Rapor', 'Araştırma', 'Sağlık'],
    },
    {
      id: 'resource-8',
      title: language === 'tr' ? 'Yenilenebilir Enerji Teknolojileri' : 'Renewable Energy Technologies',
      description: language === 'tr'
        ? 'Güneş, rüzgar, jeotermal ve diğer yenilenebilir enerji teknolojileri hakkında teknik bilgiler içeren eğitim serisi.'
        : 'An educational series containing technical information about solar, wind, geothermal, and other renewable energy technologies.',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=example2',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
      category: 'Enerji',
      tags: ['Video Serisi', 'Yenilenebilir', 'Teknoloji'],
    },
  ];

  // Extract unique categories and types
  const categories = ['all', ...Array.from(new Set(resources.map(resource => resource.category)))];
  const types = ['all', ...Array.from(new Set(resources.map(resource => resource.type)))];

  // Filter resources based on selected category, type and search query
  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesType = activeType === 'all' || resource.type === activeType;
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesType && matchesSearch;
  });

  // Get current resources for pagination
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);

  // Handle page change
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 700, behavior: 'smooth' });
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setIsLoading(true);
    
    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Map resource type to icon
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'video':
        return '🎬';
      case 'article':
        return '📰';
      case 'tool':
        return '🔧';
      case 'dataset':
        return '📊';
      default:
        return '📚';
    }
  };

  // Map resource type to human-readable name
  const getResourceTypeName = (type: string) => {
    switch (type) {
      case 'pdf':
        return t('common.pdf');
      case 'video':
        return t('common.video');
      case 'article':
        return t('common.article');
      case 'tool':
        return t('common.tool');
      case 'dataset':
        return t('common.dataset');
      default:
        return type;
    }
  };

  return (
    <Layout
      title={t('resources.title')}
      description={t('resources.description')}
    >
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="propaganda-banner mb-8 inline-block" data-aos="fade-down">
              {t('resources.bannerText')}
            </div>
            
            <h1 
              className="font-montserrat font-black text-5xl md:text-7xl mb-8 text-shadow-red tracking-tight leading-tight uppercase"
              data-aos="fade-up"
            >
              {t('resources.heroTitle')}
            </h1>
            
            <div className="bg-secondary-900 p-4 mb-8 inline-block transform -skew-x-6 border-l-4 border-primary-500" data-aos="fade-up" data-aos-delay="200">
              <p className="text-xl md:text-2xl font-bold text-accent-500 transform skew-x-6">
                {t('resources.heroSubtitle')}
              </p>
            </div>
            
            <p 
              className="text-lg md:text-xl mb-10 text-accent-500 max-w-3xl mx-auto border-diagonal"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {t('resources.heroDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-black py-8 sticky top-16 z-40 shadow-sm">
        <div className="container-custom">
          <div className="mb-6">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                placeholder={t('resources.searchPlaceholder')} 
                className="form-input flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label={t('resources.searchAriaLabel')}
              />
              <Button 
                variant="primary" 
                type="submit" 
                className="px-6 py-3"
                disabled={isLoading}
              >
                {isLoading ? t('resources.searching') : t('common.search')}
              </Button>
            </form>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Category Filters */}
            <div className="w-full md:w-auto">
              <label className="block text-accent-500 mb-2 font-bold">{t('common.category')}</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? 'bg-primary-500 text-white'
                        : 'bg-secondary-800 text-accent-500 hover:bg-secondary-700'
                    }`}
                    aria-pressed={activeCategory === category}
                    aria-label={`${t('common.category')}: ${category === 'all' ? t('common.all') : category}`}
                  >
                    {category === 'all' ? t('common.all') : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filters */}
            <div className="w-full md:w-auto">
              <label className="block text-accent-500 mb-2 font-bold">{t('common.type')}</label>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      activeType === type
                        ? 'bg-primary-500 text-white'
                        : 'bg-secondary-800 text-accent-500 hover:bg-secondary-700'
                    }`}
                    aria-pressed={activeType === type}
                    aria-label={`${t('common.type')}: ${type === 'all' ? t('common.all') : getResourceTypeName(type)}`}
                  >
                    {type !== 'all' && <span>{getResourceIcon(type)}</span>}
                    <span>{type === 'all' ? t('common.all') : getResourceTypeName(type)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-padding bg-black">
        <div className="container-custom">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="loading-spinner mx-auto"></div>
              <p className="text-accent-500 mt-4">{t('resources.loading')}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentResources.map((resource, index) => (
                  <div 
                    key={resource.id} 
                    className="card h-full flex flex-col"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={resource.image} 
                        alt={resource.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-primary-500 text-white px-3 py-1 font-bold text-sm uppercase">
                        {resource.category}
                      </div>
                      <div className="absolute top-0 left-0 bg-black bg-opacity-70 text-white px-3 py-1 font-bold text-sm">
                        {getResourceIcon(resource.type)} {getResourceTypeName(resource.type)}
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-3 text-accent-500">
                        {resource.title}
                      </h3>
                      
                      <p className="text-accent-500 mb-4 flex-1">
                        {resource.description}
                      </p>
                      
                      <div className="mb-4 flex flex-wrap gap-2">
                        {resource.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="inline-block bg-secondary-700 text-accent-500 text-xs px-2 py-1 rounded-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto">
                        <Link href={resource.url}>
                          <Button variant="primary" className="w-full">
                            {t('resources.viewResource')}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredResources.length === 0 && (
                <div className="text-center py-12 bg-secondary-900 border-l-4 border-primary-500">
                  <p className="text-accent-500 text-lg">
                    {t('resources.noResults')}
                  </p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                      setActiveType('all');
                    }}
                    className="mt-4 text-primary-500 font-bold hover:underline"
                  >
                    {t('resources.clearFilters')}
                  </button>
                </div>
              )}

              {/* Pagination */}
              {filteredResources.length > resourcesPerPage && (
                <div className="flex justify-center mt-12">
                  <div className="flex">
                    {Array.from({ length: Math.ceil(filteredResources.length / resourcesPerPage) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-4 py-2 ${
                          currentPage === index + 1
                            ? 'bg-primary-500 text-white'
                            : 'bg-secondary-800 text-accent-500 hover:bg-secondary-700'
                        }`}
                        aria-current={currentPage === index + 1 ? 'page' : undefined}
                        aria-label={`Sayfa ${index + 1}`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black border-t-4 border-primary-500 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accent-500">
              {t('resources.suggestResourceTitle')}
            </h2>
            <p className="text-xl mb-8 text-accent-500">
              {t('resources.suggestResourceDescription')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact" 
                className="btn-primary"
                aria-label={t('resources.suggestResource')}
              >
                {t('resources.suggestResource')}
              </Link>
              <Link 
                href="/take-action" 
                className="btn-outline"
                aria-label={t('nav.takeAction')}
              >
                {t('nav.takeAction')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResourcesPage;
