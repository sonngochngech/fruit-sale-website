// components/userManagement/UserCard.js
import React from 'react';

const UserCard = ({ user }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
    </tr>
  );
};

export default UserCard;
