import React, { useState } from "react";
import Dot from "./image/Dot";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import "./styles.scss";
function Banner({ image, text, products }) {
  const [showPopup, setShowPopup] = useState(-1);
  const { width } = useWindowDimensions();
  return (
    <>
      <div className="banner">
        <img className="banner-background" src={image.sourceUrl} alt="" />
        {products?.map((item, index) => {
          return (
            <div
              className="banner-popup"
              key={index}
              style={{
                position: "absolute",
                top: `${
                  width > 1024
                    ? item.topPostionDesktop
                    : width > 768
                    ? item.topPositionTablet
                    : width < 768
                    ? item.topPositionMobile
                    : 0
                }%`,
                left: `${
                  width > 1024
                    ? item.leftPositionDesktop
                    : width > 768
                    ? item.leftPositionTablet
                    : width < 768
                    ? item.leftPositionMobile
                    : 0
                }%`,
              }}
            >
              <div className="banner-popup_wrapper">
                {showPopup === index && (
                  <div className="banner-popup_image">
                    <div className="banner-popup_image_wrapper">
                      <img
                        src={item.productImage.sourceUrl}
                        alt={item.productName}
                      />
                    </div>
                    <p className="banner-popup_image_name">
                      {item.productName}
                    </p>
                  </div>
                )}
                <div
                  className="banner-marker"
                  onMouseEnter={() => setShowPopup(index)}
                  onMouseLeave={() => setShowPopup(-1)}
                >
                    <Dot color={showPopup === index ? "#D2232A" :"#777777"}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="banner-under-text"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </>
  );
}

export default Banner;
