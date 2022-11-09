import React from "react";
import "./PromoBanner.scss";
import TextBox from "../TextBox/index";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { navigate } from "gatsby";

function PromoBanner({ heading, promoBanner }) {
  return (
    <div className="promo-banner">
      <TextBox heading={heading} textColor={"#000000"} bg={"#e1d7ca"}></TextBox>
      <div className="promo-banner_products">
        <div className="promo-banner_content1">
          {promoBanner?.map((el, index) => (
                <div
                  className="promo-banner_content1-top"
                  style={{ backgroundColor: el.backgroundColor }}
                  key={index}
                  onClick={() => navigate(el.link ? el.link : "")}
                >
                  <div className="promo-banner_content1-top-content">
                    <div className="promo-banner_content1-top-text">
                      {el.text}
                    </div>
                    <div className="promo-img">
                      <LazyLoadImage
                        alt=""
                        src={el.image.sourceUrl}
                        effect="blur"
                        width={"100%"}
                      />
                    </div>
                    {/* <img src={el.image.sourceUrl} alt="" /> */}
                  </div>
                </div>
              ))
            }
        </div>
      </div>
    </div>
  );
}
export default PromoBanner;
