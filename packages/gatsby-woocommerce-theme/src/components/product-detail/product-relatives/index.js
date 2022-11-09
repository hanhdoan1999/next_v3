import { Link } from "gatsby";
import React from "react";
import ArrowRight from "../../icons/ArrowRight";
import ProductsList from "../../products/products-list";
import "./styles.scss";

const colStyles =
  "col-6 col-md-6 col-sm-6 col-xs-6 col-lg-6 col-xl-3 mb-3 mt-2";

function ProductRelatives({ products }) {
  return (
    <div className='product-relatives-container'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='product-relatives-title'>you may also like</div>
        <Link to='/products'>
          <span className='see-all-btn'>See all products</span>
          <ArrowRight />
        </Link>
      </div>
      <hr />
      <div className='row'>
        <ProductsList
          products={products && products.slice(0, 4)}
          colStyles={colStyles}
        />
      </div>
    </div>
  );
}

export default ProductRelatives;
