import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/users/userSlice';
import fruitReducer from '../features/fruits/fruitSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fruit: fruitReducer,
  },
});
