import { navigate } from "gatsby";
import parse from "html-react-parser";
import React, { memo, useEffect, useState } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { textToSlug } from "../../../utils/functions";
import CategorySingle from "../category-single";
import "./styles.scss";

/* eslint-disable */
function ProductsFilters({ categories, slug }) {
  const { width } = useWindowDimensions();
  const [currentCategory, setCurrentCategory] = useState("");
  const [previousCategory, setPreviousCategory] = useState("");
  const [arrOfCategories, setArrOfCategories] = useState(
    categories &&
      (Array.isArray(categories.categoriesList || categories)
        ? categories.categoriesList || categories
        : Object.keys(categories))
  );

  useEffect(() => {
    if (slug && !slug.includes("/")) {
      setPreviousCategory("All Products");
    } else if (slug && slug.includes("/")) {
      const prevCateList = slug.split("/");
      const prevCate = prevCateList[prevCateList.length - 2]
        .split("-")
        .join(" ");

      setPreviousCategory(prevCate);
    }
  }, []);

  const handleChange = (e) => {
    const dataset = e.target.options[e.target.selectedIndex].dataset;
    const url = !categories
      ? `${slug}`
      : dataset.cate && slug
      ? `/product-category/${slug}/${dataset.cate}`
      : dataset.cate
      ? `/product-category/${dataset.cate}`
      : `/products`;
    setCurrentCategory({ currentCategory: e.target.value });

    !slug && !dataset.name
      ? setPreviousCategory("All Products")
      : setPreviousCategory(dataset.name);

    if (dataset.back === "true") {
      window.history.back();
    } else {
      navigate(url);
    }
  };

  const handleGoBackPrevCate = () => {
    window.history.back();
  };
  return (
    <div className='filters-container'>
      <div className='products-cate'>
        <div className='title'>{categories && "Categories"}</div>
        {/* =====================
        ***MOBILE DROPDOWN 
        ========================*/}
        {width < 768 && (
          <form className='dropdown-filter-form'>
            <select value={currentCategory} onChange={handleChange}>
              <option value=''>Select Product Category</option>
              {slug && (
                <option
                  key='slug'
                  data-cate={slug}
                  data-custom-cate={slug}
                  data-back={true}
                >
                  {parse(`${previousCategory}`)}
                </option>
              )}
              {arrOfCategories &&
                arrOfCategories.map((cate, index) => {
                  cate = cate.length ? cate : cate.name;
                  let customCate = textToSlug(cate);
                  return (
                    <option
                      value={customCate}
                      key={index}
                      data-cate={customCate}
                      data-name={cate}
                    >
                      {parse(`${cate.replace(/[\\]/g, "")}`)}
                    </option>
                  );
                })}
            </select>
          </form>
        )}

        {/* =====================
        *** DESKTOP 
        ========================*/}

        {width > 768 && (
          <ul
            className={`cate-list ${
              (!Array.isArray(categories) || !categories || !categories[0]) &&
              "inActive"
            }`}
          >
            {previousCategory && (
              <li className='go-back-btn' onClick={handleGoBackPrevCate}>
                Go Back
              </li>
            )}
            {arrOfCategories &&
              (previousCategory ? [...arrOfCategories] : arrOfCategories).map(
                (cate, index) => {
                  return (
                    <CategorySingle
                      categories={categories}
                      cate={cate}
                      slug={slug}
                      index={index}
                      key={index}
                    />
                  );
                }
              )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default memo(ProductsFilters);
