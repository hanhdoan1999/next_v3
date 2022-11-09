import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React from "react";

const ImageBannerDefault = () => {
  const PLACEHOLDER_IMAGE = useStaticQuery(graphql`
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
    <Img
      width='570'
      fluid={PLACEHOLDER_IMAGE.placeholderImage.childImageSharp.fluid}
    />
  );
};

export default ImageBannerDefault;
