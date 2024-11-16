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
          <h1 className="section-title" style={{ color: 'black' }}>
            <span className="text-black" style={{ textAlign: 'center' }}>
              Experience
            </span>
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
                background: '#AE944F',
                color: '#fff',
                textAlign: 'center',
              }}
              icon={
                <i
                  className={`fab ${experience.icon} experience-icon`}
                  aria-placeholder={experience.mainTechnology}
                ></i>
              }
              key={i}
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
                    data-theme={
                      document.querySelector('body')?.dataset['theme']
                    }
                  >
                    {technology}
                  </Badge>
                ))}
              </div>
            </VerticalTimelineElement>
          ))}
          <VerticalTimelineElement
            iconStyle={{
              background: '#AE944F',
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
