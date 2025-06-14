import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/sections/Hero';
import FeaturedStories from '@/components/sections/FeaturedStories';
import DataSnapshot from '@/components/sections/DataSnapshot';
import MapPreview from '@/components/sections/MapPreview';
import BlogPosts from '@/components/sections/BlogPosts';
import CallToAction from '@/components/sections/CallToAction';
import Partners from '@/components/sections/Partners';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLanguage } from '@/context/LanguageContext';

const HomePage: React.FC = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  const description = language === 'tr' 
    ? "İklim krizi için harekete geçmek — çok geç olmadan önce. Z kuşağını yerel yönetimlerle buluşturan platform."
    : "Acting on the climate crisis — before it's too late. A platform connecting Gen Z with local governments.";

  return (
    <Layout
      title="Beyond2C"
      description={description}
    >
      <Hero />
      <DataSnapshot />
      <FeaturedStories />
      <MapPreview />
      <BlogPosts />
      <CallToAction />
      <Partners />
    </Layout>
  );
};

export default HomePage;
