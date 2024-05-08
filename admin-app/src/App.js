// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLayout from './components/AdminLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserList from './pages/user/UserManagement';
import ProductList from './pages/product/ProductManagement';
import CategoryList from './pages/category/CategoryManagement';
import OrderList from './pages/order/OrderManagement';

const App = () => {
    return (
        <Router>
            <AdminLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/categories" element={<CategoryList />} />
                    <Route path="/orders" element={<OrderList />} />
                </Routes>
            </AdminLayout>
        </Router>
    );
}

export default App;
