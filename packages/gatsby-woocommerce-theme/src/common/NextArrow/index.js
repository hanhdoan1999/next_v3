import React from "react";
import ArrowRightLong from "../../components/icons/ArrowRightLong";
import "./styles.scss";
/* eslint-disable */
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <ArrowRightLong color='#2AA0F5' />
    </div>
  );
}
/* eslint-disable */
export default NextArrow;
