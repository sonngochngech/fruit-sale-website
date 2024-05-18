import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import "./UserCard.css";

const UserCard = ({ users, onViewDetail, onDelete, onEdit }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users
   .slice(pagesVisited, pagesVisited + usersPerPage)
   .map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name.firstname} {user.name.lastname}</td>
        <td>
          <img
            src={user.profileImage}
            alt={`${user.name.firstname} ${user.name.lastname}`}
            className="user-profile-image"
          />
        </td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.role}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => onViewDetail(user.id)}
          >
            Details
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => onEdit(user.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(user.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(users.length / usersPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * usersPerPage) % users.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setPageNumber(event.selected);
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Profile Image</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{displayUsers}</tbody>
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

export default UserCard;
