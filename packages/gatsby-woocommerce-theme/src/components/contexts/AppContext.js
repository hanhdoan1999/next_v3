import React, { useEffect, useState } from "react";

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();
const initialState = {
  cartItems: [],
  totalQty: 0,
  showCart: false,
  showRequestQuote: false,
  showSearchBox: false,
  showSideBar: false,
  showMobileMegaMenu: false,
  showGallery: false,
  showQuickQuote: false,
  value2: {
    industry:"",
    location:"",
  },
};

function reducer(state, action) {
  const newCart = [...state.cartItems];

  switch (action.type) {
    case "INITIAL_STATE":
      const savedCartItems = action.payload;
      const totalQty = savedCartItems.reduce(
        (prev, next) => prev + next.qty,
        0
      );
      return { ...state, cartItems: action.payload, totalQty };
    case "OPEN_MODAL":
      if (action.payload === "cart-modal") {
        return {
          ...state,
          showCart: true,
        };
      }
      if (action.payload === "gallery-modal") {
        return {
          ...state,
          showGallery: true,
        };
      }
      if (action.payload === "request-quote") {
        return {
          ...state,
          showRequestQuote: true,
        };
      }

      if (action.payload === "search-box") {
        return {
          ...state,
          showSearchBox: true,
        };
      }
      if (action.payload === "side-bar") {
        return {
          ...state,
          showMobileMegaMenu: false,
          showSideBar: true,
        };
      }
      if (action.payload === "mobile-mega-menu") {
        return {
          ...state,
          showMobileMegaMenu: true,
        };
      }
      if (action.payload === "quick-quote") {
        return {
          ...state,
          showQuickQuote: true,
        };
      }
      break;
    case "CLOSE_MODAL":
      return {
        ...state,
        showGallery: false,
        showCart: false,
        showRequestQuote: false,
        showSearchBox: false,
        showSideBar: false,
        showMobileMegaMenu: false,
        showQuickQuote: false,
      };
    case "CLEAR_CART":
      localStorage.setItem(
        "woo-next-cart",
        JSON.stringify(initialState.cartItems)
      );
      return { ...initialState };

    case "ADD_TO_CART":
      //newCart
      //action.payload

      let productExitsIndex = newCart.findIndex(
        (item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.attributes) ===
            JSON.stringify(action.payload.attributes)
      );

      if (
        productExitsIndex > -1 &&
        JSON.stringify(newCart[productExitsIndex]?.attributes) ===
          JSON.stringify(action.payload.attributes)
      ) {
        if(action.payload.hasOwnProperty("qty")){
          newCart[productExitsIndex].qty += action.payload.qty
        }else {
          newCart[productExitsIndex].qty += 1
        }
      } else {
        const addedItem = {
          ...action.payload,
          qty: action.payload.hasOwnProperty("qty") ? action.payload.qty : 1,
          sku: "",
          price: 0,
          description: "",
          stock_quantity: 0,
        };
        newCart.push(addedItem);
      }
      localStorage.setItem("woo-next-cart", JSON.stringify(newCart));
      return {
        ...state,
        cartItems: newCart,
        totalQty: state.totalQty + (action.payload.hasOwnProperty("qty") ? action.payload.qty : 1),
        showCart: true,
      };

    case "UPDATE_CART":
      productExitsIndex = newCart.findIndex(
        (item) =>
          item.id === action.payload.product.id &&
          JSON.stringify(item.attributes) ===
            JSON.stringify(action.payload.product.attributes)
      );

      newCart[productExitsIndex].qty += action.payload.value;
      let updatedCart1 = newCart;
      if (newCart[productExitsIndex].qty === 0) {
        updatedCart1 = newCart.filter(
          (item) => item.id !== action.payload.product.id
        );
      }

      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart1));

      return {
        ...state,
        cartItems: updatedCart1,
        totalQty: state.totalQty + action.payload.value,
      };

    case "DELETE_PRODUCT_ITEM":
      let updatedCart = [];
      const indexItem = newCart.findIndex(
        (el) =>
          el.id === action.payload.id &&
          JSON.stringify(el.attributes) ===
            JSON.stringify(action.payload.attributes)
      );
      if (indexItem > -1) {
        updatedCart = newCart.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(newCart[indexItem])
        );
      } else {
        updatedCart = newCart.filter((item) => item.id !== action.payload.id);
      }

      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));
      return {
        ...state,
        cartItems: updatedCart,
        totalQty: state.totalQty - state.cartItems[indexItem].qty,
      };
    case "CHANGE_INDUSTRY": 
      return {
        ...state,
        value2:{
          ...state.value2,
          industry:action.payload,
        }
      }
    case "CHANGE_LOCATION": 
      return {
        ...state,
        value2:{
          ...state.value2,
          location:action.payload
        }
    }
    case "CHANGE_DEFAULT":
      return {
        ...initialState,
        value2:{
          industry:"",
          location:""
        }
      }
    default:
      throw new Error("Bad action require");
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  
  useEffect(() => {
    // if (process.browser) {
    let cartData = localStorage.getItem("woo-next-cart");

    cartData =
      null !== cartData && cartData && "null" !== cartData
        ? JSON.parse(cartData)
        : [];
    dispatch({ type: "INITIAL_STATE", payload: cartData });
    // }
  }, []);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};
