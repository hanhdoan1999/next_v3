import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React, { memo } from "react";
import ButtonViewMore from "../../../common/ButtonViewMore";
import "./style.scss";

function BlockCategories() {
  const data = useStaticQuery(graphql`
    query {
      chairImage: file(relativePath: { eq: "Chairs.png" }) {
        childImageSharp {
          fluid(maxWidth: 570) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      tableImage: file(relativePath: { eq: "Table.webp" }) {
        childImageSharp {
          fluid(maxWidth: 570) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      loungesImage: file(relativePath: { eq: "Lounges.webp" }) {
        childImageSharp {
          fluid(maxWidth: 570) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      stoolsImage: file(relativePath: { eq: "Stools.webp" }) {
        childImageSharp {
          fluid(maxWidth: 570) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className='block-categories home-categories'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-xs-12 col-md-6 col-lg-6'>
            <div className='tow-block-cate'>
              <div className='block-cate block-cate-01'>
                <Link to='/product-category/chairs'>
                  <div className='block-cate-01__left'>
                    <p className='menu-title'>Chairs</p>
                  </div>
                  <div className='block-cate-01__image'>
                    <Img
                      width='570'
                      fluid={data.chairImage.childImageSharp.fluid}
                    />
                  </div>
                </Link>
                <ButtonViewMore
                  slug='products'
                  text='Explore our range of Chairs'
                />
              </div>
              <div className='block-cate block-cate-02'>
                <Link to='/product-category/lounges'>
                  <div className='block-cate-01__left'>
                    <p className='menu-title'>Lounges</p>
                  </div>
                  <div className='block-cate-01__image'>
                    <Img
                      width='570'
                      fluid={data.loungesImage.childImageSharp.fluid}
                    />
                  </div>
                </Link>
                <ButtonViewMore
                  slug='products'
                  text='Explore our range of Lounges'
                />
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-xs-12 col-md-6 col-lg-6'>
            <div className='tow-block-cate'>
              <div className='block-cate block-cate-01'>
                <Link to='/product-category/tables'>
                  <div className='block-cate-01__left'>
                    <p className='menu-title'>Tables</p>
                  </div>

                  <div className='block-cate-01__image'>
                    <Img
                      width='570'
                      fluid={data.tableImage.childImageSharp.fluid}
                    />
                  </div>
                </Link>
                <ButtonViewMore
                  slug='products'
                  text='Explore our range of Tables'
                />
              </div>
              <div className='block-cate block-cate-02'>
                <Link to='/product-category/stools'>
                  <div className='block-cate-01__left'>
                    <p className='menu-title'>Stools</p>
                  </div>
                  <div className='block-cate-01__image'>
                    <Img
                      width='570'
                      fluid={data.stoolsImage.childImageSharp.fluid}
                    />
                  </div>
                </Link>
                <ButtonViewMore
                  slug='products'
                  text='Explore our range of Stools'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(BlockCategories);
