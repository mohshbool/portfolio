import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import Typical from 'react-typical';
import Switch from 'react-switch';
import { Header as DATA } from '../data';
import './Header.css';
interface HeaderProps {
  data: DATA;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const switchRef = useRef<Switch>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
      .getElementById('sroll-down-container')
      ?.addEventListener('click', handleClick);
    return () =>
      document
        .getElementById('sroll-down-container')
        ?.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }

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

  return (
    <header id="home" style={{ height: window.innerHeight, display: 'block' }}>
      <div className="video-background">
        <video
          ref={videoRef}
          key={isPortrait ? 'portrait' : 'landscape'}
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src={`/videos/bg_${isPortrait ? `vertical` : isDarkTheme ? 'dark' : 'light'}.mp4`}
            type="video/mp4"
          />
        </video>
        <div className="video-overlay"></div>
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
            <h1 className="mb-0">
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
      <div id="sroll-down-container">
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
