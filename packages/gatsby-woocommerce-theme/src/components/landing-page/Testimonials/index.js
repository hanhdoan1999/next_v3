import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Slider from "react-slick";
import NextArrow from "../../../common/NextArrow";
import PreviousArrow from "../../../common/PreviousArrow";
import useTestimonials from "../../../hooks/useTestimonials";
import { getFormattedDate } from "../../../utils/functions";
import QuoteIcon from "../../icons/QuoteIcon";
import "./styles.scss";

const settings = {
  dots: false,
  fade: false,
  infinite: true,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PreviousArrow />,
};

function Testimonial({ testimonialImages }) {
  const testimonials = useTestimonials();

  const images = useStaticQuery(graphql`
    query {
      item01: file(relativePath: { eq: "TESTIMONIAL_slide-1.png" }) {
        childImageSharp {
          fluid(maxWidth: 530, maxHeight: 450) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <div className='testimonial section'>
      <div className='container'>
        <h2 className='section-title'>What Our Customers Are Saying</h2>

        <Slider {...settings} className='overflow-hidden landing-slider'>
          {testimonials &&
            testimonials?.map((item, index) => {
              return (
                <div className='testimonial-item' key={index}>
                  <div className='section-content row'>
                    <div className='col-12 col-md-6 col-sm-6 col-xs-6 col-lg-6 col-xl-6 image-content'>
                      <QuoteIcon />
                      {testimonialImages?.[index].mediaItemUrl ? (
                        <LazyLoadImage
                          src={testimonialImages[index].mediaItemUrl}
                          alt={testimonialImages[index].altText}
                        />
                      ) : (
                        <Img
                          width='530'
                          fluid={images.item01.childImageSharp.fluid}
                        />
                      )}
                    </div>
                    <div className='col-12 col-md-6 col-sm-6 col-xs-6 col-lg-6 col-xl-6 text-content'>
                      <p className='title'>{item.content}</p>
                      <p className='customer'>{item.author}</p>
                      <p className='customer-address'>
                        {getFormattedDate(new Date(item.date))}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
}

export default Testimonial;
