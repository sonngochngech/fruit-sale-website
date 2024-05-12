import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import CreateCategoryForm from "./CreateCategoryForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  fetchCategories,
  addNewCategory,
  deleteCategory,
} from "../../features/categories/categorySlice";

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories?.categories);
  const [showCreateCategoryForm, setShowCreateCategoryForm] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = categories.categories.filter((category) =>
      category.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCategories(filtered);
    if (filtered.length === 0) {
      // Show toast notification
      toast.warn("No categories found with this search term.");
    }
  };

  const handleCreateCategoryClick = () => {
    setShowCreateCategoryForm(true);
  };

  const handleCloseCreateCategoryForm = () => {
    setShowCreateCategoryForm(false);
  };

  const handleCreateCategory = (categoryData) => {
    dispatch(addNewCategory(categoryData))
      .then(() => {
        dispatch(fetchCategories());
        setShowCreateCategoryForm(false);
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      });
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
      <ToastContainer />
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
      <CategoryCard 
        categories={filteredCategories.length > 0 ? filteredCategories : categories.categories } 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default CategoryManagement;
