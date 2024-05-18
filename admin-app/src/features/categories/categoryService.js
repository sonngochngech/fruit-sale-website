import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

// Lấy danh sách danh mục
const showList = async () => {
  try {
    const response = await axios.get(`${base_url}categories`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Thêm danh mục mới
const addCategory = async (newCategoryData) => {
  try {
    const response = await axios.post(`${base_url}categories/create`, newCategoryData, config);
    return response.data;
  } catch (error) {
    throw new Error(error.message); 
  }
};

// Xóa danh mục
const removeCategory = async (categoryId) => {
    try {
      const response = await axios.delete(`${base_url}categories/${categoryId}/delete`, config);
      if (response.data.success) {
        return response.data.message; // Trả về thông báo thành công từ API
      } else {
        throw new Error(response.data.message); // Xử lý lỗi từ API
      }
    } catch (error) {
      throw new Error(error.message); // Xử lý các lỗi khác (ví dụ: lỗi mạng, lỗi không xác định)
    }
};

const categoryService = {
    showList,
    addCategory,
    removeCategory
};

export default categoryService;
