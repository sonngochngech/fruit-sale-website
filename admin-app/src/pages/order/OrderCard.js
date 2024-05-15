import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";

import { updateOrder } from "../../features/orders/orderSlice";

import "./OrderCard.css";

const OrderStatusCell = ({ initialStatus, onStatusChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(initialStatus);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onStatusChange(newStatus);
    handleClose();
  };

  return (
    <td>
      <div onClick={handleClick}>
        <Box
          sx={{
            p: 1,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "grey.50",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            borderRadius: 2,
            fontSize: "0.875rem",
            fontWeight: "700",
          }}
        >
          {status}
        </Box>
      </div>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleStatusChange("Request")}>
          <Box
            sx={{
              p: 1,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#101010" : "#4CAF50",
              color: (theme) =>
                theme.palette.mode === "dark" ? "#cccccc" : "#333333",
              border: "1px solid",
              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "#333333" : "#cccccc",
              borderRadius: 2,
              fontSize: "0.875rem",
              fontWeight: "700",
            }}
          >
            Request
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("Delivering")}>
          <Box
            sx={{
              p: 1,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#101010" : "#FFC107",
              color: (theme) =>
                theme.palette.mode === "dark" ? "#cccccc" : "#333333",
              border: "1px solid",
              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "#333333" : "#cccccc",
              borderRadius: 2,
              fontSize: "0.875rem",
              fontWeight: "700",
            }}
          >
            Delivering
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("Delivered")}>
          <Box
            sx={{
              p: 1,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#101010" : "#2196F3",
              color: (theme) =>
                theme.palette.mode === "dark" ? "#cccccc" : "#333333",
              border: "1px solid",
              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "#333333" : "#cccccc",
              borderRadius: 2,
              fontSize: "0.875rem",
              fontWeight: "700",
            }}
          >
            Delivered
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("Cancel")}>
          <Box
            sx={{
              p: 1,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#101010" : "#F44336",
              color: (theme) =>
                theme.palette.mode === "dark" ? "#cccccc" : "#333333",
              border: "1px solid",
              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "#333333" : "#cccccc",
              borderRadius: 2,
              fontSize: "0.875rem",
              fontWeight: "700",
            }}
          >
            Cancel
          </Box>
        </MenuItem>
      </Menu>
    </td>
  );
};

const OrderCard = ({ orders, onViewDetail, onDelete, onEdit }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const ordersPerPage = 10;
  const pagesVisited = pageNumber * ordersPerPage;
  const dispatch = useDispatch();

  const displayOrders = orders && orders.orders ? orders.orders
  .slice(pagesVisited, pagesVisited + ordersPerPage)
  .map((order) => (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order.code}</td>
      <td>{order.email}</td>
      <td>{order.phoneNo}</td>
      <OrderStatusCell
        initialStatus={order.status}
        onStatusChange={(newStatus) =>
          handleStatusChange(order.id, newStatus)
        }
      />
      <td>{order.title}</td>
      <td>{order.address}</td>
      <td>{order.productCost}</td>
      <td>{order.shippingCost}</td>
    </tr>
  )) : <div>No Order</div>;

  const pageCount = Math.ceil(orders.length / ordersPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleStatusChange = (orderId, newStatus) => {
    const updatedStatus = {'status':newStatus}
    dispatch(updateOrder({orderId:orderId, newStatus:updatedStatus}))
      .catch((error) => {
        console.error("Error updating order:", error);
      });
  };

  return (
    <div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Title</th>
            <th>Address</th>
            <th>Product Cost</th>
            <th>Shipping Cost</th>
          </tr>
        </thead>
        <tbody>{displayOrders}</tbody>
      </table>

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default OrderCard;