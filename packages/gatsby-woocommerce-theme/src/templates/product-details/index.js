import React, { useMemo, useState } from "react";
import ProductImages from "../../components/product-image";
import ProductInfo from "../../components/product-info";
import ProductRelated from "../../components/product-related";
import ProjectRelated from "../../components/project-related";
import QuoteCart from "../../common/QuoteCart";
import QuickQuotePopup from "../../common/QuickQuotePopup";
import Layout from "../../components/layout";
import Slider from "react-slick";
import Modal from "../../components/ModalShowImg/Modal";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { GrPlayFill } from "react-icons/gr";
import "./ProductDetails.scss";
import { graphql, navigate } from "gatsby";
import { isArray } from "lodash";
function ProductDetails(props) {
  const productItem = props?.data?.allWpProduct?.edges[0]?.node
  const listProject = productItem?.acfProduct?.relatedProjects?.slice(0,3)
  const projectGallery = productItem?.galleryImages?.nodes;
  const slug = productItem?.slug
  const firstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getItemInCate = (uri)=> {
    let item = uri?.split("-")?.filter(el=> el!=="");
    let lst =  item?.map(el=> firstLetter(el));
    return lst.join(" ");
  }

  const getCate = (uri)=>{
    let arr = [{name: "Home", slug:"/"},{name:"Products",slug:"/products"}]
    let cate = uri?.split("/")?.filter(el=> el!=="");
    let newName = getItemInCate(cate[0])
    const newArr = [...arr,{name:newName,slug:`/${uri}`}]
    return newArr
  }
  const breadcrumb = getCate(slug);
  const [chosen, setChosen] = useState(0);
  const [quickQuoteItem, setQuickQuoteItem] = useState();
  const [showModal, setShowModal] = useState(false);
  const [listImg, setListImg] = useState();
  const [chosenImage, setChosenImage] = useState(0);
  const listSources = useMemo(
    () =>
      projectGallery?.map((item, index) => {
        return (
          <div
            key={index}
            className="gl-item"
            onClick={(e) => {
              setChosenImage(index),
                setShowModal(true),
                setListImg(projectGallery);
            }}
          >
            {item?.altText ? (
              <div class="box-video">
                <GrPlayFill />
                <GatsbyImage image={getImage(item.localFile)} />
              </div>
            ) : (
              <GatsbyImage image={getImage(item.localFile)} />
            )}
          </div>
        );
      }),
    [projectGallery]
  );
  const handleChoose = (index) => {
    setChosen(index);
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settings1Item = {
    ...settings,
    slidesToShow: 1,
  };

  const settings2Item = {
    ...settings,
    slidesToShow: 2,
  };

  
  return (
    <Layout>
        {(breadcrumb && breadcrumb?.length) > 0 &&
        <div className="breadcrumb-custom">
          {breadcrumb?.map((item,index)=> <span key={index} onClick={() => navigate(item.slug)}>{item.name}</span>)}
        </div>}
      <div className="product-details">
        <ProductImages
          products={productItem?.products?.nodes}
          defaultImage = {productItem?.image}
          handleChoose={handleChoose}
          chosen={chosen}
        />
        <ProductInfo
          product={productItem}
          handleChoose={handleChoose}
          chosen={chosen}
          setQuickQuoteItem={setQuickQuoteItem}
        />
      </div>
      <div className="content-bottom-list">
        <div className="list-projects">
          {listSources && listSources.length === 0 ? (
            ""
          ) : listSources && listSources.length === 1 ? (
            <Slider {...settings1Item}>{listSources}</Slider>
          ) : listSources && listSources.length === 2 ? (
            <Slider {...settings2Item}>{listSources}</Slider>
          ) : listSources && listSources.length >= 3 ? (
            <Slider {...settings}>{listSources}</Slider>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* {
        isArray(productItem?.related) && productItem?.related.length > 0 &&
      } */}
      <ProductRelated data={productItem?.related} />
      {isArray(listProject) && listProject.length > 0 ? 
      <ProjectRelated listProject={listProject} /> : null
      }
      <QuoteCart />
      <QuickQuotePopup cartItems={quickQuoteItem} />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        listImg={listImg}
        type="product"
        chosenImage={chosenImage}
      />
    </Layout>
  );
}

export default ProductDetails;

export const productQuery = graphql`
query ProductDetails($slug: String) {
  allWpProduct(
    filter: {slug: {eq: $slug}}
  ) {
    totalCount
    edges {
      node {
        acfFeatures {
          features
        }
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 800, quality: 100, formats: WEBP)
            }
          }
        }
        acfProductFeatureIcons {
          assemblyRequired
          furnIconsAfrdi
          furnIconsCatas
          furnIconsFastDispatch
          furnIconsIndoorOutdoor
          furnIconsQantas
          furnIconsStackable
          furnIconsUv
          furnIconsWaterResistant
          furnIconsWarranty
          madeIn
        }
        galleryImages {
          nodes {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 800, quality: 100, formats: WEBP)
              }
            }
            altText
          }
        }
        related {
          nodes {
            sku
            name
            slug
          }
        }
        acfProduct {
          relatedProjects {
            ... on WpProject {
              id
            }
          }
        }
        acfProductColour {
          
          stockStatus
        }
        ... on WpGroupProduct {
          name
          slug
          sku
          uri
          status
          shortDescription
          description
          featured
          productTypes {
            nodes {
              name
            }
          }
          products {
            nodes {
              sku
              slug
              id
              name
              databaseId
              image {
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 800, quality: 100, formats: WEBP)
                  }
                }
              }
              acfProductColour {
                productColour
                stockStatus
              }
            }
          }
        }
      }
    }
  }
}

`
