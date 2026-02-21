'use client';

import React from 'react';
import { Modal } from 'react-bootstrap';
import AwesomeSlider from 'react-awesome-slider';
import { Icon } from '@iconify/react';
import { Project } from '@/data/data';

interface ProjectDetailsModalProps {
  show: boolean;
  onHide: () => void;
  data: Project | null;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  show,
  onHide,
  data,
}) => {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
      className="modal-inside"
    >
      <span
        onClick={onHide}
        className="modal-close"
        style={{ display: 'block', position: 'relative', zIndex: 1000 }}
      >
        <Icon
          icon="mdi:close"
          className="close-icon"
          style={{ fontSize: '2.5rem', display: 'inline-block' }}
        />
      </span>
      <div className="col-md-12">
        <div
          className="col-md-10 mx-auto"
          style={{
            paddingBottom: '30px',
            paddingTop: '10px',
            padding: '10px 15px 30px',
          }}
        >
          <div className="slider-tab">
            <Icon
              icon="emojione:red-circle"
              className="slider-iconfiy"
              inline={true}
              style={{ marginLeft: '5px' }}
            />{' '}
            &nbsp;{' '}
            <Icon
              icon="twemoji:yellow-circle"
              className="slider-iconfiy"
              inline={true}
            />{' '}
            &nbsp;{' '}
            <Icon
              icon="twemoji:green-circle"
              className="slider-iconfiy"
              inline={true}
            />
          </div>
          <AwesomeSlider
            animation="scaleOutAnimation"
            className="slider-image"
            style={{
              aspectRatio: '16 / 9',
              maxWidth: '100%',
            }}
          >
            {data?.images.map((elem, i) => (
              <div
                key={i}
                data-src={`/images/portfolio/${data.slug}/${elem}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                }}
              />
            ))}
          </AwesomeSlider>
        </div>
        <div className="col-md-10 mx-auto" style={{ padding: '0 15px' }}>
          <h3 style={{ padding: '15px 5px 10px 5px' }}>
            {data?.title}
            <a
              href={data?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-href"
            >
              <i
                className="fas fa-external-link-alt"
                style={{ marginLeft: '10px' }}
              ></i>
            </a>
          </h3>
          <p className="modal-description">{data?.description}</p>
          <div className="col-md-12 text-center" style={{}}>
            <ul
              className="list-inline mx-auto"
              style={{ marginBottom: '30px', paddingTop: '10px' }}
            >
              {data?.technologies.map((technology, i) => (
                <li className="list-inline-item mx-3" key={i}>
                  <span>
                    <div className="text-center">
                      <i
                        className={`${technology.class} skills-icon`}
                        style={{ fontSize: '300%' }}
                      >
                        <p
                          className="text-center"
                          style={{
                            fontSize: '38%',
                            fontWeight: 300,
                          }}
                        >
                          {technology.name}
                        </p>
                      </i>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectDetailsModal;
