import React from "react";
import parse from "html-react-parser";
import TextBox from "../TextBox";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import "../inspirationBanner/styles.scss";
function InspirationBanner({ banner, setValue1 }) {
  const title = "Inspiration";
  return (
    <div div className="inspiration_banner">
      {banner.siteOptions.acfInspirationProjectsPage.bannerImage.sourceUrl &&
        <div className="inspiration_banner-image">
          <img src={banner?.siteOptions?.acfInspirationProjectsPage?.bannerImage?.sourceUrl}/>
        </div>
      }
      <TextBox heading={title} textColor={"#ffffff"} bg={"#D22229"} />
      <div className="inspiration_banner-text">
        {banner?.siteOptions?.acfInspirationProjectsPage?.description  &&
          parse(banner?.siteOptions?.acfInspirationProjectsPage?.description)}
        <div className="inspiration_banner-button">
          <button
            id="Case Studies"
            onClick={(e) => setValue1("Case Studies")}
            style={{ width: "155px" }}
          >
            VIEW CASE STUDIES
          </button>
          <button
            id="3D Designs"
            onClick={(e) => setValue1("3D Designs")}
            style={{ width: "132px" }}
          >
            VIEW 3D DESIGNS
          </button>
          <button
            id="Articles"
            onClick={(e) => setValue1("Articles")}
            style={{ width: "132px" }}
          >
            VIEW ARTICLES
          </button>
          <button
            id="all"
            onClick={(e) => setValue1("All")}
            style={{ width: "132px" }}
          >
            VIEW ALL
          </button>
        </div>
      </div>
    </div>
  );
}

export default InspirationBanner;
