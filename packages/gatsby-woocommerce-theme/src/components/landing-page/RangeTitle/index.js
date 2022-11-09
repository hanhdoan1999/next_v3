import React from "react";
import "./styles.scss";

function RageTitle({ title }) {
  return (
    <div className='range-title d-flex align-items-center'>
      <h3 className='title'>{title}</h3>
      <span className='line'></span>
    </div>
  );
}

export default RageTitle;
