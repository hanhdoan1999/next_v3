import { Link } from 'gatsby';
import React, { memo, useContext } from 'react';
import { GlobalDispatchContext } from '../../components/contexts/AppContext';
import ArrowRight from '../../components/icons/ArrowRight';
import './style.scss';

function ButtonViewMore({ slug, text = 'View more', color = '#2D2D2D' }) {
  const dispatch = useContext(GlobalDispatchContext);
  return (
    <div className='row view-more'>
      <div className='col-12 d-flex align-items-center btn-container '>
        <Link to={`/${slug}`} onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
          <div className='d-flex text-btn align-items-center'>
            <p>{text}</p>
            <span className='icon icon-right d-flex'>
              <ArrowRight color={color} />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default memo(ButtonViewMore);
