import React, { useState } from "react";
import "./CreateNewProduct.css";

const CreateNewProduct = ({ products, onCreate, onCancel })  => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    origin: "",
    image: "",
    quantity: "",
    unit: "",
    pricePerUnit: "",
  });
  const [error, setError] = useState("");
  const [isCustomOrigin, setIsCustomOrigin] = useState(false); // State để xác định lựa chọn người dùng nhập lựa chọn tùy chỉnh

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
    setError(""); // Reset error message when input changes
  };

  const handleToggleCustomOrigin = () => {
    setIsCustomOrigin(!isCustomOrigin); // Đảo ngược giá trị của isCustomOrigin khi người dùng click
    setNewProduct({
      ...newProduct,
      origin: "", // Reset origin khi chuyển giữa toggle lựa chọn
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Lấy tệp tin hình ảnh từ sự kiện
    const reader = new FileReader(); // Tạo một đối tượng FileReader để đọc dữ liệu của tệp tin
  
    // Xử lý khi đọc xong tệp tin
    reader.onloadend = () => {
      // Lấy dữ liệu của hình ảnh dưới dạng base64
      const imageData = reader.result;
      // Lưu dữ liệu hình ảnh vào state newProduct
      setNewProduct({
        ...newProduct,
        image: imageData
      });
    };
  
    // Đọc tệp tin hình ảnh dưới dạng base64
    reader.readAsDataURL(file);
  };
  

  const handleCreate = () => {
    // Kiểm tra tên sản phẩm đã tồn tại trong hệ thống hay chưa
    const isDuplicate = products.some(
      (product) => product.name.toLowerCase() === newProduct.name.toLowerCase()
    );
    if (isDuplicate) {
      setError("Product name already exists.");
      return;
    }

    // Kiểm tra các trường thông tin
    const { name, origin, image, quantity, unit, pricePerUnit } = newProduct;
    const missing = [];
    if (name.trim() === "") missing.push("Product Name");
    if (origin.trim() === "") missing.push("Export Origin");
    if (image.trim() === "") missing.push("Image");
    if (quantity.trim() === "") missing.push("Quantity");
    if (unit.trim() === "") missing.push("Unit");
    if (pricePerUnit.trim() === "") missing.push("Price per Unit");

    if (missing.length > 0) {
      // Nếu có trường thiếu thông tin, hiển thị thông báo lỗi và danh sách trường thiếu
      setError(`Please fill in the following fields: ${missing.join(", ")}`);
    } else {
      // Nếu không có trường thiếu thông tin và tên sản phẩm không trùng, tạo sản phẩm mới
      onCreate({
        id: Math.floor(Math.random() * 1000), // Generate random id
        ...newProduct,
      });
      // Reset các giá trị và thông báo lỗi
      setNewProduct({
        name: "",
        origin: "",
        image: "",
        quantity: "",
        unit: "",
        pricePerUnit: "",
      });
      setError("");
    }
  };

  return (
    <div className="create-new-product-modal">
      <div className="create-new-product-content">
        <h3>Create New Product</h3>
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="origin">Export Origin:</label>
          <select
            id="origin"
            name="origin"
            value={newProduct.origin}
            onChange={handleChange}
          >
            <option value="">Select origin</option>
            <option value="USA">USA</option>
            <option value="VN">VN</option>
            <option value="JP">JP</option>
            <option value="CN">CN</option>
            <option value="UK">UK</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageUpload}
            accept="image/*"
          />
        </div>
        {/* Các input fields khác */}
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={newProduct.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
          />
        </div>
        <div className="form-group">
          <label htmlFor="unit">Unit:</label>
          <input
            type="text"
            id="unit"
            name="unit"
            value={newProduct.unit}
            onChange={handleChange}
            placeholder="Enter unit"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pricePerUnit">Price per Unit:</label>
          <input
            type="text"
            id="pricePerUnit"
            name="pricePerUnit"
            value={newProduct.pricePerUnit}
            onChange={handleChange}
            placeholder="Enter price per unit"
          />
        </div>
        {error && (
          <div className="error-message" style={{ color: "red" }}>
            {error}
          </div>
        )}
        <div className="button-group">
          <button onClick={handleCreate}>Create</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewProduct;
