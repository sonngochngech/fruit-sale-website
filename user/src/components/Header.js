
import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";
const { logoutUser, getNotifications, getUnreadNotificationCount } = require('../features/users/userSlice');




const Header = () => {
  const URL= "http://localhost:8081";
  const socket=io(URL,{autoConnect:true});
  socket.on('new notification',()=>{
    dispatch(getUnreadNotificationCount());

    setTimeout(() => {
      dispatch(getNotifications());
    }, 200);



  })

  useEffect(()=>{
    dispatch(getUnreadNotificationCount());
  },[])

  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartFruits);
  const authState = useSelector((state) => state.auth);
  const notificationState=useSelector((state)=>state?.auth?.unreadNotification);
  const [total, setTotal] = useState(null);
  const navigate = useNavigate();

  const [value, setValue] = useState('');
  const handleSearch = () => {
    // Navigate to the fruits page with the search query parameter
    navigate(`/fruits?title=${value}`);
  };

  useEffect(() => {
    let sum = 0;
    if (!cartState?.length) {
      setTotal(sum);
    } else {
      for (let index = 0; index < cartState?.length; index++) {
        sum =
          sum +
          Number(cartState[index]?.quantity) * Number(cartState[index]?.Fruit.price);
        setTotal(sum);
      }
    }
  
    
  },[cartState]);

  useEffect(()=>{
    console.log("hello",authState.user);
    if(authState.user.id!==null){
      socket.emit('authenticated',authState.user);
    }
  },[])

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
    window.location.reload();
  };

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">Banner-Title</p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+91 8264954234">
                  00000000000
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white">Fruit Store</Link>
              </h2>
            </div>
            <div className="col-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                  value={value}
                  onChange={(e) => setValue(e.target.value)} 
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" onClick={handleSearch} />
                </span>
              </div>
            </div>
            <div className="col-6">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/notification"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="images/compare.svg" alt="compare" />
                    <p className="mb-0">
                      Notification
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="images/wishlist.svg" alt="wishlist" />
                    <p className="mb-0">
                      Your <br /> cart
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/order"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="images/compare.svg" alt="order" />
                    <p className="mb-0">Order</p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : ""}
                    onClick={authState?.user !== null ? handleLogout : null}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="images/login01.svg" alt="user" />
                    {authState?.user === null ? (
                      <p className="mb-0">
                        Log in <br /> My Account
                      </p>
                    ) : (
                      <p className="mb-0">
                        Welcome {authState?.user?.firstName} <br /> Log out
                      </p>
                    )}
                  </Link>
                </div>
                <div>
                  <Link
                    to="#"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="images/cart.svg" alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {cartState?.length ? cartState?.length : 0}
                      </span>
                      <p className="mb-0">$ {total ? total : 0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
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
                           { notificationState?.notificationCount}
                          </span>
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      
                        
                      <img src="images/notifications.svg"  width="20" height="20" alt="" />
                      <span className="me-5 d-inline-block">
                       Notification
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"

                    >
                       {notificationState?.unreadNotification?.map((item, index) => (
                          <li key={index} className="list-group-item bg-dark">
                            <Link className="text-white">
                              {item?.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div> 
             
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-30">
                    <NavLink to="/fruits">Our Store</NavLink>
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
