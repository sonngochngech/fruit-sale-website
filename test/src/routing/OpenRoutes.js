// Quản lý các route mà người dùng có thể truy cập mà không cần xác thực.
import React from 'react';
import { Route } from 'react-router-dom';

const OpenRoutes = ({ element }) => {
  return <Route element={element} />;
};

export default OpenRoutes;
