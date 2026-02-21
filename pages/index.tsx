import { useState, useEffect } from 'react';
import Head from 'next/head';

import en_data from '@/data/en.json';
import de_data from '@/data/de.json';

import Header from '@/components/Header';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';

import {
  detectBrowserLanguage,
  getLanguageFromStorage,
  setLanguageToStorage,
} from '@/utils/language';

export default function Home() {
  // Always start with English to ensure consistent SSR/client rendering
  const [data, setData] = useState<typeof en_data>(en_data);
  const [language, setLanguage] = useState<string>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted
    setMounted(true);

    // Client-side language detection
    const storedLanguage = getLanguageFromStorage();
    const detectedLanguage = storedLanguage || detectBrowserLanguage().split('-')[0];

    // Only update if different from default
    if (detectedLanguage === 'de') {
      updateLanguage('de');
    } else if (detectedLanguage !== 'en' && detectedLanguage !== language) {
      updateLanguage(detectedLanguage);
    }
  }, []);

  useEffect(() => {
    if (language !== data.language) {
      switch (language) {
        case 'de':
          setData(de_data);
          break;
        case 'en':
        default:
          setData(en_data);
      }
    }
  }, [language, data.language]);

  const updateLanguage = (payload: string) => {
    setLanguageToStorage(payload);
    setLanguage(payload);
  };

  // Don't render anything until client is ready
  if (!mounted) {
    return (
      <>
        <Head>
          <title>{data.header.name} - Portfolio</title>
          <meta
            name="description"
            content={`${data.header.name} - ${data.header.titles.join(', ')}`}
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div style={{
          width: '100vw',
          height: '100vh',
          background: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(255, 255, 255, 0.1)',
            borderTop: '3px solid #fff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{data.header.name} - Portfolio</title>
        <meta
          name="description"
          content={`${data.header.name} - ${data.header.titles.join(', ')}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{
        animation: 'fadeIn 0.5s ease-in'
      }}>
        <Header
          data={data.header}
          language={language}
          setLanguage={updateLanguage}
          photoBy={data.extra['photo-by']}
          on={data.extra.on}
        />
        <About data={data.about} title={data.extra.about} />
        <Projects data={data.projects} title={data.extra.projects} />
        <Skills data={data.skills} title={data.extra.skills} />
        <Experience data={data.experience} title={data.extra.experience} />
        <Footer
          social={data.social}
          name={data.header.name}
          copyright={data.extra.copyright}
        />
      </div>
    </>
  );
}

