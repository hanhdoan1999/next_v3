import { Link } from 'gatsby';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ImageBlogDefault from '../../../common/ImageBlogDefault';
import ArrowRight from '../../icons/ArrowRight';
import './styles.scss';

function ProjectCard({ featuredImage, date, title, acfProject, index, slug }) {
  return (
    <div className='project-card card'>
      {acfProject ? (
        <Link
          to={`/projects/industry/${
            acfProject &&
            acfProject.industry.length &&
            acfProject.industry.length > 0
              ? acfProject.industry.join('&') + '/'
              : ''
          }${slug}`}
        >
          <div className='project-card-inner'>
            {featuredImage && featuredImage.node ? (
              <LazyLoadImage
                className='project-card-img'
                src={featuredImage.node.mediaItemUrl}
                alt={featuredImage.node.altText}
                effect='blur'
              />
            ) : (
              <ImageBlogDefault className='' />
            )}
          </div>
          <div className='card-body d-flex justify-content-between'>
            <div className='left-part'>
              <h3 className='card-title'>{title}</h3>
              <p className='card-text'>{date}</p>
            </div>
            <div className='right-part'>
              <ArrowRight />
            </div>
          </div>
        </Link>
      ) : (
        <Link to={`/projects/${slug}`}>
          <div className='project-card-inner'>
            {featuredImage && featuredImage.node ? (
              <LazyLoadImage
                className='project-card-img'
                src={featuredImage.node.mediaItemUrl}
                alt={featuredImage.node.altText}
                effect='blur'
              />
            ) : (
              <ImageBlogDefault className='' />
            )}
          </div>
          <div className='card-body d-flex justify-content-between'>
            <div className='left-part'>
              <h3 className='card-title'>{title}</h3>
              <p className='card-text'>{date}</p>
            </div>
            <div className='right-part'>
              <ArrowRight />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default ProjectCard;
