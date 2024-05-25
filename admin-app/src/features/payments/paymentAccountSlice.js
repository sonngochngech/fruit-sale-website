import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { base_url, config } from '../../utils/axiosConfig';
import axios from 'axios';

// Async thunk for posting payment account
export const addPaymentAccount = createAsyncThunk(
  'paymentAccount/addPaymentAccount',
  async (accountNumber) => {
    try {
        const response = await axios.post(`${base_url}payment`, accountNumber, config);
        return response.data;    
    }
    catch (error) {
        throw new Error(error.message); 
    }

  }
);

const paymentAccountSlice = createSlice({
  name: 'paymentAccount',
  initialState: {
    accountNumber: '',
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
        // Clear the input field after successful submission
        state.accountNumber = '';
      })
      .addCase(addPaymentAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setAccountNumber } = paymentAccountSlice.actions;

export default paymentAccountSlice.reducer;
