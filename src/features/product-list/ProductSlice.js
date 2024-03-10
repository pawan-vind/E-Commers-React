import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct, fetchAllBrands, fetchAllCategory, fetchAllProducts , fetchProductsByFilter, fetchProductsById, updateProduct} from './ProductAPI';

const initialState = {
  products: [],
  brands:[],
  category:[],
  status: 'idle',
  totalItems: 0,
  selectedProduct: null
};  

export const fetchAllProductAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductsByFilterAsync = createAsyncThunk(
  'product/fetchProductsByFilter',
  async ({filter, sort, pagination, admin}) => {
    const response = await fetchProductsByFilter(filter, sort, pagination, admin);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'brands/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'brands/fetchProductsById',
  async (id) => {
    const response = await fetchProductsById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCategoryAsync = createAsyncThunk(
  'brands/fetchAllCategory',
  async () => {
    const response = await fetchAllCategory();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const createProductAsync = createAsyncThunk(
  'brands/createProduct',
  async (product) => {
    const response = await createProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'brands/updateProduct',
  async (productId) => {
    const response = await updateProduct(productId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => { 
      state.selectedProduct = null;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.category = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(product=>product.id === action.payload.id)
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      })
  },  
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategory = (state) => state.product.category;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;

export default productSlice.reducer;
