import React from "react";
import "./ProductList.css";

const ProductList = ({ products, onViewDetail, onDelete, onEdit }) => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th style={{backgroundColor:'#212529', color:'white'}}>ID</th>
          <th style={{backgroundColor:'#212529', color:'white'}}>Name / Export Location</th>
          <th style={{backgroundColor:'#212529', color:'white'}}>Price/Unit</th>
          <th style={{backgroundColor:'#212529', color:'white'}}>Unit</th>
          <th style={{backgroundColor:'#212529', color:'white'}}>Quantity</th>
          <th style={{backgroundColor:'#212529', color:'white'}}>Action</th>
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
