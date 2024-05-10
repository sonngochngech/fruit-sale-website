import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import "./OrderCard.css";

const OrderCard = ({ orders, onViewDetail, onDelete, onEdit }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const ordersPerPage = 10;
  const pagesVisited = pageNumber * ordersPerPage;

  const displayOrders = orders
    .slice(pagesVisited, pagesVisited + ordersPerPage)
    .map((order) => (
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.code}</td>
        <td>{order.phone}</td>
        <td>{order.title}</td>
        <td>{order.email}</td>
        <td>{order.address}</td>
        <td>{order.status}</td>
        <td>{order.productCost}</td>
        <td>{order.shippingCost}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => onViewDetail(order.id)}
          >
            Details
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => onEdit(order.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(order.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(orders.length / ordersPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Phone</th>
            <th>Title</th>
            <th>Email</th>
            <th>Address</th>
            <th>Status</th>
            <th>Product Cost</th>
            <th>Shipping Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{displayOrders}</tbody>
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

export default OrderCard;
