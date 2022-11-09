/***
/***====================================
 * QUERY
 ========================================*/

 const GET_REDIRECT = `
 query MyQuery {
   allGoogleNextrendRedirectSheet {
     edges {
       node {
         source
         target
       }
     }
   }
 }
 
 `;

/***
 /***===========================
  * CREATE PAGES
  ==============================*/

module.exports = async ({ actions, graphql }) => {
  const { createRedirect } = actions;
  const nextrendRedirects = await graphql(
    `
      ${GET_REDIRECT}
    `
  );

  const { allGoogleNextrendRedirectSheet } = nextrendRedirects?.data;

  // catch error
  if (nextrendRedirects.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  /***
   *
   * CREATE REDIRECT
   *
   */

  // CREATE LIST REDIRECT
  allGoogleNextrendRedirectSheet.edges.forEach(({ node }) => {
    createRedirect({
      fromPath: node.source,
      toPath: node.target,
      exactPath: true,
      statusCode:200,
    });
  });
};
