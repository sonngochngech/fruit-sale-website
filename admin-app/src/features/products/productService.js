import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

// Lấy danh sách sản phẩm
const showList = async () => {
  try {
    const response = await axios.get(`${base_url}fruits`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${base_url}fruits/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Thêm sản phẩm mới cùng với hình ảnh
const addProduct = async (newProductData) => {
  try {
    console.log(newProductData.CategoryId);

    const formData = new FormData();
    formData.append('title', newProductData.title);
    formData.append('description', newProductData.description);
    formData.append('amount', newProductData.amount);
    formData.append('price', newProductData.price);
    formData.append('CategoryId', newProductData.CategoryId);
    formData.append('code', newProductData.code);

    newProductData.files.forEach(file => {
      formData.append('files', file);
    });

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await axios.post(`${base_url}fruits/create`, formData, config);
    return response.data;
  } catch (error) {
    throw new Error(error.message); 
  }
};

// Xóa sản phẩm
const removeProduct = async (productId) => {
    try {
      const response = await axios.delete(`${base_url}fruits/${productId}/delete`, config);
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
      const response = await axios.put(`${base_url}fruits/${productId}/updateInf`, updatedProductData, config);
      return response.data; // Trả về thông tin sản phẩm đã được chỉnh sửa
    } catch (error) {
      throw new Error(error.message); // Xử lý các lỗi khác (ví dụ: lỗi mạng, lỗi không xác định)
    }
  };

const productService = {
    showList,
    getProduct,
    addProduct,
    removeProduct,
    updateProduct,
};

export default productService;
