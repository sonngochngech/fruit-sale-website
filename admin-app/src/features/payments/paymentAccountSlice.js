// paymentAccountSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import paymentService from './paymentService';

// Thunk để gọi API thêm tài khoản thanh toán
export const addPaymentAccount = createAsyncThunk(
  'paymentAccount/addPaymentAccount',
  async (accountNumber, { rejectWithValue }) => {
    try {
      const response = await paymentService.addPaymentAccount(accountNumber);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk để gọi API lấy địa chỉ thanh toán
export const getPaymentAddress = createAsyncThunk(
  'paymentAccount/getPaymentAddress',
  async (_, { rejectWithValue }) => {
    try {
      const response = await paymentService.getPaymentAddress();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const paymentAccountSlice = createSlice({
  name: 'paymentAccount',
  initialState: {
    accountNumber: '',
    paymentAddress: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    setAccountNumber: (state, action) => {
      state.accountNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPaymentAccount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPaymentAccount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accountNumber = action.payload.accountNumber;
        state.error = null;
      })
      .addCase(addPaymentAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getPaymentAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPaymentAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.paymentAddress = action.payload.address;
        state.error = null;
      })
      .addCase(getPaymentAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default paymentAccountSlice.reducer;
