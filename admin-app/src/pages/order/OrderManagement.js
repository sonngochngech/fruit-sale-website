import React, { useState, useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import UpdateOrderForm from "./UpdateOrderForm";
import {
  fetchOrders,
  deleteOrder,
} from "../../features/orders/orderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = orders.filter((order) =>
      order.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
  };

  const handleDelete = (orderId) => {
    dispatch(deleteOrder(orderId))
      .then(() => {
        dispatch(fetchOrders()); // Sau khi xóa đơn hàng, tải lại danh sách đơn hàng từ server
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  return (
    <>
    <div className="order-management">
      <h2>Orders</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by order name"
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
      <OrderCard
        orders={orders}
        onDelete={handleDelete}
      />
    </div>
    </>
  );
};

export default OrderManagement;
