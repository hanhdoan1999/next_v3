import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { navigate } from "gatsby";
import { GlobalDispatchContext } from "../../components/contexts/AppContext";
import { useQuery, gql } from "@apollo/client";
import { isArray } from "lodash";
import Placeholder from "../../images/placeholder.png";
import Loader from "../../common/Loader";
function ProductRelatedItem({ sku, name, slug }) {
  const { data, error, loading } = useQuery(
    gql`
      query GET_FEATURED($slugIn: [String]) {
        products(where: { slugIn: $slugIn }) {
          edges {
            node {
              image {
                sourceUrl
              }
              slug
              name
              id
              acfProductColour {
                stockStatus
              }
              __typename
              ... on GroupProduct {
                products {
                  nodes {
                    slug
                    id
                    name
                    image {
                      sourceUrl
                    }
                    acfProductColour {
                      productColour
                      stockStatus
                    }
                  }
                }
              }
              sku
            }
          }
        }
      }
    `,
    {
      variables: {
        slugIn: [slug],
      },
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
    }
  );
  const item = data?.products?.edges;
  const [colorSelected, setColorSelected] = useState(0);
  const [showAllColor, setShowAllColor] = useState(false);
  const dispatch = useContext(GlobalDispatchContext);
  const dataSimple = data?.products?.edges.filter(
    (el) => el.node.__typename === "SimpleProduct"
  );
  const dataGroup = data?.products?.edges?.filter(
    (el) => el.node.__typename === "GroupProduct"
  );
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
  const handleAddToQuoteBasket = () => {
    if (item[0]?.node?.__typename === "GroupProduct") {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id: dataGroup[0]?.node?.products?.nodes[colorSelected]?.id,
          name: dataGroup[0]?.node?.products?.nodes[colorSelected]?.name,
          image:
            dataGroup[0]?.node?.products?.nodes[colorSelected]?.image
              ?.sourceUrl,
          ["product-type"]: "simple",
          attributes: "",
          slug: dataGroup[0]?.node?.slug,
        },
      });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id: dataSimple[0]?.node?.id,
          name: dataSimple[0]?.node?.name,
          image: dataSimple[0]?.node?.image?.sourceUrl,
          ["product-type"]: "simple",
          attributes: "",
          slug: dataSimple[0]?.node.slug,
        },
      });
    }
  };
  const getColorHex = (color) => {
    const tempColor = color.find((i) => i.includes("#") || i.includes("url"));
    return tempColor;
  };
  const handleClickItem = () => {
    setShowAllColor(true);
  };
  return (
    <>
      {loading ? (
        <div className="product-related-loading">
          <Loader />
        </div>
      ) : (
        <div className="product-related-item">
          <div className="product-related-item_image">
            {isArray(item) && item ? (
              <img
                src={
                  colorSelected >= 0 &&
                  dataGroup[0]?.node?.products?.nodes?.length > 0
                    ? dataGroup[0]?.node?.products?.nodes[colorSelected]?.image
                        ?.sourceUrl
                    : dataGroup[0]?.node
                    ? dataGroup[0]?.node?.image?.sourceUrl
                    : dataSimple
                    ? dataSimple[0]?.node?.image?.sourceUrl
                    : Placeholder
                }
              />
            ) : (
              <img src={Placeholder} />
            )}
          </div>
          <div
            className="product-related-item_title"
            onClick={() =>
              navigate(
                `/${
                  colorSelected >= 0
                    ? dataGroup[0]?.node?.products?.nodes[colorSelected]?.slug
                    : dataSimple[0]?.node?.slug
                }`
              )
            }
          >
            {isArray(dataGroup) && dataGroup.length > 0
              ? dataGroup[0]?.node?.name
              : isArray(dataSimple) && dataSimple.length > 0
              ? dataSimple[0]?.node?.name
              : ""}
          </div>
          {isArray(item[0]?.node.products) &&
          item[0]?.node.products.length > 0 ? (
            <div
              className={
                !item[0]?.node?.products[colorSelected]?.acfProductColour
                  ?.stockStatus
                  ? "empty-stock"
                  : "product-info_stock"
              }
            >
              <span
                className={checkStock(
                  item[0]?.node?.products[colorSelected]?.acfProductColour
                    ?.stockStatus
                ).class}
              ></span>
              {
               checkStock(
                item[0]?.node?.products[colorSelected]?.acfProductColour
                  ?.stockStatus
              ).name
              }
            </div>
          ) : (
            <div
              className={
                !item[0]?.node?.acfProductColour?.stockStatus
                  ? "empty-stock"
                  : "product-info_stock"
              }
            >
              <span
                className={checkStock(
                  item[0]?.node?.acfProductColour?.stockStatus
                ).class}
              ></span>
              {checkStock(
                  item[0]?.node?.acfProductColour?.stockStatus
                ).name}
            </div>
          )}

          <div
            className={
              dataGroup[0]?.node?.products?.nodes.length > 0
                ? "product-related-item_color-select"
                : "product-related-item_color-select empty"
            }
          >
            {dataGroup[0]?.node?.products?.nodes.length > 6 && !showAllColor ? (
              <>
                {dataGroup[0]?.node?.products?.nodes
                  .slice(0, 5)
                  .map((el, i) => {
                    return (
                      <>
                        {el?.acfProductColour?.productColour.length > 0 ? (
                          <button
                            key={i}
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title={el?.acfProductColour?.productColour?.find(
                              (i) => !i.includes("#") && !i.includes("url")
                            )}
                            style={
                              getColorHex(
                                el?.acfProductColour?.productColour
                              )?.includes("url")
                                ? {
                                    backgroundImage: getColorHex(
                                      el?.acfProductColour?.productColour
                                    ),
                                  }
                                : getColorHex(
                                    el?.acfProductColour?.productColour
                                  )?.includes("#") &&
                                  getColorHex(
                                    el?.acfProductColour?.productColour
                                  )?.toLowerCase() !== "#ffffff"
                                ? {
                                    backgroundColor: getColorHex(
                                      el?.acfProductColour?.productColour
                                    ),
                                  }
                                : getColorHex(
                                    el?.acfProductColour?.productColour
                                  )?.includes("#") &&
                                  getColorHex(
                                    el?.acfProductColour?.productColour
                                  )?.toLowerCase() === "#ffffff"
                                ? { backgroundColor: "#f6f6f6" }
                                : null
                            }
                            className={
                              colorSelected === i
                                ? "product-related-item_color-select_item selected "
                                : "product-related-item_color-select_item "
                            }
                            onClick={() => setColorSelected(i)}
                          >
                            {" "}
                          </button>
                        ) : (
                          <button
                            key={i}
                            type="button"
                            // style={{ backgroundColor: el.node.metaData[0].value }}
                            className={
                              colorSelected === i
                                ? "non_color selected"
                                : "non_color"
                            }
                            onClick={() => setColorSelected(i)}
                          >
                            {" "}
                          </button>
                        )}
                      </>
                    );
                  })}
              </>
            ) : (
              <>
                {dataGroup[0]?.node?.products?.nodes.map((el, i) => {
                  return (
                    <>
                      {el?.acfProductColour?.productColour.length > 0 ? (
                        <button
                          key={i}
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title={el?.acfProductColour?.productColour?.find(
                            (i) => !i.includes("#") && !i.includes("url")
                          )}
                          style={
                            getColorHex(
                              el?.acfProductColour?.productColour
                            )?.includes("url")
                              ? {
                                  backgroundImage: getColorHex(
                                    el?.acfProductColour?.productColour
                                  ),
                                }
                              : getColorHex(
                                  el?.acfProductColour?.productColour
                                )?.includes("#") &&
                                getColorHex(
                                  el?.acfProductColour?.productColour
                                )?.toLowerCase() !== "#ffffff"
                              ? {
                                  backgroundColor: getColorHex(
                                    el?.acfProductColour?.productColour
                                  ),
                                }
                              : getColorHex(
                                  el?.acfProductColour?.productColour
                                )?.includes("#") &&
                                getColorHex(
                                  el?.acfProductColour?.productColour
                                )?.toLowerCase() === "#ffffff"
                              ? { backgroundColor: "#f6f6f6" }
                              : null
                          }
                          className={
                            colorSelected === i
                              ? "product-related-item_color-select_item selected "
                              : "product-related-item_color-select_item "
                          }
                          onClick={() => setColorSelected(i)}
                        >
                          {" "}
                        </button>
                      ) : (
                        <button
                          key={i}
                          type="button"
                          // style={{ backgroundColor: el.node.metaData[0].value }}
                          className={
                            colorSelected === i
                              ? "non_color selected"
                              : "non_color"
                          }
                          onClick={() => setColorSelected(i)}
                        >
                          {" "}
                        </button>
                      )}
                    </>
                  );
                })}
              </>
            )}
            {dataGroup[0]?.node?.products?.nodes?.length > 6 && (
              <span
                className="color-item-all"
                onClick={() => handleClickItem()}
              >
                {!showAllColor
                  ? `+${dataGroup[0]?.node?.products?.nodes?.length - 5}`
                  : `-${dataGroup[0]?.node?.products?.nodes?.length - 5}`}
              </span>
            )}
          </div>
          <div className="you_may_product_quote-button">
            <button type="button" onClick={() => handleAddToQuoteBasket()}>
              Request a Quick Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductRelatedItem;
