import DOMPurify from "dompurify";
import { isEmpty } from "lodash";
// import { v4 } from "uuid";

export const normalizePath = (path) => {
  const pathStr = path.split("/");

  // If the path ends with '/' get the second last item

  if (path?.endsWith(`/`)) {
    const strIndex = pathStr.length ? pathStr.length - 2 : "";

    if (strIndex) {
      path = `/${pathStr[strIndex]}/`;
    }
  }

  // If the path ends with '/' get the second last item.
  if (!path?.endsWith(`/`)) {
    const strIndex = pathStr.length ? pathStr.length - 1 : "";

    if (strIndex) {
      path = `/${pathStr[strIndex]}/`;
    }
  }

  return path;
};
/**
 * Get date in format of m-d-y
 *
 * @param {string} dateString Date string, example 2020-05-03T04:41:12
 *
 * @return {string}
 */
export const getFormattedDate = (dateString) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

// /**
//  * Extracts and returns float value from a string.
//  *
//  * @param {string} string String
//  * @return {any}
//  */
// export const getFloatVal = (string) => {
//   let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];
//   return null !== floatValue
//     ? parseFloat(parseFloat(floatValue).toFixed(2))
//     : "";
// };

/**
//  * Add first product.
//  *
//  * @param {Object} product Product
//  * @return {{totalProductsCount: number, totalProductsPrice: any, products: Array}}
//  */
// export const addFirstProduct = (product) => {
//   let productPrice = getFloatVal(product.price);

//   let newCart = {
//     products: [],
//     totalProductsCount: 1,
//   };

//   const newProduct = createNewProduct(product, productPrice, 1);
//   newCart.products.push(newProduct);

//   localStorage.setItem("woo-next-cart", JSON.stringify(newCart));

//   return newCart;
// };

// /**
//  * Create a new product object.
//  *
//  * @param {Object} product Product
//  * @param {Integer} productPrice Product Price
//  * @param {Integer} qty Quantity
//  * @return {{image: *, productId: *, totalPrice: number, price: *, qty: *, name: *}}
//  */
// export const createNewProduct = (product, qty) => {
//   return {
//     productId: product.productId,
//     image: product.image,
//     name: product.name,
//     qty,
//   };
// };

// /**
//  * Updates the existing cart with new item.
//  *
//  * @param {Object} existingCart Existing Cart.
//  * @param {Object} product Product.
//  * @param {Integer} qtyToBeAdded Quantity.
//  * @param {Integer} newQty New Qty to be updated.
//  * @return {{totalProductsCount: *, totalProductsPrice: *, products: *}}
//  */
// export const updateCart = (
//   existingCart,
//   product,
//   qtyToBeAdded,
//   newQty = false
// ) => {
//   const updatedProducts = getUpdatedProducts(
//     existingCart.products,
//     product,
//     qtyToBeAdded,
//     newQty
//   );

//   const addPrice = (total, item) => {
//     total.totalPrice += item.totalPrice;
//     total.qty += item.qty;

//     return total;
//   };

//   // Loop through the updated product array and add the totalPrice of each item to get the totalPrice
//   let total = updatedProducts.reduce(addPrice, { totalPrice: 0, qty: 0 });

//   const updatedCart = {
//     products: updatedProducts,
//     totalProductsCount: parseInt(total.qty),
//     totalProductsPrice: parseFloat(total.totalPrice),
//   };

//   localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

//   return updatedCart;
// };

// /**
//  * Get updated products array
//  * Update the product if it exists else,
//  * add the new product to existing cart,
//  *
//  * @param {Object} existingProductsInCart Existing product in cart
//  * @param {Object} product Product
//  * @param {Integer} qtyToBeAdded Quantity
//  * @param {Integer} newQty New qty of the product (optional)
//  * @return {*[]}
//  */
// export const getUpdatedProducts = (
//   existingProductsInCart,
//   product,
//   qtyToBeAdded,
//   newQty = false
// ) => {
//   // Check if the product already exits in the cart.
//   const productExitsIndex = isProductInCart(
//     existingProductsInCart,
//     product.productId
//   );

//   // If product exits ( index of that product found in the array ), update the product quantity and totalPrice
//   if (-1 < productExitsIndex) {
//     let updatedProducts = existingProductsInCart;
//     let updatedProduct = updatedProducts[productExitsIndex];

//     // If have new qty of the product available, set that else add the qtyToBeAdded
//     updatedProduct.qty = newQty
//       ? parseInt(newQty)
//       : parseInt(updatedProduct.qty + qtyToBeAdded);
//     updatedProduct.totalPrice = parseFloat(
//       (updatedProduct.price * updatedProduct.qty).toFixed(2)
//     );

//     return updatedProducts;
//   } else {
//     // If product not found push the new product to the existing product array.
//     let productPrice = getFloatVal(product.price);
//     const newProduct = createNewProduct(product, productPrice, qtyToBeAdded);
//     existingProductsInCart.push(newProduct);

//     return existingProductsInCart;
//   }
// };

// /**
//  * Returns index of the product if it exists.
//  *
//  * @param {Object} existingProductsInCart Existing Products.
//  * @param {Integer} productId Product id.
//  * @return {number | *} Index Returns -1 if product does not exist in the array, index number otherwise
//  */
// const isProductInCart = (existingProductsInCart, productId) => {
//   const returnItemThatExits = (item, index) => {
//     if (productId === item.productId) {
//       return item;
//     }
//   };

//   // This new array will only contain the product which is matched.
//   const newArray = existingProductsInCart.filter(returnItemThatExits);

//   return existingProductsInCart.indexOf(newArray[0]);
// };

// /**
//  * Remove Item from the cart.
//  *
//  * @param {Integer} productId Product Id.
//  * @return {any | string} Updated cart
//  */
// export const removeItemFromCart = (productId) => {
//   if (!process.browser) {
//     return null;
//   }

//   let existingCart = localStorage.getItem("woo-next-cart");
//   existingCart = JSON.parse(existingCart);

//   // If there is only one item in the cart, delete the cart.
//   if (1 === existingCart.products.length) {
//     localStorage.removeItem("woo-next-cart");
//     return null;
//   }

//   // Check if the product already exits in the cart.
//   const productExitsIndex = isProductInCart(existingCart.products, productId);

//   // If product to be removed exits
//   if (-1 < productExitsIndex) {
//     const productTobeRemoved = existingCart.products[productExitsIndex];
//     const qtyToBeRemovedFromTotal = productTobeRemoved.qty;
//     const priceToBeDeductedFromTotal = productTobeRemoved.totalPrice;

//     // Remove that product from the array and update the total price and total quantity of the cart
//     let updatedCart = existingCart;
//     updatedCart.products.splice(productExitsIndex, 1);
//     updatedCart.totalProductsCount =
//       updatedCart.totalProductsCount - qtyToBeRemovedFromTotal;
//     updatedCart.totalProductsPrice =
//       updatedCart.totalProductsPrice - priceToBeDeductedFromTotal;

//     localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));
//     return updatedCart;
//   } else {
//     return existingCart;
//   }
// };

// /**
//  * Returns cart data in the required format.
//  * @param {String} data Cart data
//  */
// export const getFormattedCart = (data) => {
//   let formattedCart = null;

//   if (undefined === data || !data?.cart?.contents?.nodes?.length) {
//     return formattedCart;
//   }

//   const givenProducts = data.cart.contents.nodes;

//   // Create an empty object.
//   formattedCart = {};
//   formattedCart.products = [];
//   let totalProductsCount = 0;

//   for (let i = 0; i < givenProducts.length; i++) {
//     const givenProduct = givenProducts[i].product;
//     const product = {};
//     const total = getFloatVal(givenProducts[i].total);

//     product.productId = givenProduct?.node?.databaseId;
//     product.cartKey = givenProducts[i].key;
//     product.name = givenProduct?.node?.name;
//     product.qty = givenProducts[i].quantity;
//     product.price = total / product.qty;
//     product.totalPrice = givenProducts[i].total;

//     // Ensure we can add products without images to the cart
//     !isEmpty(givenProduct?.node?.image)
//       ? (product.image = {
//           sourceUrl: givenProduct?.node?.image.sourceUrl,
//           srcSet: givenProduct?.node?.image.srcSet,
//           title: givenProduct?.node?.image.title,
//         })
//       : (product.image = {
//           sourceUrl: "https://via.placeholder.com/434",
//           srcSet: "https://via.placeholder.com/434",
//           title: givenProduct?.node?.name,
//         });

//     totalProductsCount += givenProducts[i].quantity;

//     // Push each item into the products array.
//     formattedCart.products.push(product);
//   }

//   formattedCart.totalProductsCount = totalProductsCount;
//   formattedCart.totalProductsPrice = data.cart.total;

//   return formattedCart;
// };

// export const createCheckoutData = (order) => {
//   const checkoutData = {
//     clientMutationId: v4(),
//     billing: {
//       firstName: order.firstName,
//       lastName: order.lastName,
//       address1: order.address1,
//       address2: order.address2,
//       city: order.city,
//       country: order.country,
//       state: order.state,
//       postcode: order.postcode,
//       email: order.email,
//       phone: order.phone,
//       company: order.company,
//     },
//     shipping: {
//       firstName: order.firstName,
//       lastName: order.lastName,
//       address1: order.address1,
//       address2: order.address2,
//       city: order.city,
//       country: order.country,
//       state: order.state,
//       postcode: order.postcode,
//       email: order.email,
//       phone: order.phone,
//       company: order.company,
//     },
//     shipToDifferentAddress: false,
//     paymentMethod: order.paymentMethod,
//     isPaid: false,
//     transactionId: "hjkhjkhsdsdiui",
//     customerNote: order.customerNote,
//   };

//   if (order.createAccount) {
//     checkoutData.account = {
//       username: order.username,
//       password: order.password,
//     };
//   }

//   return checkoutData;
// };

/**
 * Function to get opengraph image.
 *
 * @param {Object} seo Seo data.
 *
 * @return {void}
 */
export const getOgImage = (seo) => {
  if (
    isEmpty(seo) ||
    isEmpty(seo.opengraphImage) ||
    isEmpty(seo.opengraphImage.sourceUrl)
  ) {
    return getDefaultOgImage(seo);
  }

  return seo.opengraphImage.sourceUrl;
};

/**
 * Function to get opengraph default image.
 *
 * @param {Object} seo Seo data.
 *
 * @return {void}
 */
export const getDefaultOgImage = (seo) => {
  if (
    isEmpty(seo) ||
    isEmpty(seo.social) ||
    isEmpty(seo.social.facebook) ||
    isEmpty(seo.social.facebook.defaultImage) ||
    isEmpty(seo.social.facebook.defaultImage.sourceUrl)
  ) {
    return "";
  }

  return seo.social.facebook.defaultImage.sourceUrl;
};

/**
 * Sanitize markup or text when used inside dangerouslysetInnerHTML
 *
 * @param {string} content Plain or html string.
 *
 * @return {string} Sanitized string
 */
export const sanitize = (content) => {
  return process.browser ? DOMPurify.sanitize(content) : content;
};

/**
 * Remove all consecutive duplicates dash from the string
 *
 * */

export const removeDuplicates = (s) => {
  let n = s.length;
  let str = "";
  // We don't need to do anything for
  // empty string.
  if (n === 0) return str;

  // Traversing string
  for (let i = 0; i < n - 1; i++) {
    //checking if s[i] is not same as s[i+1] then add it into str
    if (s[i] !== s[i + 1]) {
      str += s[i];
    }
  }
  //Since the last character will not be inserted in the loop we add it at the end

  str += s[n - 1];
  return str;
};

// HELPER FUNCTIONS
export const textToSlug = (text) => {
  return text
    .split(" ")
    .join("-")
    .replace(/[\s\\//]/g, "")
    .toLowerCase();
};
