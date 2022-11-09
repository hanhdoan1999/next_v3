import { Link } from "gatsby";
import parse from "html-react-parser";
import React, { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ArrowRight from "../../icons/ArrowRight";
import "./style.scss";

function NewProductRanges({ newProductRanges }) {
  return (
    <div className='new-product-ranges'>
      <div className='new-product-ranges__top'>
        <div className='container'>
          <div className='row top-title d-flex align-items-center justify-content-between'>
            <p className='col-sm-6 col-12 col-md-6 col-lg-6 top-title__left'>
              New Product Ranges
            </p>
            <p className='col-sm-6 col-12 col-md-6 col-lg-6 top-title__right'>
              Looking for the latest Café Chairs, Outdoor Chairs and Dining
              Tables? At Nextrend we are continually adding new products to our
              range.
            </p>
          </div>
        </div>
      </div>

      <div className='new-product-ranges__bottom'>
        <div className='container'>
          <div className='row'>
            {newProductRanges.map((item, index) => (
              <div
                className='col-sm-6 col-6 col-md-4 col-lg-4 range-item-container'
                key={item.title}
              >
                <div className='range-item preston-frames'>
                  <Link to={item.productRange.productRangeLink}>
                    <div className='range-item__image'>
                      <LazyLoadImage
                        src={item.featuredImage.node.mediaItemUrl}
                        alt={item.featuredImage.node.altText}
                        effect='blur'
                      />
                      <div className='range-item__blur'>
                        <div className='body-text'>
                          {parse(`${item.content}`)}
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className='link-to-internal d-flex align-items-center'>
                    <Link to={item.productRange.productRangeLink}>
                      <span>{item.title}</span>
                    </Link>
                    <ArrowRight />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(NewProductRanges);
