import React, { useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { navigate } from "gatsby";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loader from "../../common/Loader";
import { GlobalDispatchContext } from "../contexts/AppContext";
import { isArray } from "lodash";
function FeaturedItem({ sku, type, slug }) {
  const [selectColor, setSelectColor] = useState(0);
  const [showAllColor, setShowAllColor] = useState(false);
  const dispatch = useContext(GlobalDispatchContext);
  const { data, loading } = useQuery(
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
  const dataSimple = data?.products?.edges?.filter(
    (el) => el.node.__typename === "SimpleProduct"
  );
  const dataGroup = data?.products?.edges?.filter(
    (el) => el.node.__typename === "GroupProduct"
  );
  const getColorHex = (color) => {
    const tempColor = color.find((i) => i.includes("#") || i.includes("url"));
    return tempColor;
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
  const handleClickItem = () => {
    setShowAllColor(!showAllColor);
  };
  const handleAddToQuoteBasket = () => {
    if(item[0]?.node?.__typename === "GroupProduct") {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id: dataGroup[0]?.node?.products?.nodes[selectColor]?.id,
          name: dataGroup[0]?.node?.products?.nodes[selectColor]?.name,
          image: dataGroup[0]?.node?.products?.nodes[selectColor]?.image?.sourceUrl,
          ["product-type"]: "simple",
          attributes: "",
          slug: dataGroup[0]?.node?.slug,
        },
      });
    }else {
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
  return (
    <div className="feature-product_wrapper">
      {loading ? (
        <div className="featured-loading">
          <Loader />
        </div>
      ) : (
        <>
          <div
            onClick={() =>
              navigate(
                `/${
                  selectColor >= 0
                    ? dataGroup[0]?.node?.products?.nodes[selectColor]?.slug
                    : dataSimple[0]?.node?.slug
                }`
              )
            }
            className="featured-products_product-item"
          >
            <LazyLoadImage
              src={
                selectColor >= 0 &&
                  dataGroup[0]?.node?.products?.nodes?.length > 0
                    ? dataGroup[0]?.node?.products?.nodes[selectColor]?.image
                        ?.sourceUrl
                    : dataGroup[0]?.node
                    ? dataGroup[0]?.node?.image?.sourceUrl
                    : dataSimple
                    ? dataSimple[0]?.node?.image?.sourceUrl
                    
                  : "https://www.nettl.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png"
              }
              alt={dataGroup ? dataGroup[0]?.node?.name : ""}
              effect="blur"
              width={"100%"}
              height={"100%"}
            />
          </div>
          <div
            className="featured-products_product_name"
            onClick={() =>
              navigate(
                `/${
                  selectColor >= 0
                    ? dataSimple[selectColor]?.node?.slug
                    : dataGroup[0]?.node?.slug
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
          {
            isArray(item[0]?.node.products) && item[0]?.node.products.length > 0 ?
                <div
                  className={
                    !item[0]?.node?.products[selectColor]?.acfProductColour?.stockStatus
                      ? "empty-stock"
                      : "product-info_stock"
                  }
                >
                  <span
                    className={checkStock(
                      item[0]?.node?.products[colorSelected]?.acfProductColour?.stockStatus
                    )?.class}
                  ></span>
                  {checkStock(
                      item[0]?.node?.products[colorSelected]?.acfProductColour?.stockStatus
                    )?.name}
                </div>
                :
                <div
                  className={
                    !item[0]?.node?.acfProductColour?.stockStatus ? "empty-stock" : "product-info_stock"
                  }
                >
                  <span className={checkStock(item[0]?.node?.acfProductColour?.stockStatus)?.class}></span>
                  {checkStock(item[0]?.node?.acfProductColour?.stockStatus)?.name}
                </div>
          }
          <div className={dataGroup[0]?.node?.products?.nodes.length > 0 ? "color-select" : "color-select empty"}>
            {dataGroup[0]?.node?.products?.nodes.length  > 6  && !showAllColor ? (
              <>
                {dataGroup[0]?.node?.products?.nodes.slice(0, 5).map((el, i) => {
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
                            selectColor === i
                              ? "color-select_item selected "
                              : "color-select_item "
                          }
                          onClick={() => setSelectColor(i)}
                        >
                          {" "}
                        </button>
                      ) : (
                        <button
                          key={i}
                          type="button"
                          // style={{ backgroundColor: el.node.metaData[0].value }}
                          className={
                            selectColor === i
                              ? "non_color selected"
                              : "non_color"
                          }
                          onClick={() => setSelectColor(i)}
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
                            selectColor === i
                              ? "color-select_item selected "
                              : "color-select_item "
                          }
                          onClick={() => setSelectColor(i)}
                        >
                          {" "}
                        </button>
                      ) : (
                        <button
                          key={i}
                          type="button"
                          // style={{ backgroundColor: el.node.metaData[0].value }}
                          className={
                            selectColor === i
                              ? "non_color selected"
                              : "non_color"
                          }
                          onClick={() => setSelectColor(i)}
                        >
                          {" "}
                        </button>
                      )}
                    </>
                  );
                })}
              </>
            )}
            { dataGroup[0]?.node?.products?.nodes.length > 6 &&
              <span
                  className="color-item-all"
                  onClick={() => handleClickItem()}
                >
                  {!showAllColor ? `+${dataGroup[0]?.node?.products?.nodes.length - 5}`: `-${dataGroup[0]?.node?.products?.nodes.length - 5}`}
              </span>
            }
          </div>
          {type === "2" && (
            <div className="you_may_product_quote-button">
              <button type="button" onClick={() => handleAddToQuoteBasket()}>
                Request a Quick Quote
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FeaturedItem;
