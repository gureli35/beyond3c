import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const footerLinks = {
    platform: [
      { name: t('nav.home'), href: '/' },
      { name: t('nav.about'), href: '/about' },
      { name: t('nav.impactMap'), href: '/impact-map' },
      { name: t('nav.dataHub'), href: '/data-hub' },
    ],
    community: [
      { name: t('nav.voices'), href: '/voices' },
      { name: t('nav.events'), href: '/events' },
      { name: t('nav.blog'), href: '/blog' },
      { name: t('cta.volunteer'), href: '/take-action' },
    ],
    resources: [
      { name: t('nav.resources'), href: '/resources' },
      { name: t('nav.faq'), href: '/faq' },
      { name: t('nav.contact'), href: '/contact' },
      { name: t('nav.privacy'), href: '/privacy' },
    ],
  };

  return (
    <footer className="bg-black text-accent-500 border-t-4 border-primary-500">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/2Clogo.png" 
                alt="Beyond2C Logo" 
                className="h-8 w-auto"
              />
              <span className="font-montserrat font-bold text-xl"><span className="text-primary-500">Beyond</span>2C</span>
            </div>
            <p className="text-gray-300 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/beyond2c"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary-500 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/furkangureli"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary-500 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">{t('footer.platform')}</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">{t('footer.community')}</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} Beyond2C. {t('common.allRightsReserved')}.
          </p>
          <p className="text-gray-300 text-sm mt-4 md:mt-0">
            {t('footer.builtBy')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
