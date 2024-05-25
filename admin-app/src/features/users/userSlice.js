import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./userService";
import { toast } from "react-toastify";

// Action thực hiện lấy danh sách người dùng
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const users = await authService.showList();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await authService.logout(); // Gọi hàm logout từ service hoặc API
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getCustomerFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

// Action thực hiện xóa người dùng
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    try {
      const message = await authService.removeUser(userId);
      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getNotifications = createAsyncThunk(
  "user/notifications",
  async (thunkAPI) => {
    try {
      return await authService.getNotifications();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUnreadNotificationCount = createAsyncThunk(
  "user/notifications/unreadCount",
  async (thunkAPI) => {
    try {
      return await authService.getUnReadNotiCount();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setIsReadNoti = createAsyncThunk(
  "user/notifications/setIsReadNoti",
  async (notiId, thunkAPI) => {
    try {
      return await authService.setIsReadNoti(notiId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteANoti = createAsyncThunk(
  "user/notifications/deleteNoti",
  async (notiId, thunkAPI) => {
    try {
      return await authService.deleteANoti(notiId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAllNoti = createAsyncThunk(
  "user/notifications/deleteAllNoti",
  async (thunkAPI) => {
    try {
      return await authService.deleteAllNoti();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Khởi tạo trạng thái ban đầu của slice
const initialState = {
  users: [],
  user:getCustomerFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Tạo slice Redux cho người dùng
export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        if (state.isSuccess === true) {
          localStorage.setItem("jwt", action.payload.jwt);
          toast.info("User logged in Successfully");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("failed to login");
          toast.error(action.error);
        }
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = null;
        state.cartProduct = null;
        localStorage.removeItem("jwt"); // Xóa jwt từ localStorage hoặc bất kỳ nơi lưu trữ khác
        toast.info("Logged out successfully"); // Thông báo thành công
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error("Logout failed"); // Thông báo thất bại
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
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
        state.errorMessage = "";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter(
          (user) => user.id !== action.payload.userId
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      // noti
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.notifications = action.payload.notifications;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong");
        }
      })
      .addCase(getUnreadNotificationCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUnreadNotificationCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.unreadNotification = action.payload;
      })
      .addCase(getUnreadNotificationCount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong");
        }
      })
      .addCase(setIsReadNoti.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setIsReadNoti.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.notification = action.payload.notification;
      })
      .addCase(setIsReadNoti.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong");
        }
      })
      .addCase(deleteANoti.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteANoti.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.order = action.payload;
      })
      .addCase(deleteANoti.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong");
        }
      })
      .addCase(deleteAllNoti.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllNoti.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.notifications = null;
      })
      .addCase(deleteAllNoti.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong");
        }
      });
  },
});

export default userSlice.reducer;
