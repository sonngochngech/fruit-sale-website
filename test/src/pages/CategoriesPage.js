import React, { useState } from 'react';
import SearchCategories from '../category/SearchCategory';
import CreateNewCategory from '../category/CreateNewCategory';
import EditCategoryForm from '../category/EditCategoryForm';
import CategoriesList from '../category/CategoriesList';

const CategoriesPage = () => {
  // Dữ liệu mẫu cho các danh mục
  const initialCategories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    // Thêm dữ liệu danh mục khác ở đây nếu cần
  ];

  // State để lưu trữ danh sách các danh mục
  const [categories, setCategories] = useState(initialCategories);
  const [searchCategories, setSearchCategories] = useState([]);

  // State để quản lý hiển thị form tạo mới danh mục
  const [isCreating, setIsCreating] = useState(false);

  // State để quản lý hiển thị biểu mẫu sửa và sửa danh mục
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Hàm xử lý tìm kiếm
  const handleSearch = (searchResults) => {
    setSearchCategories(searchResults);
  };

  // Hàm xử lý tạo danh mục mới
  const handleCreate = (newCategory) => {
    setCategories([...categories, newCategory]);
    setIsCreating(false); // Ẩn form sau khi tạo thành công
  };

  // Hàm xử lý xóa danh mục
  const handleDelete = (categoryId) => {
    const updatedCategories = categories.filter(category => category.id !== categoryId);
    setCategories(updatedCategories);
  };

  // Hàm xử lý khi click vào nút chỉnh sửa
  const handleEdit = (categoryId) => {
    const categoryToEdit = categories.find(category => category.id === categoryId);
    setEditingCategory(categoryToEdit);
    setIsEditing(true);
  };

  return (
    <div>
      <h2>Categories Page</h2>
      <SearchCategories categories={categories} onSearch={handleSearch} />
      <button onClick={() => setIsCreating(true)}>Create New Category</button>
      {isCreating && (
        <CreateNewCategory
          onCreate={handleCreate}
          onCancel={() => setIsCreating(false)}
          categories={categories}
        />
      )}
      <CategoriesList
        categories={searchCategories.length == 0 ? categories : searchCategories}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {isEditing && (
        <EditCategoryForm
          category={editingCategory}
          onSubmit={(updatedCategory) => {
            const updatedCategories = categories.map(category => {
              if (category.id === updatedCategory.id) {
                return updatedCategory;
              }
              return category;
            });
            setCategories(updatedCategories);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
