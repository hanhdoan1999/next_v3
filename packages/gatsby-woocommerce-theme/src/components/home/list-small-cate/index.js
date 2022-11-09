import { Link } from "gatsby";
import React, { memo } from "react";
import ButtonViewMore from "../../../common/ButtonViewMore";
import LIST_SUB_CATE from "./data";
import "./style.scss";

function ListSmallCate() {
  return (
    <div className='list-small-cate'>
      <div className='container'>
        <div className='row'>
          {LIST_SUB_CATE.map((item) => (
            <div className='col-4 col-sm-4 col-md-2 col-lg-2' key={item.id}>
              <Link
                className={`small-cate-wrapper ${item.backgroundClass}`}
                to={item.slug}
              >
                <p className='title-cate'>{item.name}</p>
              </Link>
            </div>
          ))}
          <div className='col-4 col-sm-4 col-md-2 col-lg-2'>
            <div className='small-cate-wrapper last-item'>
              <ButtonViewMore slug='products' color='#2aa0f5' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ListSmallCate);
