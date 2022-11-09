import { Link } from 'gatsby';
import React, { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SectionTitleBar from '../../../common/SectionTitleBar';
import './style.scss';

function OurProjects({ projectList }) {
  return (
    <div className='our-projects section'>
      <div className='container'>
        <SectionTitleBar
          title='Our Projects'
          buttonText='view all'
          slug='projects'
        />
        <div className='new-product-ranges__bottom'>
          <div className='row'>
            {projectList.map((project, index) => (
              <div className='col-12 col-sm-12 col-md-3 col-lg-3' key={index}>
                <div className='range-item preston-frames'>
                  <div className='range-item__image'>
                    <Link to={`/projects/${project.slug}`}>
                      {project?.featuredImage?.node && (
                        <LazyLoadImage
                          src={project.featuredImage.node.mediaItemUrl}
                          alt={project.featuredImage.node.altText}
                          effect='blur'
                        />
                      )}

                      <div className='range-item__blur'>
                        <div className='body-text'>
                          <span className='plus-icon'>+</span>
                          <p>{project.title}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link to='/projects' className='view-more-btn text-center'>
            <button className='btn btn-primary'>VIEW MORE</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(OurProjects);
