import React from 'react';
import { Icon } from '@iconify/react';
import reactIcon from '@iconify/icons-logos/react';
import appleIcon from '@iconify/icons-logos/linux-tux';
import nestIcon from '@iconify/icons-logos/nodejs-icon-alt';
import { About as AboutData } from '../data.d';

interface AboutProps {
  data: AboutData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <section id="about">
      <div className="col-md-12">
        <h1>
          <span>About</span>
        </h1>
        <div className="row center mx-auto mb-5">
          <div className="col-md-4 mb-5 center">
            <div className="polaroid">
              <span style={{ cursor: 'auto' }}>
                <img
                  height="300px"
                  src={`images/${data.image}`}
                  alt="Avatar placeholder"
                />
                <Icon
                  icon={reactIcon}
                  style={{ fontSize: '450%', margin: '9% 5% 0 5%' }}
                />
                <Icon
                  icon={nestIcon}
                  style={{ fontSize: '450%', margin: '9% 5% 0 5%' }}
                />
                <Icon
                  icon={appleIcon}
                  style={{ fontSize: '450%', margin: '9% 5% 0 5%' }}
                />
              </span>
            </div>
          </div>

          <div className="col-md-8 left">
            <div className="col-md-10">
              <div className="card">
                <div className="card-header">
                  <span
                    className="iconify"
                    data-icon="emojione:red-circle"
                    data-inline="false"
                  ></span>{' '}
                  &nbsp;{' '}
                  <span
                    className="iconify"
                    data-icon="twemoji:yellow-circle"
                    data-inline="false"
                  ></span>{' '}
                  &nbsp;{' '}
                  <span
                    className="iconify"
                    data-icon="twemoji:green-circle"
                    data-inline="false"
                  ></span>
                </div>
                <div
                  className="card-body font-trebuchet text-justify ml-3 mr-3"
                  style={{
                    height: 'auto',
                    fontSize: '145%',
                    lineHeight: '200%',
                  }}
                >
                  <br />
                  <span className="wave">{data.title} :) </span>
                  <br />
                  <br />
                  {data.description.map(text => (
                    <>
                      {text}
                      <br />
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
