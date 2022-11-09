import React from "react";
import Slider from "react-slick";
import "./styles.scss";
import { FiX } from "react-icons/fi";
import ReactPlayer from "react-player";
import videoNotThumbnail from "../../images/videoNotThumbnail.png";
import { GatsbyImage, getImage,getSrc } from "gatsby-plugin-image"

export default function Modal({
  showModal,
  setShowModal,
  listImg,
  type,
  chosenImage,
  featureVideoThumbnail,
  featureVideoUrl,
}) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    initialSlide: Number(chosenImage),
    // responsive: [
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 560,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };
  return (
    <>
      {showModal === false ? (
        ""
      ) : (
        <div className="modal__img">
          <span onClick={(e) => setShowModal(false)}>
            <FiX />
          </span>
          <div class="modal__overlay"></div>
          <div class="modal__box">
            <Slider {...settings}>
              {type === "inspiration" &&
                listImg?.map((e) => {
                  return e.video ? (
                    <ReactPlayer
                      className="videoFrame"
                      url={e?.videoLink}
                      light={e?.videoThumbnail.sourceUrl}
                      controls
                      playing={false}
                      height={"600px"}
                      width={"100%"}
                    />
                  ) : e?.localFile ? (
                    <GatsbyImage image={getImage(e.localFile)} />
                  ) : (
                    <video src={e.mediaItemUrl} controls />
                  );
                })}
              {type === "product" &&
                listImg?.map((e) => {
                  return e.altText ? (
                    <ReactPlayer
                      className="videoFrame"
                      url={e?.altText}
                      controls
                      playing={false}
                      height={"500px"}
                      width={"100%"}
                    />
                  ) : e?.localFile ? (
                    <GatsbyImage image={getImage(e.localFile)} />
                  ) : (
                    <video src={e.altText} controls />
                  );
                })}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
}

// <video src={e.mediaItemUrl} controls />
