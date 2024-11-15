import React, { useState } from 'react';
import ProjectDetailsModal from './ProjectDetailsModal';
import { Project } from 'data.d';

interface ProjectsProps {
  data: Project[];
}

interface ModalState {
  show: boolean;
  project: Project | null;
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const [modalState, setModalState] = useState<ModalState>({
    show: false,
    project: null,
  });

  const showModal = (project: Project) => {
    setModalState({
      show: true,
      project,
    });
  };

  const closeModal = () => {
    setModalState({
      show: false,
      project: null,
    });
  };

  return (
    <section id="portfolio">
      <div className="col-md-12">
        <h1 className="section-title" style={{ color: 'black' }}>
          <span>Projects</span>
        </h1>
        <div className="col-md-12 mx-auto">
          <div className="row mx-auto">
            {data.map(project => (
              <div
                className="col-sm-12 col-md-6 col-lg-4"
                key={project.title}
                style={{ cursor: 'pointer' }}
              >
                <span className="portfolio-item d-block">
                  <div className="foto" onClick={() => showModal(project)}>
                    <div>
                      <img
                        src={project.images[0]}
                        alt="projectImages"
                        height="230"
                        style={{
                          marginBottom: 0,
                          paddingBottom: 0,
                          position: 'relative',
                        }}
                      />
                      <span className="project-date">{project.startDate}</span>
                      <br />
                      <p className="project-title-settings mt-3">
                        {project.title}
                      </p>
                    </div>
                  </div>
                </span>
              </div>
            ))}
          </div>
        </div>
        <ProjectDetailsModal
          show={modalState.show}
          onHide={closeModal}
          data={modalState.project}
        />
      </div>
    </section>
  );
};

export default Projects;
