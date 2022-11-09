import { graphql, useStaticQuery } from "gatsby";
import React, { useEffect, useState } from "react";
import BannerTop from "../../../common/BannerTop";
import { removeDuplicates } from "../../../utils/functions";
import "./styles.scss";

function ProductBanner({ slug, allWpProductCategory = [] }) {
  const [currentCate, setCurrentCate] = useState("");

  useEffect(() => {
    if (!slug) return;
    const data =
      allWpProductCategory &&
      allWpProductCategory.filter((cate) => {
        return (
          removeDuplicates(cate.slug) ===
          removeDuplicates(slug.split("/").join("-"))
        );
      });

    setCurrentCate(data[0]);
  }, [slug, allWpProductCategory]);

  const bannerURL = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "banner-products.png" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 100, maxHeight: 348) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className='products-banner'>
      <BannerTop
        bannerURL={bannerURL}
        remoteImage={currentCate?.featuredImage?.node}
        cateName={
          currentCate?.title
            ? currentCate?.title.split(" – ").slice(-1)[0]
            : "Product"
        }
      />
    </div>
  );
}

export default ProductBanner;
