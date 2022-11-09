import React, { useEffect, useState } from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import FaceBookIcon from "../../components/icons/FaceBookIcon";
import InstagramIcon from "../../components/icons/InstagramIcon";
import TwitterIcon from "../../components/icons/TwitterIcon";
import "./styles.scss";

function ShareButtons() {
  const [href, setHref] = useState("");
  useEffect(() => {
    setHref(window.location.href);
  }, []);

  return (
    <div className='share-product d-flex'>
      <span className='share-to'>Share this product</span>

      <div className='d-flex'>
        <FacebookShareButton url={href}>
          <FaceBookIcon color='#5c5c5c' />
        </FacebookShareButton>

        <TwitterShareButton url={href}>
          <TwitterIcon color='#5c5c5c' />
        </TwitterShareButton>

        <a
          href='https://www.instagram.com/nextrendfurniture'
          target='_blank'
          rel='noreferrer'
        >
          <InstagramIcon />
        </a>
      </div>

      {/* <a
      href='https://twitter.com/nextrendfurn'
      target='_blank'
      rel='noreferrer'
    >
      <TwitterIcon />
    </a>
    <a
      href='https://www.facebook.com/NextrendFurniture'
      target='_blank'
      rel='noreferrer'
    >
      <FaceBookIcon color='#5c5c5c' />
    </a>
    <a
      href='https://www.instagram.com/nextrendfurniture'
      target='_blank'
      rel='noreferrer'
    >
      <InstagramIcon />
    </a> */}
    </div>
  );
}

export default ShareButtons;
