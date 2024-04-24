import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/actions"; // Import the createProduct action creator
import { Form, Button, Modal } from "react-bootstrap";

const CreateProductForm = ({ onClose }) => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    origin: "",
    images: [], // Array to store image URLs
    pricePerUnit: 0,
    unit: "",
    quantity: 0,
    description: "",
  });
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    // Consider using a library like FileReader for more robust image handling
    // This example just creates a temporary URL for preview
    const files = event.target.files;
    if (files) {
      const imageUrls = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageUrls.push(e.target.result);
          setProductData((prevState) => ({
            ...prevState,
            images: [...prevState.images, ...imageUrls],
          }));
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createProduct(productData)); // Dispatch the createProduct action
    setProductData({
      name: "",
      category: "",
      origin: "",
      images: [],
      pricePerUnit: 0,
      unit: "",
      quantity: 0,
      description: "",
    });
    onClose(); // Close the modal after submitting the form
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Input fields for product data */}
          <Form.Group controlId="productName" className="row">
            <Form.Label column sm="3">
              Product Name
            </Form.Label>
            <div className="col-sm-9">
              <Form.Control
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>
          </Form.Group>

          <Form.Group controlId="category" className="row">
            <Form.Label column sm="3">
              Category
            </Form.Label>
            <div className="col-sm-9">
              <Form.Select
                name="category"
                value={productData.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                <option value="fruit">Fruit</option>
                <option value="water">Water</option>
                {/* Add more options as needed */}
              </Form.Select>
            </div>
          </Form.Group>

          <Form.Group controlId="origin" className="row">
            <Form.Label column sm="3">
              Origin
            </Form.Label>
            <div className="col-sm-9">
              <Form.Control
                type="text"
                name="origin"
                value={productData.origin}
                onChange={handleInputChange}
                placeholder="Enter product origin"
              />
            </div>
          </Form.Group>

          <Form.Group controlId="images">
            <Form.Label>Images</Form.Label>
            <Form.Control type="file" multiple onChange={handleImageUpload} />
            {/* Display uploaded image previews */}
            {productData.images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Image ${index}`}
                style={{ maxWidth: "100px", maxHeight: "100px", margin: "5px" }}
              />
            ))}
          </Form.Group>

          <Form.Group controlId="pricePerUnit" className="row">
            <Form.Label column sm="3">
              Price Per Unit
            </Form.Label>
            <div className="col-sm-9">
              <Form.Control
                type="number"
                name="pricePerUnit"
                value={productData.pricePerUnit}
                onChange={handleInputChange}
                placeholder="Enter price per unit"
                required
              />
            </div>
          </Form.Group>

          <Form.Group controlId="unit" className="row">
            <Form.Label column sm="3">
              Unit
            </Form.Label>
            <div className="col-sm-9">
              <Form.Select
                name="unit"
                value={productData.unit}
                onChange={handleInputChange}
              >
                <option value="">Select Unit</option>
                <option value="pcs">Pieces</option>
                {/* Add more options as needed */}
              </Form.Select>
            </div>
          </Form.Group>

          <Form.Group controlId="quantity" className="row">
            <Form.Label column sm="3">
              Quantity
            </Form.Label>
            <div className="col-sm-9">
              <Form.Control
                type="number"
                name="quantity"
                value={productData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                required
              />
            </div>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Create Product
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateProductForm;
