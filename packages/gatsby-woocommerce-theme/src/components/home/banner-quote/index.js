import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import "./style.scss";

function BannerQuote({ width }) {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "Banner_qoute.png" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      placeholderImage1: file(relativePath: { eq: "Banner_quote_mobile.png" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <div className='banner-quote'>
      <div className='banner-quote__bg-image'>
        <Img
          width='1440'
          height='140'
          fluid={data.placeholderImage.childImageSharp.fluid}
          className='image1'
        />
      </div>
      <div className='banner-quote__bg-image-mobile container'>
        <Img
          width='1440'
          height='140'
          fluid={data.placeholderImage1.childImageSharp.fluid}
          className='image2'
        />
      </div>
      <div className='banner-quote__body-text'>
        <p className='small-text text-center'>
          To get the best price for the product, service & support you need
        </p>
        <p className='big-text text-center'>
          Request a Quote or Call 1300 559 965 Today!
        </p>
      </div>
    </div>
  );
}

export default BannerQuote;
