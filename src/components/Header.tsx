import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import Typical from 'react-typical';
import Switch from 'react-switch';
import { Header as DATA } from '../data';
import './Header.css';

/*
 Photo by <a href="https://unsplash.com/@raymondpetrik">Raymond Petrik</a> on <a href="https://unsplash.com/photos/an-origami-christmas-tree-sitting-on-top-of-a-couch-fgITLkxk_QQ">Unsplash</a>
      wadi rum Photo by <a href="https://unsplash.com/@yuli_superson">Juli Kosolapova</a> on <a href="https://unsplash.com/photos/mountains-under-white-clouds-at-daytime-pZ-XFIrJMtE">Unsplash</a>
     sunset Photo by <a href="https://unsplash.com/@he_junhui">He Junhui</a> on <a href="https://unsplash.com/photos/a-blurry-photo-of-a-city-skyline-at-sunset-FNFBN4-GdlQ">Unsplash</a>
       
*/

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
    url: 'https://unsplash.com/photos/the-night-sky-over-a-rocky-mountain-range-ADvoB9pDkow',
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
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const switchRef = useRef<Switch>(null);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(
    window.innerHeight > window.innerWidth
  );
  const [isAtTop, setisAtTop] = useState(true);

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

    document
      .getElementById('srolldown-container')
      ?.addEventListener('click', handleClick);
    return () =>
      document
        .getElementById('srolldown-container')
        ?.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // set dark mode on inital load if user prefers dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      triggerSwitch();
    }
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
        // @ts-expect-error hard set of swtich
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
    `https://unsplash.com/${path}&utm_medium=referral&utm_source=shbool.net`;

  return (
    <header id="home" style={{ height: window.innerHeight, display: 'block' }}>
      <div className="image-background">
        <img src={`images/background/${backgroundKey}.jpg?v=${Date.now()}`} />
        <div className="image-overlay"></div>
      </div>
      <div className="row aligner" style={{ height: '100%' }}>
        <div className="col-md-12">
          <div>
            <span
              className="iconify header-icon"
              data-icon="la:laptop-code"
              data-inline="false"
            ></span>
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
                <span
                  className="iconify"
                  data-icon="twemoji:owl"
                  data-inline="false"
                  style={{
                    display: 'block',
                    height: '100%',
                    fontSize: 25,
                    textAlign: 'end',
                    marginLeft: '20px',
                    color: '#353239',
                  }}
                ></span>
              }
              checkedIcon={
                <span
                  className="iconify"
                  data-icon="noto-v1:sun-with-face"
                  data-inline="false"
                  style={{
                    display: 'block',
                    height: '100%',
                    fontSize: 25,
                    textAlign: 'end',
                    marginLeft: '10px',
                    color: '#353239',
                  }}
                ></span>
              }
              id="icon-switch"
            />
          </div>
        </div>
      </div>
      <div className="credits">
        Photo by{' '}
        <a
          href={unsplashUrlBuilder(
            BACKGROUND_IMAGES_CREDITS[backgroundKey].profile
          )}
        >
          {BACKGROUND_IMAGES_CREDITS[backgroundKey].name}
        </a>{' '}
        on{' '}
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
          style={{ bottom: '25px', display: isAtTop ? 'block' : 'none' }}
        />
        <div
          className="scrolldown-arrow"
          style={{ bottom: '40px', display: isAtTop ? 'block' : 'none' }}
        />
      </div>
    </header>
  );
};

export default Header;
