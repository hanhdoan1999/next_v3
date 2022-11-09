import React, { useContext } from 'react';
import QuoteCart from '../../../common/QuoteCart';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../../contexts/AppContext';
/* eslint-disable */
import CartIcon from '../../icons/CartIcon';
import SearchIcon from '../../icons/SearchIcon';
import SideBarMenuIcon from '../../icons/SideBarMenuIcon';
import './styles.scss';
/* eslint-disable */

function MenuIcons({ width }) {
  const dispatch = useContext(GlobalDispatchContext);
  const { totalQty } = useContext(GlobalStateContext);
  return (
    <div className='nav-icons d-flex justify-content-end'>
      <div className='list-icon d-flex justify-content-end'>
        <ul className='d-flex align-items-center'>
          {width > 768 && (
            <li
              className='icon-item'
              onClick={() =>
                dispatch({ type: 'OPEN_MODAL', payload: 'search-box' })
              }
            >
              Search
              <SearchIcon />
            </li>
          )}

          {/* <li
						className='icon-item'
						onClick={() =>
							dispatch({ type: 'OPEN_MODAL', payload: 'cart-modal' })
						}
					>
						<span className='total-qty'>{totalQty}</span>
						<CartIcon />
					</li> */}

          <li
            className='icon-item sidebar-menu-icon'
            id='menuToggle'
            onClick={() =>
              dispatch({ type: 'OPEN_MODAL', payload: 'side-bar' })
            }
          >
            <SideBarMenuIcon />
          </li>
        </ul>
        <QuoteCart />
      </div>
    </div>
  );
}

export default MenuIcons;
