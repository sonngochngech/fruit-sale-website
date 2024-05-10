import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import "./ProductCard.css";

const ProductCard = ({ products, onViewDetail, onDelete, onEdit }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 10;
  const pagesVisited = pageNumber * productsPerPage;

  const displayProducts = products
   .slice(pagesVisited, pagesVisited + productsPerPage)
   .map((product) => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td className="name-location-column">
          <div className="d-flex align-items-center">
            <img
              src={product.image}
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
              <div>{product.origin}</div>
            </div>
          </div>
        </td>
        <td>{product.category}</td>
        <td>{product.price}</td>
        <td>{product.price}/5.0</td> {/*need fix*/}
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
    ));

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * productsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setPageNumber(event.selected);
  };

  return (
    <div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name / Export Location</th>
            <th>Category</th>
            <th>Price/Unit</th>
            <th>Rate</th>
            {/* <th>Unit</th>
            <th>Quantity</th> */}
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