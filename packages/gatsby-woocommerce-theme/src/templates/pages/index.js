import React, { useEffect } from 'react';
import renderBlock from '../../utils/render-block';
import DesignPage from '../../components/design-page';
import Layout from '../../components/layout';
import { graphql } from 'gatsby';
import { isArray } from 'lodash';
function Page(props) {
  const page = props?.data?.wpPage;
  return (
    <Layout>
      {page?.acfPage?.bodyContent ? (
        <DesignPage
          bodyContent={page?.acfPage?.bodyContent}
          featuredImage={page?.featuredImage}
          title={page?.title}
        />
      ) : null}
      {page?.acfPage?.component?.map((el, index) =>
        renderBlock(el.fieldGroupName, el, index, 'Page')
      )}
    </Layout>
  );
}

export default Page;

export const pageQuery = graphql`
  query PageQuery($id: String) {
    wpPage(id: {eq: $id}) {
      id
      title
      uri
      isFrontPage
      featuredImage {
        node {
          sourceUrl
        }
      }
      acfPage {
        bodyContent
        component {
          ... on WpPage_Acfpage_Component_HeroBanner {
            fieldGroupName
            image {
              sourceUrl
            }
            text
            products {
              productName
              productLink
              productImage {
                sourceUrl
              }
              leftPositionDesktop
              topPostionDesktop
              leftPositionTablet
              topPositionTablet
              leftPositionMobile
              topPositionMobile
            }
          }
          ... on WpPage_Acfpage_Component_IconBoxes {
            fieldGroupName
            heading
            iconBox {
              icon {
                sourceUrl
              }
              iconHover {
                sourceUrl
              }
              text
              link
              description
            }
          }
          ... on WpPage_Acfpage_Component_PromoBanners {
            fieldGroupName
            heading
            promoBanner {
              text
              textColor
              textWidth
              textLeftPosition
              textTopPosition
              link
              image {
                sourceUrl
              }
              backgroundColor
            }
          }
          ... on WpPage_Acfpage_Component_TextWithImage {
            fieldGroupName
            heading
            text
            moreLink
            image {
              sourceUrl
            }
            backgroundColor
          }
          ... on WpPage_Acfpage_Component_Gallery {
            fieldGroupName
            heading
            images {
              image {
                sourceUrl
              }
            }
            projectLink
          }
          ... on WpPage_Acfpage_Component_FeaturedProducts {
            fieldGroupName
            heading
            description
            products {
              productName
              productSlug
              productSku
            }
            button {
              text
              url
            }
          }
          ... on WpPage_Acfpage_Component_TextWithImageVertical {
            fieldGroupName
            heading
            topText
            topMoreLink
            image {
              sourceUrl
            }
            bottomText
            bottomMoreText
            bottomMoreLink
            fullWidthImage
          }
          ... on WpPage_Acfpage_Component_ProductGrid {
            fieldGroupName
            heading
            products {
              productName
              productSlug
              productSku
            }
          }
          ... on WpPage_Acfpage_Component_Showrooms {
            fieldGroupName
            heading
            showroomItems {
              ... on WpShowroom {
                name
                address
                phone
              }
            }
          }
          ... on WpPage_Acfpage_Component_GalleryWithText {
            fieldGroupName
            heading
            images {
              image {
                sourceUrl
              }
              link
            }
            text
            moreLink
          }
          ... on WpPage_Acfpage_Component_Team {
            fieldGroupName
            heading
            teamMembers {
              ... on WpTeamMember {
                image {
                  sourceUrl
                }
                name
                position
                phone
                email
                location
              }
            }
          }
          ... on WpPage_Acfpage_Component_Testimonials {
            fieldGroupName
            testimonialItems {
              ... on WpTestimonial {
                content
                acfTestimonial {
                  author
                  company
                  location
                }
              }
            }
          }
          ... on WpPage_Acfpage_Component_VideoSection {
            fieldGroupName
            video {
              mediaItemUrl
            }
            videoUrl
          }
          ... on WpPage_Acfpage_Component_TextSection {
            fieldGroupName
            content
          }
          ... on WpPage_Acfpage_Component_Faq {
            fieldGroupName
            heading
            faqItem {
              question
              questionLink
              answer
            }
            button {
              text
              url
            }
          }
          ... on WpPage_Acfpage_Component_EmbedCode {
            fieldGroupName
            code
          }
          ... on WpPage_Acfpage_Component_GravityForm {
            fieldGroupName
            formId
          }
        }
      }
    }
  }
`