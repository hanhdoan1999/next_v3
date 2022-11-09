import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Image = ({ dataTopBanner }) => {
  const { sourceUrl } = dataTopBanner?.siteOptions?.acfSiteSettings?.logo;
  return <img src={sourceUrl} alt='default_logo' />;
};

export default Image;
