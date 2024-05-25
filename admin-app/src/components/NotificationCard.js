import React, { useState } from "react";
import { Link } from "react-router-dom";
import wish from '../images/wish.svg';
import addcart from '../images/add-cart.svg';
import trash from '../images/trash.svg';
import { deleteAllNoti, deleteANoti,getNotifications, setIsReadNoti } from "../features/users/userSlice";
import { useDispatch } from "react-redux";

const NotificationCard = (props) => {
  const dispatch=useDispatch();
  const { id, title, description, date } = props;
  const [isRead,setIsRead]=useState(0);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleOnClick=()=>{
    setShowFullDescription(!showFullDescription);
    if(isRead===0){
      dispatch(setIsReadNoti(id));
      setIsRead(1);
    }
   

  }
  const deleteNoti=()=>{
    dispatch(deleteANoti(id));
    setTimeout(() => {
      dispatch(getNotifications());
    }, 200);
   
  }
  return (
    <div className="blog-card" style={{
      width: '400px',
      height: '300px',
      overflow: 'hidden',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      padding: '20px'
    }}>
      <div className="card-image">
      </div>
      <div className="blog-content product-card position-relative">
        <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0 bg-transparent" onClick={deleteNoti}>
                    <img src={trash} alt="trash" />
                  </button>
                </div>
        </div>
        <p className="date" style={{
          fontSize: '14px',
          color: '#666'
        }}>{date}</p>
        <h5 className="title" style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>{title}</h5>
        <p
          className="desc"
          style={{
            fontSize: '16px',
            color: '#333',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
          dangerouslySetInnerHTML={{
            __html: showFullDescription? description: description?.substr(0, 5) + "...",
          }}
        ></p>
        <button type="button" className={showFullDescription?"btn btn-info":"btn btn-warning"} onClick={handleOnClick} style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px'
        }}>
          {showFullDescription?"Close":"Read more"}
          </button>
       
      </div>
    </div>
  );
};

export default NotificationCard;