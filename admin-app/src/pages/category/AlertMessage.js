import React from "react";

const AlertMessage = ({ message }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  );
};

export default AlertMessage;
