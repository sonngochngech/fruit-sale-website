import React, { useState, useRef } from 'react';

const EditCategoryForm = ({ category, onSubmit, onCancel }) => {
  const [id, setId] = useState(category.id);
  const [name, setName] = useState(category.name);
  const [icon, setIcon] = useState(category.icon);
  const [file, setFile] = useState(null);
  const iconRef = useRef(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleIconChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedCategory = {
      id,
      name,
      icon: file || category.icon, // Use uploaded icon if available, otherwise fallback to original
    };
    onSubmit(updatedCategory);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className='edit-category-form'>
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='id'>ID:</label>
        <input type='number' id='id' value={id} disabled />

        <label htmlFor='name'>Tên Category:</label>
        <input type='text' id='name' value={name} onChange={handleNameChange} />

        <label htmlFor='icon'>Ảnh đại diện (25x25):</label>
        <input type='file' id='icon' accept='image/*' onChange={handleIconChange} />
        {file && <img src={file} alt='Category Icon' width={25} height={25} ref={iconRef} />}

        <div className='button-container'>
          <button type='button' onClick={handleCancel}>Hủy</button>
          <button type='submit'>Lưu</button>
        </div>
      </form>
    </div>
  );
};

export default EditCategoryForm;
