import React from 'react';
import './styles.scss';
/* eslint-disable */
function ColorsBar({
  colors,
  images,
  handleSelectProductVariant,
  activeColorIndex,
  productId,
}) {
  return (
    <div className='colors-bar d-flex align-items-center'>
      {colors &&
        [...new Set(colors)].map((color, index) => {
          // if (color?.length < 8 && index < 8) {
          return (
            <span
              key={index}
              style={{ background: `${color}` }}
              className={`product-color ${
                activeColorIndex === index ? 'active-color' : ''
              }`}
              data-image_src={images[index]}
              data-product_id={productId}
              data-index={index}
              onClick={handleSelectProductVariant}
            />
          );
          // } else return null;
        })}
    </div>
  );
}

export default ColorsBar;
