import React from "react";
import { navigate } from "gatsby";
import Parser from "html-react-parser";
import { getImage, GatsbyImage } from "gatsby-plugin-image";

const ExtraItem = (props) => {
  const { item } = props;
  const nodeAcf = item?.node?.acfProject;
  const image = getImage(item?.node?.featuredImage?.node?.localFile);
  return (
    <div className="row-project" style={{ width: "339px", height: "455px" }}>
      <div
        className="img-wrap"
        onClick={() =>
          navigate(
            item?.node?.acfProject.type === "Articles"
              ? `/blog/${item?.node?.slug}`
              : `/projects/${item?.node?.slug}`
          )
        }
      >
        <GatsbyImage image={image} alt="default" />
      </div>
      <div
        className="project-details"
        style={
          item?.node?.acfProject?.type === "Articles"
            ? { backgroundColor: "#894A22" }
            : { backgroundColor: "#9FA856" }
        }
      >
        <h2 className="heading">{item?.node?.title}</h2>
        {/* <h3 className='title'>{nodeAcf?.subHeading}</h3> */}
        <div className="description">
          {nodeAcf?.whatWeDid ? Parser(nodeAcf?.whatWeDid) : null}
        </div>
        {item?.node?.slug ? (
          <a
            href={
              item?.node?.acfProject.type === "Articles"
                ? `/blog/${item?.node?.slug}`
                : `/projects/${item?.node?.slug}`
            }
          >
            more
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default ExtraItem;
