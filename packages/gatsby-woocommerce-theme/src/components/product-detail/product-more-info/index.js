import React from "react";
import "./styles.scss";

function ProductMoreInfo({ videoDescription, videoLink, videoTitle }) {
  return (
    <div className='more-info-container'>
      <h1 className='more-info-title'>{videoTitle}</h1>
      <hr />
      <div className='row'>
        <div className='more-info-video col-lg-6 log-md-6 col-ms-6'>
          <div className='video-responsive video'>
            <iframe
              width='100%'
              height='300'
              src={videoLink}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              webkitallowfullscreen='true'
              mozallowfullscreen='true'
              allowFullScreen
            />
          </div>
        </div>
        <div className='more-info-text col-lg-6 log-md-6 col-ms-6'>
          <p>{videoDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductMoreInfo;
