import { graphql, Link, navigate, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React, { Fragment, useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { BsChevronDoubleRight } from "react-icons/bs";
import { MdKeyboardArrowLeft } from "react-icons/md";
import ReactModal from "react-modal";
import LIST_PRODUCTS_CATE from "./mega-menu-data";
import "./styles.scss";
import "./style1.scss";
import { Col, Row } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
/* eslint-disable */

function MegaMenu({
  showMegaMenu,
  width,
  onHandleModal,
  showMobileMegaMenu,
  menuData,
  handleCloseMegaMenu
}) {
  const rangeData = menuData.find(({ node }) => node.label === "Range");

  const listData = rangeData.node.childItems.nodes.map((el) => {
    return {
      name: el.label,
      path: el.path,
      children: el.childItems?.nodes?.map((item) => {
        return {
          name: item.label,
          path: item.path,
          uri: item.uri,
        };
      }),
    };
  });
  const [displayIndex, setDisplayIndex] = useState(0);
  const [displayMobile, setDisplayMobile] = useState(-1);

  // const someHandler = (el) => {
  //   const index = listData.findIndex((item) => item.name === el.name);
  //   const indexVal = index > 0 ? index : 0;
  //   setDisplayIndex(indexVal);
  // };
  // const someOtherHandler = (el) => {};

  const menuActive = {
    color: "#D2232A;",
  };

  const handleClickMenu = (el) => {
    const index = listData.findIndex((item) => item.name === el.name);
    const indexVal = index > 0 ? index : 0;
    if (displayMobile === indexVal) {
      setDisplayMobile(-1);
    } else {
      setDisplayMobile(indexVal);
    }
  };

  let mainContent = (
    <div>
      <div
        className="mega-menu-wrapper container"
        onMouseLeave={() => setDisplayIndex(0)}
      >
        <div className="mega-menu-inner">
          <div className="mega-menu-inner_item">
            {listData.map((el, index) => (
              <div
                key={index}
                style={
                  listData[displayIndex]?.name === el.name ? menuActive : {}
                }
                className="menu-l1"
                onMouseEnter={() => setDisplayIndex(index)}
                onClick={() => navigate(el.path)}
              >
                {el.name}
              </div>
            ))}
          </div>
          <div className="mega-menu-inner_item">
            {listData[displayIndex]?.children.length > listData.length
              ? listData[displayIndex].children
                  .slice(0, listData.length)
                  .map((el, index) => (
                    <div
                      key={index}
                      className="menu-l2"
                      onClick={() => navigate(el.path)}
                    >
                      {el.name}
                    </div>
                  ))
              : listData[displayIndex]?.children.map((el, index) => (
                  <div
                    key={index}
                    className="menu-l2"
                    onClick={() => navigate(el.path)}
                  >
                    {el.name}
                  </div>
                ))}
          </div>
          <div className="mega-menu-inner_item">
            {listData[displayIndex].children.length > listData.length
              ? listData[displayIndex].children
                  .slice(
                    listData.length,
                    listData[displayIndex].children.length
                  )
                  .map((el, index) => (
                    <div
                      key={index}
                      className="menu-l2 last-column"
                      onClick={() => navigate(el.path)}
                    >
                      {el.name}
                    </div>
                  ))
              : ""}
          </div>
          {/* <Col xs={12} md={3} xl={6}></Col> */}
        </div>
        <div onClick={() => handleCloseMegaMenu()} className="btn-close">
          <AiOutlineClose size={21.5} />
        </div>
      </div>
    </div>
  );

  if (width < 576) {
    mainContent = (
      <ReactModal
        isOpen={showMobileMegaMenu}
        contentLabel="onRequestClose Example"
        shouldCloseOnOverlayClick={false}
        className="mega-menu-modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        {mainContent}
      </ReactModal>
    );
  }

  return <Fragment>{mainContent}</Fragment>;
}

export default MegaMenu;
