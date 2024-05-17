import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../features/products/productSlice";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { fetchProducts } from "../../features/products/productSlice";
import { Button, TextField, MenuItem, FormControl, IconButton, Select, Typography, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Tạo schema để xác thực dữ liệu
const schema = Yup.object().shape({
  title: Yup.string().required("Product name is required"),
  price: Yup.number().positive().required(),
  amount: Yup.number().positive().required(),
});

const ProductDetailForm = ({ onClose, product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [errors, setErrors] = useState({}); // State để lưu trữ các lỗi
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories?.categories);

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setUpdatedProduct((prevData) => ({ ...prevData, CategoryId: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Kiểm tra dữ liệu trước khi gửi lên server
      await schema.validate(updatedProduct, { abortEarly: false });
      await dispatch(updateProduct({ productId: updatedProduct.id, updatedProductData: updatedProduct }));
      await dispatch(fetchProducts());
      onClose();
    } catch (error) {
      // Xử lý lỗi và hiển thị thông báo
      if (error.inner) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
      console.error("Error updating product:", error);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detail Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Product Name
              </Typography>
              <TextField
                fullWidth
                id="productName"
                name="title"
                value={updatedProduct.title}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Category
              </Typography>
              <FormControl fullWidth>
                <Select
                  labelId="category-label"
                  id="category"
                  value={updatedProduct.CategoryId}
                  onChange={handleCategoryChange}
                  required
                >
                  <MenuItem value="">Select Category</MenuItem>
                  {categories.categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Product Code
              </Typography>
              <TextField
                fullWidth
                type="text"
                id="productCode"
                name="code"
                value={updatedProduct.code}
                onChange={handleInputChange}
                placeholder="Enter product code"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Amount
              </Typography>
              <TextField
                fullWidth
                type="number"
                id="productAmount"
                name="amount"
                value={updatedProduct.amount}
                onChange={handleInputChange}
                placeholder="Enter product amount"
                required
                error={!!errors.amount}
                helperText={errors.amount}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Price Per Unit
              </Typography>
              <TextField
                fullWidth
                type="number"
                id="pricePerUnit"
                name="price"
                value={updatedProduct.price}
                onChange={handleInputChange}
                placeholder="Enter price per unit"
                required
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                id="description"
                name="description"
                value={updatedProduct.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
              />
            </Grid>
            
            <Grid item xs={12} container alignItems="center">
              <Grid item xs={6}>
                <input
                  type="file"
                  id="imageUpload"
                  name="image"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="imageUpload">
                  <IconButton component="span">
                    <AddPhotoAlternateIcon />
                  </IconButton>
                </label>
              </Grid>
              <Grid item xs={6}>
                {newImage && (
                  <Box>
                    <img src={URL.createObjectURL(newImage)} alt="Uploaded" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                    <button onClick={handleAddImage}>Add Image</button>
                  </Box>
                )}
              </Grid>
            </Grid>

            <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductDetailForm;
