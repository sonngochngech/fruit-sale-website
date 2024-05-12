import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import {base_url} from '../../utils/axiosConfig'

import "./ProductCard.css";

const ProductCard = ({ products, onViewDetail, onDelete, onEdit }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 10;
  const pagesVisited = pageNumber * productsPerPage;

  if (!Array.isArray(products) || products.length === 0) {
    return <div></div>;
  }
  
  const displayProducts = products
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((product) => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td className="name-location-column">
          <div className="d-flex align-items-center">
            <img
              src={base_url + product.FruitImages[0].link}
              alt={product.title}
              className="product-image"
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",
              }}
            />
            <div className="product-info">
              <div>{product.title}</div>
              <div>{product.Category.name}</div>
            </div>
          </div>
        </td>
        <td>{product.Category.name}</td>
        <td>{product.price}</td>
        <td>{product.rating}/5.0</td>
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
    ));

  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageClick = (data) => {
    setPageNumber(data.selected);
  };

  return (
    <div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name / Category</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rate</th>
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
    </div>
  );
};

export default ProductCard;
