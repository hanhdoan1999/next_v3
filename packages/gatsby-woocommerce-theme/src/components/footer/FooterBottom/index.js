import React from 'react'
import "./styles.scss"
import Facebook from "./images/Facebook";
import Instagram from "./images/Instagram";
import Youtube from "./images/Youtube";
import Linkedin from "./images/Linkedin";
import Twitter from "./images/Twitter";
import Pinterest from "./images/Pinterest";
import parse from 'html-react-parser';
export default function Index({ data_footer_bottom }) {
  return (
    <div className='wrap__footer__bottom'>
      <div className='wrap__footer__bottom__icon'>
        <a href={data_footer_bottom.pinterest}><Pinterest /></a>
        <a href={data_footer_bottom.youtube}><Youtube /></a>
        <a href={data_footer_bottom.twitter}><Twitter /></a>
        <a href={data_footer_bottom.facebook}><Facebook /></a>
        <a href={data_footer_bottom.linkedin}> <Linkedin /></a>
        <a href={data_footer_bottom.instagram}><Instagram /></a>
      </div>
      <div className='wrap__footer__bottom__content'>
        {parse(data_footer_bottom.copyright)}
      </div>
    </div>
  )
}

