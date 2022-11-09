import React, { useContext } from 'react';
import { MdClose } from 'react-icons/md';
import { GlobalDispatchContext } from '../../components/contexts/AppContext';
import './styles.scss';

/* eslint-disable */
function CloseButton({
  mt = '25px',
  mr = '25px',
  clearSearch = false,
  handleClearSearch,
}) {
  const dispatch = useContext(GlobalDispatchContext);
  const style = {
    marginTop: mt,
    marginRight: mr,
  };

  return (
    <button
      style={style}
      className='close-btn'
      onClick={(e) => {
        dispatch({ type: 'CLOSE_MODAL' });
        if (clearSearch) {
          e.preventDefault();
          handleClearSearch();
        }
      }}
    >
      <MdClose />
    </button>
  );
}

export default CloseButton;
