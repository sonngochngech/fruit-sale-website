import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setEditProduct } from "../../redux/actions"; // Import the editProduct action creator
import Modal from "react-bootstrap/Modal";

const EditProductForm = ({ onClose, productToEdit }) => {
  const [editedProduct, setEditedProduct] = useState(productToEdit || {});
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const imageUrls = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageUrls.push(e.target.result);
          setEditedProduct((prevData) => ({
            ...prevData,
            images: [...(prevData.images || []), ...imageUrls],
          }));
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setEditProduct(editedProduct)); // Dispatch the editProduct action
    onClose(); // Close the modal after submitting the form
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* Input fields for product data */}
          <div className="form-group row">
            <label htmlFor="productName" className="col-sm-3 col-form-label">
              Product Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="productName"
                name="name"
                value={editedProduct.name}
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
                value={editedProduct.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                <option value="fruit">Fruit</option>
                <option value="water">Water</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="origin" className="col-sm-3 col-form-label">
              Origin
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="origin"
                name="origin"
                value={editedProduct.origin}
                onChange={handleInputChange}
                placeholder="Enter product origin"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="images">Images</label>
            <input type="file" multiple onChange={handleImageUpload} />
            {editedProduct.images && editedProduct.images.length > 0 && (
              <div className="d-flex flex-wrap mt-2">
                {editedProduct.images.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Image ${index}`}
                    style={{ maxWidth: "100px", maxHeight: "100px", margin: "5px" }}
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
      name="pricePerUnit"
      value={editedProduct.pricePerUnit}
      onChange={handleInputChange}
      placeholder="Enter price per unit"
      required
    />
  </div>
</div>

<div className="form-group row">
  <label htmlFor="unit" className="col-sm-3 col-form-label">
    Unit
  </label>
  <div className="col-sm-9">
    <select
      className="form-control"
      id="unit"
      name="unit"
      value={editedProduct.unit}
      onChange={handleInputChange}
    >
      <option value="">Select Unit</option>
      <option value="pcs">Pieces</option>
      <option value="kg">Kilograms</option>
      <option value="l">Liters</option>
      {/* Add more options as needed */}
    </select>
  </div>
</div>

<div className="form-group row">
  <label htmlFor="quantity" className="col-sm-3 col-form-label">
    Quantity
  </label>
  <div className="col-sm-9">
    <input
      type="number"
      className="form-control"
      id="quantity"
      name="quantity"
      value={editedProduct.quantity}
      onChange={handleInputChange}
      placeholder="Enter quantity"
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
    value={editedProduct.description}
    onChange={handleInputChange}
    placeholder="Enter product description"
  />
</div>

<div className="text-center">
  <button variant="primary" type="submit">
    Save Changes
  </button>
</div>
</form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductForm;
