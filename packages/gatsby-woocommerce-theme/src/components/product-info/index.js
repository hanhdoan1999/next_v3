import React, { Fragment, useContext, useState } from "react";
import { Icons } from "./ProductInfor.config";
import { GlobalDispatchContext } from "../contexts/AppContext";
import "./ProductInfo.scss";
import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
function ProductInfo({
  product,
  handleChoose,
  chosen,
  setQuickQuoteItem,
  type = "group",
}) {
  const filterIcon = Icons.filter(
    (item, index) => product.acfProductFeatureIcons[item.name] !== null
  );
  const dispatch = useContext(GlobalDispatchContext);
  const [quantity, setQuantity] = useState(1);
  const handleAddToQuoteBasket = () => {
    if (quantity <= 0) {
      alert("Please enter quantity !");
    } else {
      if (type === "group") {
        dispatch({
          type: "ADD_TO_CART",
          payload: {
            id: product.products.nodes[chosen].id,
            name: product.products.nodes[chosen].name,
            image: product.products.nodes[chosen].image,
            ["product-type"]: "simple",
            attributes: "",
            slug: product.products.nodes[chosen].slug,
            qty: quantity,
          },
        });
      }
      if (type === "simple") {
        dispatch({
          type: "ADD_TO_CART",
          payload: {
            id: product.id,
            name: product.name,
            image: product.image,
            ["product-type"]: "simple",
            attributes: "",
            slug: product.slug,
            qty: quantity,
          },
        });
      }
    }
  };

  const checkStock = (status) => {
    if (status[0] === "stocked") {
      return {
        class: "stocked",
        name: status[1]
      }
    }else if (status[0] === "order2" || status[0] === "order4" || status[0] === "order12") {
      return  {
        class: "made-order",
        name: "Made to Order"
      }
    }else if(status[0] === "discontinued") {
      return {
        class: "discontinued",
        name: status[1]
      }
    }else {
      return {
        class: "null",
        name: null
      }
    }
  };

  const getColorHex = (color) => {
    const tempColor = color.find((i) => i.includes("#") || i.includes("url"));
    return tempColor;
  };

  const handleChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <Fragment>
      {type === "group" ? (
        <div className="product-info">
          <h4 className="product-info_name">{product?.name}</h4>
          {
            product?.products?.nodes?.length > 0 ?
          <div className={!product?.products?.nodes[chosen]?.acfProductColour?.stockStatus[0] ? "product-info_stock null" : "product-info_stock"} >
            <span
              className={checkStock(
                product?.products?.nodes[chosen]?.acfProductColour?.stockStatus
              ).class}
            ></span>
            {checkStock(
                product?.products?.nodes[chosen]?.acfProductColour?.stockStatus
              ).name}
          </div> :
            <div className={!product?.acfProductColour?.stockStatus[0] ? "product-info_stock null" : "product-info_stock"} >
              <span
                className={checkStock(
                  product?.acfProductColour?.stockStatus[0]
                )}
              ></span>
              {product?.acfProductColour?.stockStatus[1]}
            </div>
          }
          <div className="product-info_colors">
            <p>Available colours</p>
            <div className="product-info_colors-wrapper">
              {product?.products?.nodes?.map((item, index) => {
                return (
                  <>
                    {item?.acfProductColour.productColour.length > 0 ? (
                      <button
                        key={index}
                        data-toggle="tooltip"
                        data-placement="top"
                        title={item?.acfProductColour?.productColour.find(
                          (i) => !i.includes("#") && !i.includes("url")
                        )}
                        className={
                          chosen === index
                            ? "product-info_colors_circle color_atv"
                            : "product-info_colors_circle"
                        }
                        style={
                          getColorHex(
                            item?.acfProductColour?.productColour
                          )?.includes("url")
                            ? {
                                backgroundImage: getColorHex(
                                  item?.acfProductColour?.productColour
                                ),
                              }
                            : getColorHex(
                                item?.acfProductColour?.productColour
                              )?.includes("#") &&
                              getColorHex(
                                item?.acfProductColour?.productColour
                              ).toLowerCase() !== "#ffffff"
                            ? {
                                backgroundColor: getColorHex(
                                  item?.acfProductColour?.productColour
                                ),
                              }
                            : getColorHex(
                                item?.acfProductColour?.productColour
                              )?.includes("#") &&
                              getColorHex(
                                item?.acfProductColour?.productColour
                              ).toLowerCase() === "#ffffff"
                            ? { backgroundColor: "#f6f6f6" }
                            : null
                        }
                        onClick={() => handleChoose(index)}
                      />
                    ) : (
                      <button
                        key={index}
                        className={
                          chosen === index ? "non_color color_atv" : "non_color"
                        }
                        onClick={() => handleChoose(index)}
                      />
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <div className="product-info_quote-button">
            <div className="product-quantity d-flex">
              <button
                className={`button decrease ${quantity === 1 && "disableBtn"}`}
                onClick={() => setQuantity(quantity - 1)}
              >
                <BiMinus />
              </button>
              {/* <span className="quantity">{quantity}</span> */}
              <input
                type="number"
                placeholder="0"
                className="quantity"
                value={quantity}
                min="0"
                onChange={(e) => handleChange(e)}
              />
              <button
                className="button increase"
                onClick={() => setQuantity(quantity + 1)}
              >
                <BsPlus />
              </button>
            </div>
            <button
              type="button"
              className="quote-button"
              onClick={() => handleAddToQuoteBasket()}
            >
              Request a Quick Quote
            </button>
          </div>
          <div
            className="product-info_description"
            dangerouslySetInnerHTML={{ __html: product?.shortDescription }}
          />
          <div className="product-info_icons">
            {filterIcon.map((item, index) => {
              return (
                <>
                  {product?.acfProductFeatureIcons?.madeIn && (
                    <div className="product-info_icons-wrapper" key={index}>
                      <img src={item.src} />
                      <p>{item.text}</p>
                    </div>
                  )}
                </>
              );
            })}
          </div>
          <div
            className="product-info_features"
            dangerouslySetInnerHTML={{ __html: product?.acfFeatures?.features }}
          />
        </div>
      ) : (
        <div className="product-info">
          <h4 className="product-info_name">{product?.name}</h4>
          <div className={!product?.acfProductColour?.stockStatus[0] ? "product-info_stock null" : "product-info_stock"} >
            <span
              className={checkStock(
                product?.acfProductColour?.stockStatus
              ).class}
            ></span>
            {checkStock(
                product?.acfProductColour?.stockStatus
              ).name}
          </div>
          <div className="product-info_quote-button">
            <div className="product-quantity d-flex">
              <button
                className={`button decrease ${quantity === 1 && "disableBtn"}`}
                onClick={() => setQuantity(quantity - 1)}
              >
                <BiMinus />
              </button>
              {/* <span className="quantity">{quantity}</span> */}
              <input
                type="number"
                placeholder="0"
                className="quantity"
                value={quantity}
                min="0"
                onChange={(e) => handleChange(e)}
              />
              <button
                className="button increase"
                onClick={() => setQuantity(quantity + 1)}
              >
                <BsPlus />
              </button>
            </div>
            <button
              type="button"
              className="quote-button"
              onClick={() => handleAddToQuoteBasket()}
            >
              Request a Quick Quote
            </button>
          </div>
          <div
            className="product-info_description"
            dangerouslySetInnerHTML={{ __html: product?.shortDescription }}
          />
          <div className="product-info_icons">
            {filterIcon.map((item, index) => {
              return (
                <>
                  {product?.acfProductFeatureIcons?.madeIn && (
                    <div className="product-info_icons-wrapper" key={index}>
                      <img src={item.src} />
                      <p>{item.text}</p>
                    </div>
                  )}
                </>
              );
            })}
          </div>
         
          <div
            className="product-info_features simple"
            dangerouslySetInnerHTML={{ __html: product?.acfFeatures?.features }}
          />
        </div>
      )}
    </Fragment>
  );
}

export default ProductInfo;
