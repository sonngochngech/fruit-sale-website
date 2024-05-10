import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import UpdateCategoryForm from "./UpdateCategoryForm";
import CreateCategoryForm from "./CreateCategoryForm";
import {
  fetchCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
} from "../../features/categories/categorySlice";

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [showCreateCategoryForm, setShowCreateCategoryForm] = useState(false);
  const [showUpdateCategoryForm, setShowUpdateCategoryForm] = useState(false);
  const [updateCategoryData, setUpdateCategoryData] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
    console.log(categories)
  }, [dispatch]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleCreateCategoryClick = () => {
    setShowCreateCategoryForm(true);
  };

  const handleCloseCreateCategoryForm = () => {
    setShowCreateCategoryForm(false);
  };

  const handleCreateCategory = (categoryData) => {
    dispatch(addNewCategory(categoryData));
    setShowCreateCategoryForm(false);
  };

  const handleUpdate = (categoryId) => {
    const categoryToUpdate = categories.find((category) => category.id === categoryId);
    setUpdateCategoryData(categoryToUpdate);
    setShowUpdateCategoryForm(true);
  };

  const handleCloseUpdateCategoryForm = () => {
    setShowUpdateCategoryForm(false);
    setUpdateCategoryData(null);
  };

  const handleDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId))
    .then(() => {
      dispatch(fetchCategories());
    })
    .catch((error) => {
      console.error("Error deleting category:", error);
    });
  };

  return (
    <div className="category-management">
      <h2>Categories</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by category name"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <button
            onClick={handleCreateCategoryClick}
            className="btn btn-primary"
          >
            Create New Category
          </button>
        </div>
      </div>

      {showCreateCategoryForm && (
        <div className="category-create-form">
          <CreateCategoryForm
            onCreate={handleCreateCategory}
            onClose={handleCloseCreateCategoryForm}
          />
        </div>
      )}
      {showUpdateCategoryForm && (
        <div className="category-edit-form">
          <UpdateCategoryForm
            categoryToUpdate={updateCategoryData}
            onClose={handleCloseUpdateCategoryForm}
          />
        </div>
      )}
      <CategoryCard
        categories={filteredCategories}
        onEdit={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CategoryManagement;
