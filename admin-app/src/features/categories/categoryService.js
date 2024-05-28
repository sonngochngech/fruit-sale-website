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
    console.log(response.data)
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
        return response.data.message; 
      } else {
        throw new Error(response.data.message); 
      }
    } catch (error) {
      throw new Error(error.message); 
    }
};

// Cập nhật danh mục
const updateCategory = async (categoryData) => {
  try {
    const response = await axios.delete(`${base_url}categories/${categoryData.id}/update`, {"name":categoryData.name}, config);
    if (response.data.success) {
      return response.data; 
      throw new Error(response.data.message); 
    }
  } catch (error) {
    throw new Error(error.message); 
  }
};

const categoryService = {
    showList,
    addCategory,
    removeCategory,
    updateCategory
};

export default categoryService;
