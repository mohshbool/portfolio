import React, { useEffect, useState } from 'react';

import './App.scss';

import en_data from './data/en.json';
import de_data from './data/de.json';

import Header from 'components/Header';
import About from 'components/About';
import Projects from 'components/Projects';
import Skills from 'components/Skills';
import Experience from 'components/Experience';
import Footer from 'components/Footer';

import {
  detectBrowserLanguage,
  getLanguageFromStorage,
  setLanguageToStorage,
} from 'utils/language';

const App = () => {
  const [data, setData] = useState<typeof en_data>(en_data);
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const storedLanguage = getLanguageFromStorage();

    if (!storedLanguage) {
      const browserLanguage = detectBrowserLanguage();
      updateLanguage(browserLanguage);
    } else {
      setLanguage(storedLanguage);
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
  }, [language]);

  const updateLanguage = (payload: string) => {
    setLanguageToStorage(payload);
    setLanguage(payload);
  };

  return (
    <div>
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
  );
};

export default App;
