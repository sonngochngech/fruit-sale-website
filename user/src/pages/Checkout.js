import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { createUserOrder, getUserCart } from "../features/users/userSlice";
import { base_domain, base_domain_client } from "../utils/axiosConfig";

const phoneRegex = /^0\d{9}$/;

const shippingSchema = yup.object({
  address: yup.string().required("Address is required"),
  phoneNo: yup.string().matches(phoneRegex,"Phone Number is not valid").required('phone number is required'),
  email: yup.string().nullable().email('Email should be valid').required('Email is required'),
});

const Checkout = () => {
  const dispatch = useDispatch();
  
  
  const preOrderState = useSelector((state) => {
    return state?.auth.preOrder;
  });
  const [totalAmount, setTotalAmount] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
  console.log(preOrderState);
    let sum = 0;
    for (let index = 0; index < preOrderState?.length; index++) {
      sum = sum + Number(preOrderState[index].amount * preOrderState[index].Fruit.price);
      setTotalAmount(sum);
    }
  }, [preOrderState]);

  const formik = useFormik({
    initialValues: {
      address:"",
      phoneNo:"",
      email:""
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      uploadOrder(values);
    },
  });

  const uploadOrder = (shippingInfo) => {
    dispatch(
      createUserOrder({
        title:"Normal",
        phoneNo: shippingInfo?.phoneNo,
        address: shippingInfo?.address,
        email: shippingInfo?.email,
        fruitIds: preOrderState?.map((preOrder)=>{return {FruitId: preOrder?.FruitId,
          amount: preOrder?.amount}}),
        productCost: totalAmount,
        shippingCost: 5,

    
      })
    );
    setTimeout(() => {
      navigate("/fruits");
    }, 2000);
  };

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Sale website</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/preOrder">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                01, Dai Co Viet, Hai Ba Trung, Ha Noi
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="phoneNo"
                    className="form-control"
                    name="phoneNo"
                    value={formik.values.phoneNo}
                    onChange={formik.handleChange("phoneNo")}
                    onBlur={formik.handleBlur("phoneNo")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.phoneNo && formik.errors.phoneNo}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to Shipping
                    </Link>
                    <button className="button" type="submit">
                      Buy now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {preOrderState &&
                preOrderState?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex gap-10 mb-2 align-align-items-center"
                    >
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.amount}
                          </span>
                          <img
                            className="img-fluid"
                            width={100}
                            height={100}
                            src={base_domain+ item?.Fruit?.FruitImages[0]?.link}
                            onError={(e) => { e.target.src = `${base_domain_client}logo.png`; }} 
                            alt="fruit"
                          />
                        </div>
                        <div>
                          <h5 className="total-price">
                            {item?.Fruit?.title}
                          </h5>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">
                          {item?.Fruit?.price * item?.amount}$
                        </h5>
                      </div>
                    </div>
                  );
                })}
              
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">
                  $ {totalAmount ? totalAmount : "0"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$ 5</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                $ {totalAmount ? totalAmount + 5 : "0"}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  
  );
};

export default Checkout;
