import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../../features/products/productSlice";
import { fetchCategories } from "../../features/categories/categorySlice"; // Import selector
import Modal from "react-bootstrap/Modal";

const CreateProductForm = ({ onClose }) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    amount: 0,
    price: 0,
    rating: 0,
    peopleRated: 0,
    category: "",
    images: [],
  });
  
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories?.categories.categories);

  useEffect(() => {
    // Dispatch action to fetch categories when component mounts
    dispatch(fetchCategories());
  }, [dispatch]); // This effect runs only once when the component mounts

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const imageUrls = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageUrls.push(e.target.result);
          setNewProduct((prevData) => ({
            ...prevData,
            images: [...prevData.images, e.target.result],
          }));
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="images">Images</label>
            <input type="file" multiple onChange={handleImageUpload} />
            {newProduct.images && newProduct.images.length > 0 && (
              <div className="d-flex flex-wrap mt-2">
                {newProduct.images.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Image ${index}`}
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      margin: "5px",
                    }}
                  />
                ))}
              </div>
            )}
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
              Save Changes
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateProductForm;
