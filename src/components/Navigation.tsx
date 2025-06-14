import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavItem } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  const navigationItems: NavItem[] = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.issues'), href: '/issues' },
    { name: t('nav.impactMap'), href: '/impact-map' },
    { name: t('nav.voices'), href: '/voices' },
    { name: t('nav.dataHub'), href: '/data-hub' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.resources'), href: '/resources' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const isActive = (href: string) => {
    return router.pathname === href;
  };

  return (
    <nav className="bg-black shadow-lg shadow-primary-500/20 sticky top-0 z-50 border-b-2 border-primary-500">
      <div className="max-w-full lg:max-w-full mx-auto px-2 sm:px-4 overflow-hidden">
        <div className="flex justify-between h-14 overflow-hidden">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <img 
                  src="/2Clogo.png" 
                  alt="Beyond2C Logo" 
                  className="h-8 w-auto"
                />
                <span className="font-montserrat font-bold text-lg ml-1">
                  <span className="text-primary-500">BEYOND</span><span className="text-white">2C</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 overflow-x-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive(item.href) 
                    ? 'nav-link-active' 
                    : 'nav-link'
                } px-2 py-2 text-xs whitespace-nowrap`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link href="/take-action" className="btn-primary text-xs py-2 px-3">
              {t('nav.takeAction')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-900 hover:text-primary-500 focus:outline-none focus:text-primary-500 p-2"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-secondary-900 border-t border-primary-500">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive(item.href)
                    ? 'bg-primary-500 text-white'
                    : 'text-accent-500 hover:bg-primary-500 hover:text-white'
                } block px-3 py-2 text-base font-medium transition-colors duration-200`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Link 
                href="/take-action" 
                className="btn-primary w-full text-center"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.takeAction')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
