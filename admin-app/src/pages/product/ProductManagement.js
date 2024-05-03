import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from 'react-redux';
import EditProductForm from "./EditProductForm";
import CreateProductForm from "./CreateProductForm";
import { fetchProducts, addNewProduct, updateProduct, deleteProduct } from "../../features/products/productSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products); 
  console.log(products)
  const [showCreateProductForm, setShowCreateProductForm] = useState(false);
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const [editProduct, setEditProductLocal] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCreateProductClick = () => {
    setShowCreateProductForm(true);
  };

  const handleCloseCreateProductForm = () => {
    setShowCreateProductForm(false);
  };

  const handleCreateProduct = (productData) => {
    dispatch(addNewProduct(productData));
    setShowCreateProductForm(false);
  };

  const handleViewDetail = (productData) => {
    // Handle view detail action
  };

  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    dispatch(updateProduct(productToEdit));
    setEditProductLocal(productToEdit);
    setShowEditProductForm(true);
  };

  const handleCloseEditProductForm = () => {
    setShowEditProductForm(false);
    setEditProductLocal(null);
  };

  const handleDelete = (productId) => {
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
            productToEdit={editProduct}
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
