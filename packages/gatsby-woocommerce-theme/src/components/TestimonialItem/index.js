import React from 'react';
import parse from 'html-react-parser';
import './TestimonialItem.scss';
import Vector2 from './Images/Vector2';
import Vector1 from './Images/Vector1';

function TestimonialItem({ testimonialItems }) {
  return (
    <div className='testimonial-item'>
      <div className='testimonial-item_top'>
        <Vector1 />
      </div>
      <div className='testimonial-item_content'>{testimonialItems[0]?.content ? parse(testimonialItems[0].content) : null}</div>
      <div className='testimonial-item_bottom'>
        <div className='testimonial-item_bottom__left'>
          <span className='item-author'>{testimonialItems[0]?.acfTestimonial?.author}</span>
          <span className='item-location'>{testimonialItems[0]?.acfTestimonial?.location}</span>
        </div>
        <div className='testimonial-item_bottom__center'>
          <Vector2 />
        </div>
      </div>
    </div>
  );
}

export default TestimonialItem;
