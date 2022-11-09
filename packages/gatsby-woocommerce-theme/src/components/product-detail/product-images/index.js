import React, { Fragment, useEffect, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Slider from 'react-slick';
import ImageProductDefault from '../../../common/ImageProductDefault';
import './styles.scss';

function ProductImages({ images, displayImage, width, groupedProducts }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const productImages =
    images && images.length >= 0
      ? [...images, new Array(4).fill(0)]
          .flat()
          .slice(1, images.length > 12 ? 12 : images.length)
      : new Array(4).fill(0);
  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = displayImage;
  });

  const activeImage = (_, otherImages, index) => {
    return otherImages[index] ? (
      <img
        src={otherImages[index]}
        alt={otherImages[index]}
        className='product-img active-img'
      />
    ) : (
      <ImageProductDefault alt='image place holder' className='product-img' />
    );
  };

  return (
    <Fragment>
      {groupedProducts === null ? (
        <div className='product-images-container'>
          <div className='active-product-image'>
            <LazyLoadImage src={images[2]} alt={images[2]} effect='blur' />
          </div>
        </div>
      ) : (
        <>
          {width > 575 ? (
            <div className='product-images-container'>
              <div className='active-product-image'>
                {activeImage(displayImage, productImages, activeImgIndex)}
              </div>
              <div className='product-images'>
                {productImages.map(
                  (img, index) =>
                    img && (
                      <LazyLoadImage
                        src={img}
                        alt={img}
                        className={`product-img ${
                          activeImgIndex === index ? 'active' : null
                        }`}
                        key={img}
                        data-index={index}
                        onClick={() => setActiveImgIndex(index)}
                        effect='blur'
                      />
                    )
                )}
              </div>
            </div>
          ) : (
            <Slider {...settings} className='product-images-slider'>
              {productImages.map((img, index) => {
                return (
                  <img
                    src={img}
                    alt={img}
                    className={`product-img ${
                      activeImgIndex === index ? 'active' : null
                    }`}
                    key={img}
                    data-index={index}
                  />
                );
              })}
            </Slider>
          )}
        </>
      )}
    </Fragment>
  );
}

export default ProductImages;
