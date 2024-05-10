import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

// Lấy danh sách danh mục
const showList = async () => {
  try {
    const response = await axios.get(`${base_url}products/categories`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Thêm danh mục mới
const addCategory = async (newCategoryData) => {
  try {
    const response = await axios.post(`${base_url}products/categories`, newCategoryData, config);
    return response.data;
  } catch (error) {
    throw new Error(error.message); 
  }
};


// Xóa danh mục
const removeCategory = async (categoryId) => {
    try {
      const response = await axios.delete(`${base_url}products/categories/${categoryId}`);
      if (response.data.success) {
        return response.data.message; // Trả về thông báo thành công từ API
      } else {
        throw new Error(response.data.message); // Xử lý lỗi từ API
      }
    } catch (error) {
      throw new Error(error.message); // Xử lý các lỗi khác (ví dụ: lỗi mạng, lỗi không xác định)
    }
  }
  
  const updateCategory = async (categoryId, updatedCategoryData) => {
    try {
      const response = await axios.patch(`${base_url}products/categories/${categoryId}`, updatedCategoryData);
      return response.data; // Trả về thông tin danh mục đã được chỉnh sửa
    } catch (error) {
      throw new Error(error.message); // Xử lý các lỗi khác (ví dụ: lỗi mạng, lỗi không xác định)
    }
  };

const categoryService = {
    showList,
    addCategory,
    removeCategory,
    updateCategory
};

export default categoryService;
