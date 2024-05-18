import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import UpdateProductForm from "./UpdateProductForm";
import CreateProductForm from "./CreateProductForm";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  fetchProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
} from "../../features/products/productSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.products);
  const [showCreateProductForm, setShowCreateProductForm] = useState(false);
  const [showUpdateProductForm, setShowUpdateProductForm] = useState(false);
  const [updateProductData, setUpdateProductData] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(products)
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = (products.fruits).filter((product) => {
      return product.title.toLowerCase().includes(event.target.value.toLowerCase())
    }
    );
    setFilteredProducts(filtered);
    if (filtered.length === 0) {
      // Show toast notification
      toast.warn("No products found with this search term.");
    }
  };
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

  const handleUpdate = (productId) => {
    const productToUpdate = products.fruits.find((product) => product.id === productId);
    setUpdateProductData(productToUpdate);
    setShowUpdateProductForm(true);
  };

  const handleCloseUpdateProductForm = () => {
    setShowUpdateProductForm(false);
    setUpdateProductData(null);
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId))
      .then(() => {
        dispatch(fetchProducts())
        // setFilteredProducts(updatedProducts);
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div className="product-management">
      <h2>Products</h2>
      <ToastContainer />
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by product name"
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
            onClick={handleCreateProductClick}
            className="btn btn-primary"
          >
            Create New Product
          </button>
        </div>
      </div>

      {showCreateProductForm && (
        <div className="product-create-form">
          <CreateProductForm
            onCreate={handleCreateProduct}
            onClose={handleCloseCreateProductForm}
          />
        </div>
      )}
      {showUpdateProductForm && (
        <div className="product-edit-form">
          <UpdateProductForm
            productToUpdate={updateProductData}
            onClose={handleCloseUpdateProductForm}
          />
        </div>
      )}
      <ProductCard
        products={filteredProducts.length > 0 ? filteredProducts : products.fruits}
        onViewDetail={handleViewDetail}
        onEdit={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ProductManagement;
