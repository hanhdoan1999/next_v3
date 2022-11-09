import React, { useEffect, useState } from "react";
import TextBox from "../TextBox";
import InspirationItem from "../InspirationItem";
import ReactPaginate from "react-paginate";
import ArrowPrev from "./images/arrow-prev";
import ArrowNext from "./images/arrow-next";
import "./ProjectRelated.scss";
function ProjectRelated({ listProject }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(listProject?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listProject?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listProject.length;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setItemOffset(newOffset);
  };
  return (
    <div className="project-related">
      <TextBox heading="HOW WE USED SIMILAR PRODUCTS" bg="#e7e4e0" />
      <div className="project-related_item_wrapper">
        {listProject?.map((item, index) => {
          return <InspirationItem projectId={item.id} key={index} />;
        })}
      </div>
      {/* <ReactPaginate
        className={pageCount<2?"none":"paginate-custom"}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        breakLabel="..."
        nextLabel={<div className="next-page"><ArrowNext/><div className="next-page_text">next</div></div>}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel={<div className="prev-page"><div className="prev-page_text">prev</div><ArrowPrev/></div>}
        renderOnZeroPageCount={null}
      /> */}
    </div>
  );
}

export default ProjectRelated;
