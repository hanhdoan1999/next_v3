import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import BannerTop from "../../../common/BannerTop";
import "./styles.scss";

function ProjectBanner() {
  const bannerURL = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "banner-project.png" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 100, maxHeight: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className='products-banner'>
      <BannerTop
        bannerURL={bannerURL}
        cateName='Project'
        cateDesc={`We're excited to share with you some of the hospitality venues we've helped to transform.`}
      />
    </div>
  );
}

export default ProjectBanner;
