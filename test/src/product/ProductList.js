import React from "react";
import "./ProductList.css";

const ProductList = ({ products, onViewDetail, onDelete, onEdit }) => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name / Export Location</th>
          <th>Price/Unit</th>
          <th>Unit</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td className="name-location-column">
              <div>
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-name">{product.name} 
              <span className="export-location"><br />{product.origin}</span></div>
            </td>
            <td>{product.pricePerUnit}</td>
            <td>{product.unit}</td>
            <td>{product.quantity}</td>
            <td>
                <button onClick={() => onViewDetail(product.id)}>Details</button>
              <button onClick={() => onEdit(product.id)}>Edit</button>
              <button onClick={() => onDelete(product.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
