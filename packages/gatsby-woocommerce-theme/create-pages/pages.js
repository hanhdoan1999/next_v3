const { slash } = require(`gatsby-core-utils`);
const pages = require.resolve("../src/templates/pages/index.js");
const GET_PAGE = `
query GET_PAGE {
    allWpPage {
        edges {
          node {
            id
            title
            uri
          }
        }
      }
  }
`;
module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      ${GET_PAGE}
    `
  );
  result.data.allWpPage.edges.map((page, index) => {
    createPage({
      path: page.node.uri,
      component: slash(pages),
      context: {
        id:page.node.id,
        uri:page.node.uri,
      },
    });
  });
};
