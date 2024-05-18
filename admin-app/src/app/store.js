import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import categoryReducer from '../features/categories/categorySlice';
import userReducer from '../features/users/userSlice'
import orderReducer from '../features/orders/orderSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    users: userReducer,
    orders: orderReducer
  },
});