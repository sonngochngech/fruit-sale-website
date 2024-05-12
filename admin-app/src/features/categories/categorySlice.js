import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from './categoryService';
import { toast } from 'react-toastify';

// Action thực hiện lấy danh sách danh mục
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    try {
      const categories = await categoryService.showList();
      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Action thực hiện thêm danh mục mới
export const addNewCategory = createAsyncThunk(
  'categories/addNewCategory',
  async (newCategoryData) => {
    try {
      const newCategory = await categoryService.addCategory(newCategoryData);
      const categories = await categoryService.showList();
      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);  

// Action thực hiện xóa danh mục
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId) => {
    try {
      const message = await categoryService.removeCategory(categoryId);
      return { categoryId, message };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Khởi tạo trạng thái ban đầu của slice
const initialState = {
  categories: [],
  isError:false,
  isSuccess:false,
  isLoading:false,
  message:'',
};

// Tạo slice Redux cho categories
export const categorySlice = createSlice({
  name: 'categories',
  initialState:initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(addNewCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(category => category.id !== action.payload.categoryId);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
