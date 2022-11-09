const path = require('path');
const createProducts = require('./create-pages/products');
const createInspirationPage = require('./create-pages/inspiration');
const createAllPages = require('./create-pages/pages')
const createSimpleProduct = require('./create-pages/simple-product');
const createRedirectPage = require('./create-pages/redirect');
exports.createPages = async ({ actions, graphql }) => {
  await createAllPages({ actions, graphql });
  await createProducts({ actions, graphql });
  await createInspirationPage({ actions, graphql });
  await createSimpleProduct({ actions, graphql});
  await createRedirectPage({ actions, graphql });
}
/**
 * Since the node_modules ( packages ) live outside the theme directory, making an alias for them.
 *
 * So Gutenberg styles can be accessed like so `@import "~@wordpress/base-styles/colors"`
 *
 * @param stage
 * @param actions
 */
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~': path.resolve(__dirname, '../../node_modules'),
      },
    },
  });
};
