import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

// Lấy danh sách sản phẩm
const showList = async () => {
  try {
    const response = await axios.get(`${base_url}fruits`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Thêm sản phẩm mới
const addProduct = async (newProductData) => {
  try {
    console.log(newProductData);
    const response = await axios.post(`${base_url}fruits/create`, newProductData, config);
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
      const response = await axios.patch(`${base_url}fruits/${productId}`, updatedProductData, config);
      return response.data; // Trả về thông tin sản phẩm đã được chỉnh sửa
    } catch (error) {
      throw new Error(error.message); // Xử lý các lỗi khác (ví dụ: lỗi mạng, lỗi không xác định)
    }
  };

// Thêm hình ảnh cho sản phẩm
const addImage = async (productId, files) => {
  try {
    const url = `${base_url}fruits/${productId}/add-image`;
    const responses = [];
    const config = {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("jwt")
        }`,
        'Content-Type': 'multipart/form-data',
      },
    };
    // Duyệt qua từng file trong FileList
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      // Thực hiện request upload hình ảnh
      console.log(formData.get('file'));
      const response = await axios.post(url, formData, config);
      console.log(response.data);
      
      // Kiểm tra kết quả của request upload hình ảnh
      if (response.data.success) {
        responses.push(response.data); // Thêm kết quả vào mảng responses
      } else {
        throw new Error(response.data.message); // Ném lỗi nếu không thành công
      }
    }

    // Trả về mảng các response thành công
    console.log(responses);
    return responses;
  } catch (error) {
    throw new Error(error.message); // Xử lý lỗi nếu cần
  }
};

const productService = {
    showList,
    addProduct,
    removeProduct,
    updateProduct,
    addImage
};

export default productService;
