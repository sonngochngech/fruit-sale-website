import React, { useState } from "react";
import axios from "axios";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { base_url,config } from "../utils/axiosConfig";
import { toast } from 'react-toastify';

const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const submit = async (e) => {
    try {
      e.preventDefault();
      if(password!==repassword){
        toast.error("Password and confirm password must be same ")
      }else{
        const response= await axios.put(
            `${base_url}auth/resetPassword`,
            {
              password: password,
            },
            config
          );
          if(response.status===200){
            toast.info("Change password successfully")
          }else{
            toast.error("Change password fail")
          }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form action="" className="d-flex flex-column gap-15">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-floating mt-3"
                />
                <input
                  type="password"
                  name="repassword"
                  placeholder="Comfirm Password"
                  id="repass"
                  value={repassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  className="form-control form-floating mt-3"
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button
                      className="button border-0"
                      type="submit"
                      onClick={(e) => submit(e)}
                    >
                     Send
                    </button>
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

export default Resetpassword;
