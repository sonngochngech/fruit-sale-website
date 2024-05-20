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
          <Route path="forgot-password" element={<OpenRoutes><Forgotpassword /></OpenRoutes>} />
        
        <Route path="/" element={<PrivateRoutes><Layout /></PrivateRoutes>}>
            <Route path="reset-password" element={<Resetpassword />} />
          <Route path="fruits" element={<OurStore />} />
          <Route path="fruits/:id" element={<SingleFruit />}/>
          <Route path="cart" element={<Cart />}/>
          <Route path="checkout" element={ <Checkout />}/>
          <Route   path="order" element={  <Order/>  }  />
          <Route path="notification" element={ <Notification />}  />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
