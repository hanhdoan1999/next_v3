import React, { useEffect, useState } from "react";
import "./style.scss";
import { navigate } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { gql, useLazyQuery } from "@apollo/client"
import Loader from "../../common/Loader";
function InspirationItem({ node, projectId }) {
  const [projectData, setProjectData] = useState({})
  const [getProjectData, { data, loading }] = useLazyQuery(gql`
    query GET_PROJECT($id:ID!) {
    project(id: $id) {
          title
           slug
           featuredImage {
             node {
               sourceUrl
             }
           }
           acfProject {
              type
             subHeading
             productRelated
             whatWeDid
           }
    }
  }
  `, {
    onCompleted: (data) => {
      setProjectData(data?.project)
    },
    fetchPolicy: "cache-and-network"
  })

  useEffect(() => {
    if (node) {
      setProjectData(node)
    } else if (!node && projectId) {
      getProjectData({
        variables: {
          id: projectId
        }
      })
    }
  }, [node,projectId])
  return (
    <div className="inspration-item-cover">
      {loading ?
        <div className="loading">
          <Loader />
        </div>
        :
        <div className="inspiration-item" onClick={() =>
          navigate(
            projectData?.acfProject?.type === "Articles"
              ? `/blog/${projectData.slug}`
              : `/projects/${projectData.slug}`
          )
        }>
          <div className=" text-center">
            <div style={{ height: "455px" }}>
              <div
                className="inspiration-item-wrapper"
                style={
                  projectData?.acfProject?.type === "Articles"
                    ? { backgroundColor: "#894A22" }
                    : { backgroundColor: "#9FA856" }
                }
              >
                <div
                  className="inspiration-item-img"
                  onClick={() =>
                    navigate(
                      projectData?.acfProject?.type === "Articles"
                        ? `/blog/${projectData.slug}`
                        : `/projects/${projectData.slug}`
                    )
                  }
                >
                  {node ? <GatsbyImage image={getImage(projectData?.featuredImage?.node?.localFile)} alt="default" /> :
                    <img src={projectData?.featuredImage?.node?.sourceUrl} />
                  }

                </div>
                <div className="inspiration-item-text">
                  <div className="inspiration-item-text_inner">
                    <div className="inspiration-item-text_inner__heading">
                      {projectData?.title}
                    </div>
                    {/* <div className="inspiration-item-text_inner__title">
                      {projectData?.acfProject?.subHeading}
                    </div>
                    {projectData.slug ? (
                      <a
                        href={
                          projectData?.acfProject?.type === "Articles"
                            ? `/blog/${projectData.slug}`
                            : `/projects/${projectData.slug}`
                        }
                      >
                        more
                      </a>
                    ) : null} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default InspirationItem;

