import { element } from "prop-types";
import React, { useEffect, useState } from "react";
import "./styles.scss";
function FooterInfo({ data_left_menu }) {
  const data_info_list = data_left_menu?.menu_info?.edges;
  return (
    <div className="info__list">
      {data_info_list.map((el, index) => (
        <a key={index} href={el?.node?.path}>
          {el?.node?.label}
        </a>
      ))}
    </div>
  );
}

export default FooterInfo;
