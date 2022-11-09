import React, { useContext } from "react";
import ReactModal from "react-modal";
import CloseButton from "../CloseButton";
import QuoteForm from "../QuoteForm";
import {GlobalStateContext,GlobalDispatchContext} from "../../components/contexts/AppContext"
import "./styles.scss";
function QuickQuotePopup({
  title = "request a quote",
  subTitle = "Commercial enquiries only",
  cartItems,
}) {
  const {showQuickQuote} = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext);
  return (
    <ReactModal
      isOpen={showQuickQuote}
      contentLabel="onRequestClose Example"
      onRequestClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      shouldCloseOnOverlayClick={true}
      className="Modal quote-cart quick-quote-modal"
      overlayClassName="Overlay"
      ariaHideApp={false}
    >
      <div className="container">
        <div className="row align-cart">
          <div className="col-12 left-part popup-quote">
            <h2 className="title">{title}</h2>
            <span className="note">{subTitle}</span>
            <QuoteForm
              cartItems={cartItems}
              linkTo={"/request-quote/thank-you"}
            />
          <div
            className="header d-flex"
          >
            <CloseButton mt={"17px"} />
          </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default QuickQuotePopup;
