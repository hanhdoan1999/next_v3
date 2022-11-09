const ImageFragment = `
fragment ImageFragment on WpMediaItem {
	id
	altText
	mediaItemUrl
	sourceUrl
	caption
	mediaDetails {
	  sizes {
		height
		width
		name
		sourceUrl
	  }
	}
  }
`;

module.exports.ImageFragment = ImageFragment;
