import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../features/products/productSlice";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { fetchProducts } from "../../features/products/productSlice";

// Tạo schema để xác thực dữ liệu
const schema = Yup.object().shape({
  title: Yup.string().required("Product name is required"),
  // category: Yup.string().required("Category is required"),
  price: Yup.number()
    .positive()
    .required(),
  amount: Yup.number()
    .positive()
    .required(),
});

const ProductDetailForm = ({ onClose, product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [errors, setErrors] = useState({}); // State để lưu trữ các lỗi
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories?.categories);

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct((prevData) => ({ ...prevData, [name]: value }));
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
      await dispatch(fetchProducts());
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
      console.error("Error updating product:", error);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
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
            {errors.title && <span className="text-danger">{errors.title}</span>}
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

          <div className="form-group">
            <label htmlFor="pricePerUnit">Price Per Unit</label>
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
            {errors.price && <span className="text-danger">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="productAmount">Amount</label>
            <input
              type="number"
              className="form-control"
              id="productAmount"
              name="amount"
              value={updatedProduct.amount} // Sửa đổi này
              onChange={handleInputChange}
              placeholder="Enter product amount"
              required
            />
            {errors.amount && <span className="text-danger">{errors.amount}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="productCode">Product Code</label>
            <input
              type="text"
              className="form-control"
              id="productCode"
              name="code"
              value={updatedProduct.code}
              onChange={handleInputChange}
              placeholder="Enter product code"
              required
            />
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

export default ProductDetailForm;
