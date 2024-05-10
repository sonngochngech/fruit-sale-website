import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

// Lấy danh sách người dùng
const showList = async () => {
  try {
    const response = await axios.get(`${base_url}users`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Xóa người dùng
const removeUser = async (userId) => {
    try {
      const response = await axios.delete(`${base_url}users/${userId}`);
      if (response.data.success) {
        return response.data.message; // Trả về thông báo thành công từ API
      } else {
        throw new Error(response.data.message); // Xử lý lỗi từ API
      }
    } catch (error) {
      throw new Error(error.message); // Xử lý các lỗi khác (ví dụ: lỗi mạng, lỗi không xác định)
    }
  }
  
  const updateUser = async (userId, updatedUserData) => {
    try {
      const response = await axios.patch(`${base_url}users/${userId}`, updatedUserData);
      return response.data; // Trả về thông tin người dùng đã được chỉnh sửa
    } catch (error) {
      throw new Error(error.message); // Xử lý các lỗi khác (ví dụ: lỗi mạng, lỗi không xác định)
    }
  };

const userService = {
    showList,
    removeUser,
    updateUser
};

export default userService;
