import { Link } from 'gatsby';
import React, { useContext } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { GlobalDispatchContext } from '../../components/contexts/AppContext';
import CartIcon from '../../components/icons/CartIcon';
import './styles.scss';

/* eslint-disable */
function ActionButtons({
  showCallButton,
  slug,
  isPackages,
  displayImage,
  groupedProductName,
  productId,
  selectedSimpleProduct,
  listAtr,
}) {
  const dispatch = useContext(GlobalDispatchContext);
  const isSimpleProductSelected =
    selectedSimpleProduct && selectedSimpleProduct.name.length > 0;

  const isChoosePackage = isPackages || !isSimpleProductSelected;

  const handleAddToCart = () => {
    //disable add to quick quote
    if (listAtr) {
      const disableQuickQuote = listAtr.every(
        (el) => el.options[0] !== 'Choose an option'
      );
      if (disableQuickQuote === true) {
        dispatch({
          type: 'ADD_TOO_CART',
          payload: {
            id: isChoosePackage ? productId : selectedSimpleProduct.id,
            name: isChoosePackage
              ? groupedProductName
              : selectedSimpleProduct.name,
            image:
              isChoosePackage ||
              selectedSimpleProduct.images.split(',').length > 1
                ? displayImage
                : selectedSimpleProduct.images,
            ['product-type']: isPackages ? 'grouped' : 'simple',
            attributes: listAtr ? listAtr : '',
            slug: slug,
          },
        });
      } else {
        alert(
          'Please select some product options before adding this product to your cart.'
        );
      }
    } else {
      dispatch({
        type: 'ADD_TOO_CART',
        payload: {
          id: isChoosePackage ? productId : selectedSimpleProduct.id,
          name: isChoosePackage
            ? groupedProductName
            : selectedSimpleProduct.name,
          image:
            isChoosePackage ||
            selectedSimpleProduct.images.split(',').length > 1
              ? displayImage
              : selectedSimpleProduct.images,
          ['product-type']: isPackages ? 'grouped' : 'simple',
          attributes: '',
          slug: slug,
        },
      });
    }
  };

  return (
    <div
      className={`action-buttons-container ${
        showCallButton === true ? 'showCallBtn' : ''
      }`}
    >
      {!showCallButton && (
        <Link to={slug} className='product-image-link'>
          <div
            className='product-action product-detail-action d-flex align-items-center btn-request justify-content-center'
            data-name='request-quote'
            type='button'
          >
            <AiOutlineEye />
          </div>
        </Link>
      )}
      {showCallButton && (
        <a href={`tel:+1300559965`}>
          <div
            className='product-action product-detail-action d-flex align-items-center btn-request justify-content-center'
            data-name='add-quote'
          >
            <HiOutlineClipboardList />
            <span className='action-text'>CALL US ON 1300 559 965</span>
          </div>
        </a>
      )}
      <div
        className='product-action product-detail-action d-flex align-items-center btn-add justify-content-center'
        data-name='add-quote'
        onClick={handleAddToCart}
      >
        <CartIcon />
        <span className='action-text'>ADD TO QUICK QUOTE</span>
      </div>
    </div>
  );
}

export default ActionButtons;
