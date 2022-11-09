import React from "react";
import TextBox from "../TextBox";
import parse from "html-react-parser";
import { Link,navigate } from "gatsby";
import "./TextWithImage.scss";
function TextWithImage({ heading, backgroundColor, image, text,moreLink }) {
  return (
    <div className="text-width-image-wrapper">
      {heading && <TextBox heading={heading} bg={"#e1d7ca"} textColor={'#000000'}/>}
      <div style={{ height: "10.34px" }}></div>
      <div className="text-width-image" style={{background:backgroundColor}}>
        <div className="text-width-image_left">
          <div className="text-width-image_left-text">
            {parse(text)}
            {/* <img src={images[0].image.sourceUrl} alt='Default1' /> */}
            {moreLink && <Link to={moreLink}>MORE</Link>}
          </div>
        </div>
        <div className="text-width-image_right" onClick={() => navigate(moreLink ? moreLink : "#")}>
          <img src={image?.sourceUrl} alt="Default1" />
        </div>
      </div>
    </div>
  );
}

export default TextWithImage;
