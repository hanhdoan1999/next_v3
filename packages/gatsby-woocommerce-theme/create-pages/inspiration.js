const { slash } = require(`gatsby-core-utils`);
const singleInspirationTemplate = require.resolve(
  `../src/templates/inspiration-detail/index.js`
);
const listInspirationTemplate = require.resolve(
  `../src/templates/inspiration-listing/index.js`
);

// Get all the posts.
const GET_INSPIRATION = `
query INSPIRATION {
  inspirationBanner:  wp {
		siteOptions {
    acfInspirationProjectsPage {
      bannerImage {
        sourceUrl
      }
      description
      bottomVideo
      testimonials {
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
  }
  }
  listInspiration: allWpProject(sort: {fields: date, order: DESC}) {
    totalCount
    edges {
      node {
        id
        title
        slug
        date
        featuredImage {
          node {
            localFile {
              childImageSharp {
                gatsbyImageData(quality:100,width:800,formats: WEBP)
              }
            }
          }
        }
        content
        acfProject {
          whatWeDid
          type
          theClient
          subHeading
          industry
          location
        }
      }
    }
  }
}
`;
module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const inspirationData = await graphql(
    `
      ${GET_INSPIRATION}
    `
  );

  const { listInspiration, inspirationBanner } =
    inspirationData?.data;

  // catch error
  if (inspirationData.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  function getListCategories(projectList, category) {
    const listCategories = [];
    projectList.forEach(({ node }) =>
      listCategories.push(category && node.acfProject[category])
    );
    return [...new Set(listCategories.flat())];
  }

  const listOfLocation = getListCategories(listInspiration.edges, "location");
  const listOfIndustry = getListCategories(listInspiration.edges, "industry");

  // listInspiration?.edges?.forEach((_, i) => {
    createPage({
      path: `/inspiration`,
      component: slash(listInspirationTemplate),
      context: {
        lstInspiration: listInspiration.edges,
        banner: inspirationBanner,
        listOfLocation,
        listOfIndustry,
      },
    });
  // });
  listOfIndustry.forEach((el) => {
    createPage({
      path:`/inspiration/project_industry/${el}`,
      component: slash(listInspirationTemplate),
      context: {
        lstInspiration: listInspiration?.edges?.filter(item => item?.node?.acfProject?.industry.includes(el)),
        banner: inspirationBanner,
        listOfLocation,
        listOfIndustry,
      },
    });
  });
  listOfLocation.forEach((el) => {
    createPage({
      path:`/inspiration/project_location/${el}`,
      component: slash(listInspirationTemplate),
      context: {
        lstInspiration: listInspiration?.edges?.filter(item => item?.node?.acfProject?.location.includes(el)),
        banner: inspirationBanner,
        listOfLocation,
        listOfIndustry,
      },
    });
  });
  listInspiration.edges.forEach(({ node }) => {
    // Shuffle array
    // Get sub-array of first n elements after shuffled
    createPage({
      path:
        node?.acfProject?.type === "Articles"
          ? `/blog/${node.slug}`
          : `/projects/${node.slug}`,
      component: slash(singleInspirationTemplate),
      context: {
        id:node.id,
        banner: inspirationBanner,
      },
    });
  });
};
