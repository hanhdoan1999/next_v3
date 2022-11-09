import { Link } from "gatsby";
import React from "react";
import LIST_BENEFITS from "./data";
import "./styles.scss";

function TheBenefits() {
  return (
    <div className='the-benefits section'>
      <div className='container'>
        <div className='section-title d-flex align-items-center'>
          <h2 className='title'>What's great about working with Nextrend!</h2>
          {/* <p className='sub-title'>UPDATING</p> */}
        </div>
        <div className='section-content row'>
          {LIST_BENEFITS.map((item, index) => {
            let IconComponent = item.iconComponent;
            return (
              <Link
                to={item.slug}
                className={`col-12 col-md-6 col-sm-12 col-xs-12 col-lg-4 col-xl-4 mb-3 mt-2`}
                key={index}
              >
                <div className='col-12 item text-center'>
                  <IconComponent />
                  <h3 className='item-title'>{item.name}</h3>
                  <p className='item-text'>{item.des}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TheBenefits;
