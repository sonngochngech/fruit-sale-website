// components/userManagement/UserManagement.js
import React from 'react';
import UserCard from './UserCard'; // Import UserCard for individual user display

const UserManagement = () => {
  const users = [ // Replace with data fetching logic (API call or Redux state)
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'admin' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'user' },
  ];

  return (
    <div className="user-management">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
