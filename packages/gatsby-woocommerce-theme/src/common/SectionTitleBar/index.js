import { Link } from "gatsby";
import React from "react";
import "./styles.scss";

function SectionTitleBar({ title, buttonText, slug = "landing-page" }) {
  return (
    <div className='row'>
      <div className='col-12 d-flex section-title-bar align-items-center'>
        <h2 className='section-title'>{title}</h2>
        <span className='line'></span>
        <Link to={`/${slug}`}>
          <span className='read-more align-items-center'>{buttonText}</span>
        </Link>
      </div>
    </div>
  );
}

export default SectionTitleBar;
