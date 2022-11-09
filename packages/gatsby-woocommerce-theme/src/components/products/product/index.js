import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ActionButtons from '../../../common/ActionButtons';
import ColorsBar from '../../../common/ColorsBar';
import ImageProductDefault from '../../../common/ImageProductDefault';
import './styles.scss';

function Product(props) {
  let listAtr = [];
  // for (let i = 1; i <= 5; i++) {
  //   if (eval(`props.product.customValue${i}Name`)) {
  //     listAtr.push({
  //       name: eval(`props.product.customValue${i}Name`),
  //       visible: true,
  //       variation: false,
  //       options: [eval(`props.product.customValue${i}Value`).split(',')[0]],
  //     });
  //   }
  // }

  const getValues = (arr, field) => {
    return arr && arr.map((item) => item.node[`${field}`]);
  };

  const {
    name,
    slug,
    listSimpleProduct,
    categories,
    stocked,
    id,
    secondImage,
  } = props.product;

  const isPackages = categories && categories.includes('Packages');
  const getListSimpleProductMatchColor =
    Array.isArray(listSimpleProduct) &&
    listSimpleProduct.filter((el) => el.node.meta_ProductColour !== null);

  const colors = getValues(
    getListSimpleProductMatchColor,
    'meta_ProductColour'
  );
  const images = getValues(getListSimpleProductMatchColor, 'images');
  const [displayImage, setDisplayImage] = useState((images && images[0]) || '');
  const [selectedSimpleProduct, setSelectedSimpleProduct] = useState(null);
  const productImages =
    props.product.images && !Array.isArray(props.product.images)
      ? props.product.images.split(',')
      : props.product.images;

  /* eslint-disable */
  useEffect(() => {
    if (secondImage && secondImage !== '') {
      setDisplayImage(secondImage);
    } else {
      let defaultImage = images && images[0] && images[0]?.split(',');
      (defaultImage && setDisplayImage(defaultImage[0])) ||
        setDisplayImage(productImages[0]);
    }
  }, []);

  const handleSelectProductVariant = (e) => {
    let variantColorImages = e.target.dataset.image_src.split(', ');
    const selectedSimpleProduct = listSimpleProduct[e.target.dataset.index];
    variantColorImages[0] !== displayImage &&
      setDisplayImage(variantColorImages[0]);
    setSelectedSimpleProduct(selectedSimpleProduct.node);
  };

  return (
    <div className={`product-container ${props.colStyles}`}>
      <div className='product-container-inner'>
        <Link
          to={slug ? `/${slug}` : 404}
          state={{ prevPath: props?.prevPath }}
          className='product-image-link custom-width'
        >
          <span className={`product-type ${stocked > 0 ? 'stocked' : 'order'}`}>
            {stocked > 0 ? 'STOCKED' : 'MADE TO ORDER'}
          </span>
          {productImages?.length > 0 ? (
            <LazyLoadImage
              alt={name}
              src={displayImage}
              effect='blur'
              width={'100%'}
            />
          ) : (
            <ImageProductDefault />
          )}
        </Link>
        <div className='product-info'>
          <Link to={`/${slug}`} className='product-name'>
            {name.length > 50 ? name.slice(0, 50) + '...' : name}
          </Link>

          {!isPackages ? (
            <div className='colors'>
              <ColorsBar
                colors={colors}
                images={images}
                handleSelectProductVariant={handleSelectProductVariant}
                productId={id}
              />
            </div>
          ) : (
            <div className='colors'></div>
          )}

          <ActionButtons
            slug={`/${slug}`}
            listSimpleProduct={listSimpleProduct}
            isPackages={isPackages}
            displayImage={displayImage}
            groupedProductName={name}
            productId={id}
            selectedSimpleProduct={selectedSimpleProduct}
            listAtr={listAtr}
          />
        </div>
      </div>
    </div>
  );
}

export default Product;
