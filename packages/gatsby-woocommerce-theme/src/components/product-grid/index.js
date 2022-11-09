import React from "react";
import TextBox from "../TextBox";
import FeaturedItem from "../featured-product/FeaturedItem";
import "./ProductGrid.scss"
function ProductGrid({ heading, products }) {
  return (
    <div className="product-grid">
      {heading ? <TextBox heading={heading} bg="#e1d7ca" textColor={'#000000'}/> : null}
      <div className="featured-products_product">
        {products?.map((item, index) => {
          return <FeaturedItem sku={item.productSku} slug={item.productSlug} key={index} />;
        })}
      </div>
    </div>
  );
}

export default ProductGrid;
