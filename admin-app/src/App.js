import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import Dashboard from './pages/Dashboard';
import UserList from './pages/user/UserManagement';
import ProductList from './pages/product/ProductManagement';
import CategoryManagement from './pages/category/CategoryManagement';
import OrderList from './pages/order/OrderManagement';
import Notification from './pages/notifications/Notification';
import ProductDetailForm from './pages/product/ProductDetailForm';
import PaymentAccount from './pages/payment/PaymentAccount';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<OpenRoutes><Login /></OpenRoutes>} />
        <Route path="/login" element={<OpenRoutes><Login /></OpenRoutes>} />
        <Route path="/forgot-password" element={<OpenRoutes><Forgotpassword /></OpenRoutes>} />
        <Route path="/reset-password" element={<OpenRoutes><Resetpassword /></OpenRoutes>} />
        
        <Route path="/admin" element={<PrivateRoutes><AdminLayout /></PrivateRoutes>}>
          <Route index element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
          <Route path="" element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
          <Route path="users" element={<PrivateRoutes><UserList /></PrivateRoutes>} />
          <Route path="products" element={<PrivateRoutes><ProductList /></PrivateRoutes>} />
          <Route path="products/:productId" element={<PrivateRoutes><ProductDetailForm /></PrivateRoutes>} />
          <Route path="categories" element={<PrivateRoutes><CategoryManagement /></PrivateRoutes>} />
          <Route path="notifications" element={<PrivateRoutes><Notification /></PrivateRoutes>} />
          <Route path="orders" element={<PrivateRoutes><OrderList /></PrivateRoutes>} />
          <Route path="paymentAccount" element={<PrivateRoutes><PaymentAccount /></PrivateRoutes>} />
        </Route>
      </Routes>
      {/* <Route path="/admin/*" element={<PrivateRoutes><AdminLayout /></PrivateRoutes>}>
          <Route index element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
          <Route path="users" element={<PrivateRoutes><UserList /></PrivateRoutes>} />
          <Route path="products" element={<PrivateRoutes><ProductList /></PrivateRoutes>} />
          <Route path="products/:productId" element={<PrivateRoutes><ProductDetailForm /></PrivateRoutes>} />
          <Route path="categories" element={<PrivateRoutes><CategoryManagement /></PrivateRoutes>} />
          <Route path="orders" element={<PrivateRoutes><OrderList /></PrivateRoutes>} />
        </Route> */}
           {/* <AdminLayout>
           <Routes>
               <Route path="/" element={<Dashboard />} />
               <Route path="/users" element={<UserList />} />
               <Route path="/products" element={<ProductList />} />
               <Route path="/products/:productId" element={<ProductDetailForm />} />
               <Route path="/categories" element={<CategoryManagement />} />
               <Route path="/orders" element={<OrderList />} />
           </Routes>
       </AdminLayout> */}
    </Router>
  );
}

export default App;
