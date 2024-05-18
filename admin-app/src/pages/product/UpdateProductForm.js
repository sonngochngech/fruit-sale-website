import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../features/products/productSlice";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { fetchProducts } from "../../features/products/productSlice";

// Tạo schema để xác thực dữ liệu
const schema = Yup.object().shape({
  title: Yup.string().required("Product name is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .positive()
    .required(),
  quantity: Yup.number()
    .positive()
    .required(),
});

const UpdateProductForm = ({ onClose, productToUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState(productToUpdate);
  const [errors, setErrors] = useState({}); // State để lưu trữ các lỗi
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories?.categories);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUploadImage = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      console.error("No files selected");
      return;
    }
  
    const formData = new FormData();
    try {
      for (let i = 0; i < files.length; i++) {
        formData.append(`image`, files[i]);
      }
      setUpdatedProduct((prevData) => ({
        ...prevData,
        files: formData,
      }));
    } catch (error) {
      console.error("Error creating FormData:", error);
    }
  };

  const getCategoryNameById = (categoryId) => {
    const category = categories.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "";
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setUpdatedProduct((prevData) => ({ ...prevData, CategoryId: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Kiểm tra dữ liệu trước khi gửi lên server
      await schema.validate(updatedProduct, { abortEarly: false });
      await dispatch(updateProduct({ productId: updatedProduct.id, updatedProductData: updatedProduct }));
      dispatch(fetchProducts());
      onClose();
    } catch (error) {
      // Xử lý lỗi và hiển thị thông báo
      if (error.inner) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="productName" className="col-sm-3 col-form-label">
              Product Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="productName"
                name="title"
                value={updatedProduct.title}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="category" className="col-sm-3 col-form-label">
              Category
            </label>
            <div className="col-sm-9">
              <select
                className="form-control"
                id="category"
                name="category"
                value={updatedProduct.CategoryId}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {categories.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="pricePerUnit" className="col-sm-3 col-form-label">
              Price Per Unit
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="pricePerUnit"
                name="price"
                value={updatedProduct.price}
                onChange={handleInputChange}
                placeholder="Enter price per unit"
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="productAmount" className="col-sm-3 col-form-label">
              Amount
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="productAmount"
                name="amount"
                value={updatedProduct.amount}
                onChange={handleInputChange}
                placeholder="Enter product amount"
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="productImage" className="col-sm-3 col-form-label">
              Product Image
            </label>
            <div className="col-sm-9">
              <input
                type="file"
                className="form-control"
                id="productImage"
                name="image"
                multiple
                onChange={handleUploadImage}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows={3}
              name="description"
              value={updatedProduct.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
            />
          </div>

          <div className="text-center">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProductForm;
