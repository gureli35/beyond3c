import React from 'react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
      <LanguageSwitcher />
    </LanguageProvider>
  );
}
