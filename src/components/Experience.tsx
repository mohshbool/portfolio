import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Badge from 'react-bootstrap/Badge';
import { Experience as ExperienceData } from 'data.d';

interface ExperienceProps {
  data: ExperienceData[];
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
  return (
    <section id="resume" className="pb-5">
      <div className="col-md-12 mx-auto">
        <div className="col-md-12">
          <h1 className="section-title">
            <span style={{ textAlign: 'center' }}>Experience</span>
          </h1>
        </div>
      </div>
      <div className="col-md-8 mx-auto">
        <VerticalTimeline>
          {data.map((experience, i) => (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date={experience.years}
              iconStyle={{
                background: 'var(--primary-color)',
                color: 'var(--secondary-color)',
                textAlign: 'center',
              }}
              icon={
                <img
                  src={`images/experience/${experience.slug}.png`}
                  aria-placeholder={experience.company}
                  className="experience-logo"
                />
              }
              key={i}
              iconOnClick={() => window.open(experience.companyUrl, '_blank')}
            >
              <h3
                className="vertical-timeline-element-title"
                style={{ textAlign: 'left' }}
              >
                {experience.title}
              </h3>
              <h4
                className="vertical-timeline-element-subtitle"
                style={{ textAlign: 'left' }}
                onClick={() => window.open(experience.companyUrl, '_blank')}
              >
                {experience.company}
              </h4>
              <div style={{ textAlign: 'left', marginTop: '15px' }}>
                {experience.technologies.map((technology, i) => (
                  <Badge
                    pill
                    className="experience-badge mr-2 mb-2"
                    key={i}
                    bg="#f9f5e9"
                  >
                    {technology}
                  </Badge>
                ))}
              </div>
            </VerticalTimelineElement>
          ))}
          <VerticalTimelineElement
            iconStyle={{
              background: 'var(--primary-color)',
              color: '#fff',
              textAlign: 'center',
            }}
            icon={
              <i className="fas fa-hourglass-start mx-auto experience-icon"></i>
            }
          />
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Experience;
