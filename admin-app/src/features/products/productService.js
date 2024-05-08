import axios from "axios";
import { base_url } from "../../utils/request";

// Lấy danh sách sản phẩm
const showList = async () => {
  try {
    const response = await axios.get(`${base_url}products`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Thêm sản phẩm mới
const addProduct = async (newProductData) => {
  try {
    const response = await axios.post(`${base_url}products`, newProductData);
    return response.data;
  } catch (error) {
    throw new Error(error.message); 
  }
};


// Xóa sản phẩm
const removeProduct = async (productId) => {
    try {
      const response = await axios.delete(`${base_url}products/${productId}`);
      if (response.data.success) {
        return response.data.message; // Trả về thông báo thành công từ API
      } else {
        throw new Error(response.data.message); // Xử lý lỗi từ API
      }
    } catch (error) {
      throw new Error(error.message); // Xử lý các lỗi khác (ví dụ: lỗi mạng, lỗi không xác định)
    }
  }
  
  const updateProduct = async (productId, updatedProductData) => {
    try {
      const response = await axios.patch(`${base_url}products/${productId}`, updatedProductData);
      return response.data; // Trả về thông tin sản phẩm đã được chỉnh sửa
    } catch (error) {
      throw new Error(error.message); // Xử lý các lỗi khác (ví dụ: lỗi mạng, lỗi không xác định)
    }
  };

const productService = {
    showList,
    addProduct,
    removeProduct,
    updateProduct
};

export default productService;
