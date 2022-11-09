import React, { useContext, useLayoutEffect } from "react";
import { useEffect, useState } from "react";
import InspirationBanner from "../../components/inspirationBanner";
import InspirationItem from "../../components/InspirationItem";
import "../../templates/inspiration-listing/styles.scss";
import Layout from "../../components/layout/index";
import ProjectFilter from "../../components/projects/ProjectFilter";
import { navigate } from "gatsby";
import ArrowNext from "./images/arrow-next";
import ArrowPrev from "./images/arrow-prev";
import {GlobalStateContext} from '../../components/contexts/AppContext'
import Index from "../../components/btn-backtotop";
import ReactPlayer from "react-player";
import Vector1 from "../../components/TestimonialItem/Images/Vector1";
import Vector2 from "../../components/TestimonialItem/Images/Vector2";
import parse from "html-react-parser";
import Slider from "react-slick";
import ReactPaginate from "react-paginate";
function InspirationListing(props) {
  const page = typeof window !== "undefined" && new URLSearchParams(window.location.search).get('page');
  const projectLocation = typeof window !== "undefined" && new URLSearchParams(window.location.search).get('project_location');
  const projectIndustry = typeof window !== "undefined" && new URLSearchParams(window.location.search).get('project_industry');
  const url = typeof window !== "undefined" && window.location.href
  const [value1, setValue1] = useState();
  const {value2} = useContext(GlobalStateContext);
  const { banner, lstInspiration, listOfIndustry, listOfLocation } =
  props.pageContext;
  const sortList = lstInspiration?.sort((a, b) => new Date(b?.node?.date) - new Date(a?.node?.date))
  const [filterData, setFilterData] = useState(sortList);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [forcePage, setForcePage] = useState(0);
  const itemsPerPage = 6;
  const filterDataInspiration = (e, type) => {
    setFilterData(
        sortList.filter((element) => {
          if (value1 == "Case Studies") {
            return (
              element?.node?.acfProject?.type?.toLowerCase() === value1.toLowerCase()
            );
          } else if (value1 == "Articles") {
            return (
              element?.node?.acfProject?.type?.toLowerCase() === value1.toLowerCase()
            );
          } else if (value1 === "3D Designs") {
            return element?.node?.acfProject?.type?.toLowerCase() === value1.toLowerCase()
          }else if (value1 === "All") {
            return element
          }
        })
      );
  };
  const handleSubmit = (value) => {
      if (value.industry !== "" && value.location === "") {
          navigate(`?page=1&project_industry=${value.industry}`)
      }  
      if (value.industry === "" && value.location !== "") {
        navigate(`?page=1&project_location=${value.location}`)
      }  
      if (value.industry !== "" && value.location !== "") {
        navigate(`?page=1&project_location=${value.location}&project_industry=${value.industry}`)
      }  
      if (value.industry === "" && value.location === "" && page === null && !url.includes(value.industry) && !url.includes(value.location))  {
        navigate(`/inspiration?page=1`)
      }
      if (value.industry === "" && value.location === "" && page !== null && !url.includes(value.industry) && !url.includes(value.location))  {
        navigate(`/inspiration?page=${page}`)
      }
    // else {
    //   navigate("/inspiration")
    // }
  };

  useEffect(() => {
    if(value1) {
      filterDataInspiration()
    }
  }, [value1]);
  useEffect(() => {
    handleSubmit(value2);
  }, [value2]);


  const settingTestimonials = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  

  useEffect(() => {
    let newArr = lstInspiration;
    if(projectIndustry || projectLocation ) {
      if(projectIndustry && projectLocation) {
        newArr = lstInspiration?.filter(item => item?.node?.acfProject?.industry.includes(projectIndustry) && item?.node?.acfProject?.location.includes(projectLocation));
      }else {
        if(projectIndustry) {
          newArr = lstInspiration?.filter(item => item?.node?.acfProject?.industry.includes(projectIndustry));
        }
        if(projectLocation) {
          newArr = lstInspiration?.filter(item => item?.node?.acfProject?.location.includes(projectLocation));
        }
      }
    }
    newArr = newArr?.sort((a, b) => new Date(b?.node?.date) - new Date(a?.node?.date))
    const _page = page ? page - 1 : 0;
    const newOffset = (_page * itemsPerPage) % filterData.length;
    setItemOffset(newOffset);
    setForcePage(_page);
    setFilterData(newArr);
  }, [page,projectLocation,projectIndustry])

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filterData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filterData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage,filterData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filterData.length;
    setItemOffset(newOffset);
    setForcePage(event.selected);
    navigate(`?page=${event.selected + 1}${projectLocation !== null ? `&project_location=${projectLocation}`: ""}${projectIndustry !== null ? `&project_industry=${projectIndustry}` : ""}`);
  };

  return (
    <Layout>
      <div className="inspiration">
        <InspirationBanner
          banner={banner}
          lstInspiration={lstInspiration}
          setValue1={setValue1}
        />

        <ProjectFilter
          listOfIndustry={listOfIndustry}
          listOfLocation={listOfLocation}
          lstInspiration={lstInspiration}
          value2={value2}
          projectLocation={projectLocation}
          projectIndustry={projectIndustry}
        />
        <div className="inspiration_products">
          <div className="inspiration_products_wrapper">
            {currentItems?.map((el, index) => (
              <InspirationItem node={el.node} key={index} />
            ))}
            {filterData.length === 0 && <div className="not-found-data">Not found data</div>}
          </div>
        </div>
        <div className="inspiration-paginate">
        <ReactPaginate
            className={pageCount < 2 ? "none" : "paginate-custom"}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            breakLabel="..."
            nextLabel={
              <div className="next-page">
                <ArrowNext />
              </div>
            }
            forcePage={forcePage}
            onPageChange={handlePageClick}
            pageCount={pageCount}
            previousLabel={
              <div className="prev-page">
                <ArrowPrev />
              </div>
            }
            renderOnZeroPageCount={null}
          />
        </div>
          <Index />
      </div>
      {banner?.siteOptions?.acfInspirationProjectsPage?.bottomVideo &&
        <div className="bottom-video-wrapper">
          <ReactPlayer
            className="bottom-video"
            url={banner?.siteOptions?.acfInspirationProjectsPage?.bottomVideo}
            playing={false}
            height={"100%"}
            width={"100%"}
          />
        </div>
      }
      {banner?.siteOptions?.acfInspirationProjectsPage?.testimonials && banner?.siteOptions?.acfInspirationProjectsPage?.testimonials.length > 0 &&
        <Slider {...settingTestimonials}>
        {banner?.siteOptions?.acfInspirationProjectsPage?.testimonials?.map((el, index) => {
          return (
            <div className="testimonial-item-bottom">
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
            </div>
          );
        })}
      </Slider>
      }
    </Layout>
  );
}

export default InspirationListing;
