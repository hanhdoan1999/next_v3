import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import "./styles.scss";
function FooterRange({ range_list }) {
  return (
    <div className='footer__range__list'>
      <span><a href={range_list?.path}>{range_list ? range_list.label : ""}</a>:</span>
      <div>
        <ul>
          {range_list.childItems.nodes.map((e, index) =>
            <a key={index} href={e.path}>{e.label}</a>
          )}
        </ul>
      </div>
    </div>
  );
}

export default FooterRange;
