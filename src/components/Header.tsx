'use client';

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Typical from 'react-typical';
import Switch from 'react-switch';
import { Icon } from '@iconify/react';
import { Header as DATA } from '@/data/data';
import styles from './Header.module.css';

const BACKGROUND_IMAGES_CREDITS = {
  portrait_light: {
    url: 'photos/an-origami-christmas-tree-sitting-on-top-of-a-couch-fgITLkxk_QQ',
    profile: '@raymondpetrik',
    name: 'Raymond Petrik',
  },
  landscape_light: {
    url: 'photos/mountains-under-white-clouds-at-daytime-pZ-XFIrJMtE',
    profile: '@yuli_superson',
    name: 'Juli Kosolapova',
  },
  portrait_dark: {
    url: 'photos/the-night-sky-over-a-rocky-mountain-range-ADvoB9pDkow',
    profile: '@ryankim246',
    name: 'Ryan Kim',
  },
  landscape_dark: {
    url: 'photos/a-blurry-photo-of-a-city-skyline-at-sunset-FNFBN4-GdlQ',
    profile: '@he_junhui',
    name: 'He Junhui',
  },
};

interface HeaderProps {
  data: DATA;
  language: string;
  setLanguage: (payload: string) => void;
  photoBy: string;
  on: string;
}

const Header: React.FC<HeaderProps> = ({
  data,
  language,
  setLanguage,
  photoBy,
  on,
}) => {
  const switchRef = useRef<Switch>(null);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [isAtTop, setisAtTop] = useState(true);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Set initial window dimensions
    setWindowHeight(window.innerHeight);
    setIsPortrait(window.innerHeight > window.innerWidth);

    // Set dark mode on initial load if user prefers dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      triggerSwitch();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setisAtTop(window.scrollY <= 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = function (e: Event) {
      e.preventDefault();
      window.scrollBy({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth',
      });
    };

    const scrollContainer = document.getElementById('srolldown-container');
    scrollContainer?.addEventListener('click', handleClick);
    return () => scrollContainer?.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setIsPortrait(window.innerHeight - 50 > window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // set theme in dom
  const setTheme = useCallback(() => {
    const body = document.body;
    const newTheme =
      body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
  }, []);

  // event handler for theme switch
  const onThemeSwitchChange = useCallback(
    (checked: boolean) => {
      setIsDarkTheme(checked);
      setTheme();
    },
    [setTheme]
  );

  // programmatically toggle switch
  const triggerSwitch = useCallback(() => {
    if (switchRef.current) {
      switchRef.current.setState(prevState => ({
        // @ts-expect-error hard set of switch
        checked: !prevState.checked,
      }));
      onThemeSwitchChange(!isDarkTheme);
    }
  }, [isDarkTheme, onThemeSwitchChange]);

  const typicalTitles = data.titles
    .map(title => [title.toUpperCase(), 1500])
    .flat();

  const HeaderTitleTypeAnimation = memo(
    () => (
      <Typical
        // @ts-expect-error force attach class
        className="title-styles"
        steps={typicalTitles}
        loop={50}
      />
    ),
    () => true
  );

  const backgroundKey =
    `${isPortrait ? `portrait` : `landscape`}_${isDarkTheme ? 'dark' : 'light'}` as keyof typeof BACKGROUND_IMAGES_CREDITS;

  const unsplashUrlBuilder = (path: string) =>
    `https://unsplash.com/${path}?utm_medium=referral&utm_source=shbool.net`;

  return (
    <header
      id="home"
      style={{ height: windowHeight || '100vh', display: 'block' }}
    >
      <div className="image-background">
        <img
          src={`/images/background/${backgroundKey}.jpg`}
          alt="Background"
        />
        <div className="image-overlay"></div>
      </div>
      <div className="row aligner" style={{ height: '100%' }}>
        <div className="col-md-12">
          <div>
            <Icon
              icon="la:laptop-code"
              className="header-icon"
            />
            <br />
            <h1 className="mb-0 header-name">
              <Typical steps={[data.name]} wrapper="p" />
            </h1>
            <div className="title-container">
              <HeaderTitleTypeAnimation />
            </div>
            <Switch
              ref={switchRef}
              checked={isDarkTheme}
              onChange={onThemeSwitchChange}
              offColor="#baaa80"
              onColor="#353535"
              className="react-switch mx-auto"
              width={90}
              height={40}
              uncheckedIcon={
                <Icon
                  icon="twemoji:owl"
                  style={{
                    display: 'block',
                    height: '100%',
                    fontSize: 25,
                    textAlign: 'end',
                    marginLeft: '20px',
                    color: '#353239',
                  }}
                />
              }
              checkedIcon={
                <Icon
                  icon="noto-v1:sun-with-face"
                  style={{
                    display: 'block',
                    height: '100%',
                    fontSize: 25,
                    textAlign: 'end',
                    marginLeft: '10px',
                    color: '#353239',
                  }}
                />
              }
              id="icon-switch"
            />
            <div className="language-switch-container">
              <img
                src="/images/header/united-kingdom-flag.png"
                alt="English"
                className={language === 'en' ? 'selected' : ''}
                onClick={() => setLanguage('en')}
              />
              <img
                src="/images/header/germany-flag.png"
                alt="German"
                className={language === 'de' ? 'selected' : ''}
                onClick={() => setLanguage('de')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="credits">
        {photoBy}{' '}
        <a
          href={unsplashUrlBuilder(
            BACKGROUND_IMAGES_CREDITS[backgroundKey].profile
          )}
        >
          {BACKGROUND_IMAGES_CREDITS[backgroundKey].name}
        </a>{' '}
        {on}{' '}
        <a
          href={unsplashUrlBuilder(
            BACKGROUND_IMAGES_CREDITS[backgroundKey].url
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z"
            />
          </svg>
        </a>
      </div>
      <div id="srolldown-container">
        <div
          className="scrolldown-arrow"
          style={{
            bottom:
              typeof window !== 'undefined' && window.innerWidth > 500
                ? '40px'
                : '30px',
            display: isAtTop ? 'block' : 'none',
          }}
        />
        <div
          className="scrolldown-arrow"
          style={{
            bottom:
              typeof window !== 'undefined' && window.innerWidth > 500
                ? '55px'
                : '40px',
            display: isAtTop ? 'block' : 'none',
          }}
        />
      </div>
    </header>
  );
};

export default Header;
