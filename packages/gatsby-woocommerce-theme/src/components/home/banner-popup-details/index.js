import { Link } from "gatsby";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import ArrowRight from "../../icons/ArrowRight";
import "./styles.scss";
/* eslint-disable */
function BannerPopupDetails({
  productName = "",
  colors = [],
  position = "",
  arrow,
  handleCloseDetails,
  slug,
}) {
  return (
    <div className={`popup-product-details ${arrow} ${position}`}>
      <span
        className={`close-btn-banner ${position}`}
        data-position={position}
        onClick={handleCloseDetails}
      >
        <AiFillCloseCircle />
      </span>
      <div className='product-name'>
        <Link to={slug}>
          <span>{productName}</span>
          <ArrowRight />
        </Link>
      </div>
      <div className='colors-bar d-flex align-items-center'>
        {colors.map((color, index) => {
          return (
            <span
              key={index}
              style={{ backgroundColor: `${color}` }}
              className='product-color'
            />
          );
        })}
      </div>
    </div>
  );
}

export default BannerPopupDetails;
