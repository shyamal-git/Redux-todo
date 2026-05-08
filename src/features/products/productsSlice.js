import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createProductAPI,
  deleteProductAPI,
  fetchProductsAPI,
  updateProductAPI,
} from "./productsAPI";

const initialState = {
  items: [],
  total: 0,
  loading: false,
  saving: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await fetchProductsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to load products"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, thunkAPI) => {
    try {
      return await createProductAPI(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to create product"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (payload, thunkAPI) => {
    try {
      return await updateProductAPI(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to update product"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const deletedProduct = await deleteProductAPI(id);

      return {
        ...deletedProduct,
        id,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to delete product"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.saving = false;
        state.items = [action.payload, ...state.items];
        state.total += 1;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.saving = false;
        const index = state.items.findIndex(
          (product) => product.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload,
          };
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.saving = false;
        state.items = state.items.filter(
          (product) => product.id !== action.payload.id
        );
        state.total = Math.max(0, state.total - 1);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductsError } = productsSlice.actions;

export default productsSlice.reducer;
