import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import OpenRoutes from './OpenRoutes';
import Dashboard from '../pages/Dashboard';
import UsersPage from '../pages/UsersPage';
import OrdersPage from '../pages/OrdersPage';
import ProductsPage from '../pages/ProductsPage';
import CategoriesPage from '../pages/CategoriesPage';
import Statistics from '../pages/Statistics';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <PrivateRoutes path="/dashboard/*" element={<Dashboard />} />
        <PrivateRoutes path="/dashboard/users" element={<UsersPage />} />
        <PrivateRoutes path="/dashboard/orders" element={<OrdersPage />} />
        <PrivateRoutes path="/dashboard/products" element={<ProductsPage />} />
        <PrivateRoutes path="/dashboard/categories" element={<CategoriesPage />} />
        <OpenRoutes path="/stats" element={<Statistics />} />
        {/* More routes */}
      </Routes>
    </Router>
  );
};

export default Routing;
