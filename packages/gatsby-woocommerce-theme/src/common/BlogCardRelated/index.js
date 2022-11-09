import { Link } from "gatsby";
import React, { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CommentIcon from "../../components/icons/CommentIcon";
import ImageBlogDefault from "../ImageBlogDefault";
import "./style.scss";

function BlogCardRelated({ item }) {
  return (
    <div className='col-12 col-sm-12 col-md-4 col-lg-4 card-container'>
      <Link to={`/blog/${item.slug}`}>
        <div className='card-blog-related'>
          <div className='blog-img'>
            {item.featuredImage ? (
              <LazyLoadImage
                alt={item.featuredImage.node.altText}
                src={item.featuredImage.node.mediaItemUrl}
                effect='blur'
              />
            ) : (
              <ImageBlogDefault />
            )}
          </div>
          <div className='blog-infor'>
            <p className='big-title'>BLOG</p>
            <p className='blog-title'>{item.title}</p>
            <div className='blog-date-and-comment d-flex align-items-center '>
              <span className='date'>{item.date}</span>
              <div className='info-comment d-flex align-items-center'>
                <span className='icon d-flex align-items-center'>
                  <CommentIcon />
                </span>
                <span className='comment'>0 comment</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default memo(BlogCardRelated);
