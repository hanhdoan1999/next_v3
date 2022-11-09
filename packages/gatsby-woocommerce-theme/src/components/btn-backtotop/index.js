import React, { useEffect, useState } from 'react'
import { BsArrowUp } from "react-icons/bs";
import "./btnbacktotop.scss"
import Backtotop from './backtotop';
export default function Index() {
  const [scroll, setScroll] = useState(false)
  const scrollToTop = () => {
    typeof window !== null && window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (typeof window !== null && window.pageYOffset > 200) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    typeof window !== null && window.addEventListener("scroll", toggleVisibility);

    return () => typeof window !== null && window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <>
      {
        scroll === true ? <div className='wrap-btn__backtotop'>
          <div onClick={() => scrollToTop()} className='icon'>
            <Backtotop />
          </div>
          <p>Back</p>
          <br />
          <p>to top</p>
        </div> : ""
      }
    </>
  )
}
