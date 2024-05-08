import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './userService';
import { toast } from 'react-toastify';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await authService.logout(); // Gọi hàm logout từ service hoặc API
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const getAnUserOrders = createAsyncThunk(
  'user/order',
  async (thunkAPI) => {
    try {
      return await authService.getUserOrder();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addFruitToCart = createAsyncThunk(
  'user/cart/add',
  async (cartData, thunkAPI) => {
    try {
      return await authService.addToCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createUserOrder = createAsyncThunk(
  'user/cart/create-order',
  async (orderData, thunkAPI) => {
    try {
      return await authService.createAnOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserCart = createAsyncThunk(
  'user/cart/get',
  async (thunkAPI) => {
    try {
      return await authService.getCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCartFruit = createAsyncThunk(
  'user/fruit/delete',
  async (cartItemId, thunkAPI) => {
    try {
      return await authService.removeFruitFromCart(cartItemId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCartFruit = createAsyncThunk(
  'user/cart/fruit/update',
  async (cartDetail, thunkAPI) => {
    try {
      return await authService.updateFruitFromCart(cartDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const cancelOrder=createAsyncThunk(
  'user/order/cancel',
  async(id,thunkAPI)=>{
    try{
      return await authService.cancelOrder(id)
    }catch(error){
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const getNotifications = createAsyncThunk(
  'user/notifications',
  async ( thunkAPI) => {
    try {
      return await authService.getNotifications();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getUnreadNotificationCount = createAsyncThunk(
  'user/notifications/unreadCount',
  async ( thunkAPI) => {
    try {
      return await authService.getUnReadNotiCount();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setIsReadNoti = createAsyncThunk(
  'user/notifications/setIsReadNoti',
  async ( notiId,thunkAPI) => {
    try {
      return await authService.setIsReadNoti(notiId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const deleteANoti = createAsyncThunk(
  'user/notifications/deleteNoti',
  async ( notiId,thunkAPI) => {
    try {
      return await authService.deleteANoti(notiId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAllNoti = createAsyncThunk(
  'user/notifications/deleteAllNoti',
  async (thunkAPI) => {
    try {
      return await authService.deleteAllNoti();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);







const getCustomerFromLocalStorage = localStorage.getItem('customer')
  ? JSON.parse(localStorage.getItem('customer'))
  : null;

const initialState = {
  user: getCustomerFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setPreOrder: (state, action) => {
      state.preOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createUser = action.payload.user;
        if (state.isSuccess === true) {
          toast.info('User Create Successfully');
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        if (state.isSuccess === true) {
          localStorage.setItem('jwt', action.payload.jwt);
          toast.info('User logged in Successfully');
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error('User Create failed');
          toast.error(action.error);
        }
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = null; 
        state.cartFruit = null;
        localStorage.removeItem('jwt'); // Xóa jwt từ localStorage hoặc bất kỳ nơi lưu trữ khác
        toast.info('Logged out successfully'); // Thông báo thành công
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Logout failed'); // Thông báo thất bại
      })
      .addCase(getAnUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload.orders;
      })
      .addCase(getAnUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addFruitToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFruitToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartFruit = action.payload;
        if (state.isSuccess) {
          toast.success('Fruit Added To Cart');
        }
      })
      .addCase(addFruitToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartFruits = action.payload.cart;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteCartFruit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartFruit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteCartFruit = action.payload;
        if (state.isSuccess) {
          toast.success('Fruit delete from cart successfully!');
        }
      })
      .addCase(deleteCartFruit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error('Something went wrong');
        }
      })
      .addCase(updateCartFruit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartFruit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateCartFruit = action.payload;
        // if (state.isSuccess) {
        //   toast.success('Fruit updated from cart successfully!');
        // }
      })
      .addCase(updateCartFruit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error('Something went wrong');
        }
      })
      .addCase(createUserOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.order = action.payload;
        if (state.isSuccess) {
          toast.success('Successfully checkout!');
        }
      })
      .addCase(createUserOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error('Something went wrong');
        }
      })
      .addCase(cancelOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error('Something went wrong');
        }
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
          toast.error('Something went wrong');
        }
      })
      .addCase(getUnreadNotificationCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUnreadNotificationCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.unreadNotification=action.payload;
      })
      .addCase(getUnreadNotificationCount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error('Something went wrong');
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
          toast.error('Something went wrong');
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
          toast.error('Something went wrong');
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
          toast.error('Something went wrong');
        }
      })
      ;
  },
});
export const { setPreOrder } = authSlice.actions;

export default authSlice.reducer;
