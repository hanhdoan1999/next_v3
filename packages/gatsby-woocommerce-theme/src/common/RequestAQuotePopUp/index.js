import { Link } from "gatsby";
import React, { memo } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import ReactModal from "react-modal";
import ButtonViewMore from "../ButtonViewMore";
import CloseButton from "../CloseButton";
import REQUEST_QUOTE_DATA from "./request-a-quote-data";
import "./styles.scss";

function RequestAQuotePopUp({ showRequestAQuote, handleCloseModal, width }) {
  return (
    <ReactModal
      isOpen={showRequestAQuote}
      onRequestClose={() => handleCloseModal({ type: "CLOSE_MODAL" })}
      shouldCloseOnOverlayClick={true}
      className='Modal request-a-quote'
      overlayClassName='Overlay'
      ariaHideApp={false}
    >
      <CloseButton mt={"15px"} mr={"15px"} />
      <div className='request-quote-popup'>
        <div className='header d-flex'>
          <h2 className='title'>request a quote</h2>
          {width > 576 && (
            <ButtonViewMore slug='products' text='See all products' />
          )}
        </div>
        <div className='request-steps'>
          {REQUEST_QUOTE_DATA.map((item, index) => {
            let IconComponent = item.iconComponent;
            return (
              <div className='d-flex step-container' key={index}>
                <Link
                  className='step d-flex justify-content-center align-items-center'
                  to='/products'
                  onClick={() => handleCloseModal({ type: "CLOSE_MODAL" })}
                >
                  <div className='icon'>
                    <IconComponent />
                  </div>
                  <span className='step-content text-center'>{item.name}</span>
                </Link>
                {width > 576 && <MdKeyboardArrowRight />}
              </div>
            );
          })}
        </div>
      </div>
    </ReactModal>
  );
}

export default memo(RequestAQuotePopUp);
