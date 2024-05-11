import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import "./CategoryCard.css";

const CategoryCard = ({ categories, onDelete, onEdit }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const categoriesPerPage = 10;
  const pagesVisited = pageNumber * categoriesPerPage;

  // Kiểm tra nếu categories không phải là mảng hoặc categories.rỗng
  if (!Array.isArray(categories?.categories) || categories.categories.length === 0) {
    return <div></div>;
  }

  // Lấy danh sách các categories trên trang hiện tại
  const displayCategories = categories.categories
    .slice(pagesVisited, pagesVisited + categoriesPerPage)
    .map((category) => (
      <tr key={category.id}>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td>
          <button
            className="btn btn-secondary"
            onClick={() => onEdit(category.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(category.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  // Tính số trang
  const pageCount = Math.ceil(categories.categories.length / categoriesPerPage);

  // Xử lý sự kiện chuyển trang
  const handlePageClick = (event) => {
    setPageNumber(event.selected);
  };

  return (
    <div>
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
