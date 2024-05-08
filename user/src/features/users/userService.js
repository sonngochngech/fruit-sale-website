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


const getUserOrder = async () => {
  try {
    const response = await axios.get(`${base_url}orders/getUserOrderList`, config);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const addToCart = async (cartData) => {
  const response = await axios.post(`${base_url}carts/add`, cartData, config);
  if (response.data) {
    return response.data;
  }
};

const createAnOrder = async (orderData) => {
  const response = await axios.post(
    `${base_url}orders/create`,
    orderData,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getCart = async () => {
  const response = await axios.get(`${base_url}carts`, config);

  if (response.data) {
    return response.data;
  }
};
const removeFruitFromCart = async (fruitId) => {
  const response = await axios.delete(
    `${base_url}carts/remove?fruitId=${fruitId}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const updateFruitFromCart = async (cartDetail) => {
  const response = await axios.put(
    `${base_url}carts/update`,
    cartDetail,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const cancelOrder=async(id)=>{
  const response=await axios.put(
    `${base_url}orders/${id}/changeStatus`,{
      status:'Cancel'
    },
    config
  );
  if (response.data) {
    return response.data;
  }
}

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
  logout,
  addToCart,
  getCart,
  removeFruitFromCart,
  updateFruitFromCart,
  createAnOrder,
  cancelOrder,
  logout,
  getUserOrder,
  getNotifications,
  deleteAllNoti,
  deleteANoti,
  setIsReadNoti,
 getUnReadNotiCount



};
