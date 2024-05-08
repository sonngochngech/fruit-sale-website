import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../features/products/productSlice";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (event) => {
    // Xử lý upload ảnh
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Kiểm tra dữ liệu trước khi gửi lên server
      await schema.validate(updatedProduct, { abortEarly: false });
      dispatch(updateProduct({ productId: updatedProduct.id, updatedProductData: updatedProduct }));
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
          {/* Input fields for product data */}
          {/* Input fields for product data */}
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
                value={updatedProduct.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                <option value="fruit">Fruit</option>
                <option value="water">Water</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>

          {/* <div className="form-group row">
            <label htmlFor="origin" className="col-sm-3 col-form-label">
              Origin
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="origin"
                name="origin"
                value={editedProduct.origin}
                onChange={handleInputChange}
                placeholder="Enter product origin"
              />
            </div>
          </div> */}

          <div className="form-group">
            <label htmlFor="images">Images</label>
            <input type="file" multiple onChange={handleImageUpload} />
            {updatedProduct.images && updatedProduct.images.length > 0 && (
              <div className="d-flex flex-wrap mt-2">
                {updatedProduct.images.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Image ${index}`}
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      margin: "5px",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="form-group row">
            <label htmlFor="pricePerUnit" className="col-sm-3 col-form-label">
              Price Per Unit
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={updatedProduct.price}
                onChange={handleInputChange}
                placeholder="Enter price per unit"
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="unit" className="col-sm-3 col-form-label">
              Unit
            </label>
            <div className="col-sm-9">
              <select
                className="form-control"
                id="unit"
                name="unit"
                value={updatedProduct.unit}
                onChange={handleInputChange}
              >
                <option value="">Select Unit</option>
                <option value="pcs">Pieces</option>
                <option value="kg">Kilograms</option>
                <option value="l">Liters</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="quantity" className="col-sm-3 col-form-label">
              Quantity
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={updatedProduct.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                required
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
          <button variant="primary" type="submit">
            Save Changes
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProductForm;
