import { Link } from "gatsby";
import React, { Fragment } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SectionTitleBar from "../../../common/SectionTitleBar";
import RageTitle from "../RangeTitle";
import "./styles.scss";

function OurRanges({ landingOurRanges, width }) {
  const ourRanges = landingOurRanges.landingPages;
  return (
    <div className='our-ranges section'>
      <div className='container'>
        <SectionTitleBar
          title='Our Ranges'
          buttonText='View All'
          slug='products'
        />
        {width > 768 ? (
          <Fragment>
            <div className='row main-row'>
              <div className='cafe-chairs col-4'>
                <Link to={`${ourRanges.range1Link}`}>
                  {ourRanges.range1Image && (
                    <LazyLoadImage
                      src={ourRanges.range1Image.mediaItemUrl}
                      alt={ourRanges.range1Image.mediaItemUrl.altText}
                      effect='blur'
                    />
                  )}
                  <RageTitle title={ourRanges.range1Name} />
                </Link>
              </div>
              <div className='cafe-chairs col-8 d-flex flex-column justify-content-between'>
                <div className='row'>
                  <p className='range-text col-12'>{ourRanges.ourRangesText}</p>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <Link to={`${ourRanges.range1Link}`}>
                      {ourRanges.range2Image && (
                        <LazyLoadImage
                          src={ourRanges.range2Image.mediaItemUrl}
                          alt={ourRanges.range2Image.mediaItemUrl.altText}
                          effect='blur'
                        />
                      )}

                      <RageTitle title={ourRanges.range2Name} />
                    </Link>
                  </div>
                  <div className='col-6'>
                    <Link to={`${ourRanges.range1Link}`}>
                      {ourRanges.range3Image && (
                        <LazyLoadImage
                          src={ourRanges.range3Image.mediaItemUrl}
                          alt={ourRanges.range3Image.mediaItemUrl.altText}
                          effect='blur'
                        />
                      )}
                      <RageTitle title={ourRanges.range3Name} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='row main-row'>
              <div className='col-8 d-flex flex-column justify-content-between'>
                <div className='top sub-row'>
                  <Link to={`${ourRanges.range1Link}`}>
                    {ourRanges.range4Image && (
                      <LazyLoadImage
                        src={ourRanges.range4Image.mediaItemUrl}
                        alt={ourRanges.range4Image.mediaItemUrl.altText}
                        effect='blur'
                      />
                    )}

                    <RageTitle title={ourRanges.range4Name} />
                  </Link>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <Link to={`${ourRanges.range1Link}`}>
                      {ourRanges.range5Image && (
                        <LazyLoadImage
                          src={ourRanges.range5Image.mediaItemUrl}
                          alt={ourRanges.range5Image.mediaItemUrl.altText}
                          effect='blur'
                        />
                      )}
                      <RageTitle title={ourRanges.range5Name} />
                    </Link>
                  </div>
                  <div className='col-6'>
                    <Link to={`${ourRanges.range1Link}`}>
                      {ourRanges.range6Image && (
                        <LazyLoadImage
                          src={ourRanges.range6Image.mediaItemUrl}
                          alt={ourRanges.range6Image.mediaItemUrl.altText}
                          effect='blur'
                        />
                      )}
                      <RageTitle title={ourRanges.range6Name} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className='col-4'>
                <Link to={`${ourRanges.range1Link}`}>
                  {ourRanges.range7Image && (
                    <LazyLoadImage
                      src={ourRanges.range7Image.mediaItemUrl}
                      alt={ourRanges.range7Image.mediaItemUrl.altText}
                      effect='blur'
                    />
                  )}
                  <RageTitle title={ourRanges.range7Name} />
                </Link>
              </div>
            </div>
          </Fragment>
        ) : (
          <div className='row main-row'>
            {Array.from(Array(7)).map((item, index) => {
              return (
                <div className='col-6' key={index}>
                  <Link to={`${ourRanges.range1Link}`}>
                    {ourRanges[`range${index + 1}Image`] && (
                      <LazyLoadImage
                        src={ourRanges[`range${index + 1}Image`].mediaItemUrl}
                        alt={
                          ourRanges[`range${index + 1}Image`].mediaItemUrl
                            .altText
                        }
                        effect='blur'
                      />
                    )}
                    <RageTitle title={ourRanges[`range${index + 1}Name`]} />
                  </Link>
                </div>
              );
            })}

            <div className='col-6 d-flex justify-content-center view-more'>
              <span>VIEW MORE</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OurRanges;
