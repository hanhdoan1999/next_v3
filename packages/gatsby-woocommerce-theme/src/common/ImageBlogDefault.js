import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const ImageBlogDefault = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "image-blog-default.png" }) {
        childImageSharp {
          fluid(maxWidth: 370) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Img width='370' fluid={data.placeholderImage.childImageSharp.fluid} />
  );
};

export default ImageBlogDefault;
