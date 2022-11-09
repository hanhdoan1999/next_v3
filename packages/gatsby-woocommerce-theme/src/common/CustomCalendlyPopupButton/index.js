import React, { Fragment, useState } from "react";
import { openPopupWidget } from "react-calendly";
import "./styles.scss";
/* eslint-disable */

const CustomCalendlyPopupButton = ({
  url,
  prefill,
  pageSettings,
  utm,
  title,
  content,
  calendlyOneLine,
  isCalendlyOneLine,
}) => {
  const handleOpenPopupWidget = () => {
    openPopupWidget({ url, prefill, pageSettings, utm });
  };
  return (
    <div className="you_may_product_quote-button" onClick={handleOpenPopupWidget}>
        <button
        >
                Book appointment
        </button>
    </div>
  );
};

export default CustomCalendlyPopupButton;
