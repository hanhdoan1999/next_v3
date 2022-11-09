import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ProductImages from "../product-images";
import "./styles.scss";

function ProductFeatures({
  meta_Features,
  meta_NextrendIconsWarranty,
  meta_NextrendIconsWaterResistant,
  meta_NextrendIconsUv,
  meta_FurnIconsIndoorOutdoor,
  meta_NextrendIconsCatas,
  meta_NextrendIconsAfrdi,
  meta_NextrendIconsFastDispatch,
  weight__kg_,
  meta_Dimensions,
  meta_Swl,
  meta_NextrendIconsStackable,
  meta_MadeIn,
  images,
  displayImage,
  width,
  meta_Madein,
  meta_Prodhighlights,
  groupedProducts,
}) {
  const [showDetail, setShowDetail] = useState(false);

  const showDetailProduct = () => {
    setShowDetail(!showDetail);
  };

  useEffect(() => {
    if (width > 576) {
      setShowDetail(true);
    } else {
      setShowDetail(false);
    }
  }, [width]);

  return (
    <div className="product-detail-features-container row">
      <div className="col-lg-6 log-md-6 col-ms-6">
        {/* eslint-disable */}
        <div
          type="button"
          className={`mobile-collapse d-flex justify-content-between align-items-center  ${
            width > 576 ? "disable-collapse" : ""
          }`}
          onClick={showDetailProduct}
        >
          <h1 className="title">Features</h1>
          {width < 576 ? (
            <>{showDetail ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}</>
          ) : (
            ""
          )}
        </div>
        <hr />
        {showDetail ? (
          <>
            {meta_Prodhighlights && (
              <div className="feature d-flex justify-content-between">
                <span className="feature-title">Highlights</span>
                <span className="feature-value">
                  <p className="features-text">
                    {width < 576 ? (
                      parse(`${meta_Prodhighlights}`)
                    ) : (
                      <>
                        {parse(`${meta_Prodhighlights}`)
                          .split("|")
                          .map((el, index) => (
                            <span className="my-2 d-block" key={index}>
                              {el}
                            </span>
                          ))}
                      </>
                    )}
                  </p>
                </span>
              </div>
            )}
            {weight__kg_ ? (
              <div className="feature d-flex justify-content-between">
                <span className="feature-title">Weight</span>
                <span className="feature-value">{weight__kg_}</span>
              </div>
            ) : (
              ""
            )}

            {meta_Dimensions ? (
              <div className="feature d-flex justify-content-between">
                <span className="feature-title">Dimensions</span>
                <span className="feature-value">{meta_Dimensions}</span>
              </div>
            ) : (
              ""
            )}

            {meta_Swl && (
              <div className="feature d-flex justify-content-between">
                <span className="feature-title">SWL</span>
                <span className="feature-value">{meta_Swl}</span>
              </div>
            )}

            <div className="feature d-flex justify-content-between">
              <span className="feature-title">Five Years Warranty</span>
              <span className="feature-value">
                {meta_NextrendIconsWarranty === "warranty-05" ? "Yes" : "No"}
              </span>
            </div>
            <div className="feature d-flex justify-content-between">
              <span className="feature-title">Outdoor Use</span>
              <span className="feature-value">
                {meta_FurnIconsIndoorOutdoor === "yes" ? "Yes" : "No"}
              </span>
            </div>
            <div className="feature d-flex justify-content-between">
              <span className="feature-title">Supplied Assembled</span>
              <span className="feature-value">
                {meta_NextrendIconsWarranty === "warranty-05" ? "Yes" : "No"}
              </span>
            </div>
            {meta_NextrendIconsWaterResistant === "yes" && (
              <div className="feature d-flex justify-content-between">
                <span className="feature-title">Weather Resistant</span>
                <span className="feature-value">Yes</span>
              </div>
            )}
            {meta_NextrendIconsUv === "yes" && (
              <div className="feature d-flex justify-content-between">
                <span className="feature-title">UV Stabilised</span>
                <span className="feature-value">Yes</span>
              </div>
            )}
            {meta_NextrendIconsStackable === "yes" && (
              <div className="feature d-flex justify-content-between">
                <span className="feature-title">Stackable</span>
                <span className="feature-value">Yes</span>
              </div>
            )}
            {meta_MadeIn && (
              <div className="feature d-flex justify-content-between">
                <span className="feature-title">Origin</span>
                <span className="feature-value">{meta_MadeIn}</span>
              </div>
            )}
            {meta_NextrendIconsCatas && (
              <div className="feature d-flex justify-content-between">
                <span className="feature-title">CATAS Tested</span>
                <span className="feature-value">{meta_NextrendIconsCatas}</span>
              </div>
            )}
            {meta_NextrendIconsAfrdi && (
              <div className="feature d-flex justify-content-between">
                <span className="feature-title">AFRDI Tested</span>
                <span className="feature-value">{meta_NextrendIconsAfrdi}</span>
              </div>
            )}
            {meta_NextrendIconsFastDispatch && (
              <div className="feature d-flex justify-content-between">
                <span className="feature-title">Fast Dispatch</span>
                <span className="feature-value">
                  {meta_NextrendIconsFastDispatch}
                </span>
              </div>
            )}
            {meta_Madein && (
              <div className="feature d-flex justify-content-between">
                <span className="feature-title">Made In</span>
                <span className="feature-value">
                  <p className="features-text">{parse(`${meta_Madein}`)}</p>
                </span>
              </div>
            )}
          </>
        ) : (
          ""
        )}
      </div>

      <div
        className={`col-lg-6 log-md-6 col-ms-6 ${
          groupedProducts === null ? "marSimpleProduct" : ""
        }`}
      >
        {showDetail ? (
          <ProductImages
            images={images ? images.split(",") : ""}
            displayImage={displayImage}
            width={width}
            groupedProducts={groupedProducts}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ProductFeatures;
