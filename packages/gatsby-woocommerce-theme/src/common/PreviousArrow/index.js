import React from "react";
import ArrowLeft from "../../components/icons/ArrowLeft";
import "./styles.scss";
/* eslint-disable */
function PreviousArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <ArrowLeft color='#2AA0F5' />
    </div>
  );
}
export default PreviousArrow;
