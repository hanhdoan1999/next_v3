import { graphql, Link, StaticQuery, useStaticQuery } from 'gatsby';
import React, { memo, useContext, useEffect } from 'react';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../../contexts/AppContext';

import Search from '../../search-container';
import MainMenu from '../MainMenu';
import MenuIcons from '../MenuIcons';
import useWindowDimensions from "../../../hooks/useWindowDimensions"
import TopHeader from '../TopHeader';
import Image from './Image';
import QuoteCart from '../../../common/QuoteCart'
import './style.scss';

function MyHeader(props) {
  const { width } = useWindowDimensions();
  const textInput = React.useRef();
  const dispatchActionHandler = useContext(GlobalDispatchContext);
  const { showSearchBox, showRequestQuote, showSideBar, showMobileMegaMenu,totalQty } =
    useContext(GlobalStateContext);
  const productSearch = props?.data?.productSearch?.edges.filter(item =>
    !(item.node.productCategories.nodes.some(e => e.name.toLowerCase() === "uncategorized" || e.name.toLowerCase() === "uncategorised") && item.node.productCategories.nodes.length === 1)
  )
  const logo =
    props?.data?.topBannerData?.siteOptions?.acfSiteSettings?.logo?.sourceUrl;
  useEffect(() => {
    var timer = setTimeout(() => {
      textInput?.current?.refs?.textInput &&
        textInput?.current?.refs?.textInput?.focus();
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, [showSearchBox]);

  return (
    <div className='header-wrapper'>
      <TopHeader
        width={width}
        onHandleModal={dispatchActionHandler}
        showRequestAQuote={showRequestQuote}
        dataTopBanner={props?.data?.topBannerData}
        lstShowroom = {props?.data?.showrooms?.nodes}
        totalQty={totalQty}
      />
      <div className={width  > 680 ? 'container-fluid header__bottom' :  'header__bottom'}>
        <div className='container-custom'>
          {width  > 680 ? (
            <div className='logo-col'>
              <Link to='/'>
                <div className='logo'>
                  <Image dataTopBanner={props?.data?.topBannerData} />
                </div>
              </Link>
            </div>
          ) : null}
          <div className='main-menu-custom'>
            <MainMenu
              menuData={props?.data?.menu?.edges}
              showSideBarMenu={showSideBar}
              onHandleModal={dispatchActionHandler}
              showMobileMegaMenu={showMobileMegaMenu}
              width={width}
              logo={logo}
            />
            {/* <MenuIcons width={width} /> */}

              <Search
                dispatchActionHandler={dispatchActionHandler}
                showSearchBox={showSearchBox}
                products={productSearch}
                ref={textInput}
              />
          </div>
        </div>
      </div>
      <QuoteCart />
    </div>
  );
}

function Header(props) {
  return (
    <StaticQuery
      query={productsQuery}
      render={(data) => <MyHeader data={data} {...props} />}
    />
  );
}

export default Header;

export const productsQuery = graphql`
  query GET_PRODUCTS {
    topBannerData: wp {
      siteOptions {
        acfSiteSettings {
          logo {
            sourceUrl
          }
          topBar
          phone
          email
        }
      }
    }
    showrooms: allWpShowroom {
      nodes {
        name
        address
        phone
        date
      }
    }
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
          id
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
    productSearch:allWpProduct {
      edges {
        node {
          sku
          id
          name
          image {
            sourceUrl
          }
          slug
          productCategories {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;
