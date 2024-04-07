import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const register = async (userData) => {
  try {
    const response = await axios.post(`${base_url}auth/register`, userData);
    if (response.data) {
      if (response.data) {
        localStorage.setItem("customer", JSON.stringify(response.data?.user));
        localStorage.setItem("jwt",response.data?.jwt);
      }
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

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

export const authService = {
  register,
  login,
  logout
};
