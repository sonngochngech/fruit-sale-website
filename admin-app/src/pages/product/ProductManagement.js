import React, { useState } from "react"; // Import the useState hook
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../redux/actions'; // Import the createProduct action creator

import CreateProductForm from "./CreateProductForm";

const ProductManagement = () => {
  const [showCreateProductForm, setShowCreateProductForm] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products); // Get products from store state

  const handleCreateProductClick = () => {
    setShowCreateProductForm(true);
  };

  const handleCloseCreateProductForm = () => {
    setShowCreateProductForm(false);
  };

  const handleCreateProduct = (productData) => {
    dispatch(createProduct(productData)); // Dispatch the createProduct action with productData
    setShowCreateProductForm(false); // Close the create product form after creating the product
  };

  const handleViewDetail = (productId) => {
    // Handle view detail action
    console.log(`Viewing detail of product with ID ${productId}`);
  };

  const handleEdit = (productId) => {
    // Handle edit action
    console.log(`Editing product with ID ${productId}`);
  };

  const handleDelete = (productId) => {
    // Handle delete action
    console.log(`Deleting product with ID ${productId}`);
  };

  return (
    <div className="product-management">
      <h2>Products</h2>
      <button onClick={handleCreateProductClick}>Create New Product</button>
      {showCreateProductForm && (
        <div className="product-create-form">
          <CreateProductForm onCreate={handleCreateProduct} onClose={handleCloseCreateProductForm} />
        </div>
      )}
      <ProductCard
        products={products}
        onViewDetail={handleViewDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ProductManagement;
