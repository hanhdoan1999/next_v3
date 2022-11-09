import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "Banner_Home.webp" }) {
        childImageSharp {
          fluid(maxWidth: 1920, maxHeight: 700) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Img
      width='1920'
      maxHeight='700'
      fluid={data.placeholderImage.childImageSharp.fluid}
    />
  );
};

export default Image;
