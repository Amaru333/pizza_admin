import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import productReducer from "./products/products";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
  },
});
