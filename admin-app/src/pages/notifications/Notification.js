import React, { useEffect } from "react";
import NotificationCard from "./NotificationCard";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../features/users/userSlice";
import moment from "moment";
import Dialog from "./Dialog";

const Notification = () => {
  const dispatch = useDispatch();
  const notificationState = useSelector((state) => state?.users?.notifications);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);
  console.log(notificationState)

  return (
    <>
      <div className="notification-management">
        <h2>Notifications</h2>
        <Container class1="blog-wrapper home-wrapper-2 py-5">
          <div className="row">
            {notificationState?.length === 0 ? (<div>Have no notifications now</div>) : (
              <div className="col-2">
                <Dialog />
              </div>
            )}
            <div className="col-9">
              <div className="row">
                {(notificationState || []).map((item, index) => {
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
      </div>
    </>
  );
};

export default Notification;
