import { Link } from "gatsby";
import React from "react";
import Slider from "react-slick";
import POLICY_LIST from "./data";
import "./style.scss";

function ClientPolicy({ width, isCorporate = false }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  let rootContent = POLICY_LIST.map((item, index) => {
    let IconComponent = item.iconComponent;
    return (
      <Link
        to={item.slug}
        className={`col-xs-6 col-12 col-sm-2 col-md-2 col-lg-2 policy-item ${
          index === 0 && "active-border"
        }`}
        key={index}
      >
        <div className='wrapper_icon d-flex align-items-center justify-content-center flex-column'>
          <IconComponent />
          <p className='title-icon'>{item.name}</p>
        </div>
      </Link>
    );
  });

  let mainContent = <div className='row row-info-policy'>{rootContent}</div>;
  if (width <= 575) {
    mainContent = (
      <div className='container'>
        <Slider {...settings} className='row'>
          {rootContent}
        </Slider>
      </div>
    );
  }
  return (
    <div className={`client-policy ${isCorporate ? "client-corporate" : ""}`}>
      <div className='container item-container'>{mainContent}</div>
    </div>
  );
}

export default ClientPolicy;
