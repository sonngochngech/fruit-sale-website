import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

// Lấy danh sách đơn hàng
const showList = async () => {
  try {
    console.log(config);
    const response = await axios.get(`${base_url}orders/getAllOrders`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Xóa đơn hàng
const removeOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${base_url}order/${orderId}/delete`, config);
    if (response.data.success) {
      return response.data.message; // Trả về thông báo thành công từ API
    } else {
      throw new Error(response.data.message); // Xử lý lỗi từ API
    }
  } catch (error) {
    throw new Error(error.message); // Xử lý các lỗi khác (ví dụ: lỗi mạng, lỗi không xác định)
  }
};

// Cập nhật thông tin đơn hàng
const updateOrder = async (orderId, newStatus) => {
  try {
    console.log(newStatus);
    const response = await axios.put(`${base_url}orders/${orderId}/update`, newStatus, config);
    return response.data; // Trả về thông tin đơn hàng đã được chỉnh sửa
  } catch (error) {
    throw new Error(error.message); // Xử lý các lỗi khác (ví dụ: lỗi mạng, lỗi không xác định)
  }
};

const orderService = {
  showList,
  removeOrder,
  updateOrder
};

export default orderService;
