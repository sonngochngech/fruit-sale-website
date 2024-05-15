// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import Dashboard from './pages/Dashboard';
import UserList from './pages/user/UserManagement';
import ProductList from './pages/product/ProductManagement';
import CategoryList from './pages/category/CategoryManagement';
import OrderList from './pages/order/OrderManagement';
import ProductDetailForm from './pages/product/ProductDetailForm';

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="login" element={<OpenRoutes><Login /></OpenRoutes>} />
    //     <Route path="forgot-password" element={<OpenRoutes><Forgotpassword /></OpenRoutes>} />
    //     <Route path="reset-password" element={<OpenRoutes><Resetpassword /></OpenRoutes>} />
                            
    //     <Route path='/admin/*' element={<PrivateRoutes><AdminLayout/></PrivateRoutes>}>
    //       <Route index element={<Dashboard />} />
    //       <Route path="users" element={<UserList />} />
    //       <Route path="products" element={<ProductList />} />
    //       <Route path="categories" element={<CategoryList />} />
    //       <Route path="orders" element={<PrivateRoutes><OrderList /></PrivateRoutes>} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    <Router>
        <AdminLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:productId" element={<ProductDetailForm />} />
                <Route path="/categories" element={<CategoryList />} />
                <Route path="/orders" element={<OrderList />} />
            </Routes>
        </AdminLayout>
    </Router>
  );
}

export default App;
