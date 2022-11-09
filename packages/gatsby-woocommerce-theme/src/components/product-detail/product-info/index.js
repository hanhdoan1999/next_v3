import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import ActionButtons from '../../../common/ActionButtons';
import ColorsBar from '../../../common/ColorsBar';
import MainFeatures from '../../../common/MainFeatures';
import QuoteCart from '../../../common/QuoteCart';
import ShareButtons from '../../../common/ShareButtons';
import SmallStarIcon from '../../icons/SmallStarIcon';
import Parser from 'html-react-parser';
import './styles.scss';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Select from 'react-select';

function ProductInfo({
  name,
  shortDescription,
  stocked,
  categories,
  colors,
  images,
  handleSelectProductVariant,
  listSimpleProduct,
  meta_NextrendIconsStackable,
  meta_NextrendIconsWaterResistant,
  meta_NextrendIconsUv,
  isProductDetail = '',
  activeColorIndex,
  id,
  selectedSimpleProduct,
  customName1,
  customValue1,
  customName2,
  customValue2,
  customName3,
  customValue3,
  customName4,
  customValue4,
  parentProduct,
  type,
  slug,
}) {
  let listCate = [];
  categories &&
    categories
      .split(',')
      .map((cateLevel1) => (listCate = [...listCate, cateLevel1.split(' > ')]));
  listCate = [...new Set(listCate.flat())];

  const { width } = useWindowDimensions();

  const defaultValue = {
    value: 'Choose an option',
    label: 'Choose an option',
  };

  const getOption = (customValue) => {
    var options = [defaultValue];
    const len = customValue.length;
    for (let i = 0; i < len; i++) {
      let obj = {
        value: customValue[i],
        label: customValue[i],
      };

      options.push(obj);
    }
    return options;
  };

  const [selectedOption1, setSelectedOption1] = useState(
    customValue1 ? getOption(customValue1)[0] : null
  );
  const [selectedOption2, setSelectedOption2] = useState(
    customValue2 ? getOption(customValue2)[0] : null
  );
  const [selectedOption3, setSelectedOption3] = useState(
    customValue3 ? getOption(customValue3)[0] : null
  );
  const [selectedOption4, setSelectedOption4] = useState(
    customValue4 ? getOption(customValue4)[0] : null
  );

  const handleChangeOption1 = (selectedOption) => {
    setSelectedOption1(selectedOption);
  };
  const handleChangeOption2 = (selectedOption) => {
    setSelectedOption2(selectedOption);
  };
  const handleChangeOption3 = (selectedOption) => {
    setSelectedOption3(selectedOption);
  };
  const handleChangeOption4 = (selectedOption) => {
    setSelectedOption4(selectedOption);
  };

  const getValues = (arr, field) => {
    return arr && arr.map((item) => item.node[`${field}`]);
  };
  const simpleImages = getValues(listSimpleProduct, 'images');
  const [displayImage, setDisplayImage] = useState(
    type === 'grouped' ? images[0] : images
  );

  const isPackages = categories && categories.includes('Packages');

  useEffect(() => {
    let defaultImage =
      simpleImages && simpleImages[0] && simpleImages[0].split(',');
    defaultImage && setDisplayImage(defaultImage[0]);
  }, [simpleImages]);

  let listAtr = [];
  for (let i = 1; i <= 4; i++) {
    if (
      eval(`customName${i}`) !== undefined &&
      eval(`customValue${i}`) !== undefined
    ) {
      listAtr.push({
        name: eval(`customName${i}`),
        visible: true,
        variation: false,
        options: [eval(`selectedOption${i}`).value],
      });
    }
  }

  return (
    <div className='product-info-container'>
      <h1 className='product-name'>{name}</h1>
      <div className='stars'>
        <SmallStarIcon />
        <SmallStarIcon />
        <SmallStarIcon />
        <SmallStarIcon />
        <SmallStarIcon />
      </div>

      <div className='product-des'>
        {shortDescription ? Parser(`${shortDescription}`) : ''}
      </div>

      <div className='other-info'>
        <div className='product-available other-info-row d-flex align-items-baseline'>
          <span className='product-info-title'>Availability</span>
          <div className={`${width < 576 ? 'w-100' : ''}`}>
            {stocked > 0 ? 'STOCKED' : 'MADE TO ORDER'}
          </div>
        </div>
        {listCate.length ? (
          <div className='product-category other-info-row d-flex align-items-baseline'>
            <span className='product-info-title'>Category</span>
            <div
              className={`product-category-mobile ${
                width < 576 ? 'w-100' : ''
              }`}
            >
              {listCate.slice(0, 2).map((item, index) => (
                <span className='item' key={index}>
                  {parse(`${item}`)}
                </span>
              ))}
            </div>
          </div>
        ) : (
          ''
        )}
        {colors && (
          <>
            <div className='product-colors d-flex other-info-row'>
              <span className='product-info-title'>Colours</span>
              <ColorsBar
                colors={colors}
                images={images}
                handleSelectProductVariant={handleSelectProductVariant}
                activeColorIndex={activeColorIndex}
                productId={id}
              />
            </div>

            {/* {!isPackages && (
              <div className='product-colors d-flex other-info-row'>
                <span className='product-info-title'>Colours</span>
                <ColorsBar
                  colors={colors}
                  images={images}
                  handleSelectProductVariant={handleSelectProductVariant}
                  activeColorIndex={activeColorIndex}
                  productId={id}
                />
              </div>
            )} */}
          </>
        )}

        {customValue1.length > 0 && customName1 !== undefined ? (
          <div className='product-available other-info-row d-flex align-items-center'>
            <span className='product-info-title'>{customName1}</span>
            <span className='product-info-select'>
              <Select
                value={selectedOption1}
                onChange={handleChangeOption1}
                options={getOption(customValue1)}
                defaultValue={getOption(customValue1[0])}
              />
            </span>
          </div>
        ) : (
          ''
        )}
        {customValue2.length > 0 && customName2 !== undefined ? (
          <div className='product-available other-info-row d-flex align-items-center'>
            <span className='product-info-title'>{customName2}</span>
            <span className='product-info-select'>
              <Select
                value={selectedOption2}
                onChange={handleChangeOption2}
                options={getOption(customValue2)}
                defaultValue={getOption(customValue2[0])}
              />
            </span>
          </div>
        ) : (
          ''
        )}
        {customValue3.length > 0 && customName3 !== undefined ? (
          <div className='product-available other-info-row d-flex align-items-center'>
            <span className='product-info-title'>{customName3}</span>
            <span className='product-info-select'>
              <Select
                value={selectedOption3}
                onChange={handleChangeOption3}
                options={getOption(customValue3)}
                defaultValue={getOption(customValue3[0])}
              />
            </span>
          </div>
        ) : (
          ''
        )}
        {customValue4.length > 0 && customName4 !== undefined ? (
          <div className='product-available other-info-row d-flex align-items-center'>
            <span className='product-info-title'>{customName4}</span>
            <span className='product-info-select'>
              <Select
                value={selectedOption4}
                onChange={handleChangeOption4}
                options={getOption(customValue4)}
                defaultValue={getOption(customValue4[0])}
              />
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
      <MainFeatures
        meta_NextrendIconsStackable={meta_NextrendIconsStackable}
        meta_NextrendIconsWaterResistant={meta_NextrendIconsWaterResistant}
        meta_NextrendIconsUv={meta_NextrendIconsUv}
        isProductDetail={isProductDetail}
      />
      <ActionButtons
        slug={`/${slug}`}
        showCallButton={true}
        listSimpleProduct={listSimpleProduct}
        isPackages={isPackages}
        displayImage={displayImage}
        groupedProductName={name}
        productId={id}
        selectedSimpleProduct={selectedSimpleProduct}
        listAtr={listAtr}
      />

      <QuoteCart listSimpleProduct={listSimpleProduct} />
      <ShareButtons />
    </div>
  );
}

export default ProductInfo;
