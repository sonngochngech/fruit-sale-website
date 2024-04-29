import React, { useState } from "react"; // Import the useState hook
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, setEditProduct } from '../../redux/actions'; // Import the createProduct action creator
import EditProductForm from "./EditProductForm";
import CreateProductForm from "./CreateProductForm";

const ProductManagement = () => {
  const products = useSelector((state) => state.products); // Get products from store state
  const [showCreateProductForm, setShowCreateProductForm] = useState(false);
  const [showEditProductForm, setShowEditProductForm] = useState(false); // Define state for showing the edit product form
  const [editProduct, setEditProductLocal] = useState(null); // Define state for storing the product to edit
  const dispatch = useDispatch();
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

  const handleViewDetail = (productData) => {
    // Handle view detail action
  };

  const handleEdit = (productId) => {
    // Tìm sản phẩm cần chỉnh sửa từ danh sách sản phẩm
    const productToEdit = products.find((product) => product.id === productId);
    // Dispatch action với thông tin sản phẩm cần chỉnh sửa
    dispatch(setEditProduct(productToEdit));
    console.log(productToEdit)
    // Hiển thị form chỉnh sửa sản phẩm
    setShowEditProductForm(true);
  };

  const handleCloseEditProductForm = () => {
    setShowEditProductForm(false);
    setEditProductLocal(null); // Reset the edit product state
  };

  const handleDelete = (productId) => {
    // Handle delete action
    dispatch(deleteProduct(productId));
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
      {showEditProductForm && (
        <div className="product-edit-form">
          <EditProductForm
            productToEdit={editProduct} // Pass the product to edit to the EditProductForm component
            onClose={handleCloseEditProductForm}
          />
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
