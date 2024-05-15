import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../../features/products/productSlice";
import { fetchCategories } from "../../features/categories/categorySlice";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./CreateProductForm.css";

const CreateProductForm = ({ onClose }) => {
  const [newProduct, setNewProduct] = useState({
    code: "",
    title: "",
    description: "",
    amount: 0,
    price: 0,
    CategoryId: 0,
    files: []
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories?.categories || []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUploadImage = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setNewProduct((prevData) => ({ ...prevData, CategoryId: categoryId }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newProductData = {
        ...newProduct,
        files,
      };
      console.log(newProductData);
      const resultAction = await dispatch(addNewProduct(newProductData));
      console.log(resultAction);
      if (resultAction.type === "products/addNewProduct/fulfilled") {
        toast.success('Đơn hàng đã được tạo thành công!', {
          position: "top-center"
        });
        onClose();
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const categoryColors = ["red", "blue", "green"]; // Define more colors as needed

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="productName" className="col-sm-3 col-form-label">
              Product Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="productName"
                name="title"
                value={newProduct.title}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="category" className="col-sm-3 col-form-label">
              Category
            </label>
            <div className="col-sm-9">
              <div className="category-dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button">
                  {selectedCategory ? categories.categories.find(cat => cat.id === selectedCategory).name : "Select Category"}
                </button>
                <div className="category-dropdown-content">
                  {categories.categories.map((category, index) => (
                    <div
                      key={category.id}
                      className="category-option"
                      data-bg-color={categoryColors[index % categoryColors.length]}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      <input
                        type="radio"
                        id={`category-${category.id}`}
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={() => handleCategoryChange(category.id)}
                      />
                      <label htmlFor={`category-${category.id}`}>{category.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="pricePerUnit" className="col-sm-3 col-form-label">
              Price Per Unit
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="pricePerUnit"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                placeholder="Enter price per unit"
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="productAmount" className="col-sm-3 col-form-label">
              Amount
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="productAmount"
                name="amount"
                value={newProduct.amount}
                onChange={handleInputChange}
                placeholder="Enter product amount"
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="productCode" className="col-sm-3 col-form-label">
              Product Code
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="productCode"
                name="code"
                value={newProduct.code}
                onChange={handleInputChange}
                placeholder="Enter product code"
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="productImage" className="col-sm-3 col-form-label">
              Product Image
            </label>
            <div className="col-sm-9">
              <input
                type="file"
                className="form-control"
                id="productImage"
                name="image"
                multiple
                onChange={handleUploadImage}
              />
            </div>
          </div>
          {files.length > 0 && (
            <div className="form-group row">
              <label className="col-sm-3 col-form-label"></label>
              <div className="col-sm-9">
                {files.map((file, i) => (
                  <img 
                    key={i} 
                    src={URL.createObjectURL(file)} 
                    alt={`Preview of ${file.name}`} 
                    style={{ maxWidth: "100px", maxHeight: "100px", margin: "5px" }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows={3}
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
            />
          </div>

          <div className="text-center">
            <button className="btn btn-primary" type="submit">
              Create new
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateProductForm;
