import React from 'react';
import Slider from 'react-slick';
import Product from '../product/index';
import './styles.scss';

function ProductsList({
  products,
  listProductsCustom,
  colStyles = 'col-6 col-md-6 col-sm-6 col-xs-6 col-lg-6 col-xl-4 mb-3 mt-2',
  isSlider = false,
  width,
  prevPath,
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  const listProducts = products;
  let rootContent =
    listProducts &&
    listProducts.map((product) => (
      <Product
        key={product.node.id}
        product={product.node}
        colStyles={colStyles}
        listProductsCustom={listProductsCustom}
        categories={product.node.categories}
        width={width}
        prevPath={prevPath}
      />
    ));
  return (
    <div className='container product-list-container'>
      <div className='row justify-content-center'>
        {width < 575 && isSlider ? (
          <Slider {...settings} className='col-12'>
            {rootContent}
          </Slider>
        ) : (
          rootContent
        )}
      </div>
    </div>
  );
}

export default ProductsList;
