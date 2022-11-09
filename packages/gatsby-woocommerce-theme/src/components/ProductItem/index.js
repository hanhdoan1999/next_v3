import { navigate } from "gatsby";
import React, { Fragment, useContext, useEffect } from "react";
import { useState } from "react";
import "./ProductItem.scss";
import Slider from "react-slick";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { GlobalDispatchContext } from "../../components/contexts/AppContext";
import { isArray } from "lodash";

function ProductItem({ data, setQuickQuoteItem }) {
  const [displayItem, setDisplayItem] = useState(-1);
  const dispatch = useContext(GlobalDispatchContext);
  const changeItem = (index) => {
    setDisplayItem(index);
  };
  const handleAddToQuoteBasket = () => {
    if (data.type === "grouped") {
      if (displayItem === -1) {
        alert("Please select product");
      } else {
        dispatch({
          type: "ADD_TO_CART",
          payload: {
            id: data.products[displayItem].id,
            name: data.products[displayItem].name,
            image: data.products[displayItem].image,
            ["product-type"]: "simple",
            attributes: "",
            slug: data.slug,
          },
        });
      }
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id: data.id,
          name: data.name,
          image: data.image,
          ["product-type"]: "simple",
          attributes: "",
          slug: data.slug,
        },
      });
    }
  };
  const checkStock = (status) => {
    if(Array.isArray(status)) {
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
          class: "stocked",
          name: "Stocked"
        }
      }
    } 
  };

  const getColorHex = (color) => {
    const tempColor = color.find((i) => i.includes("#") || i.includes("url"));
    return tempColor;
  };

  const [showAllColor, setShowAllColor] = useState(false);
  const handleClickItem = () => {
    setShowAllColor(!showAllColor);
  };
  const renderColor = (data) => {
    if (data?.products?.length > 6 && !showAllColor) {
      return (
        <>
          {data.products.slice(0, 5).map((el, index) => (
            <Fragment key={index}>
              {el.color.length > 0 ? (
                <span
                  className={
                    index === displayItem
                      ? "color-item color_atv"
                      : "color-item"
                  }
                  data-toggle="tooltip"
                  data-placement="top"
                  title={el.color.find(
                    (i) => !i.includes("#") && !i.includes("url")
                  )}
                  key={index}
                  style={
                    getColorHex(el.color)?.includes("url")
                      ? { backgroundImage: getColorHex(el.color) }
                      : getColorHex(el.color)?.includes("#") &&
                        getColorHex(el.color)?.toLowerCase() !== "#ffffff"
                      ? { backgroundColor: getColorHex(el.color) }
                      : getColorHex(el.color)?.includes("#") &&
                        getColorHex(el.color)?.toLowerCase() === "#ffffff"
                      ? { backgroundColor: "#f6f6f6" }
                      : null
                  }
                  onClick={() => changeItem(index)}
                ></span>
              ) : (
                <span
                  className={
                    index === displayItem ? "non_color color_atv" : "non_color"
                  }
                  key={index}
                  onClick={() => changeItem(index)}
                ></span>
              )}
            </Fragment>
          ))}
        </>
      );
    } else {
      return (
        <>
          {data.products.map((el, index) => (
            <Fragment key={index}>
              {el.color.length > 0 ? (
                <span
                  className={`${
                    index === displayItem
                      ? "color-item color_atv"
                      : "color-item"
                  } ${data.products.length >= 10 && "mini-icon"}`}
                  data-toggle="tooltip"
                  data-placement="top"
                  title={el.color.find(
                    (i) => !i.includes("#") && !i.includes("url")
                  )}
                  key={index}
                  style={
                    getColorHex(el.color)?.includes("url")
                      ? { backgroundImage: getColorHex(el.color) }
                      : getColorHex(el.color)?.includes("#") &&
                        getColorHex(el.color)?.toLowerCase() !== "#ffffff"
                      ? { backgroundColor: getColorHex(el.color) }
                      : getColorHex(el.color)?.includes("#") &&
                        getColorHex(el.color)?.toLowerCase() === "#ffffff"
                      ? { backgroundColor: "#f6f6f6" }
                      : null
                  }
                  onClick={() => changeItem(index)}
                ></span>
              ) : (
                <span
                  className={`${
                    index === displayItem ? "non_color color_atv" : "non_color"
                  } ${data.products.length >= 10 && "mini-icon"}`}
                  key={index}
                  onClick={() => changeItem(index)}
                ></span>
              )}
            </Fragment>
          ))}
        </>
      );
    }
  };
  return (
    <>
      {data.type === "grouped" ? (
        <div className="product-item">
          <div
            className="product-item_img"
            onClick={() => navigate(`/${data.slug}`)}
          >
            <GatsbyImage
              image={getImage(
                displayItem < 0
                  ? data?.image?.localFile
                  : data.products[displayItem]?.image?.localFile
              )}
            />
          </div>
          <div
            className="product-item_name"
            onClick={() => navigate(`/${data.slug}`)}
          >
            {data.name}
          </div>
          {displayItem < 0 ? (
            <div
              className={!data.stockStatus ? "empty-stock" : "product-info_stock"}
            >
              <span className={checkStock(data?.stockStatus)?.class}></span>
              {checkStock(data?.stockStatus)?.name}
            </div>
          ) : (
            <div
              className={
                !data?.products[displayItem]?.stockStatus[0]
                  ? "empty-stock"
                  : "product-info_stock"
              }
            >
              <span
                className={checkStock(
                  data?.products[displayItem]?.stockStatus
                )?.class}
              ></span>
              {checkStock(
                  data?.products[displayItem]?.stockStatus
                )?.name}
            </div>
          )}
          <div
            className={
              data?.products?.length > 0 ? "product-item_color" : "empty"
            }
          >
            {renderColor(data)}
            {data?.products?.length > 6 && (
              <span
                className="color-item-all"
                onClick={() => handleClickItem()}
              >
                {!showAllColor
                  ? `+${data?.products?.length - 5}`
                  : `-${data?.products?.length - 5}`}
              </span>
            )}
          </div>
          <div className="product-item_quote-button">
            <button type="button" onClick={() => handleAddToQuoteBasket()}>
              Request a Quick Quote
            </button>
            {/* <button type="button" onClick={() => handleAddToQuoteBasket()}>
              Add to quote basket
            </button> */}
          </div>
        </div>
      ) : (
        <div className="product-item">
          <div
            className="product-item_img"
            onClick={() => navigate(`/${data.slug}`)}
          >
            <GatsbyImage image={getImage(data?.image?.localFile)} />
          </div>
          <div
            className="product-item_name"
            onClick={() => navigate(`/${data.slug}`)}
          >
            {data.name}
          </div>
          <div
            className={!data.stockStatus ? "empty-stock" : "product-info_stock"}
          >
            <span className={checkStock(data?.stockStatus)?.class}></span>
            {checkStock(data?.stockStatus)?.name}
          </div>
          <div className="empty"></div>
          <div className="product-item_quote-button">
            <button type="button" onClick={() => handleAddToQuoteBasket()}>
              Request a Quick Quote
            </button>
            {/* <button type="button" onClick={() => handleAddToQuoteBasket()}>
        Add to quote basket
      </button> */}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductItem;
