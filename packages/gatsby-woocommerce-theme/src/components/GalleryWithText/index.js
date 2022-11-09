import React from 'react'
import { Col, Row } from 'react-bootstrap';
import TextBox from '../TextBox';
import parse from 'html-react-parser';
import { Link } from "gatsby";
import '../GalleryWithText/styles.scss';

function GalleryWithText({ heading, images, text, moreLink }) {
    return (
        <div className="gallery-with-text">
            <TextBox heading={heading} textColor={"#000000"} bg={'#E1D7CA'} />
            <div className='gallery-with-text_content'>
                {images?.map((el, index) => {
                    return (
                        <div className='gallery-with-text_content-img' key={index}>
                            <img src={el.image.sourceUrl} alt="" />
                        </div>
                    )
                })}
            </div>
            <div className='gallery-with-text_title'>
                {parse(text)}
                {moreLink ? <a href={moreLink}>more</a> : null}
            </div>

        </div>
    )
}

export default GalleryWithText;