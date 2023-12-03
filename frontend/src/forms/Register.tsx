/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./forms.css";
import Navbar from "../dashboard/Navbar";
import { registerUser } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "student",
  level: "100",
};
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (event: any) => {
    try {
      event.preventDefault();
      const payload = {
        ...formData,
      };
      const registerResponse: any = await registerUser(payload);
      console.log(registerResponse.data);
      navigate("/login");
      toast(registerResponse.data.message);
    } catch (error: any) {
      if (error.response) {
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
        <h1 className="form-header">Register Page</h1>
        <form onSubmit={handleRegister} className="register-form">
          <div>
            <label className="form-label">First Name</label> <br />
            <input
              className="input-fields"
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="First Name"
              onChange={inputChange}
              required
            />
          </div>
          <div>
            <label className="form-label">Last Name</label> <br />
            <input
              className="input-fields"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={inputChange}
              required
            />
          </div>
          <div>
            <label className="form-label">Email</label> <br />
            <input
              className="input-fields"
              type="email"
              name="email"
              placeholder="youremail@email.com"
              onChange={inputChange}
              value={formData.email}
              required
            />
          </div>
          <div>
            <label className="form-label">Password</label> <br />
            <input
              className="input-fields"
              type="password"
              name="password"
              placeholder="Password"
              onChange={inputChange}
              value={formData.password}
              required
            />
          </div>
          <div>
            <label className="form-label">Role</label> <br />
            <select
              className="input-fields"
              name="role"
              onChange={inputChange}
              value={formData.role}
              required
            >
              <option value="student">student</option>
              <option value="teacher">teacher</option>
            </select>
          </div>

          {formData.role === "student" ? (
            <div>
              <label className="form-label">Level</label> <br />
              <select
                className="input-fields"
                name="level"
                onChange={inputChange}
                value={formData.level}
              >
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
              </select>
            </div>
          ) : null}
          <button className="button ">Register</button>
          <div>
            <label className="input-fields">
              {" "}
              Already have an account? Click{" "}
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                here
              </Link>{" "}
              to login.
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
