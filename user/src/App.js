import React from 'react';
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Layout from './components/Layout';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import OurStore from './pages/OurStore';
import SingleFruit from './pages/SingleFruit';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Order from './pages/Order';
import Notification from './pages/Notification';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="signup" element={<OpenRoutes><Signup /></OpenRoutes>} ></Route>
          <Route path="login" element={<OpenRoutes><Login /></OpenRoutes>}></Route>
          <Route path="forgot-password" element={<Forgotpassword />} />
          <Route path="reset-password" element={<Resetpassword />} />
        <Route path="/" element={<PrivateRoutes><Layout /></PrivateRoutes>}>
          <Route path="fruits" element={<PrivateRoutes><OurStore /></PrivateRoutes>} />
            <Route
              path="fruits/:id"
              element={
                <PrivateRoutes>
                  <SingleFruit />
                </PrivateRoutes>
              }
            />
            <Route
              path="cart"
              element={
                <PrivateRoutes>
                  <Cart />
                </PrivateRoutes>
              }
            />
             <Route
              path="checkout"
              element={
                <PrivateRoutes>
                  <Checkout />
                </PrivateRoutes>
              }
            />
              <Route
              path="order"
              element={
                <PrivateRoutes>
                  <Order />
                </PrivateRoutes>
              }
            />

              <Route
              path="notification"
              element={
                <PrivateRoutes>
                  <Notification />
                </PrivateRoutes>
              }
            />
         
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
