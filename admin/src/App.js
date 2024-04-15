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
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="signup" element={<OpenRoutes><Signup /></OpenRoutes>} ></Route>
          <Route path="login" element={<OpenRoutes><Login /></OpenRoutes>}></Route>
          <Route path="forgot-password" element={<Forgotpassword />} />
          <Route path="reset-password" element={<Resetpassword />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
