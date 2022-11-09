import { Link } from 'gatsby';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Image from './image';
import './styles.scss';

function HeroBanner({ width, bannerImage, bannerText, bannerTitle }) {
  return (
    <div className='landing-page-banner-hero container'>
      <div className='banner-slide row'>
        <div className='col-md-6 col-lg-6 col-xs-12 banner-image'>
          {bannerImage ? (
            <LazyLoadImage
              alt={bannerImage.altText}
              src={bannerImage.mediaItemUrl}
              effect='blur'
            />
          ) : (
            <Image />
          )}
        </div>
        <div className='col-md-6 col-lg-6 col-xs-12 banner-text'>
          <div className='row hero-info'>
            <div className='col-md-9 col-lg-9 col-xs-12'>
              <h1>{bannerTitle}</h1>
              <p className='small-title-bottom'>{bannerText}</p>
              <Link to='/products'>
                <button className='align-items-center justify-content-center btn btn-primary'>
                  Browse our range
                </button>
              </Link>
            </div>
            <div className='col-md-3 col-lg-3'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
