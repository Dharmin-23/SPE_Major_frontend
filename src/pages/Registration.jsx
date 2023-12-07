import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../router/route";
import { baseUrl } from "../utils/constants";

function Registration() {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const isFormValid = Object.values(user).every((value) => value !== "");

    if (!isFormValid) {
      alert("Error !!!. Please fill out all fields");
    } else {
      // send the data to the backend API
      try {
        await axios.post(baseUrl + "/user/register", user);
        alert("Registration successful\nRedirecting to Login Page");
        navigate(routes.LoginPage);
      } catch {
        alert("Error !!!. Invalid Inputs");
      }
    }
  }

  return (
    <div className="RegistrationPage">
      <div className="form-box">
        <h2>Create Account</h2>
        <form className="registration-form" onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            name="fname"
            type="text"
            value={user.fname}
            placeholder="Enter first  name"
            onChange={handleChange}
          />
          <label>Last Name</label>
          <input
            name="lname"
            type="text"
            value={user.lname}
            placeholder="Enter last  name"
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            name="email"
            type="text"
            value={user.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={user.password}
            placeholder="Create a password"
            onChange={handleChange}
          />
          {/* <label>Confirm Password : </label>
        <input type="text" placeholder="Re-enter your password" /> */}
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
