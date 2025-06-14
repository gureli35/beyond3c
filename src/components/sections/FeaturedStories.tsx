import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';

interface FeaturedStory {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  location: string;
  image: string;
  slug: string;
}

const FeaturedStories: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Mock data - gerçek uygulamada API'den gelecek
  const stories: FeaturedStory[] = [
    {
      id: '1',
      title: language === 'tr' ? 'İstanbul\'da Genç İklim Aktivistleri' : 'Young Climate Activists in Istanbul',
      excerpt: language === 'tr' 
        ? 'Beyoğlu\'nda bir grup üniversite öğrencisi, yerel belediye ile işbirliği yaparak çevre dostu ulaşım projesi başlattı...'
        : 'A group of university students in Beyoğlu started an eco-friendly transportation project in collaboration with the local municipality...',
      author: language === 'tr' ? 'Elif Yılmaz' : 'Elif Yilmaz',
      location: language === 'tr' ? 'İstanbul, Türkiye' : 'Istanbul, Turkey',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&q=80',
      slug: 'istanbul-genc-iklim-aktivistleri'
    },
    {
      id: '2',
      title: language === 'tr' ? 'Köyde Güneş Enerjisi Devrimi' : 'Solar Energy Revolution in the Village',
      excerpt: language === 'tr'
        ? 'Anadolu\'nun küçük bir köyünde başlayan güneş enerjisi projesi, tüm bölgeye ilham veriyor...'
        : 'A solar energy project started in a small Anatolian village is inspiring the whole region...',
      author: language === 'tr' ? 'Mehmet Kaya' : 'Mehmet Kaya',
      location: language === 'tr' ? 'Konya, Türkiye' : 'Konya, Turkey',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&q=80',
      slug: 'koyde-gunes-enerjisi-devrimi'
    },
    {
      id: '3',
      title: language === 'tr' ? 'Okul Bahçesinden Küresel Değişim' : 'Global Change from a School Garden',
      excerpt: language === 'tr'
        ? 'Lise öğrencileri kurdukları organik bahçe ile hem beslenme alışkanlıklarını değiştirdi hem de farkındalık yarattı...'
        : 'High school students changed their eating habits and raised awareness with the organic garden they created...',
      author: language === 'tr' ? 'Zeynep Özkan' : 'Zeynep Ozkan',
      location: language === 'tr' ? 'İzmir, Türkiye' : 'Izmir, Turkey',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80',
      slug: 'okul-bahcesinden-kuresel-degisim'
    }
  ];

  return (
    <section className="section-padding bg-secondary-700">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 
            className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-neutral-100"
            data-aos="fade-up"
          >
            <span className="text-gradient">{t('featuredStories.title')}</span>
          </h2>
          <p 
            className="text-lg md:text-xl text-neutral-100 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t('featuredStories.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <div 
              key={story.id}
              data-aos="fade-up"
              data-aos-delay={300 + index * 100}
            >
              <Card
                title={story.title}
                image={story.image}
                href={`/voices/${story.slug}`}
                className="h-full"
              >
                <p className="text-neutral-600 mb-4 line-clamp-3">
                  {story.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <span className="font-medium">{story.author}</span>
                  <span>{story.location}</span>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div 
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <Link href="/voices">
              <Button variant="primary" size="large">
                {t('featuredStories.viewAll')}
              </Button>
            </Link>
            <div className="mt-4">
              <Link 
                href="/voices/submit" 
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                {t('featuredStories.shareYourStory')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;
