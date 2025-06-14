import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';
import { ComponentProps } from '@/types';

interface LayoutProps extends ComponentProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "Beyond2C", 
  description = "Guiding action beyond limits — before it's too late.",
  image,
  url,
  className 
}) => {
  return (
    <>
      <SEO 
        title={title}
        description={description}
        image={image}
        url={url}
      />
      <div className={`min-h-screen bg-black ${className || ''}`}>
        <Navigation />
        
        <main>
          {children}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Layout;
