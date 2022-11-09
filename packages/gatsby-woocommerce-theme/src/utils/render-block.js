import React from "react";
import HeroBanner from "../components/hero-banner";
import IconBox from "../components/icon-box";
import PromoBanner from "../components/promo-banner";
import TextWithImageVertical from "../components/TextWithImageVertical";
import TextWithImage from "../components/text-with-image";
import ProductGrid from "../components/product-grid";
import Gallery from "../components/gallery";
import ShowRooms from "../components/showrooms";
import FeaturedProducts from "../components/featured-product";
import GalleryWithText from "../components/GalleryWithText";
import TeamMember from "../components/TeamMember";
import TestimonialItem from "../components/TestimonialItem";
import Faqs from "../components/faqs";
import TextSection from "../components/TextSection";
import EmbedCode from "../components/embedCode";
import VideoSection from "../components/videoSection";
import WarrantyForm from "../components/WarrantyForm";
const renderBlock = (param, el, i, postType, func = null) => {
  param = param?.replace(postType, "");

  el.key = i;
  el.index = i;

  let block = {
    _Acfpage_Component_HeroBanner: (el) => <HeroBanner {...el} />,
    _Acfpage_Component_IconBoxes: (el) => <IconBox {...el} />,
    _Acfpage_Component_PromoBanners: (el) => <PromoBanner {...el} />,
    _Acfpage_Component_TextWithImage: (el) => <TextWithImage {...el} />,
    _Acfpage_Component_Gallery: (el) => <Gallery {...el} />,
    _Acfpage_Component_Team: (el) => <TeamMember {...el} />,
    _Acfpage_Component_Showrooms: (el) => <ShowRooms {...el} />,
    _Acfpage_Component_FeaturedProducts: (el) => <FeaturedProducts {...el} />,
    _Acfpage_Component_TextWithImageVertical: (el) => (
      <TextWithImageVertical {...el} />
    ),
    _Acfpage_Component_GalleryWithText: (el) => <GalleryWithText {...el} />,
    _Acfpage_Component_Testimonials: (el) => <TestimonialItem {...el} />,
    _Acfpage_Component_ProductGrid: (el) => <ProductGrid {...el} />,
    _Acfpage_Component_VideoSection: (el) => <VideoSection {...el}/>,
    _Acfpage_Component_TextSection: (el) => <TextSection {...el} />,
    _Acfpage_Component_Faq: (el) => <Faqs {...el} />,
    _Acfpage_Component_EmbedCode:(el) => <EmbedCode {...el}/>,
    _Acfpage_Component_GravityForm: (el) => <WarrantyForm {...el} />
  }[param];

  if (!block) return null;

  return block(el, i);
};

export default renderBlock;
