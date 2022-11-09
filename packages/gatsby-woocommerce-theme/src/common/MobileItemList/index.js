import { Link } from "gatsby";
import React from "react";
import "./styles.scss";

function MobileItemList({ listItem, width, listTitle , dir }) {
  return (
    <div className='main-blog-mobile'>
      <div className='latest-post-section container'>
        <h4 className='latest-post-title'>
          { listTitle }
        </h4>
        <div className='latest-post-container'>
          {listItem &&
            listItem.map((item, index) => {
              return (
                <Link to={`/${dir}/${item.slug}`} key={index}>
                  <div className='post-item row'>
                    <div className='col-4 post-image d-flex align-items-center'>
                      <img
                        src={
                          item.featuredImage &&
                          item.featuredImage.node.mediaItemUrl
                        }
                        alt={
                          item.featuredImage && item.featuredImage.node.altText
                        }
                      />
                    </div>
                    <div className='col-8 post-info'>
                      <span className='post-date'>{item.date}</span>
                      <h5 className='post-title'>{item?.title}</h5>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MobileItemList;
