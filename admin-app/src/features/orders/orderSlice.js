import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService';

// Action thực hiện lấy danh sách đơn hàng
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    try {
      const orders = await orderService.showList();
      console.log(orders);
      return orders;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Action thực hiện xóa đơn hàng
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId) => {
    try {
      const message = await orderService.removeOrder(orderId);
      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Action thực hiện chỉnh sửa thông tin đơn hàng
export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ orderId, newStatus }) => {
    try {
      const updatedOrder = await orderService.updateOrder(orderId, newStatus);
      const orders = await orderService.showList();
      return orders;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Khởi tạo trạng thái ban đầu của slice
const initialState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Tạo slice Redux cho orders
export const orderSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = state.orders.filter(order => order.id !== action.payload.orderId);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export default orderSlice.reducer;
