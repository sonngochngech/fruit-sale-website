import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrder } from "../features/orders/orderSlice";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { DatePicker } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
  Container,
  CssBaseline,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Skeleton,
  Typography,
} from "@mui/material";

dayjs.extend(isBetween); // Sử dụng plugin isBetween

const OrderChart = (orders) => {
  console.log(orders);
  const today = dayjs();
  const [startDate, setStartDate] = useState(today.subtract(13, "day"));
  const [endDate, setEndDate] = useState(today);
  const [timeRange, setTimeRange] = useState("14days");

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  useEffect(() => {
    switch (timeRange) {
      case "week":
        setStartDate(today.subtract(1, "week"));
        break;
      case "14days":
        setStartDate(today.subtract(13, "day"));
        break;
      case "month":
        setStartDate(today.subtract(1, "month"));
        break;
      case "3months":
        setStartDate(today.subtract(3, "month"));
        break;
      case "year":
        setStartDate(today.subtract(1, "year"));
        break;
      default:
        setStartDate(today.subtract(13, "day"));
        break;
    }
    setEndDate(today);
  }, [timeRange, today]);

  const filteredOrders = orders.orders.filter((order) =>
    dayjs(order.createdAt).isBetween(startDate, endDate, "day", "[]")
  );

  const orderCountsByDate = filteredOrders.reduce((acc, order) => {
    const date = dayjs(order.createdAt).format("YYYY-MM-DD");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const dates = [];
  for (
    let d = startDate;
    d.isBefore(endDate) || d.isSame(endDate, "day");
    d = d.add(1, "day")
  ) {
    dates.push(d.format("YYYY-MM-DD"));
  }

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Quantity of orders",
        data: dates.map((date) => orderCountsByDate[date] || 0),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    animation: {
      duration: 10, // Thời gian hiển thị nhanh hơn (500ms)
    },
  };

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Duration</InputLabel>
            <Select
              value={timeRange}
              label="Duration"
              onChange={handleTimeRangeChange}
            >
              <MenuItem value="week">Week</MenuItem>
              <MenuItem value="14days">14 days</MenuItem>
              <MenuItem value="month">30 days</MenuItem>
              <MenuItem value="3months">3 months</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Start date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="End date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
      </Grid>
      <Bar data={data} options={options} />
    </Box>
  );
};

const OrderOverview = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    dispatch(fetchOrders())
      .then(() => setLoading(false)) // Set loading to false when data is fetched successfully
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, [dispatch]);

  // Render skeleton if loading
  if (loading) {
    return (
      <>
        <div>
      <h4>Order</h4>
      <CssBaseline />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <Box sx={{ width: 400, height: 400, margin: 0 }}>
              <Typography variant="h4">Status of orders</Typography>
              <Skeleton variant="circular" width={300} height={300}  />
            </Box>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="h4">Quantity of orders</Typography>
              <Skeleton variant="rectangular" width="100%" height={300} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
      </>
    );
  }

  const orderStatuses = orders.orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(orderStatuses),
    datasets: [
      {
        data: Object.values(orderStatuses),
        backgroundColor: [
          "#FF6384", // Color for Delivering
          "#36A2EB", // Color for Delivered
          "#FFCE56", // Color for Cancel
          "#4BC0C0", // Color for Request
        ],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right", // Adjust position as needed
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <>
      <div>
        <h2>Order</h2>
      </div>
      <div>
        <CssBaseline />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
              <div style={{ width: 400, height: 400, margin: 0 }}>
                <h4>Status of orders</h4>
                <Pie data={data} options={options} />
              </div>
            </Grid>
            <Grid item xs={12} sm={7}>
              <h4>Quantity of orders</h4>
              <OrderChart orders={orders.orders} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <OrderOverview />
    </div>
  );
};

export default Dashboard;
