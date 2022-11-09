import React, { Fragment, useEffect, useState } from 'react';
import { CgChevronDoubleRight } from 'react-icons/cg';
import BannerPopupDetails from '../banner-popup-details';
import Image from './image';
import { PRODUCT_DETAILS } from './product-details-data';
import './style.scss';

function BannerCarousel() {
  const [isLeft, setIsLeft] = useState(false);
  const [scrollEl, setScrollEl] = useState('');

  useEffect(() => {
    setScrollEl(document?.querySelector('.block-categories'));
  }, []);

  const scrollToSection = () => {
    window.scrollTo({ top: scrollEl?.offsetTop - 80, behavior: 'smooth' });
  };

  const handleToggleBanner = (e) => {
    const btnPosition = e.target.dataset.position;
    const detailsPopupList = document.querySelectorAll(
      '.popup-product-details'
    );

    [...detailsPopupList].map((item) => item.classList.remove('active'));

    if (isLeft && btnPosition === 'right') {
      setIsLeft(false);
    }
    if (!isLeft && btnPosition === 'left') {
      setIsLeft(true);
    }
  };

  const handleToggleDetails = (e) => {
    const productDetailElement = document.querySelector(
      `.popup-product-details.${e.target.dataset.position}`
    );

    productDetailElement.classList.toggle('active');
  };

  const handleCloseDetails = (e) => {
    const productDetailElement = document.querySelector(
      `.popup-product-details.${
        e.target.closest('.close-btn-banner').dataset.position
      }`
    );
    productDetailElement.classList.remove('active');
  };

  return (
    <div className='banner-carousel'>
      <div className='bg-img'>
        <Image />
      </div>

      <div className='container'>
        <div className='item container'>
          <div className='row banner-row'>
            <div
              className={`col-md-5 col-lg-5 col-xs-12 m-0 p-0 d-flex align-items-center block-info ${
                isLeft ? 'slide-in' : 'slide-out'
              }`}
            >
              <div className='banner-carousel__left'>
                <p className='small-title-top'>
                  Commercial hospitality furniture
                </p>
                <h1>Create your Venue, your Space, your Way.</h1>
                <p className='small-title-bottom'>
                  We import, stock and supply thousands of venues Australia wide
                  yearly with quality long lasting furniture.
                </p>
                <div>
                  <button
                    className='buy-now d-flex align-items-center justify-content-center'
                    onClick={scrollToSection}
                  >
                    DISCOVER OUR FURNITURE RANGE
                    <CgChevronDoubleRight />
                  </button>
                </div>
              </div>
            </div>

            <div className='navigate-btn-container d-flex'>
              <button
                className={`indoor-btn btn ${isLeft ? 'active' : 'un-active'}`}
                data-position='left'
                onClick={handleToggleBanner}
              >
                INDOOR
              </button>
              <span>/</span>
              <button
                className={`outdoor-btn btn ${isLeft ? 'un-active' : 'active'}`}
                data-position='right'
                onClick={handleToggleBanner}
              >
                OUTDOOR
              </button>
            </div>
            <div className='products-details-container'>
              {PRODUCT_DETAILS.map((product, index) => {
                const isActive =
                  (isLeft && product.position.split('-')[0] === 'left') ||
                  (!isLeft && product.position.split('-')[0] === 'right');
                return (
                  <Fragment key={index}>
                    <button
                      className={`btn expand-btn ${product.position} ${
                        isActive ? 'active' : 'un-active'
                      }`}
                      data-position={product.position}
                      onClick={handleToggleDetails}
                    >
                      +
                    </button>
                    <BannerPopupDetails
                      productName={product.productName}
                      colors={product.colors}
                      position={product.position}
                      key={index}
                      isLeft={isLeft}
                      arrow={product.arrow}
                      handleCloseDetails={handleCloseDetails}
                      slug={product.slug}
                    />
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerCarousel;
