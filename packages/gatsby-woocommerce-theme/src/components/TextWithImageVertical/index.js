import React from "react";
import parse from "html-react-parser";
import TextBox from "../TextBox";
import { navigate } from "gatsby";
import "../TextWithImageVertical/styles.scss";

function TextWithImageVertical({
  image,
  bottomText,
  heading,
  topText,
  topMoreLink,
  bottomMoreLink,
  fullWidthImage,
  bottomMoreText
}) {
  return (
    <div className="text-with-image">
      <div className="text-with-image_wrapper">
        {heading ? <TextBox heading={heading} bg="#e1d7ca" textColor={'#000000'}/> : null}
        <div className="text-with-image_description" id="top-text">
          {topText ? parse(topText) : null}{" "}
          {topMoreLink ? <a href={topMoreLink}>MORE</a> : null}
        </div>
        {fullWidthImage === true ? <div className="text-with-image_img" onClick={() => navigate(topMoreLink ? topMoreLink : "")}>
          <img
            src={image.sourceUrl}
            alt="text-with-image_top_image"
            style={{ width: '100%' }}
          />
        </div>

          : <div className="text-with-image_img" onClick={() => navigate(topMoreLink ? topMoreLink : "")}>
            <img
              src={image?.sourceUrl}
              alt="text-with-image_top_image"
              style={{ width: '50%' }}
            /></div>}
        <div className="text-with-image_description" id="bottom-text">
          {bottomText ? parse(bottomText) : null}{" "}
          {bottomMoreLink ? <a href={bottomMoreLink}>{bottomMoreText}</a> : null}
        </div>
      </div>
    </div>
  );
}

export default TextWithImageVertical;
