import React, { useEffect } from 'react';
import Parser from 'html-react-parser';
import './style.scss';

function DescriptionCategory({ desCategory, categoryReference, imgCategory }) {
  const getTitle = (title) => {
    let arr = title.split('-');
    return arr[arr.length - 1];
  };
  useEffect(() => {
    var title = document.createElement('h3');
    title.innerHTML = `${categoryReference ? getTitle(categoryReference) : ''}`;
    document.getElementsByClassName('wp-block-column')[0]?.prepend(title);
  }, [categoryReference]);
  return (
    <div className='category-description'>
      <div className='container category-description-content'>
        <img src={imgCategory} alt={imgCategory} />
        <div> {desCategory && Parser(`${desCategory}`)}</div>
      </div>
    </div>
  );
}

export default DescriptionCategory;
