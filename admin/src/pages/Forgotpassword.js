import React, { useState } from "react";
import axios from "axios";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import CustomInput from "../components/CustomInput";
import { base_url } from "../utils/axiosConfig";
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';
const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [token,setToken]=useState("");
  const navigate = useNavigate();

  const sendVerifyCode= async(email)=>{
    try {
      const tokenData={
         email: email,
         type:"PASSWORD"
      }
      const response = await axios.post(`${base_url}auth/requestToken`, tokenData);
      console.log(response);
    }catch(error){
        toast.error('fail sending email');
      
    }
  
  }

  const submit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${base_url}auth/verifyPasswordToken`,{token: token}
      );
      if (response.status === 200) {
        localStorage.setItem("customer", JSON.stringify(response.data?.user));
        localStorage.setItem("jwt",response.data?.jwt);
        navigate('/reset-password');
        window.location.reload();
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
        toast.error('fail verifying code');
    }
  };
  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                Please Enter your register email to get reset password mail. We
                will send you an email to reset your password
              </p>
              <form action="" className="d-flex flex-column gap-15">
                <InputGroup>
                    <div style={{width: "75%"}} > 
                        
                        <CustomInput
                            type="text"
                            name="email"
                            placeholder="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                    </div>
                    <Button variant="light"  style={{width: "25%"}}  onClick={()=>sendVerifyCode(email)} >Send code</Button>
                </InputGroup>
                   <input
                            type="text"
                            name="token"
                            placeholder="Verify code"
                            id="token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="form-control form-floating mt-3"
                    />
                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button
                      className="button border-0"
                      type="submit"
                      onClick={(e) => submit(e)}
                    >
                      Submit
                    </button>
                    <Link to="/login">Cancel</Link>
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

export default Forgotpassword;
