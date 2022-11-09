import { Link } from "gatsby";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { GrFormClose } from "react-icons/gr";

function ProductListingModal({
  listCate,
  showChildren,
  dropDownRef,
  setShowCategoryModal,
  category,
  showMenu,
  handleSubMenu
}) {
  return (
    <div className="modal_content__cate">
      <div
        className="modal_content__cate_close"
        onClick={() => setShowCategoryModal(false)}
      >
        <GrFormClose />
      </div>
      <div className="modal_content__cate___inner">
        {listCate?.edges[0]?.node?.childItems?.nodes?.map((el, index) => {
          return (
            <div className="categories-item" key={index}>
              <div className="categories-item_parent">
                <Link className={category.toLowerCase() === el.label.toLowerCase() && "cate_active"} to={el.path} onClick={() => setShowCategoryModal(false)}>
                  {el.label}
                </Link>
                {el.childItems.nodes.length > 0 && (
                  <span
                    onClick={() => handleSubMenu(index)}
                    ref={dropDownRef}
                  >
                    <IoMdArrowDropdown />
                  </span>
                )}
              </div>
              {(showChildren === index || showMenu?.includes(el.path)) && (
                <ul className="categories-item_children-list">
                  {el.childItems.nodes.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => setShowCategoryModal(false)}
                      >
                        <Link className={category.toLowerCase() === item.label.toLowerCase() && "cate_active"} to={item.lebel}>{item.label}</Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductListingModal;
