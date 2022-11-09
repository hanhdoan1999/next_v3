import React from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import useTestimonials from "../../../hooks/useTestimonials";
import { getFormattedDate } from "../../../utils/functions";
import "./style.scss";

function Testimonials({ background = false }) {
  const testimonials = useTestimonials();

  return (
    <div
      className={`testimonials section ${
        !background ? "testimonials-container" : "corporate-testimonials"
      }`}
    >
      <div className={`container text-center show corporate-testimonials`}>
        <h3 className='title'>Our Happy Customers</h3>
        <p className='sub-title'>
          Don’t just take our word for it – we have many testimonials from
          satisfied customers from all over Australia.
        </p>
      </div>
      <div className='container container-wrapper d-flex align-items-center'>
        <div className='row list-testimonials d-flex align-items-center'>
          {testimonials &&
            testimonials?.map((item, index) => {
              return (
                <div
                  className={`col-12 col-sm-12 col-md-4 col-lg-4 card-container d-flex align-items-center justify-content-center
                  ${index === 1 && "center-card"}`}
                  key={index}
                >
                  <div
                    className='card-quote'
                    // ${
                    //   index === 1 && "card-quote__white"
                    // }
                  >
                    <p className='title'>
                      {item.content.length > 80
                        ? item.content.substr(0, 80).concat("...")
                        : item.content}
                    </p>
                    <div className='stars'>
                      {Array.from({ length: item.rating }).map((i, index) => {
                        return index < item.rating ? (
                          <BsStarFill key={index} />
                        ) : (
                          <BsStarHalf key={index} />
                        );
                      })}
                    </div>
                    <div className='date-review'>
                      {getFormattedDate(new Date(item.date))}
                    </div>
                    <div className='info-client'>
                      <span className='name-client'>{item.author}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
