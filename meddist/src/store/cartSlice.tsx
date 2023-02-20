/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "../models/Product";

interface CartState {
  cart: Product[];
  totalPrice: number;
}

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
        state.totalPrice += action.payload.price;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        state.totalPrice += action.payload.price;
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
        state.totalPrice += item.price;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          item.quantity = 1;
        } else {
          item.quantity--;
          state.totalPrice -= item.price;
        }
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
      state.totalPrice = 0;
      for (const item of state.cart) {
        state.totalPrice += item.quantity * item.price;
      }
    },
    resetCart: (state, action: PayloadAction<void>) => {
      state.cart = [];
      state.totalPrice = 0;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  resetCart,
} = cartSlice.actions;
