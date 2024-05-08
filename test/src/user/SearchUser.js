import React, { useState } from 'react';
import '../App.css'

const SearchUser = ({ users, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setShowNoResultsMessage(false); // Ẩn thông báo khi người dùng nhập lại từ khóa tìm kiếm
  };

  const handleSearch = () => {
    // Lọc người dùng dựa trên từ khóa tìm kiếm
    const filteredUsers = users.filter(user =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredUsers.length === 0) {
      // Hiển thị thông báo khi không tìm thấy kết quả
      setShowNoResultsMessage(true);
      // Tự động ẩn thông báo sau 3 giây
      setTimeout(() => {
        setShowNoResultsMessage(false);
      }, 3000);
    }

    // Gọi hàm onSearch để truyền kết quả tìm kiếm ra ngoài
    onSearch(filteredUsers);
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
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Bắt sự kiện khi người dùng ấn phím
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
      {showNoResultsMessage && <div className="no-results-message">No results found.</div>}
    </div>
  );
};

export default SearchUser;