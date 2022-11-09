import React, { memo } from "react";
import BlogCardRelated from "../../../common/BlogCardRelated";
import ButtonViewMore from "../../../common/ButtonViewMore";
// import Img from 'gatsby-image';
import "./style.scss";

function Blog({ posts, width }) {
  let amount = width > 575 ? 3 : 1;
  return (
    <div className='container section'>
      <div className='blog'>
        <div className='container list-blog'>
          <div className='row title-and-des'>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
              <p className='big-title-cate'>Blog</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 d-flex flex-end align-items-center'>
              <p className='title-side-right'>
                Looking for the latest Café Chairs, Outdoor Chairs and Dining
                Tables? At Nextrend we are continually adding new products to
                our range.
              </p>
            </div>
          </div>
          <div className='row'>
            {posts.slice(0, amount).map((item, index) => {
              return <BlogCardRelated key={index} item={item} />;
            })}
          </div>
        </div>
        <div className='row view-more-blog'>
          <ButtonViewMore slug='blog' />
        </div>
      </div>
    </div>
  );
}

export default memo(Blog);
