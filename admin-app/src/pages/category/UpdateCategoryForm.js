import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../features/categories/categorySlice";
import * as Yup from "yup";

// Tạo schema để xác thực dữ liệu
const schema = Yup.object().shape({
  name: Yup.string().required("Category name is required"),
});

const UpdateCategoryForm = ({ onClose, categoryToUpdate }) => {
  const [updatedCategory, setUpdatedCategory] = useState(categoryToUpdate);
  const [errors, setErrors] = useState({}); // State để lưu trữ các lỗi

  const dispatch = useDispatch();
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedCategory((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Kiểm tra dữ liệu trước khi gửi lên server
      await schema.validate(updatedCategory, { abortEarly: false });
      // Gửi yêu cầu cập nhật danh mục lên server
      dispatch(updateCategory(updatedCategory));
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
        <Modal.Title>Update Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="categoryName" className="col-sm-3 col-form-label">
              Category Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="categoryName"
                name="name"
                value={updatedCategory.name}
                onChange={handleInputChange}
                placeholder="Enter category name"
                required
              />
            </div>
          </div>
          <button variant="primary" type="submit">
            Save Changes
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateCategoryForm;
