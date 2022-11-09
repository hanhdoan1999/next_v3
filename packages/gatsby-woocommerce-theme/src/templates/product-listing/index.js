import { Link } from "gatsby";
import React, { useEffect, useState, useRef } from "react";
import Layout from "../../components/layout";
import "./style.scss";
import ProductItem from "../../components/ProductItem";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import QuoteCart from "../../common/QuoteCart";
import QuickQuotePopup from "../../common/QuickQuotePopup";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import CategoriesModal from "./CategoriesModal";
import TextBox from "../../components/TextBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BtnToTop from "../../components/btn-backtotop/index";
import ArrowPrev from "./images/arrow-prev";
import ArrowNext from "./images/arrow-next";
import Default from "./images/default.png";
import Dropdown from "../../components/Dropdown";
import { pages } from "./helper";
import ReactPlayer from "react-player";
import { gql, useQuery } from "@apollo/client";

function ListProductItem({ currentItems, setQuickQuoteItem }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item, index) => (
          <div key={index}>
            <ProductItem data={item} setQuickQuoteItem={setQuickQuoteItem} />
          </div>
        ))}
    </>
  );
}

function ProductListing(props) {
  const {
    listCate,
    listProducts,
    category,
    imageBanner,
    description,
    longDescription,
    uri,
    id,
    videoBottom
  } = props.pageContext;
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [quickQuoteItem, setQuickQuoteItem] = useState();
  const [showChildren, setShowChildren] = useState(-1);
  const [showChildrenLevel3, setShowChildrenLevel3] = useState(-1);
  const [forcePage, setForcePage] = useState(0);
  const dropDownRef = useRef();
  const { width } = useWindowDimensions();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [colorChosen, setColorChosen] = useState([]);
  const [showMenu, setShowMenu] = useState(uri);
  const ref = useRef(null);
  const [choose, setChoose] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const pathname = typeof window !== "undefined" ? window.location.pathname : ""
  const handleSetChoose = (value) => {
    setChoose(value.value);
    setColorChosen(value.value);
    // setForcePage(0);
  }
  const convertData = listProducts.map((el) => {
    if (el.productTypes === "grouped") {
      return {
        slug: el.slug,
        name: el.name,
        type: el.productTypes,
        image: el.image,
        menuOrder:el.menuOrder,
        stockStatus:el.acfProductColour.stockStatus,
        products: el.products?.map((item, index) => {
          return {
            id: item.id,
            name: item.name,
            image: item.image,
            color: item.metaProductColor,
            stockStatus:item.acfProductColour.stockStatus,
            slug: item.slug,
            sku: item.sku,
          };
        }),
      };
    } else {
      return {
        slug: el.slug,
        name: el.name,
        image: el.image,
        menuOrder:el.menuOrder,
        stockStatus:el.acfProductColour.stockStatus,
        type: el.productTypes,
        id: el.id,
      };
    }
  }).sort((a,b) => a.menuOrder - b.menuOrder);
  const allColor = listProducts
    .map((el) => {
      return el.products?.map((item) =>
        item.metaProductColor.find((i) => i.includes("#") || i.includes("url"))
      );
    })
    .flat();
  const allColorName = listProducts
    .map((el) => {
      return el.products?.map((item) =>
        item.metaProductColor.find(
          (i) => !i.includes("#") && !i.includes("url")
        )
      );
    })
    .flat();
  const uniqueColor = [...new Set(allColor)];
  const uniqueColorName = [...new Set(allColorName)];

  const [afterConvert, setAfterConvert] = useState(convertData);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % afterConvert.length;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setItemOffset(newOffset);
    setForcePage(event.selected);
  };

  useEffect(() => {
    const filterData = convertData.filter((el) => {
      let temp;
      if (el.products && el.products.length > 0) {
        temp = el.products.some((item) =>
          colorChosen.includes(
            item.color.find((i) => i.includes("#") || i.includes("url"))
          )
        );
      } else if (
        el.products &&
        el.products.length === 0 &&
        (colorChosen.includes(undefined) || colorChosen.includes(null))
      ) {
        temp = true;
      }
      return temp;
    });
    if (colorChosen.length > 0 && filterData.length > 0) {
      setAfterConvert(filterData);
    } else {
      setAfterConvert(convertData);
    }
    // handlePageClick({ selected: 0 });
  }, [colorChosen]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(afterConvert.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(afterConvert.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, afterConvert]);

  const handleSubMenu = (index) => {
    setShowMenu("");
    if (showChildren === index) {
      setShowChildren(-1);
    } else if (showMenu === "") {
      setShowChildren(index);
    }
  };
  const handleSubMenuLevel3 = (index) => {
    setShowMenu("");
    if (showChildrenLevel3 === index) {
      setShowChildrenLevel3(-1);
    } else if (showMenu === "") {
      setShowChildrenLevel3(index);
    }
  };
  const dropdownValue = uniqueColorName?.map((el, index) => {
    return {
      label: el === undefined ? "No color" : el,
      value: uniqueColor[index] === undefined ? "No color" : uniqueColor[index],
    };
  });

  const handleSetPageSize = (val) => {
    setItemsPerPage(val.value);
    setForcePage(0);
  };
  return (
    <Layout>
      <div className="product-listing">
        <div className="product-listing_top">
          {imageBanner ? (
            <LazyLoadImage
              src={imageBanner.sourceUrl}
              alt=""
              effect="blur"
              width={"100%"}
            />
          ) : (
            <LazyLoadImage src={Default} alt="" effect="blur" width={"100%"} />
          )}
          <TextBox heading={category} bg={"#D2232A"} textColor={"#ffffff"} />
          <div className="product-listing_top-description">
            {description && <p>{description}</p>}
            {longDescription !== null &&
              longDescription !== "" &&
              longDescription !== undefined && (
                <a href={`#${id}`} className="read-more-des">
                  Read More
                </a>
              )}
            <h3 className="filter-title">FILTER BY COLOUR</h3>
            <div style={{ width: "300px", margin: "0 auto" }}>
              <Dropdown
                title="FILTER BY COLOUR"
                label="label"
                value="value"
                data={dropdownValue}
                valueChosen={choose}
                setValueChosen={handleSetChoose}
              />
            </div>
          </div>
        </div>
        <div className="product-listing_content">
          {width > 600 ? (
            <div className="product-listing_content__cate">
              <div className="product-listing_content__cate___inner">
                {listCate?.edges[0]?.node?.childItems?.nodes?.map(
                  (el, index) => {
                    return (
                      <div
                        className="categories-item"
                        key={index}
                        ref={dropDownRef}
                      >
                        <div className="categories-item_parent">
                          <Link
                            className={
                              category.toLowerCase().includes(el.label.toLowerCase())
                              &&
                              el.path === pathname &&
                              "cate_active"
                            }
                            to={el.path}
                            onClick={() => setShowMenu(uri)}
                          >
                            {el.label}
                          </Link>
                          {el.childItems.nodes.length > 0 && (
                            <span onClick={() => handleSubMenu(index)}>
                              <IoMdArrowDropdown />
                            </span>
                          )}
                        </div>
                        {(showChildren === index ||
                          showMenu?.includes(el.path)) && (
                          <ul className="categories-item_children-list">
                            {el.childItems.nodes.map((item, index) => {
                              return (
                                <div>
                                  <li key={index}>
                                    <Link
                                      className={
                                        category.toLowerCase().includes(item.label.toLowerCase()) &&
                                        item.path ===
                                          pathname &&
                                        "cate_active"
                                      }
                                      to={item.path}
                                      onClick={() => setShowMenu(uri)}
                                    >
                                      {item.label}
                                    </Link>
                                    {item.childItems.nodes.length > 0 && (
                                      <span
                                        onClick={() =>
                                          handleSubMenuLevel3(index)
                                        }
                                      >
                                        <IoMdArrowDropdown />
                                      </span>
                                    )}
                                  </li>
                                  {(showChildrenLevel3 === index ||
                                    showMenu?.includes(item.path)) && (
                                    <ul className="categories-item_children-list level-3">
                                      {item.childItems.nodes.map((i, index) => {
                                        return (
                                          <div>
                                            <li key={index}>
                                              <Link
                                                className={
                                                  category.toLowerCase().includes(i.label.toLowerCase()) &&
                                                  i.path ===
                                                    pathname &&
                                                  "cate_active"
                                                }
                                                to={i.path}
                                                onClick={() => setShowMenu(uri)}
                                              >
                                                {i.label}
                                              </Link>
                                            </li>
                                          </div>
                                        );
                                      })}
                                    </ul>
                                  )}
                                </div>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          ) : (
            <div
              className="product-listing_content-arrow"
              onClick={() => setShowCategoryModal(true)}
            >
              <BsArrowRight />
              <p>Show More</p>
            </div>
          )}
          {showCategoryModal && (
            <CategoriesModal
              showChildren={showChildren}
              listCate={listCate}
              dropDownRef={dropDownRef}
              setShowCategoryModal={setShowCategoryModal}
              category={category}
              showMenu={showMenu}
              handleSubMenu={handleSubMenu}
            />
          )}
          <div className="product-listing_content__list">
            <ListProductItem
              currentItems={currentItems}
              setQuickQuoteItem={setQuickQuoteItem}
            />
            <ReactPaginate
              ref={ref}
              className={pageCount < 2 ? "none" : "paginate-custom"}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              breakLabel="..."
              nextLabel={
                <div className="next-page">
                  <ArrowNext />
                  {/* <div className="next-page_text">next</div> */}
                </div>
              }
              forcePage={forcePage}
              onPageChange={handlePageClick}
              pageCount={pageCount}
              previousLabel={
                <div className="prev-page">
                  {/* <div className="prev-page_text">prev</div> */}
                  <ArrowPrev />
                </div>
              }
              renderOnZeroPageCount={null}
            />
            {/* {(afterConvert && afterConvert?.length > itemsPerPage) && */}
            <Dropdown
              widthDesktop={`100px`}
              widthMobile={`50px`}
              className="dropdownPageSize"
              label="label"
              value="value"
              data={pages}
              valueChosen={itemsPerPage}
              setValueChosen={handleSetPageSize}
            />
            {/* } */}
          </div>
        </div>
        {longDescription && longDescription !== null && (
          <div className="product-listing_top-description">
            <p
              id={id}
              dangerouslySetInnerHTML={{ __html: longDescription }}
            ></p>
          </div>
        )}
        {videoBottom && (
         <div className="bottom-video-wrapper">
          <ReactPlayer
            className="bottom-video"
            url={videoBottom}
            playing={false}
            height={"100%"}
            width={"100%"}
          />
          </div>
        )}
      </div>
      <QuoteCart />
      <QuickQuotePopup cartItems={quickQuoteItem} />
      <BtnToTop />
    </Layout>
  );
}

export default ProductListing;
