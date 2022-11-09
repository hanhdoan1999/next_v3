import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./styles.scss";

function ContactUs({
  handleOpenModal,
  footerImage,
  footerText,
  footerButtonText,
}) {
  const images = useStaticQuery(graphql`
    query {
      item01: file(relativePath: { eq: "CONTACTUS_background.webp" }) {
        childImageSharp {
          fluid(maxWidth: 4000, maxHeight: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <div className='landing-contact-us'>
      {footerImage ? (
        <LazyLoadImage
          src={footerImage.mediaItemUrl}
          alt={footerImage.altText}
          className='footer-image'
          effect='blur'
        />
      ) : (
        <Img
          width='530'
          height='490'
          fluid={images.item01.childImageSharp.fluid}
        />
      )}

      <div className='container text-center landing-contact-us-text'>
        <p className='title'>{footerText}</p>
        <button className='btn btn-primary' onClick={handleOpenModal}>
          {footerButtonText ? footerButtonText : "DOWNLOAD CATALOGUE"}
        </button>
      </div>
    </div>
  );
}

export default ContactUs;
