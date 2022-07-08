import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import productsService from "./productsService";

const initialState = {
  data: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

//Get products
export const getProductDetails = createAsyncThunk("products/get", async (thunkAPI, { getState }) => {
  const { product } = getState();
  if (product?.data?.length < 2) {
    try {
      return await productsService.getProducts();
    } catch (error) {
      const message = error.response.data.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  } else return product?.data;
});

//Add product
export const addProducts = createAsyncThunk("products/add", async (value, thunkAPI) => {
  try {
    return await productsService.addProduct(value);
  } catch (error) {
    const message = error.response.data.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//Delete product
export const deleteProducts = createAsyncThunk("products/delete", async (id, thunkAPI) => {
  try {
    const remove_item = await productsService.deleteProduct(id);
    if (remove_item.status == 200) return id;
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
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.message = action.payload;
        state.data = null;
      })
      .addCase(addProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data.push(action.payload);
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action);
        state.data = state.data.filter((item) => item._id != action.payload);
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = productSlice.actions;

export const getProducts = createSelector(
  (state) => state.product,
  (product) => product.data
);

export const productLoading = createSelector(
  (state) => state.product,
  (product) => product.isLoading
);

export const productSuccess = createSelector(
  (state) => state.product,
  (product) => product.isSuccess
);

export default productSlice.reducer;
