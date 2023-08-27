import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../CSS/AdminNewPass.css";
function AdminNewPass() {
  const baseUrl = "http://localhost:5001/admin/newPassword";
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isFormSetted, setIsFormSetted] = useState(false);
  const [adminData, setAdminData] = useState({ usn: "" });
  const [formData, setFormData] = useState({
    usn: "",
    newPass: "",
    confirmedPass: "",
  });
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [isNewPassVisible, setIsNewPassVisible] = useState(false);
  const [isConfirmedPassVisible, setIsConfirmedPassVisible] = useState(false);
  const newPassRef = useRef(null);
  const confirmPassRef = useRef(null);
  const handleNewPass = (e) => {
    e.preventDefault();
    setIsFormValidated(false);
    setFormError({});
    setIsFormSetted(true);
    setFormData({
      usn: adminData?.usn,
      newPass: e.target[0].value,
      confirmedPass: e.target[2].value,
    });
  };
  const formValidater = () => {
    console.log(formData.newPass, formData.confirmedPass);
    const error = {};
    if (!formData.newPass) {
      error.newPassError = "Can't set empty password";
    } else if (formData.newPass !== formData.confirmedPass) {
      error.confirmedPassError = "Password not matching";
    }
    setFormError(error);
    return true;
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
  useEffect(() => {
    setAdminData({ usn: state?.usn });
  }, []);
  useEffect(() => {
    if (isFormSetted) {
      setIsFormValidated(formValidater());
      setIsFormSetted(false);
    }
  }, [isFormSetted]);

  useEffect(() => {
    if (isFormValidated && Object.keys(formError).length === 0) {
      (async () => {
        try {
          setLoading(true);
          const response = await axios.put(`${baseUrl}/${adminData.usn}`, {
            password: formData.confirmedPass,
          });

          if (response.data?.status) {
            navigate("/AdminLogin");
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isFormValidated]);
  useEffect(() => {
    if (!state?.otpVerified) {
      navigate("/AdminLogin");
    }
  }, [state]);
  return (
    <>
      <div className="admin-new-passs-container">
        <form onSubmit={handleNewPass}>
          <div
            className={`loading-overlay ${loading ? `form-loading` : ``}`}
          ></div>
          <div className={`progress-bar ${loading ? `form-loading` : ``}`}>
            <div className="progress-bar-value"></div>
          </div>
          <h1>Login to your account</h1>
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
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AdminNewPass;
