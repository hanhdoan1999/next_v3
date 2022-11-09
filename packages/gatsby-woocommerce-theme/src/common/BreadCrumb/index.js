import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import './style.scss';
import parse from 'html-react-parser';

BreadCrumb.propTypes = {
  // inputBreadCrumb: PropTypes.array.isRequired,
  textWhite: PropTypes.bool,
  mrt30: PropTypes.bool,
};

function BreadCrumb({ textWhite, mrt30, inputBreadCrumb = [] }) {
  // const firstItem = {
  //   title: 'Home',
  //   slug: '/',
  // };

  return (
    <div className={`bread-crumb ${mrt30 ? 'mrt-30' : ''}`}>
      <ul className='d-flex align-items-center'>
        {inputBreadCrumb.map((item, index) => {
          return (
            <div key={index} className='d-flex'>
              <Link to={item.slug} className={textWhite ? 'text-white' : ''}>
                {parse(`${item.title}`)}
              </Link>
              {index + 1 === inputBreadCrumb.length ? (
                <span></span>
              ) : (
                <span>|</span>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default BreadCrumb;
