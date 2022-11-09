import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "./ProductImage.scss";
import { isArray } from "lodash";
export default function GalleryImages({ products, handleChoose, chosen,defaultImage}) {
  const settings = {
    dots: false,
    speed: 500,
    infinite: products && products?.length >= 3 ? true : false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true,
  };
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.slickGoTo(chosen);
    }
  }, [chosen]);
  return (
    <div className="product-images">
      <div className="product-images_chosen">
        {isArray(products) || defaultImage ? (
          <GatsbyImage image={getImage(products.length > 0 ? products[chosen]?.image?.localFile : defaultImage?.localFile)} />
        ) : null}
      </div>
      <Slider
        {...settings}
        className="product-images_selector-wrapper"
        ref={ref}
      >
        {products?.map((product, index) => {
          return (
            <div
              key={index}
              className={
                chosen === index
                  ? "product-images_selector chosen_atv"
                  : "product-images_selector"
              }
              onClick={() => handleChoose(index)}
            >
              <div className="product-images_selector_item">
                {isArray(products) && products.length > 0 ? (
                  <GatsbyImage image={getImage(product?.image?.localFile)} />
                ) : null}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
