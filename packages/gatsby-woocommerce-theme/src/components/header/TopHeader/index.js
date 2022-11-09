import React, { useContext, useState } from 'react';
import RequestAQuotePopUp from '../../../common/RequestAQuotePopUp';
import './styles.scss';
import parse from 'html-react-parser';
import { GlobalStateContext } from '../../contexts/AppContext';

function TopHeader({ onHandleModal, showRequestAQuote, width, dataTopBanner,lstShowroom,totalQty }) {
  const { topBar, phone, email } = dataTopBanner?.siteOptions?.acfSiteSettings;
  return (
    <div className='container-fluid header__top'>
      <div className='container-custom'>
        <div
          className={width > 576 ?  'flex-row header-top-content' : 'flex-column header-top-content'
           }
        >
          <div className='header-top-left'>
            {parse(topBar) || "PLENTY OF STOCK AVAILABLE NEAR YOU"}
          </div>
          <div className='header-top-right'>
            <div className="phone-block">
            <div className='first-level'>Phone</div>
                <ul className="lst-mobile">
                  {lstShowroom.map(el => 
                    <li>
                      <a href={`tel:${el.phone}`}>{`${el.name}: ${el.phone}`}</a>
                    </li>
                  )}
                </ul>
            </div>
            <a className='first-level' href={`mailto:${`sales@nextrend.com.au`}`}>Email</a>
            <span className='first-level'
              onClick={() =>
                onHandleModal({
                  type: 'OPEN_MODAL',
                  payload: 'cart-modal',
                })
              }
            >
              Quote Basket ({totalQty})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
