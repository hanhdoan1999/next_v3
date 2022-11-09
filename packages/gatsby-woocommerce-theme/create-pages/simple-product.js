const { slash } = require(`gatsby-core-utils`);
const simpleProductTemplate = require.resolve("../src/templates/product-simple")


const GET_SIMPLE_PRODUCTS = `
query GET_PRODUCTS {
    allWpProduct(
        filter: {productTypes: {nodes: {elemMatch: {name: {eq: "simple"}}}}}
      ) {
        edges {
          node {
            sku
            id
            slug
          }
        }
      }
}`

module.exports = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const result = await graphql(
      `
        ${GET_SIMPLE_PRODUCTS}
      `
    );
    const {allWpProduct} = result?.data
    allWpProduct?.edges?.map((page, index) => {
      createPage({
        path: `/${page.node.slug}`,
        component: slash(simpleProductTemplate),
        context: {
          id:page.node.id,
          sku:page.node.sku,
          slug:page.node.slug
        },
      });
    });
  };