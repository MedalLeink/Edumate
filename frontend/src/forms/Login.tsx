/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Navbar from "../dashboard/Navbar";
import "./forms.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loginDetails = {
  email: "",
  password: "",
};
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(loginDetails);
  const inputChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event: any) => {
    try {
      event.preventDefault();
      const payload = {
        ...formData,
      };
      const data: any = await loginUser(payload);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.checkUser));
      toast.success(data.data.message);
      data.data.checkUser.role === "student"
        ? navigate("/student")
        : navigate("/admin");
      setFormData(loginDetails);
    } catch (error: any) {
      if (error.response) {
        console.log("error", error);
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(`Internal Server Error`);
      } else {
        toast.error(`Error, ${error.message}`);
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="auth-form-container">
        <h1 className="form-header">Log In</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="Email"> Email</label>
          <br />
          <input
            type="text"
            className="input-fields"
            placeholder="Email"
            id="email"
            name="email"
            value={formData.email}
            onChange={inputChange}
          />
          <br />
          <br />
          <label htmlFor="password"> Password</label>
          <br />
          <input
            type="password"
            className="input-fields"
            placeholder="*******"
            id="password"
            name="password"
            value={formData.password}
            onChange={inputChange}
          />
          <br />
          <br />
          <button className="button" type="submit">
            Log In{" "}
          </button>
          <div>
            <label className="input-fields">
              {" "}
              Don't have an account? Click{" "}
              <Link to={"/register"} style={{ textDecoration: "none" }}>
                here
              </Link>{" "}
              to register.
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
