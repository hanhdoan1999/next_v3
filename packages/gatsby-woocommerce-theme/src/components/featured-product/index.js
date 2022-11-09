import React from "react";
import parse from "html-react-parser";
import FeaturedItem from "./FeaturedItem"
import { navigate } from "gatsby";
import "./FeaturedProduct.scss"
function FeaturedProduct({ description, heading, products,button }) {
  return (
    <div className="featured-products">
      {heading ? (
        <h4 className="featured-products_heading">{heading}</h4>
      ) : null}
      {description ? parse(description) : null}
      <h4 className="featured-products_heading">Products used</h4>
      <div className="featured-products_product">
        {products?.map((item, index) => {
          return (
            <FeaturedItem sku={item.productSku} slug={item.productSlug} key={index} type="2"/>
          );
        })}
      </div>
      <div className="link-page-button">
            <button type="button" onClick={() => navigate(`${button.url}`)}>
            {button.text}
            </button>
      </div>
    </div>
  );
}

export default FeaturedProduct;
