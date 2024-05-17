import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import OrderStatusChart from './dashboard/OrderStatusChart'; // Đường dẫn tới component OrderStatusChart

const Dashboard = () => {
  // const orders = useSelector((state) => state.orders.orders);
  const orders = [
    {
        "id": 47,
        "code": 86160194,
        "title": "Normal",
        "phoneNo": "+0398432343",
        "email": "sonha123@gmail.com",
        "address": "12, Giai Phong, Hai Ba Trung, Ha Noi",
        "status": "Delivered",
        "productCost": 13,
        "shippingCost": 5,
        "createdAt": "2024-05-17T12:56:09.000Z",
        "updatedAt": "2024-05-17T13:37:20.000Z",
        "UserId": 16
    },
    {
        "id": 48,
        "code": 46616118,
        "title": "Normal",
        "phoneNo": "+0321235452",
        "email": "nguyenson1@gmail.com",
        "address": "01, Dai Co Viet, Hai Ba Trung, Ha Noi",
        "status": "Request",
        "productCost": 31,
        "shippingCost": 5,
        "createdAt": "2024-05-17T13:26:29.000Z",
        "updatedAt": "2024-05-17T13:26:29.000Z",
        "UserId": 16
    }
];
console.log(orders);
  return (
    <div className="dashboard">
      {/* Truyền dữ liệu orders vào component OrderStatusChart */}
      <OrderStatusChart orders={{orders}} />
    </div>
  );
};

export default Dashboard;
