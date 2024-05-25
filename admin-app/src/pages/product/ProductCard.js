import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import { base_domain, base_domain_client } from "../../utils/axiosConfig";
import "./ProductCard.css";
import ProductDetailForm from "./ProductDetailForm";

const ProductCard = ({ products, onDelete }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsPerPage = 10;
  const pagesVisited = pageNumber * productsPerPage;

  if (!Array.isArray(products) || products.length === 0) {
    return <div></div>;
  }
  console.log(products);

  const displayProducts = products
    ?.slice(pagesVisited, pagesVisited + productsPerPage)
    ?.map((product) => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>
          <div className="d-flex align-items-center">
            {product.FruitImages.slice(0, 2).map((image, index) => (
              <img
                key={index}
                src={base_domain + image.link}
                alt={`Product ${index}`}
                className="product-image"
                onError={(e) => { e.target.src = `${base_domain_client}banner.jpg`; }} 
              />
            ))}
          </div>
        </td>
        <td>{product.title}</td>
        <td>{product.code}</td>
        <td>{product.Category?.name}</td>
        <td>${product.price}</td>
        <td>{product.amount}</td>
        <td>
          <button
            className="btn btn-secondary action-button"
            onClick={() => {
              setSelectedProduct(product);
              setShowDetail(true);
            }}
          >
            Details
          </button>
          <button
            className="btn btn-danger action-button"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageClick = (data) => {
    setPageNumber(data.selected);
  };

  return (
    <div className="table-container" style={{ width: 1000 }}>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Code</th>
            <th>Category</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{displayProducts}</tbody>
      </table>

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />

      {showDetail && (
        <div className="overlay">
          <div className="modal-container">
            <button className="close-btn" onClick={() => setShowDetail(false)}>
              &times;
            </button>
            <ProductDetailForm
              onClose={() => setShowDetail(false)}
              newProduct={selectedProduct}
              product={selectedProduct}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
