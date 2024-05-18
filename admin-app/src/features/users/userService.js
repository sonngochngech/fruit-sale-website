import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";




const login = async (userData) => {
  try {
    const response = await axios.post(`${base_url}auth/login`, userData);
    if (response.data?.jwt) {
      localStorage.setItem("customer", JSON.stringify(response.data?.user));
      return response.data;
    } else {
      alert("Sai thông tin tài khoản, vui lòng đăng nhập lại!");
    }
  } catch (error) {
    // Handle any exceptions that occurred during the registration process
    throw new Error(error.message);
  }
};

const logout = async () => {
  try {
    // Xóa dữ liệu đăng nhập từ lưu trữ trình duyệt
    localStorage.removeItem("customer");
    localStorage.removeItem("jwt");

    // Trả về thành công nếu không có lỗi xảy ra
    return;
  } catch (error) {
    // Xử lý các ngoại lệ xảy ra trong quá trình đăng xuất
    throw new Error(error.message);
  }
};

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


  const getNotifications=async()=>{
    try {
      const response = await axios.get(`${base_url}notifications`, config);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  
  }
  
  const getUnReadNotiCount=async()=>{
    try {
      const response = await axios.get(`${base_url}noitifications/unread`, config);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  
  }
  
  const setIsReadNoti=async(notiId)=>{
    try {
      const response = await axios.get(`${base_url}notifications/${notiId}/setIsRead`, config);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  const deleteANoti=async(notiId)=>{
    try {
      const response = await axios.delete(`${base_url}notifications/${notiId}/delete`, config);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  const deleteAllNoti=async()=>{
    try {
      const response = await axios.delete(`${base_url}notifications/deleteAll`, config);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
    
const authService = {
    showList,
    removeUser,
    updateUser,
    login,
    logout,
    getNotifications,
   deleteAllNoti,
  deleteANoti,
  setIsReadNoti,
 getUnReadNotiCount
};

export default authService;
