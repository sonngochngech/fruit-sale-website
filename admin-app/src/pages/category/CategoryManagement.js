import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import CreateCategoryForm from "./CreateCategoryForm";
import CategoryUpdateForm from "./CategoryUpdateForm"; // Import the update form
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  fetchCategories,
  addNewCategory,
  deleteCategory,
} from "../../features/categories/categorySlice";
import { Skeleton, Box, Typography, Grid, Container } from '@mui/material';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories?.categories);
  const [showCreateCategoryForm, setShowCreateCategoryForm] = useState(false);
  const [showUpdateCategoryForm, setShowUpdateCategoryForm] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = (categories?.categories || []).filter((category) =>
      category.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCategories(filtered);
    if (filtered.length === 0) {
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
        toast.warning('Deleted Successfully');
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const handleUpdateCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowUpdateCategoryForm(true);
  };

  const handleCloseUpdateCategoryForm = () => {
    setShowUpdateCategoryForm(false);
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <div className="categories-management">
        <h2>Categories</h2>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Skeleton variant="rectangular" width={450} height={40} />
              </Box>
            </Grid>
            <Grid item xs={12} md={3} sx={{ justifyContent: 'end', alignItems: 'center' }}>
              <Skeleton variant="rectangular" width={190} height={53} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={1050} height={64} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={1050} height={400} />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }

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
      {showUpdateCategoryForm && selectedCategory && (
        <div className="category-update-form">
          <CategoryUpdateForm
            category={selectedCategory}
            onClose={handleCloseUpdateCategoryForm}
          />
        </div>
      )}
      <CategoryCard 
        categories={filteredCategories.length > 0 ? filteredCategories : categories?.categories || [] } 
        onDelete={handleDelete}
        onUpdate={handleUpdateCategoryClick} // Pass the update handler to CategoryCard
      />
    </div>
  );
};

export default CategoryManagement;
