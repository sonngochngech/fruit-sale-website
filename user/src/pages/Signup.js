import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from 'react-router-dom';
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {registerUser } from "../features/users/userSlice";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { base_url } from "../utils/axiosConfig";
import { useSelector } from 'react-redux';
import axios from 'axios';
import TimeCounter from "../components/TimeCounter";
const signUpSchema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().default("").required("Last name is required"),
  email: yup
    .string()
    .nullable()
    .email("Email should be valid")
    .required("Email is required"),
  mobile: yup.string().required("Mobile No is require"),
  password: yup.string().required("Password is required"),
  token: yup.string().required("Token is required")
});

const Signup = () => {
  const [counter,setCounter]=useState(false);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
      token:""
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values))
        .unwrap()
        .then(() => {
          navigate('/');
          window.location.reload();
        })
        .catch((error) => {
          console.log('Login error:', error);
        });
    },
  });


const sendVerifyCode= async(email)=>{
  setCounter((prevCounter) => !prevCounter);

  try {
    const tokenData={
       email: email,
       type:"REGISTER"
    }
    const response = await axios.post(`${base_url}auth/requestToken`, tokenData);
    console.log(response);
  }catch(error){
    console.log(error);
  }

  setTimeout(() => {
    setCounter((prevCounter) => !prevCounter);
  }, 100000);

}


  return (
    <>
      {/* <Meta title={"Sign Up"} /> */}
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div> 
                <CustomInput
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div> 
                
                <InputGroup>
                <div style={{width: "70%"}} > 
                 <CustomInput 
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />

                 </div>
                 <div style={{width: "5%"}} >

                 </div>
                

                <div style={{width: "25%"}}>
                    <Button variant="light"    onClick={()=>sendVerifyCode(formik.values.email)} disabled={counter}>Send code</Button>
                    { counter && <TimeCounter/>}

                    </div>
                </InputGroup>
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div> 
                 <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div> 
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                 </div> 
                 <CustomInput
                  type="token"
                  name="token"
                  placeholder="Verify token"
                  value={formik.values.token}
                  onChange={formik.handleChange("token")}
                  onBlur={formik.handleBlur("token")}
                />
                <div className="error">
                  {formik.touched.token && formik.errors.token}
                </div>  
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button  type="submit"  className="button border-0">Sign Up</button>
                   </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
