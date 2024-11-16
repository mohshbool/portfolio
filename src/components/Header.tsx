import React, { memo, useCallback, useState } from 'react';
import Typical from 'react-typical';
import Switch from 'react-switch';
import { Header as DATA } from '../data';
import './Header.css';
interface HeaderProps {
  data: DATA;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const setTheme = useCallback(() => {
    const body = document.body;
    const newTheme =
      body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
  }, []);

  const onThemeSwitchChange = useCallback(
    (checked: boolean) => {
      setIsDarkTheme(checked);
      setTheme();
    },
    [setTheme]
  );

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
    <header
      id="home"
      style={{ height: window.innerHeight - 140, display: 'block' }}
    >
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
    </header>
  );
};

export default Header;
