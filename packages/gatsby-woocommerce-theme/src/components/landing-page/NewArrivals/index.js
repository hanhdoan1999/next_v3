import React from "react";
import Slider from "react-slick";
import SectionTitleBar from "../../../common/SectionTitleBar";
import Product from "../../products/product";
import "./styles.scss";

function NewArrivals({ products, width }) {
  const slidesToShow = width > 768 ? 4 : 2;
  const settings = {
    dots: width > 768 ? false : true,
    infinite: true,
    autoplay: false,
    slidesToScroll: slidesToShow,
    slidesToShow: slidesToShow,
  };

  return (
    <div className='new-arrivals container section'>
      <SectionTitleBar
        title='New Arrivals'
        buttonText='View More'
        slug='products'
      />
      <Slider {...settings} className='overflow-hidden'>
        {products.map((product) => (
          <Product
            key={product.node.id}
            product={product.node}
            colStyles='col-12 col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-12 mb-3 mt-2'
            listProductsCustom={products}
            categories={product.node.categories}
            width={width}
          />
        ))}
      </Slider>
    </div>
  );
}

export default NewArrivals;
