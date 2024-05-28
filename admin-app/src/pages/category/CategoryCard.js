import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./CategoryCard.css";

const CategoryCard = ({ categories, onDelete, onUpdate }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const categoriesPerPage = 10;
  const pagesVisited = pageNumber * categoriesPerPage;

  if (!Array.isArray(categories) || categories.length === 0) {
    return <div></div>;
  }

  const displayCategories = categories
    .slice(pagesVisited, pagesVisited + categoriesPerPage)
    .map((category) => (
      <tr key={category.id}>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(category.id)}
          >
            Delete
          </button>
          {/* <button
            className="btn btn-primary"
            onClick={() => onUpdate(category.id)}
            style={{ marginLeft: "10px" }}
          >
            Update
          </button> */}
        </td>
      </tr>
    ));

  // Calculate page count
  const pageCount = Math.ceil(categories.length / categoriesPerPage);

  // Handle page change
  const handlePageClick = (event) => {
    setPageNumber(event.selected);
  };

  return (
    <div style={{ width: 1000 }}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{displayCategories}</tbody>
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

export default CategoryCard;
