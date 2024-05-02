import React from "react";

const ProductCard = ({ products, onViewDetail, onDelete, onEdit }) => {
  return (
    <table className="table table-striped">
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
        { products && products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td className="name-location-column">
              <div className="d-flex align-items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                  style={{ width: "30px", height: "30px", marginRight: "10px" }}
                />
                <div className="product-info">
                  <div>{product.title}</div>
                  <div>{product.origin}</div>
                </div>
              </div>
            </td>

            <td>{product.price}</td>
            {/* <td>{product.unit}</td> */}
            {/* <td>{product.quantity}</td> */}
            <td>
              <button
                className="btn btn-primary"
                onClick={() => onViewDetail(product.id)}
              >
                Details
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => onEdit(product.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductCard;
