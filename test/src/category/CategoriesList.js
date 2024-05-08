import React from 'react';
import '../App.css';

const CategoriesList = ({ categories, onDelete, onEdit }) => {
  return (
    <table className="category-table">
      <thead>
        <tr>
          <th style={{ backgroundColor: '#212529', color: 'white' }}>ID</th>
          <th style={{ backgroundColor: '#212529', color: 'white' }}>Name</th>
          <th style={{ backgroundColor: '#212529', color: 'white' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(category => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td className="category-actions">
              <button onClick={() => onEdit(category.id)}>Edit</button>
              <button onClick={() => onDelete(category.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoriesList;
