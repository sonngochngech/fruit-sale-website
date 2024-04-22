import React, { useState } from 'react';
import './CreateNewCategory.css';

const CreateNewCategory = ({ onCreate, onCancel, categories }) => {
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setNewCategory(e.target.value);
    setError(''); // Reset error message when input changes
  };

  const handleCreate = () => {
    // Kiểm tra nếu tên danh mục không rỗng
    if (newCategory.trim() !== '') {
      // Kiểm tra xem tên danh mục đã tồn tại trong danh sách hay chưa
      const isDuplicate = categories.some(category => category.name.toLowerCase() === newCategory.toLowerCase());
      if (isDuplicate) {
        setError('Category name \"' + newCategory + '\" already exists.');
      } else {
        // Lấy id lớn nhất hiện tại và tăng lên 1
        const maxId = Math.max(...categories.map(category => category.id));
        const newId = maxId + 1;
        
        // Tạo đối tượng mới đại diện cho danh mục và gọi hàm onCreate
        onCreate({ id: newId, name: newCategory.trim() });
        // Đặt lại giá trị của newCategory về rỗng sau khi đã tạo mới danh mục thành công
        setNewCategory('');
      }
    } else {
      setError('Please enter a category name.'); // Thông báo khi tên danh mục trống
    }
  };

  return (
    <div className="create-new-category-modal">
      <div className="create-new-category-content">
        <h3>Create New Category</h3>
        <input 
          type="text" 
          placeholder="New category name..."
          value={newCategory}
          onChange={handleChange}
        />
         {error && <div className="error-message" style={{ color: 'red', marginBottom:'5px' }}>{error}</div>}
        <div>
          <button onClick={handleCreate}>Create</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewCategory;
