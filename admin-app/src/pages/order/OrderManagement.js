import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrder } from "../../features/orders/orderSlice";
import OrderCard from "./OrderCard"; 
import { Skeleton, Box, Typography, Grid, Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchOrders())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (orderId) => {
    dispatch(deleteOrder(orderId))
      .then(() => dispatch(fetchOrders()))
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  if (loading) {
    return (
      <div className="order-management">
        <h2>Orders</h2>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Skeleton variant="rectangular" width={435} height={37} />
                <Skeleton variant="rectangular" width={77.85} height={37} sx={{ ml: 2 }} />
              </Box>
            </Grid>
            <Grid item xs={12}>
            <Skeleton variant="rectangular" width={1100} height={100} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={1100} height={500} />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }

  let filteredOrders = [];
  if (orders) {
    try {
      filteredOrders = orders.orders.filter((order) =>
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('An error occurred while filtering orders:', error);
    }
  }

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
