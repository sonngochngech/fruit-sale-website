// components/userManagement/UserManagement.js
import React from 'react';
import UserCard from './UserCard'; // Import UserCard for individual user display

const UserManagement = () => {
  const users = [ // Replace with data fetching logic (API call or Redux state)
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'admin', isActive:true },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'user', isActive:false },
  ];

  return (
    <UserCard users={users}/>
  );
};

export default UserManagement;
