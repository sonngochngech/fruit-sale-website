import React, { useState } from 'react';
import UserList from '../user/UserList';
import SearchUser from '../user/SearchUser';

const UsersPage = () => {
  const initialUsers = [
    { id: 1, fullName: 'John Doe', email: 'john@example.com', role: 'user' },
    { id: 2, fullName: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
    { id: 3, fullName: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
    // Thêm dữ liệu người dùng khác ở đây nếu cần
  ];

  const [users, setUsers] = useState(initialUsers);
  const [searchedUsers, setSearchedUsers] = useState([]);

  
  // Hàm xử lý xóa người dùng
  const handleDeleteUser = (userId) => {
    // Filter ra danh sách người dùng mới không chứa người dùng có userId tương ứng
    const updatedUsers = users.filter(user => user.id !== userId);
    // Cập nhật state với danh sách người dùng mới
    setUsers(updatedUsers);
  };
  
  const handleSearch = (searchResults) => {
    setSearchedUsers(searchResults);
  };

  return (
    <div className="container">
      <h2>Users Page</h2>
      <SearchUser users={users} onSearch={handleSearch} />
      <UserList users={searchedUsers.length == 0 ? users : searchedUsers} onDelete={handleDeleteUser} />
    </div>
  );
};

export default UsersPage;
