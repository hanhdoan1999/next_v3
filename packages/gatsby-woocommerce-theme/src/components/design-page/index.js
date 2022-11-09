import React from "react";
import "../../components/design-page/styles.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TextBox from "../TextBox/index";
import parse from "html-react-parser";
function DesignPage({ bodyContent, featuredImage, title }) {
  
  return (
    <div className="our-design-wrapper ">
      <div className="our-design-top">
        <div className="our-design-top_image">
          <LazyLoadImage
            alt="default"
            src={featuredImage?.node?.sourceUrl}
            effect="blur"
            width="100%"
          />
        </div>
        <TextBox heading={title} bg={"#d22229"} textColor={"#ffffff"} />
        <div
          className="our-design-top_content"
          style={
            title === "Our story"
              ? { paddingTop: "29px", paddingBottom: "65px" }
              : { paddingTop: "35px", paddingBottom: "32.33px" }
          }
        >
          <div
            className="our-design-top_content__inner"
            style={{ maxWidth: "577px" }}
          >
            {parse(bodyContent)}
          </div>
        </div>
      </div>
    
    </div>
  );
}
export default DesignPage;
