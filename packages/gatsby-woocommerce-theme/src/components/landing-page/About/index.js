import { Link } from "gatsby";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SectionTitleBar from "../../../common/SectionTitleBar";
import ChairIcon from "../../icons/ChairIcon";
import ContractIcon from "../../icons/ContractIcon";
import FemaleCallCenterIcon from "../../icons/FemaleCallCenterIcon";
import "./styles.scss";

function About({ content, title, video, image }) {
  return (
    <div className='landing-about section'>
      <div className='container'>
        <SectionTitleBar
          title={title}
          buttonText='view range'
          slug='products'
        />
        <div className='row'>
          <div className='col-md-6 col-lg-6 col-xs-12'>
            <div
              className='landing-about-content'
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <Link className='read-more-btn' to='/products'>
              <button className='btn btn-primary'>READ MORE</button>
            </Link>
            <div className='icon-content d-flex'>
              <Link className='item text-center' to='/products'>
                <ChairIcon />
                <div>Browse our range</div>
              </Link>
              <Link to='/contact-us' className='item text-center'>
                <FemaleCallCenterIcon />
                <div>Contact us to tailor a solution to suit your café</div>
              </Link>
              <div className='item text-center'>
                <ContractIcon />
                <div>Get a free 24-hour quote</div>
              </div>
            </div>
          </div>
          <div className='col-md-6 col-lg-6 col-xs-12'>
            <div className='banner-carousel__right'>
              {video ? (
                <div className='video-responsive video'>
                  <iframe
                    width='100%'
                    height='500'
                    src={video}
                    title='YouTube video player'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    webkitallowfullscreen='true'
                    mozallowfullscreen='true'
                    allowFullScreen
                  />
                </div>
              ) : (
                <LazyLoadImage
                  src={image ? image.mediaItemUrl : ""}
                  alt={image ? image.altText : ""}
                  effect='blur'
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
