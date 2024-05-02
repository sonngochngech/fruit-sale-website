import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

// Action thực hiện lấy danh sách sản phẩm
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const products = await productService.showList();
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Action thực hiện thêm sản phẩm mới
export const addNewProduct = createAsyncThunk(
  'products/addNewProduct',
  async (newProductData) => {
    try {
      const newProduct = await productService.addProduct(newProductData);
      return newProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Action thực hiện xóa sản phẩm
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId) => {
    try {
      const message = await productService.removeProduct(productId);
      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Action thực hiện chỉnh sửa thông tin sản phẩm
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, updatedProductData }) => {
    try {
      const updatedProduct = await productService.editProduct(productId, updatedProductData);
      return updatedProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Khởi tạo trạng thái ban đầu của slice
const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  errorMessage: ''
};

// Tạo slice Redux cho products
export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        console(state.products)
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(product => product.id !== action.payload.productId);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.map(product => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        });
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export default productSlice.reducer;
