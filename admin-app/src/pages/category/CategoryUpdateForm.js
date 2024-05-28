import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import AlertMessage from "./AlertMessage"; // Import component AlertMessage
import { updateCategory } from "../../features/categories/categorySlice";
import { toast } from "react-toastify";

const CategoryUpdateForm = ({ onClose, category }) => {
  const [updatedCategory, setUpdatedCategory] = useState({
    id: category.id,
    name: category.name,
  });
  const [showAlert, setShowAlert] = useState(false); // State to display alert

  const dispatch = useDispatch();

  useEffect(() => {
    setUpdatedCategory(category);
  }, [category]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedCategory((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(updateCategory(updatedCategory));
      onClose();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAlert && <AlertMessage message="Category already exists" />} {/* Display alert */}
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
          <div className="text-center">
            <button className="btn btn-primary" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CategoryUpdateForm;
