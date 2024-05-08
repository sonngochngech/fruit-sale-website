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
    <div className="blog-card">
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
        <p className="date">{date}</p>
        <h5 className="title">{title}</h5>
        <p
          className="desc"
          dangerouslySetInnerHTML={{
            __html: showFullDescription? description: description?.substr(0, 5) + "...",
          }}
        ></p>
        <button type="button" className={showFullDescription?"btn btn-info":"btn btn-warning"} onClick={handleOnClick}>
          {showFullDescription?"Close":"Read more"}
          </button>
       
      </div>
    </div>
  );
};

export default NotificationCard;
