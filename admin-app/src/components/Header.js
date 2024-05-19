import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { base_domain } from '../utils/axiosConfig';
const { logoutUser, getNotifications, getUnreadNotificationCount } = require('../features/users/userSlice');

const Header = () => {

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.users);
  const notificationState=useSelector((state)=>state?.users?.unreadNotification);
  const [total, setTotal] = useState(null);
  const navigate = useNavigate();
  const URL= 'https://fruit-sale-react-application.onrender.com/';
  const socket=io(URL,{autoConnect:true});
  socket.on('new notification',()=>{
    dispatch(getUnreadNotificationCount())
    .finally(()=>{
      dispatch(getNotifications());
    });
  })

  useEffect(()=>{
    dispatch(getUnreadNotificationCount());
  },[])

  

  useEffect(()=>{
    console.log("hello",userState.users);
    if(userState.users.id!==null){
      socket.emit('authenticated',userState.users);
    }
  },[])

  const handleClick = () => {
    // Navigate to the notification page
    navigate('/notifications');
  };

  return (
    <>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <span
                      style={{ top: "-10px", left: "2px" }}
                      className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                    >
                      {notificationState?.notificationCount}
                    </span>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {notificationState?.unreadNotification?.map((item, index) => (
                        <li key={index} className="list-group-item bg-dark" onClick={handleClick}>
                          <NavLink
                            to="/notifications"
                            className="fs-4 fw-bold"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {item?.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
