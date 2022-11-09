import React from 'react';
import ProjectCard from '../ProjectCard';
import './styles.scss';

function ProjectCardList({ projects, width = '' }) {
  return (
    <div className='card-columns project-card-list'>
      {projects.map((project, index) => {
        return (
          <ProjectCard
            {...project}
            index={index}
            key={`${project}${project.slug}`}
            acfProject={project.acfProject}
          />
        );
      })}
    </div>
  );
}

export default ProjectCardList;
