import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ArrowRight from '../../components/icons/ArrowRight';
import './style.scss';

BannerTop.propTypes = {
  cateName: PropTypes.string,
  cateDesc: PropTypes.string,
};

function BannerTop({
  cateName,
  cateDesc,
  bannerURL,
  remoteImage = '',
  showClient = false,
  topSubtitle = '',
}) {
  return (
    <div className='banner-top'>
      <div className='bg-img'>
        {remoteImage ? (
          <LazyLoadImage
            src={remoteImage.mediaItemUrl || remoteImage}
            alt={remoteImage.altText}
            effect='blur'
          />
        ) : (
          <Img
            width='1920'
            height='600'
            fluid={bannerURL?.placeholderImage.childImageSharp.fluid}
          />
        )}
      </div>
      <div className='container'>
        {topSubtitle && <p className='top-subtitle'>{topSubtitle}</p>}
        <h1 className='products-banner-title'>{cateName}</h1>
        <p className='products-banner-text'>{cateDesc}</p>
        {showClient && (
          <div className='meet-client d-flex align-items-center justify-content-center'>
            <span className='client-link'>Meet our client</span>
            <div className='arrow'>
              <ArrowRight />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BannerTop;
