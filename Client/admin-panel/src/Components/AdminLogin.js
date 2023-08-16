import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/AdminLogin.css";
import axios from "axios";

function AdminLogin() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loginData, setLoginData] = useState({ usn: "", password: "" });
  const [loginError, setLoginError] = useState({});
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginData({ usn: e.target[0].value, password: e.target[1].value });
    setIsFormSubmitted(true);
  };
  const loginValidater = (loginData) => {
    const errors = {};
    if (!loginData.usn) {
      errors.usnError = "USN required";
    }
    if (!loginData.password) {
      errors.passwordError = "Password required";
    }
    return errors;
  };
  useEffect(() => {
    if (isFormSubmitted) {
      setLoginError(loginValidater(loginData));
    }
  }, [loginData]);
  useEffect(() => {
    if (isFormSubmitted && Object.keys(loginError).length === 0) {
      axios
        .post("http://localhost:5001/admin/login", loginData, {
          withCredentials: true,
        })
        .then((result) => {
          if (result.status) {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(`Error occured while sending the data ${err}`);
        });
    }
  }, [loginError]);
  return (
    <>
      <div className="admin-login-container">
        <form onSubmit={handleLogin}>
          <label>USN</label>
          <input type="text" id="usn" placeholder="Universal Serial Number.." />
          <p>{loginError.usnError}</p>
          <label>Passowrd</label>
          <input type="password" id="password" placeholder="Passowrd.." />
          <p>{loginError.passwordError}</p>
          <input type="submit" value="Submit" />
          <Link to="/">
            <p>Register?</p>
          </Link>
        </form>
      </div>
    </>
  );
}

export default AdminLogin;
