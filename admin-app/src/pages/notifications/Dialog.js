import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteAllNoti ,getNotifications} from '../../features/users/userSlice';

function Dialog() {
    const dispatch=useDispatch();

  const handleConfirm=()=>{
    dispatch(deleteAllNoti())
    .finally(()=>{
      dispatch(getNotifications())
    });
    setShow(false);

  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow= () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete All
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete all notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete all notification</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Dialog;