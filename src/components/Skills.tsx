import { Technology } from 'data/data';
import React from 'react';

interface SkillsProps {
  data: Technology[];
  title: string;
}

const Skills: React.FC<SkillsProps> = ({ data, title }) => {
  return (
    <section id="skills">
      <div className="col-md-12">
        <div className="col-md-12">
          <h1 className="section-title">
            <span className="text-white">{title}</span>
          </h1>
        </div>
        <div className="col-md-12 text-center">
          <ul className="list-inline mx-auto skill-icon">
            {data.map((skill, i) => (
              <li className="list-inline-item mx-3" key={i}>
                <span>
                  <div className="text-center skills-tile">
                    <i className={skill.class} style={{ fontSize: '220%' }}>
                      <p
                        className="text-center"
                        style={{ fontSize: '30%', marginTop: '4px' }}
                      >
                        {skill.name}
                      </p>
                    </i>
                  </div>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
