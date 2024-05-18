import React from "react";
import { BarChart } from "@mui/x-charts";

const OrderStatusChart = ({ orders }) => {
  // Tạo một đối tượng để lưu trữ số lượng đơn hàng theo từng trạng thái
  const statusCount = {};
  for (const order of orders.orders) {
    const status = order.status;
    if (statusCount[status]) {
      statusCount[status]++;
    } else {
      statusCount[status] = 1;
    }
  }

  // Dữ liệu cho biểu đồ
  const data = {
    labels: Object.keys(statusCount), // Tên của các trạng thái
    datasets: [
      {
        label: "Number of Orders",
        data: Object.values(statusCount), // Số lượng đơn hàng tương ứng với từng trạng thái
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)", // Màu cho trạng thái 1
          "rgba(54, 162, 235, 0.5)", // Màu cho trạng thái 2
          "rgba(255, 206, 86, 0.5)", // Màu cho trạng thái 3
          "rgba(75, 192, 192, 0.5)", // Màu cho trạng thái 4
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Màu viền cho trạng thái 1
          "rgba(54, 162, 235, 1)", // Màu viền cho trạng thái 2
          "rgba(255, 206, 86, 1)", // Màu viền cho trạng thái 3
          "rgba(75, 192, 192, 1)", // Màu viền cho trạng thái 4
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Order Status Chart</h2>
      <BarChart
        data={data}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default OrderStatusChart;
