import React from "react";
import "./styles.scss";
import FooterRange from "./FooterRange";
import FooterInfo from "./FooterInfo";
import FooterShowRoom from "./FooterShowRoom";
import FooterBottom from "./FooterBottom/index";
import FooterRightMenu from "./FooterRightMenu/index";
import { graphql, StaticQuery } from "gatsby";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import TextWithImageVertical from "../TextWithImageVertical";
import Showroom from "../showrooms"
import { Link } from "gatsby";

function Footer(props) {
  const { width } = useWindowDimensions();
  const data_ranger = props.data_left_menu?.menu?.edges[0]?.node;
  const textWithImage = props?.data_left_menu?.networkFooter?.siteOptions?.acfFooter?.textWithImageVertical
  const topShowroom = props?.data_left_menu?.showroomFooter
  return (
    <>
      <Showroom heading={props?.data_left_menu?.networkFooter?.siteOptions?.acfFooter?.showrooms.heading} showroomItems={topShowroom.nodes}/>
      <TextWithImageVertical 
        image={textWithImage.image}
        bottomText={textWithImage.text}
        bottomMoreText={textWithImage.moreButton.text}
        bottomMoreLink={textWithImage.moreButton.url}
        fullWidthImage={true}
      />
      <div className="footer">
        <div className="wrap__top__footer">
          <div className="wrap__content__left">
            <FooterRange range_list={data_ranger} />
            <FooterInfo data_left_menu={props.data_left_menu} />
          </div>
          {width < 1031 ? (
            <div className="wrap__content_mid_right">
              <FooterShowRoom showroom_list={props.data_left_menu} />
              <FooterRightMenu data_left_menu={props.data_left_menu} />
            </div>
          ) : (
            <>
              <FooterShowRoom showroom_list={props.data_left_menu} />
              <FooterRightMenu data_left_menu={props.data_left_menu} />
            </>
          )}
          <Link to="/">
            <div className="logo">
              <img
                src={
                  props.data_left_menu?.networkFooter?.siteOptions
                    ?.acfSiteSettings?.footerLogo?.sourceUrl
                }
                alt=""
              />
            </div>
          </Link>
        </div>
        <div>
          <FooterBottom
            data_footer_bottom={
              props.data_left_menu?.networkFooter?.siteOptions?.acfSiteSettings
            }
          />
        </div>
      </div>
    </>
  );
}

function FooterWrapper(props) {
  return (
    <StaticQuery
      query={menuQuery}
      render={(data) => <Footer data_left_menu={data} {...props} />}
    />
  );
}
export default FooterWrapper;
export const menuQuery = graphql`
  query MyQuery2 {
    menu: allWpMenuItem(
      filter: { parentId: { eq: null }, locations: { eq: PRIMARY } }
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
              childItems {
                nodes {
                  url
                  path
                  order
                  label
                }
              }
            }
          }
        }
      }
    }
    menu_info: allWpMenuItem(filter: { locations: { eq: HCMS_MENU_FOOTER } }) {
      edges {
        node {
          label
          path
          order
        }
      }
    }
    showroomFooter: allWpShowroom {
      nodes {
        name
        address
        phone
        date
      }
    }
    networkFooter: wp {
      siteOptions {
        acfSiteSettings {
          footerLogo {
            sourceUrl
          }
          pinterest
          youtube
          twitter
          facebook
          linkedin
          instagram
          copyright
        }
        acfFooter {
          showrooms {
            heading
          }
          textWithImageVertical {
            image {
              sourceUrl
            }
            text
            moreButton {
              text
              url
            }
          }
        }
      }
    }
  }
`;
