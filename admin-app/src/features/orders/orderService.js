import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

// Lấy danh sách đơn hàng
const showList = async () => {
  try {
    const response = await axios.get(`${base_url}orders`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Thêm đơn hàng mới
const addOrder = async (newOrderData) => {
  try {
    const response = await axios.post(`${base_url}orders`, newOrderData, config);
    return response.data;
  } catch (error) {
    throw new Error(error.message); 
  }
};

// Xóa đơn hàng
const removeOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${base_url}orders/${orderId}`);
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
const updateOrder = async (orderId, updatedOrderData) => {
  try {
    const response = await axios.patch(`${base_url}orders/${orderId}`, updatedOrderData);
    return response.data; // Trả về thông tin đơn hàng đã được chỉnh sửa
  } catch (error) {
    throw new Error(error.message); // Xử lý các lỗi khác (ví dụ: lỗi mạng, lỗi không xác định)
  }
};

const orderService = {
  showList,
  addOrder,
  removeOrder,
  updateOrder
};

export default orderService;
