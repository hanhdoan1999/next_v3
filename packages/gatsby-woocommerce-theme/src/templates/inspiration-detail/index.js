import React, { Fragment, useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import ExtraItem from "./extraItem";
import Layout from "../../components/layout";
import { trim } from "lodash";
import "./styles.scss";
import parse from "html-react-parser";
import FeaturedItem from "../../components/featured-product/FeaturedItem";
import Vector1 from "../../components/TestimonialItem/Images/Vector1";
import Vector2 from "../../components/TestimonialItem/Images/Vector2";
import TextBox from "../../components/TextBox";
import Showrooms from "../../components/showrooms";
import TextWithImageVertical from "../../components/TextWithImageVertical";
import { graphql, Link, navigate } from "gatsby";
import Modal from "../../components/ModalShowImg/Modal";
import { GrPlayFill } from "react-icons/gr";
import { BiCaretRightCircle } from "react-icons/bi";
import { getImage, GatsbyImage } from "gatsby-plugin-image";

function InspirationDetail(props) {
  const { data } = props;
  const inspirationItem = data.inspirationItem
  const title = inspirationItem?.title;
  const acfProject = inspirationItem?.acfProject;
  const projectGallery = acfProject?.projectGallery;
  const listSlug = acfProject?.productRelated?.split(",");
  const acfProjectBlog = inspirationItem?.acfProjectBlog;
  const [showModal, setShowModal] = useState(false);
  const [chosenImage, setChosenImage] = useState(0);
  const [listImg, setListImg] = useState();
  const featureVideoUrl = acfProject?.featureVideoUrl;
  const featureVideoThumbnail = acfProject?.featureVideoThumbnail;
  const listProjectsRandom = data?.lstInspiration?.edges?.sort(() => 0.5 - Math.random());
  const listProjects = listProjectsRandom.slice(0, 3)
  const showrooms = inspirationItem?.showrooms;
  const listFeatured = [
    inspirationItem?.acfProject?.featureImage1,
    inspirationItem?.acfProject?.featureImage2,
    inspirationItem?.acfProject?.featureImage3,
  ]
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

  const settings2 = {
    dots: false,
    infinite: listSlug?.length >= 3 ? true : false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const settingTestimonials = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const checkListFeaturedImage = () => {
    let lstImage = listFeatured;
    if (featureVideoUrl !== null && featureVideoThumbnail !== null) {
      let image = {
        ...featureVideoThumbnail,
        videoLink: featureVideoUrl,
        videoThumbnail: featureVideoThumbnail,
        video: featureVideoUrl !== null,
      };
      let item = lstImage.slice(0, 2);
      lstImage = [...item, image];
    }
    return lstImage;
  };

  let listFeaturedImage = checkListFeaturedImage();
  const listTop = listFeaturedImage?.map((i, index) => {
    return (
      <div
        className="top-item"
        key={index}
        onClick={(e) => {
          setChosenImage(index), setShowModal(true), setListImg(projectGallery);
        }}
      >
        {/* {i !== null ? <img src={i.sourceUrl} /> : null} */}
        {i?.video ? (
          <div class="box-video">
            <GrPlayFill />
            <img src={featureVideoThumbnail?.sourceUrl} />
          </div>
        ) : (
          <GatsbyImage image={getImage(i?.localFile)} />
        )}
      </div>
    );
  });
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
            {item?.localFile ? (
              <GatsbyImage image={getImage(item.localFile)} />
            ) : (
              <div className="wrap_video">
                <div className="wrap_icon_playvideo">
                  <BiCaretRightCircle />
                </div>
                <video src={item.mediaItemUrl} controls={false} />
              </div>
            )}
          </div>
        );
      }),
    [projectGallery]
  );

  const subHeading = acfProject?.subHeading;
  const theClient = acfProject?.theClient;
  const showListProject = useMemo(
    () =>
    listProjects.map((item, index) => {
        return <ExtraItem key={index} item={item} />;
      }),
    [listProjects]
  );

  const showContentMid = listSlug?.map((slug, index) => {
    const slugUsed = trim(slug);
    return (
      <div className="item_inspiration">
        <FeaturedItem slug={slugUsed} key={index} type="2"/>
      </div>
    );
  });
  return (
    <Layout>
      {acfProject?.type === "Articles" ? (
        <div className="content-container">
          <div className="content-banner">
            <GatsbyImage
              image={getImage(
                inspirationItem?.featuredImage?.node?.localFile
              )}
              alt=""
            />
          </div>
          <div
            className="content-title-article"
            style={{ backgroundColor: acfProjectBlog.color}}
          >
            <div>
              <h2>{title}</h2>
            </div>
          </div>
          <div className="content-text-with-image">
            <div
              className="content-text-with-image-wrapper"
              style={{ background: "#59463b" }}
            >
              <div className="content-text_left">
                <div className="content-text_left-wrapper">
                  {acfProjectBlog.descriptionText &&
                    parse(acfProjectBlog.descriptionText)}
                </div>
              </div>
              <div className="content-image_right">
                <GatsbyImage
                  image={getImage(acfProjectBlog?.descriptionImage?.localFile)}
                  alt="Default1"
                />
              </div>
            </div>
          </div>
          <div className="content-content">
            <div className="content-content_wrapper">
              {inspirationItem.content &&
                parse(inspirationItem.content)}
            </div>
          </div>
          {
            acfProjectBlog?.relatedProducts ?
              <>
                <TextBox
                  heading={"Related products"}
                  bg={"#E1D7CA"}
                  textColor="#000000"
                />
                <button
                  type="button"
                  className="content-link"
                  onClick={() => navigate("/products")}
                >
                  View the complete range
                </button>
                <div className="content-related_products">
                  {acfProjectBlog?.relatedProducts?.split(",").map((item, index) => {
                    return <FeaturedItem slug={item} key={index} type="2"/>;
                  })}
                </div>
              </> : null
          }
          {
            showrooms?.nodes && showrooms?.nodes.length > 0  &&
            <Showrooms
              heading="Showrooms"
              showroomItems={showrooms?.nodes}
            />
          }
          {
            acfProjectBlog?.bottomImage && acfProjectBlog?.bottomText && 
            <TextWithImageVertical
              image={
                acfProjectBlog?.bottomImage ? acfProjectBlog?.bottomImage : ""
              }
              bottomText={acfProjectBlog?.bottomText}
              bottomMoreText={acfProjectBlog?.bottomLinkText}
              bottomMoreLink={acfProjectBlog?.bottomLinkUrl}
              fullWidthImage={true}
            />
          }
        </div>
      ) : (
        <div className="content-container">
          <div className="content-title">
            <div>
              <h2>{title}</h2>
            </div>
          </div>
          <div className="content-top">
            <div
              className="content-top-items"
              onClick={(e) => {
                setListImg(listFeaturedImage), setShowModal(true);
              }}
            >
              {listTop}
            </div>
          </div>
          <div className="content-middle">
            <div className="content-middle-details">
              <h3 className="title">{subHeading}</h3>
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: theClient }}
              />
              {listSlug?.length > 0 && (
                <div className="content-middle-list">
                  <h3 className="title">Product Used</h3>
                  <div className="list">
                    <Slider {...settings2}>{showContentMid}</Slider>
                  </div>
                </div>
              )}
              <Slider {...settingTestimonials}>
                {acfProject?.testimonials?.map((el, index) => {
                  return (
                    <div className="inspi-testimonial-item" key={index}>
                      <div className="inspi-testimonial-item_top">
                        <Vector1 />
                      </div>
                      <div className="inspi-testimonial-item_content">
                        {el?.content ? parse(el?.content) : null}
                      </div>
                      <div className="testimonial-item_bottom">
                        <div className="inspi-testimonial-item_bottom__left">
                          <span className="item-author">
                            {el?.acfTestimonial?.author}
                          </span>
                          <span className="item-company">
                            {el?.acfTestimonial?.company}
                          </span>
                          <span className="item-location">
                            {el?.acfTestimonial?.location}
                          </span>
                        </div>
                        <div className="inspi-testimonial-item_bottom__center">
                          <Vector2 />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
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
            </div>
          </div>
          <div className="content-bottom">
            <div className="bottom-title">
              <h2 className="title">You May Also like</h2>
            </div>
            <div className="bottom-content">
              <div className="bottom-content-wrap">{showListProject}</div>
            </div>
          </div>
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            listImg={listImg}
            type="inspiration"
            chosenImage={chosenImage}
          />
        </div>
      )}
    </Layout>
  );
}

export default InspirationDetail;

export const projectQuery = graphql`
  query projectDetail($id: String) {
    inspirationItem: wpProject(id: {eq: $id}) {
      id
      title
      slug
      date
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData( quality: 100, formats: WEBP)
            }
          }
        }
      }
      content
      acfProject {
        whatWeDid
        type
        theClient
        subHeading
        industry
        projectGallery {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 70, formats: WEBP)
            }
          }
          mediaItemUrl
        }
        featureImage1 {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100, formats: WEBP)
            }
          }
        }
        featureImage2 {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 70, formats: WEBP)
            }
          }
        }
        featureImage3 {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 70, formats: WEBP)
            }
          }
        }
        featureVideoThumbnail {
          sourceUrl
        }
        featureVideoUrl
        productRelated
        testimonials {
          ... on WpTestimonial {
            id
            content
            acfTestimonial {
              author
              company
              location
            }
          }
        }
      }
      acfProjectBlog {
        color
        descriptionText
        descriptionImage {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 800, quality: 100, formats: WEBP)
            }
          }
        }
        relatedProducts
        bottomImage {
          sourceUrl
        }
        bottomText
        bottomLinkText
        bottomLinkUrl
      }
    }
    lstInspiration: allWpProject(sort: {fields: date, order: DESC}) {
      totalCount
      edges {
        node {
          id
          title
          slug
          date
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(quality:100,width:800,formats: WEBP)
                }
              }
            }
          }
          content
          acfProject {
            type
            theClient
            subHeading
          }
        }
      }
    }
  }
`