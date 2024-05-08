import React from 'react';
import '../App.css'

const UserList = ({ users, onDelete, onViewDetail }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th style={{backgroundColor:'#212529', color:'white'}}>Full Name</th>
          <th style={{backgroundColor:'#212529', color:'white'}}>Email</th>
          <th style={{backgroundColor:'#212529', color:'white'}}>Role</th>
          <th style={{backgroundColor:'#212529', color:'white'}}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td className="user-actions">
              <button onClick={() => onViewDetail(user.id)}>View Detail</button>
              <button onClick={() => onDelete(user.id)}>Delete</button>
              {/* Add more action buttons here if needed */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
