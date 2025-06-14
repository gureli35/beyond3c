import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  category: string;
  image: string;
  slug: string;
}

const BlogPosts: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Mock data - gerçek uygulamada API'den gelecek
  const posts: BlogPost[] = [
    {
      id: '1',
      title: language === 'tr' ? '2024 İklim Raporu: Türkiye\'nin Durumu' : '2024 Climate Report: Turkey\'s Situation',
      excerpt: language === 'tr' 
        ? 'Son araştırmalara göre Türkiye\'de iklim değişikliğinin etkileri hızlanıyor. Yapılması gerekenler...'
        : 'Recent research shows that the effects of climate change in Turkey are accelerating. What needs to be done...',
      author: language === 'tr' ? 'Dr. Ayşe Demir' : 'Dr. Ayse Demir',
      publishDate: language === 'tr' ? '15 Mayıs 2024' : 'May 15, 2024',
      category: language === 'tr' ? 'Araştırma' : 'Research',
      image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=500&q=80',
      slug: '2024-iklim-raporu-turkiye'
    },
    {
      id: '2',
      title: language === 'tr' ? 'Gençler İçin İklim Eylemi Rehberi' : 'Climate Action Guide for Youth',
      excerpt: language === 'tr'
        ? 'İklim değişikliği ile mücadelede gençlerin yapabileceği 10 pratik adım ve bu adımları nasıl uygulanacağı...'
        : '10 practical steps youth can take in the fight against climate change and how to implement them...',
      author: language === 'tr' ? 'Kemal Arslan' : 'Kemal Arslan',
      publishDate: language === 'tr' ? '12 Mayıs 2024' : 'May 12, 2024',
      category: language === 'tr' ? 'Rehber' : 'Guide',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80',
      slug: 'gencler-icin-iklim-eylemi-rehberi'
    },
    {
      id: '3',
      title: language === 'tr' ? 'Yerel Yönetimlerle İşbirliği Nasıl Kurulur?' : 'How to Collaborate with Local Governments?',
      excerpt: language === 'tr'
        ? 'İklim projelerinizi hayata geçirmek için yerel yönetimlerle etkili işbirliği kurmanın yolları...'
        : 'Ways to establish effective collaboration with local governments to realize your climate projects...',
      author: language === 'tr' ? 'Fatma Çelik' : 'Fatma Celik',
      publishDate: language === 'tr' ? '10 Mayıs 2024' : 'May 10, 2024',
      category: language === 'tr' ? 'İpuçları' : 'Tips',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80',
      slug: 'yerel-yonetimlerle-isbirligi'
    }
  ];

  return (
    <section className="section-padding bg-secondary-600">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 
            className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-accent-500"
            data-aos="fade-up"
          >
            <span className="text-gradient">{t('blogPosts.title')}</span>
          </h2>
          <p 
            className="text-lg md:text-xl text-accent-500 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t('blogPosts.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <div 
              key={post.id}
              data-aos="fade-up"
              data-aos-delay={300 + index * 100}
            >
              <Card
                title={post.title}
                image={post.image}
                href={`/blog/${post.slug}`}
                className="h-full"
              >
                <div className="mb-3">
                  <span className="inline-block bg-primary-100 text-primary-600 text-sm px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <p className="text-accent-500 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-accent-500">
                  <span className="font-medium">{post.author}</span>
                  <span>{post.publishDate}</span>
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
            <Link href="/blog">
              <Button variant="primary" size="large">
                {t('blogPosts.readAll')}
              </Button>
            </Link>
            <div className="mt-4">
              <Link 
                href="/blog/contribute" 
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                {t('blogPosts.writeArticle')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
