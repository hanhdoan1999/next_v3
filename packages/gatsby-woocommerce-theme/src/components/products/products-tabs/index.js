import { Link } from 'gatsby';
import React, { memo } from 'react';
import './styles.scss';

function ProductsTabs({ listTabs }) {
  ///
  const isActive =
    (className, invalidPaths, index) =>
    ({ location }) => {
      const activeClassName = { className: `${className} active-tab` };
      if (
        location.pathname.includes(invalidPaths) ||
        (location.pathname.includes('/products/') && index === 0) ||
        (location.pathname.includes('/products') && index === 0)
      )
        return activeClassName;
      return { className };
    };

  return (
    <div className='products-tabs container'>
      <div className='row'>
        <div className='left-products col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          <div className='tab-title'>Shop by</div>
        </div>
        <div className='right-products tabs-container col-xs-3 col-sm-9 col-md-9 col-lg-9'>
          <ul className='tabs-list align-items-center'>
            {listTabs.map((tab, index) => {
              return (
                <Link
                  key={tab.id}
                  getProps={isActive(
                    'text tab-item text-center',
                    tab.title.toLowerCase(),
                    index
                  )}
                  to={`${
                    tab.title.toLowerCase() === 'all'
                      ? '/products/'
                      : '/product-category/'.concat(tab.title.toLowerCase())
                  }`}
                  data-cate={tab.title}
                >
                  {tab.title}
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductsTabs);
