import React, { useState } from "react";
import "../css/Signin-Signup.css";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  let emailpattern = ".*@genzeon.com";
  let mobilePattern = "[789][0-9]{9}";
  let passwordPattern =
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

  var [newUser, setNewUser] = useState({
    empid: "",
    ename: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (event) => {
    console.log("in handle change");
    const { name, value } = event.target;

    setNewUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (newUser.empid.length !== 5) {
      swal("Please enter valid employee id");
      return;
    }

    if (!newUser.email.match(emailpattern)) {
      swal("Please enter valid emailId");
      return;
    }

    if (!newUser.mobile.match(mobilePattern)) {
      swal("Please enter valid mobile number");
      return;
    }

    if (!newUser.password.trim().match(passwordPattern)) {
      swal(
        "Password should contain minimum eight characters, at least one upper case letter, at least one lower case letter, one number and one special character"
      );
      return;
    }

    const obj = {
      empid: newUser.empid,
      ename: newUser.ename,
      email: newUser.email,
      password: newUser.password,
      mobile: newUser.mobile,
    };
    console.log(obj);
    let resp;
    try {
      resp = await axios.post("http://localhost:5000/api/users/signup", obj);
      console.log(resp.data);
      console.log(resp.status);
      swal("Account Has been created");
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_BAD_RESPONSE") {
        swal("Emaild already registered");
        return;
      }
      console.log("maybe problem in Signin page data");
    }
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <h1 style={{ padding: "5px" }}>Register</h1>
        <form className="register-form">
          <div className="input-row">
            <label className="label-text" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              className="input-text"
              value={newUser.ename}
              name="ename"
              onChange={handleChange}
              id="ename"
              placeholder="Name"
              required
            />
          </div>
          <div className="input-row">
            <label className="label-text" htmlFor="Employee ID">
              Employee ID
            </label>
            <input
              type="number"
              className="input-text"
              value={newUser.empid}
              onChange={handleChange}
              placeholder="Empid"
              id="empid"
              name="empid"
              required
            />
          </div>
          <div className="input-row">
            <label className="label-text" htmlFor="email">
              Email
            </label>
            <input
              className="input-text"
              value={newUser.email}
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              name="email"
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-row">
            <label className="label-text" htmlFor="Mobile">
              Mobile No
            </label>
            <input
              type="mobile"
              className="input-text"
              value={newUser.mobile}
              placeholder="Mobile No."
              id="mobile"
              name="mobile"
              onChange={handleChange}
              maxLength={10}
            />
          </div>
          <div className="input-row">
            <label className="label-text" htmlFor="password">
              Password
            </label>
            <input
              className="input-text"
              value={newUser.password}
              onChange={handleChange}
              type="password"
              placeholder="********"
              id="password"
              name="password"
            />
          </div>
          <br />

          <button className="button1" type="submit" onClick={submitHandler}>
            Sign Up
          </button>
        </form>
        <br />
        <a href="/" className="link">
          Already have an account? Login here.
        </a>
      </div>
    </div>
  );
};
export default Register;
