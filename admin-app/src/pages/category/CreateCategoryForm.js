import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewCategory } from "../../features/categories/categorySlice";
import Modal from "react-bootstrap/Modal";

const CreateCategoryForm = ({ onClose }) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCategory((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addNewCategory(newCategory));
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new category</Modal.Title>
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
                value={newCategory.name}
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

export default CreateCategoryForm;
