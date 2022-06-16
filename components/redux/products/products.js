import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import productsService from "./productsService";

const initialState = {
  data: [],
  isError: false,
  isLoading: false,
  message: "",
};

//Get products
export const getProductDetails = createAsyncThunk("products/get", async (thunkAPI) => {
  try {
    return await productsService.getProducts();
  } catch (error) {
    const message = error.response.data.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isError = null), (state.isLoading = null), (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        (state.isLoading = false), (state.data = action.payload);
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        (state.isLoading = false), (state.data = action.payload), (state.message = action.payload);
        state.data = null;
      });
  },
});

export const { reset } = productSlice.actions;

export const getProducts = createSelector(
  (state) => state.product,
  (product) => product.data
);

export default productSlice.reducer;
