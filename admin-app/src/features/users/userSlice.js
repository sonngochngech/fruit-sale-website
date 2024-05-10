import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

// Action thực hiện lấy danh sách người dùng
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    try {
      const users = await userService.showList();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Action thực hiện xóa người dùng
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId) => {
    try {
      const message = await userService.removeUser(userId);
      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Khởi tạo trạng thái ban đầu của slice
const initialState = {
  users: [],
  isError:false,
  isSuccess:false,
  isLoading:false,
  message:'',
};

// Tạo slice Redux cho người dùng
export const userSlice = createSlice({
  name: 'users',
  initialState:initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter(user => user.id !== action.payload.userId);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export default userSlice.reducer;
