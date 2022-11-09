import { Link } from 'gatsby';
import React from 'react';
import { textToSlug } from '../../../utils/functions';

function CategorySingle(props) {
  const { slug, index, cate, categories } = props;
  const cateName = cate.name || cate;
  const customCate = textToSlug(cateName);

  const totalAmount = categories[cate]
    ? categories[cate].totalAmount
    : cate.totalAmount
    ? cate.totalAmount
    : categories.categoriesList[index].totalAmount;

  return (
    <Link
      key={index}
      to={
        !categories
          ? `${slug}`
          : cate && slug
          ? `/product-category/${slug}/${customCate}`
          : cate
          ? `/product-category/${customCate}`
          : `/products`
      }
      state={{ modal: [1, 3, 4, 5, 5] }}
      className={`category-single ${
        index === 0 ? ' active-cate' : ''
      } cate-item text-left d-flex justify-content-between`}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: cateName.replace(/[\\]/g, ''),
        }}
      />
      <div className='text-muted'>({totalAmount})</div>
    </Link>
  );
}

export default CategorySingle;
