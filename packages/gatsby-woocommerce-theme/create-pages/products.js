const { slash } = require(`gatsby-core-utils`);
const productListingTemplate = require.resolve(
  `../src/templates/product-listing/index.js`
);
//prettier-ignore
const productDetailTemplate = require.resolve(`../src/templates/product-details/index.js`);

// Get all the posts.
const GET_PRODUCTS = `
query GET_PRODUCTS {
    allWpProductCategory(filter: { parentId: { eq: null } }) {
        totalCount
        edges {
          node {
            id
            name
            slug
            uri
            description
            acfProductCategory {
              longDescription
              video
            }
            image {
              sourceUrl
            }
            products {
              nodes {
                sku
                id
              }
            }
            wpChildren {
              nodes {
                products {
                  nodes {
                    id
                  }
                }
                name
                image {
                  sourceUrl
                }
                description
                acfProductCategory {
                  longDescription
                  video
                }
                uri
                wpChildren {
                  nodes {
                    products {
                      nodes {
                        id
                      }
                    }
                    name
                    image {
                      sourceUrl
                    }
                    description
                    acfProductCategory {
                      longDescription
                      video
                    }
                    uri
                  }
                }
              }
            }
          }
        }
      }
      allWpMenuItem(filter: {locations: {eq: PRIMARY}, label: {eq: "Range"}}) {
        edges {
          node {
            label
            path
            url
            order
            parentId
            id
            childItems {
              nodes {
                label
                order
                path
                title
                url
                childItems {
                  nodes {
                    id
                    url
                    path
                    order
                    label
                    childItems {
                      nodes {
                        id
                        label
                        path
                        order
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      allWpProduct {
        totalCount
        edges {
          node {
            sku
            id
            name
            slug
            menuOrder
            image {
                localFile {
                      childImageSharp {
                        gatsbyImageData(width: 400, quality: 100, formats: WEBP)
                      }
                    }
                  }
            productTypes {
              nodes {
                name
              }
            }
            productCategories {
              nodes {
                name
              }
            }
            acfProductColour {
              stockStatus
            }
            ... on WpGroupProduct {
              products {
                nodes {
                  slug
                  id
                  name
                  image {
                    localFile {
                      childImageSharp {
                        gatsbyImageData(width: 400, quality: 100, formats: WEBP)
                      }
                    }
                  }
                  acfProductColour {
                    productColour
                    stockStatus
                  }
                }
              }
            }
          }
        }
      }
    }
    `;
   

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const productsData = await graphql(
    `
      ${GET_PRODUCTS}
    `
  );

  const { allWpProductCategory, allWpProduct, allWpMenuItem} =
    productsData?.data;

  // catch error
  if (productsData.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  let listProducts = {};
  listProducts = allWpProduct?.edges?.map(({ node }) => {
    if(node.productTypes.nodes[0].name === "grouped") {
      return {
        ...node,
        productCategories: node.productCategories,
        productTypes: node.productTypes.nodes[0].name,
        products: node.products.nodes.map((item) => {
          return {
            ...item,
            image: item.image,
            metaProductColor: item.acfProductColour.productColour,
          };
        }),
      };
    }else {
      return {
        ...node,
        productCategories: node.productCategories,
        productTypes: node.productTypes.nodes[0].name,
        image:node.image,
      };
    }
  });

  
  const listCategory = (arr) => {
    let list = [];
    if (arr.length > 0) {
      list = arr.map(({ node }) => {
        return {
          name: node.name,
          uri: node.uri,
          products: node.products,
          image:node.image,
          description: node.description,
          longDescription: node.acfProductCategory.longDescription,
          videoBottom:node.acfProductCategory.video,
          children: node.wpChildren,
          id:node.id
        };
      });
    }
    return list;
  };
  const listId = (arr) => {
    const newList = arr.map((el) => el.id);
    return newList;
  };
  const listChildren = (arr) => {
    let list = [];
    if (arr.length > 0) {
      arr.forEach((el) => list.push(...el.node.wpChildren.nodes));
    }
    return list;
  };
  const listChildrenLevel3 = (arr) => {
    let list = [];
    if (arr.length > 0) {
      arr.forEach((el) => list.push(...el.wpChildren.nodes));
    }
    return list;
  }
  // allWpProduct?.edges?.forEach((_, i) => {
    createPage({
      path: `/products`,
      component: slash(productListingTemplate),
      context: {
        category:"All Products",
        imageBanner:null,
        description:null,
        longDescription : null,
        videoBottom:null,
        listProducts:listProducts.filter((el) => 
          !(el.productCategories.nodes.some(e => e.name.toLowerCase() === "uncategorised" || e.name.toLowerCase() === "uncategorized") && el.productCategories.nodes.length === 1)
        ),
        listCate: allWpMenuItem,
        id:null,
      },
    });
  // });

  listCategory(allWpProductCategory?.edges).forEach((el) => {
    createPage({
      path: `${el.uri}`,
      component: slash(productListingTemplate),
      context: {
        category: el.name,
        uri: el.uri,
        imageBanner:el.image,
        description:el.description,
        longDescription : el.longDescription,
        listProducts:listProducts.filter((item) =>
            listId(el.products.nodes).includes(item.id)
              ),
        listCate: allWpMenuItem,
        id:el.id,
        videoBottom:el.videoBottom
      },
    });
  });
  listChildren(allWpProductCategory?.edges).forEach((el) => {
    createPage({
      path: `${el.uri}`,
      component: slash(productListingTemplate),
      context: {
        category: el.name,
        uri: el.uri ,
        imageBanner:el.image,
        description:el.description,
        longDescription : el.acfProductCategory.longDescription,
        listProducts: listProducts.filter((item) =>
          listId(el.products.nodes).includes(item.id)
        ),
        listCate: allWpMenuItem,
        videoBottom:el.video,
        id:el.id,
      },
    });
  });
  listChildrenLevel3(listChildren(allWpProductCategory?.edges)).forEach((el) => {
    createPage({
      path: `${el.uri}`,
      component: slash(productListingTemplate),
      context: {
        category: el.name,
        uri: el.uri ,
        imageBanner:el.image,
        description:el.description,
        longDescription : el.acfProductCategory.longDescription,
        videoBottom:el.video,
        listProducts: listProducts.filter((item) =>
          listId(el.products.nodes).includes(item.id)
        ),
        listCate: allWpMenuItem,
        id:el.id,
      },
    });
  });
  listProducts.forEach((el) => {
    createPage({
      path: `${el.slug}`,
      component: slash(productDetailTemplate),
      context: {
        sku: el.sku,
        slug:el.slug,
      },
    });
  });
};
