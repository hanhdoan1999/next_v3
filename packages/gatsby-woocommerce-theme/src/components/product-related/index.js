import React, { useState } from "react";
import TextBox from "../TextBox";
import ProductRelatedItem from "./ProductRelatedItem";
import FeaturedItem from "../../components/featured-product/FeaturedItem"
import Slider from "react-slick";
import { isArray } from "lodash";
import "./ProductRelated.scss";
function ProductRelated({ data }) {
  const settings = {
    dots: false,
    speed: 500,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: false,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {isArray(data.nodes) && data.nodes.length > 0 &&
        <div className="product-related">
          <TextBox heading="You may also like" bg={"#e7e4e0"} marginBottom="20px"/>
          <Slider {...settings} className="product-related_slider">
            {data?.nodes?.map((item, index) => {
              return <ProductRelatedItem sku={item.sku} name={item.name} slug={item.slug} key={index} />;
            })}
          </Slider>
        </div>
      }
    </>
  );
}

export default ProductRelated;
