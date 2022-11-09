import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import "./styles.scss";
function Index() {
  const data_right_menu_top = useStaticQuery(graphql`
    query MyQuery1 {
      allWpMenuItem(
        filter: { parentId: { eq: null }, locations: { eq: FOOTER } }
      ) {
        edges {
          node {
            label
            path
            url
            order
            parentId
            childItems {
              nodes {
                label
                order
                path
                title
                url
              }
            }
          }
        }
      }
    }
  `);
  return (
    <>
      <div className="wrap__right__menu">
        {data_right_menu_top?.allWpMenuItem?.edges.map((e, index) => (
          <a key={index} href={e?.node?.path}>
            {e?.node?.label}
          </a>
        ))}
      </div>
    </>
  );
}
export default Index;
