import { Link } from "gatsby";
import parse from "html-react-parser";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CommentIcon from "../../components/icons/CommentIcon";
import ImageBlogDefault from "../ImageBlogDefault";
import arrow from "./images/arrow-long-right.svg";
import "./style.scss";

SingleCard.propTypes = {
  input: PropTypes.object.isRequired,
  indexBlog: PropTypes.number.isRequired,
};

function SingleCard(props) {
  const { indexBlog, input, width } = props;

  const boxReverse =
    indexBlog === 1 || indexBlog === 4 || indexBlog === 7 ? true : false;
  return (
    <div className='col-12 col-sm-6 col-md-4 col-lg-4'>
      <Link to={`/blog/${input.slug}`}>
        <div
          className={`card-blog d-flex  ${
            boxReverse ? "flex-column-reverse" : "flex-column"
          }`}
        >
          <div
            className={`card-blog__image ${
              boxReverse ? "border-radius-reverse" : ""
            }`}
          >
            {input.featuredImage ? (
              <LazyLoadImage
                src={input.featuredImage.node.mediaItemUrl}
                alt={input.featuredImage.node.altText}
                effect='blur'
                className={`image-blog ${
                  boxReverse ? "border-radius-reverse" : ""
                }`}
              />
            ) : (
              <ImageBlogDefault
                className={boxReverse ? "border-radius-reverse" : ""}
              />
            )}
          </div>
          <div
            className={`card-blog__content ${
              boxReverse ? "border-radius-reverse" : ""
            }`}
          >
            <p className='cate-name'>Blog</p>
            <p className='blog-title'>
              {input?.title ||
                "The 10 Most Beautiful Furnished Pubs and Restaurants in Brisbane"}
            </p>
            <div className='date-and-comment d-flex align-items-center  justify-content-start'>
              {width > 575 ? (
                <span className='date'>
                  {input.author.node.name || "Author"}
                </span>
              ) : (
                ""
              )}
              <span className='date'>{input.date || "April 22, 2021"}</span>
              <div className='comment d-flex align-items-center'>
                <span className='icon icon-comment d-flex'>
                  <CommentIcon />
                </span>
                <span className='total-comment'>0 comment</span>
              </div>
            </div>

            <div className='short-desc'>
              {input.excerpt ? (
                <>
                  {(parse(`${input.excerpt}`)[0].props.children[0].length >
                    50 &&
                    parse(`${input.excerpt}`)[0].props.children[0]) ||
                    parse(`${input.excerpt}`)[0].props.children}
                </>
              ) : (
                <p>
                  Lorem ipsum dolor sit amet, sed erant similique forensibus no,
                  eam suas enim forensibus et. Est no dolore malorum
                  conclusionemque. Sea ut tota error soleat. Civibus
                  definitiones sed cut...
                </p>
              )}
            </div>
            {width > 575 ? (
              <Link to='#' className='continue'>
                <span>Continue reading</span>
                <img src={arrow} alt='' />
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default memo(SingleCard);
