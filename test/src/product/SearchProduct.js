import React, { useState } from 'react';
import '../App.css'

const SearchProduct = ({ products, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setShowNoResultsMessage(false); // Ẩn thông báo khi người dùng nhập lại từ khóa tìm kiếm
  };

  const handleSearch = () => {
    // Lọc sản phẩm dựa trên từ khóa tìm kiếm
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredProducts.length === 0) {
      // Hiển thị thông báo khi không tìm thấy kết quả
      setShowNoResultsMessage(true);
      // Tự động ẩn thông báo sau 3 giây
      setTimeout(() => {
        setShowNoResultsMessage(false);
      }, 3000);
    }

    // Gọi hàm onSearch để truyền kết quả tìm kiếm ra ngoài
    onSearch(filteredProducts);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Gọi hàm tìm kiếm khi người dùng ấn phím "Enter"
    }
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        className="search-input"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Bắt sự kiện khi người dùng ấn phím
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
      {showNoResultsMessage && <div className="no-results-message">No results found.</div>}
    </div>
  );
};

export default SearchProduct;
