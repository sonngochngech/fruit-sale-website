import React, { useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const OrderStatusCell = ({ initialStatus, onStatusChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(initialStatus);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onStatusChange(newStatus);
    handleClose();
  };

  return (
    <div>
      <Box
        onClick={handleClick}
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
          cursor: "pointer"
        }}
      >
        {status}
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {["Request", "Delivering", "Delivered", "Cancel"].map((statusOption) => (
          <MenuItem key={statusOption} onClick={() => handleStatusChange(statusOption)}>
            <Box
              sx={{
                p: 1,
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#101010" : {
                    Request: "#4CAF50",
                    Delivering: "#FFC107",
                    Delivered: "#2196F3",
                    Cancel: "#F44336"
                  }[statusOption],
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "#333333" : "#cccccc",
                borderRadius: 2,
                fontSize: "0.875rem",
                fontWeight: "700"
              }}
            >
              {statusOption}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default OrderStatusCell;
