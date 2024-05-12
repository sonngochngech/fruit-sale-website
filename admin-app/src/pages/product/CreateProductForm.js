import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../../features/products/productSlice";
import { fetchCategories } from "../../features/categories/categorySlice";
import Modal from "react-bootstrap/Modal";

const CreateProductForm = ({ onClose }) => {
  const [newProduct, setNewProduct] = useState({
    code: "",
    title: "",
    description: "",
    amount: 0,
    price: 0,
    CategoryId: "", 
    files: []
  });

  const [selectedCategory, setSelectedCategory] = useState(""); // For category selection
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories?.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUploadImage = () => {
    const formData = new FormData();
    newProduct.files.forEach((file, i) => formData.append(`file-${i}`, file, file.name)); 
    setNewProduct((prevData) => ({
      ...prevData,
      files: formData
    }));
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedCategory(value);
    setNewProduct((prevData) => ({ ...prevData, CategoryId: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newProduct);
    dispatch(addNewProduct(newProduct));
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              <select
                className="form-control"
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select Category</option>
                {categories.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
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
                name="image" // Use a descriptive name like "image"
                multiple // Allow selecting multiple images (optional)
                onChange={handleUploadImage}
              />
            </div>
            {newProduct.files.length > 0 && (
            <div className="form-group row">
              <label className="col-sm-3 col-form-label"></label>
              <div className="col-sm-9">
                {Array.from(newProduct.files).map((file, i) => (
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
          </div>


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
