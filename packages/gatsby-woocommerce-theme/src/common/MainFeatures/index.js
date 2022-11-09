import React from 'react';
import './styles.scss';
import ShieldIcon from '../../components/icons/ShieldIcon';
import DatabaseIcon from '../../components/icons/DatabaseIcon';
import SunIcon from '../../components/icons/SunIcon';
import MadeToOrderIcon from '../../components/icons/MadeToOrderIcon';
import StockedIcon from '../../components/icons/StockedIcon';

function MainFeatures({
  stocked,
  meta_NextrendIconsStackable,
  meta_NextrendIconsWaterResistant,
  meta_NextrendIconsUv,
  isProductDetail,
}) {
  return (
    <div className='row main-features-container'>
      {!isProductDetail && (
        <div className='feature d-flex align-items-center'>
          {stocked > 0 ? <StockedIcon /> : <MadeToOrderIcon />}
          <span className='feature-text'>
            {stocked > 0 ? 'Stocked' : 'Makde To Order'}
          </span>
        </div>
      )}

      {meta_NextrendIconsWaterResistant==="yes" && (
        <div className='feature d-flex align-items-center'>
          <ShieldIcon />
          <span className='feature-text'>Weather Resistant</span>
        </div>
      )}
      {meta_NextrendIconsUv==="yes" && (
        <div className='feature d-flex align-items-center'>
          <SunIcon />
          <span className='feature-text'>UV Stabilised</span>
        </div>
      )}
      {meta_NextrendIconsStackable==="yes" && (
        <div className='feature d-flex align-items-center'>
          <DatabaseIcon />
          <span className='feature-text'>Stackable</span>
        </div>
      )}
    </div>
  );
}

export default MainFeatures;
