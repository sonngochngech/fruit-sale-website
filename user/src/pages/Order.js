import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch } from "react-redux";
import { getAnUserOrders,cancelOrder } from "../features/users/userSlice";
import { useSelector } from "react-redux";
import moment from "moment";

const Order = () => {

  const orderState = useSelector((state) => state?.auth?.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    getUserOderFromDb();
   
  }, []);

  const getUserOderFromDb = () => {
    dispatch(getAnUserOrders());
  };

  const setDate = (day) => {
    const date = new Date(day);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  };


  

  const handleCancelOrder=(id)=>{
    dispatch(cancelOrder(id));

    setTimeout(() => {
      dispatch(getAnUserOrders());
    }, 200);

  

  }

  return (
    <>
      <Meta title={"Orders"} />
      <BreadCrumb title="Orders" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div>
          <h3 className="mb-4 title">Orders</h3>
          <div className="container table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Shipping Info</th>
                  <th scope="col">Order Items</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orderState &&
                  orderState?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div>
                            <p>Address: {item?.address}</p>
                            <p>City: {item?.phoneNo}</p>
                            <p>Ordered Day: {moment(item?.createdAt).format(
                                "MMMM Do YYYY, h:mm a"
                              )}
                            </p>
                          </div>
                        </td>
                        <td>
                          {item.Fruits.map((fruit, index) => {
                            return (
                              <div key={index}>
                                <p>Fruit: {fruit?.title}</p>
                                <p>{fruit?.isDeleted===1 && '(The fruit is no longer)'}</p>
                                <img
                                  src={"http://localhost:8081/" + fruit?.FruitImages[0]?.link}
                                  width={50}
                                />
                                <p>Quantity: {fruit?.OrderItem?.amount}</p>
                                <p>Price: {fruit?.price}</p>
                              
                              </div>
                            );
                          })}
                        </td>
                        <td>{item?.productCost}</td>
                        <td>
                          <div>
                            <p>{item?.status}</p>
                            { (item.status ==='Request'|| item?.status==='Accept')&& 
                            <button className="btn btn-warning" onClick={()=>handleCancelOrder(item.id)}>Cancel</button>
                            }
                         
                          </div>
                          
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Order;
