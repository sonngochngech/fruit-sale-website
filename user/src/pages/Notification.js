import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import NotificationCard from "../components/NotificationCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications} from "../features/users/userSlice";
import moment from "moment";
import Dialog from "../components/Dialog";

const Notification = () => {
  const dispatch = useDispatch();
  const notificationState = useSelector((state) => state?.auth?.notifications);
  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  // const getNotifications = () => {
  //   dispatch(getNotifications());
  // };

  return (
    <>
      <Meta title={"Notifications"} />
      <BreadCrumb title="Notifications" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
       
        <div className="row">
          <div className="col-2">
               <Dialog/>
          </div>
          <div className="col-9">
            <div className="row">
              {(notificationState || [])?.map((item, index) => {
                return (
                  <div className="col-6 mb-3" key={index}>
                    <NotificationCard
                      id={item?.id}
                      title={item?.title}
                      description={item?.description}
                      date={moment(item?.createdAt).format(
                        "MMMM Do YYYY, h:mm a"
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Notification;
