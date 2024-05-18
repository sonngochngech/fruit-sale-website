import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { updateOrder } from "../../features/orders/orderSlice";

const schema = Yup.object().shape({
  code: Yup.string().required("Order code is required"),
  phone: Yup.string().required("Phone number is required"),
  // Add validation for other fields as needed
});

const UpdateOrderForm = ({ onClose, orderToUpdate }) => {
  const [updatedOrder, setUpdatedOrder] = useState(orderToUpdate);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedOrder((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await schema.validate(updatedOrder, { abortEarly: false });
      dispatch(updateOrder({ orderId: updatedOrder.id, updatedOrderData: updatedOrder }));
      onClose();
    } catch (error) {
      if (error.inner) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="code">Order Code</label>
            <input
              type="text"
              className="form-control"
              id="code"
              name="code"
              value={updatedOrder.code}
              onChange={handleInputChange}
              placeholder="Enter order code"
              required
            />
            {errors.code && <div className="text-danger">{errors.code}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={updatedOrder.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              required
            />
            {errors.phone && <div className="text-danger">{errors.phone}</div>}
          </div>

          {/* Add input fields for other order data */}

          <button className="btn btn-primary" type="submit">
            Save Changes
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateOrderForm;
