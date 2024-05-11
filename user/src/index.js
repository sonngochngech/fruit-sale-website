import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';

import { store } from './app/store';
// import {createBrowserRouter, createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
// import Home from './pages/Home'
// import About from './pages/About'
// import Contact from './pages/Contact'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App/>}>

//       <Route index element={<Home/>} />
//       <Route path='about' element={<About/>} />
//       <Route path="contact" element={<Contact/>} />


//     </Route>
//   )
// )

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
