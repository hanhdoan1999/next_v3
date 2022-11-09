import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React from "react";

const ImageProductDefault = () => {
  const PLACEHOLDER_IMAGE = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "placeholder.png" }) {
        childImageSharp {
          fluid(maxWidth: 570) {
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

export default ImageProductDefault;
