import React from 'react';
import { useHistory } from 'react-router-dom';

const UserDetailPage = ({ user }) => {
//   const history = useHistory();

//   const handleGoBack = () => {
//     history.goBack(); // Sử dụng hàm goBack() của đối tượng history để điều hướng trở về trang trước đó
//   };

  return (
    <div className="user-detail">
      <h2>User Detail</h2>
      <div>
        <strong>Full Name:</strong> {user.fullName}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Role:</strong> {user.role}
      </div>
      {/* Thêm các thông tin khác của người dùng nếu cần */}
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default UserDetailPage;
