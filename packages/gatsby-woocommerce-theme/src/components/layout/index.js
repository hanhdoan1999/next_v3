/**
 * Layout component contains header and footer
 *
 * @package gatsby-wordpress-theme
 */

import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css"
import "./../../sass/common.scss";
import Footer from "../footer";
import "../../assets/lib/all.min.css";
import Header from "../header/MainHeader/Header";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import BtnBacktoTop from "../btn-backtotop/index";
import Loading from "../../common/Loader"
const Layout = ({ children }) => {
  const { width } = useWindowDimensions();
  
  return (
    <>
    {!width ? <Loading/> : <>
      <Header width={width} />
      <main
        className="main-container"
        style={
             { marginBottom: "0px" }
        }
      >
        {children}
      </main>
      <Footer width={width} />
      <BtnBacktoTop/>
    </>}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
