import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrder } from "../../features/orders/orderSlice";
import OrderCard from "./OrderCard"; // Import the OrderCard component
import { ToastContainer } from 'react-toastify';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  console.log(orders);

  let filteredOrders;

  try {
    filteredOrders = orders.orders.filter((order) =>
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('An error occurred while filtering orders:', error);
    filteredOrders = []; // hoặc bạn có thể gán giá trị mặc định khác nếu cần thiết
  }

  const handleDelete = (orderId) => {
    dispatch(deleteOrder(orderId))
      .then(() => {
        dispatch(fetchOrders());
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  return (
    <div className="order-management">
      <h2>Orders</h2>
      <ToastContainer />
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by email"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <OrderCard orders={filteredOrders} onDelete={handleDelete} />
    </div>
  );
};

export default OrderManagement;
