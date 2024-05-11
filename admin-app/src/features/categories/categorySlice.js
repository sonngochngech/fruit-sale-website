import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from './categoryService';

// Action thực hiện lấy danh sách danh mục
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    try {
      const categories = await categoryService.showList();
      console.log(categories);
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
      return newCategory;
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
      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Action thực hiện chỉnh sửa thông tin danh mục
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ categoryId, updatedCategoryData }) => {
    try {
      const updatedCategory = await categoryService.updateCategory(categoryId, updatedCategoryData);
      return updatedCategory;
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
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
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
        state.categories.push(action.payload);
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
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.map(category => {
          if (category.id === action.payload.id) {
            return action.payload;
          }
          return category;
        });
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
