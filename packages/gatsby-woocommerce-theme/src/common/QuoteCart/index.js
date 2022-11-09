import React, { useContext } from 'react';
import { BiMinus } from 'react-icons/bi';
import { BsPlus, BsTrash } from 'react-icons/bs';
import ReactModal from 'react-modal';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../../components/contexts/AppContext';
import QuoteForm from '../QuoteForm';
import CloseButton from '../CloseButton';
import './styles.scss';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

function QuoteCart({
  title = 'request a quote',
  subTitle = 'Commercial enquiries only',
}) {
  const { showCart, cartItems, totalQty } = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);

  const updateCart = (product, value) => {
    // console.log(product, value);
    dispatch({ type: 'UPDATE_CART', payload: { product, value } });
  };
  // const deleteProductItem = (productId) => {
  //   dispatch({ type: 'DELETE_PRODUCT_ITEM', payload: productId });
  // };
  const deleteProductItem = (product) => {
    dispatch({ type: 'DELETE_PRODUCT_ITEM', payload: product });
  };
  return (
    <ReactModal
      isOpen={showCart}
      contentLabel='onRequestClose Example'
      onRequestClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      shouldCloseOnOverlayClick={true}
      className='Modal quote-cart'
      overlayClassName='Overlay'
      ariaHideApp={false}
    >
      <div className='container'>
        <div className='row align-cart'>
          <div className='col-xs-12 col-md-6 left-part popup-quote'>
            <h2 className='title'>{title}</h2>
            {/* <span className='note'>{subTitle}</span> */}
            <span className='note'>{""}</span> 
            <QuoteForm
              cartItems={cartItems}
              linkTo={'/request-quote/thank-you'}
            />
          </div>
          <div className='col-xs-12 col-md-6'>
            <div className='header d-flex'>
              <div className='title'>
                <span>QUOTE BASKET {`(${totalQty})`}</span>
              </div>
              <CloseButton mt={'17px'} />
            </div>
            <hr />

            <div className='main-cart'>
              {cartItems.map((item) => {
                return (
                  <div
                    className='main-cart-item'
                    key={`${item.id}-${item.image}`}
                  >
                    <div className='product-row d-flex'>
                      <div className='product-image'>
                        {typeof item.image === "object" && item.image.hasOwnProperty('localFile') ? 
                          <GatsbyImage image={getImage(item.image.localFile)}/> :
                          <img src={item.image} alt={item.name} />
                        }
                      </div>
                      <div className='product-info d-flex mt-0'>
                        <span className='product-name'>
                          <Link
                            to={item.slug}
                            onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
                          >
                            {item.name}
                          </Link>
                        </span>
                        <div className='product-des'>
                          {item.attributes &&
                            item.attributes.map((el, index) => (
                              <div
                                className='text-muted small mb-1'
                                key={index}
                              >
                                <span>{el.name}:</span>
                                &nbsp;
                                {/* {el.options[0].length > 8 ? (
                                  <span
                                    className='d-block'
                                    data-toggle='tooltip'
                                    data-placement='top'
                                    title={el.options[0]}
                                  >
                                    {el.options[0].slice(0, 8) + '...'}
                                  </span>
                                ) : ( */}
                                <span>{el.options[0]}</span>
                                {/* )} */}
                              </div>
                            ))}
                        </div>
                        <div className='product-quantity d-flex'>
                          <button
                            className='button increase'
                            onClick={() => updateCart(item, -1)}
                          >
                            <BiMinus />
                          </button>
                          <span className='quantity'>
                            {item.qty ? item.qty : 0}
                          </span>
                          <button
                            className='button decrease'
                            onClick={() => updateCart(item, 1)}
                          >
                            <BsPlus />
                          </button>
                        </div>
                      </div>
                      <button
                        className='trash-icon btn'
                        onClick={() => deleteProductItem(item)}
                        // onClick={() => deleteProductItem(item.id)}
                      >
                        <BsTrash />
                      </button>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default QuoteCart;
