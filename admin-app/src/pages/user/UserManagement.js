import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../features/users/userSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  console.log(users);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = users.filter((user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId))
    .then(() => {
      dispatch(fetchUsers()); // Sau khi xóa người dùng, tải lại danh sách người dùng từ server
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
  };

  return (
    <div className="user-management">
      <h2>Users</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserCard
        users={filteredUsers}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UserManagement;
