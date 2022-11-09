import React from 'react';
import { navigate } from 'gatsby';
import TextBox from '../TextBox';
import './Gallery.scss';

function Gallery({ images, heading, bg,projectLink }) {
  return (
    <div className='gallery-component'>
      <TextBox heading={heading} bg={bg} textColor="#ffffff" />
      <div style={{ height: '10px' }}></div>
      <div className='gallery-image'>
        <div className='gallery-image_left' onClick={() => navigate(projectLink ? projectLink : "")}>
          <img src={images[0].image.sourceUrl} alt='Default1' />
        </div>
        <div className='gallery-image_right' onClick={() => navigate(projectLink ? projectLink : "")}>
          <img src={images[1].image.sourceUrl} alt='Default2' />
          <img src={images[2].image.sourceUrl} alt='Default3' />
        </div>
      </div>
    </div>
  );
}

export default Gallery;
