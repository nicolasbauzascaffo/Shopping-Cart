import React, { useReducer } from "react";
import "./App.css";
import { Route, Link, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import phones from "../public/products";
import { useEffect, useState } from "react";

const initialState = {
  products: phones,
  quantity: 0,
  cart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "increse-quantity":
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        }),
      };
    case "decrese-quantity":
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            return product;
          }
        }),
      };

    case "increse-quantity-cart":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product.id === action.payload) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        }),
      };
    case "decrese-quantity-cart":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product.id === action.payload) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            return product;
          }
        }),
      };

      case "addToCart":
        const newProduct = state.products.find(
          (product) => product.id === action.payload
        );
      
        if (newProduct) {
          const existingProduct = state.cart.find(
            (product) => product.id === action.payload
          );
      
          if (existingProduct) {
            return {
              ...state,
              cart: state.cart.map((product) => {
                if (product.id === action.payload) {
                  return { ...product, quantity: product.quantity + 1 };
                } else {
                  return product;
                }
              }),
            };
          } else {
            return { ...state, cart: [...state.cart, { ...newProduct, quantity: 1 }] };
          }
        } else {
          return state;
        }
      
    case "clearCart":
      return { ...state, cart: [] };
    case "deleteFromCart":
      const deletedProduct = state.cart.find(
        (product) => product.id === action.payload
      );
      if (deletedProduct) {
        const updater = state.cart.filter(
          (product) => product.id !== action.payload
        );
        return { ...state, cart: updater };
      } else {
        return state;
      }
  }
};

function App() {
  const [stateProducts, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Layout stateProducts={stateProducts} dispatch={dispatch} />}
        >
          <Route
            index
            element={<Home stateProducts={stateProducts} dispatch={dispatch} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
