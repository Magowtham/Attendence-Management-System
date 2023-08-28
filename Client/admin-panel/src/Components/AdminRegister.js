import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/AdminRegister.css";

function AdminRegister() {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:5001/admin/register";
  const [formData, setFormData] = useState({
    usn: "",
    email: "",
    newPassword: "",
    confirmedPassword: "",
  });
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [formError, setFormError] = useState({});
  const [isFormSetted, setIsformSetted] = useState(false);
  const [isNewPassVisible, setIsNewPassVisible] = useState(false);
  const [isConfirmedPassVisible, setIsConfirmedPassVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const newPassRef = useRef(null);
  const confirmPassRef = useRef(null);

  const handleAdminRegister = (e) => {
    e.preventDefault();
    setFormData({
      usn: e.target[0].value,
      email: e.target[1].value,
      newPassword: e.target[2].value,
      confirmedPassword: e.target[4].value,
    });
    setIsFormValidated(false);
    setFormError({});
    setIsformSetted(true);
  };

  const formValidater = () => {
    const error = {};
    const emailRegex = /^[(\w\d\W)+]+@[\w+]+\.[\w+]+$/i;
    if (!formData.usn) {
      error.usnError = "USN is required";
    }
    if (!formData.email) {
      error.emailError = "Email is required ";
    } else if (!emailRegex.test(formData.email)) {
      error.emailError = "Email is not valid";
    }
    if (!formData.newPassword) {
      error.newPassError = "Can't set empty password";
    } else if (formData.newPassword !== formData.confirmedPassword) {
      error.confirmedPassError = "Password not matching";
    }
    setFormError(error);
    return true;
  };
  const handleLoginRout = (e) => {
    e.preventDefault();
    navigate("/AdminLogin");
  };
  const handleNewPassVisible = (e) => {
    e.preventDefault();
    setIsNewPassVisible(!isNewPassVisible);
  };
  const handleConfirmedPassVisible = (e) => {
    e.preventDefault();
    setIsConfirmedPassVisible(!isConfirmedPassVisible);
  };
  useEffect(() => {
    if (isFormSetted) {
      setIsFormValidated(formValidater());
      setIsformSetted(false);
    }
  }, [isFormSetted]);
  useEffect(() => {
    if (isFormValidated && Object.keys(formError).length === 0) {
      (async () => {
        try {
          setLoading(true);
          const response = await axios.post(baseUrl, {
            usn: formData.usn,
            password: formData.confirmedPassword,
            email: formData.email,
          });
          console.log(response.data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isFormValidated]);
  useEffect(() => {
    if (isConfirmedPassVisible) {
      setIsNewPassVisible(false);
      confirmPassRef.current.type = "text";
    } else {
      confirmPassRef.current.type = "password";
    }
  }, [isConfirmedPassVisible]);
  useEffect(() => {
    if (isNewPassVisible) {
      setIsConfirmedPassVisible(false);
      newPassRef.current.type = "text";
    } else {
      newPassRef.current.type = "password";
    }
  }, [isNewPassVisible]);
  return (
    <>
      <div className="admin-register-container">
        <form onSubmit={handleAdminRegister}>
          <div
            className={`loading-overlay ${loading ? `form-loading` : ``}`}
          ></div>
          <div className={`progress-bar ${loading ? `form-loading` : ``}`}>
            <div className="progress-bar-value"></div>
          </div>
          <h1>Admin Register</h1>
          <p>{formError.usnError}</p>
          <input type="text" placeholder="USN" autoComplete="new-usn" />
          <p>{formError.emailError}</p>
          <input type="email" placeholder="Email" autoComplete="new-email" />
          <p>{formError.newPassError}</p>
          <label>
            <input
              type="password"
              placeholder="New password..."
              ref={newPassRef}
            />
            <button
              className="material-symbols-outlined"
              onClick={handleNewPassVisible}
            >
              {`${isNewPassVisible ? `visibility` : `visibility_off`}`}
            </button>
          </label>
          <p>{formError.confirmedPassError}</p>
          <label>
            <input
              type="password"
              placeholder="Confirm password.."
              ref={confirmPassRef}
            />
            <button
              className="material-symbols-outlined"
              onClick={handleConfirmedPassVisible}
            >
              {`${isConfirmedPassVisible ? `visibility` : `visibility_off`}`}
            </button>
          </label>
          <div className="footer-sec">
            <button type="submit">Register</button>
            <button onClick={handleLoginRout}>Login?</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminRegister;
