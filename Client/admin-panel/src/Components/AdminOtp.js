import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../CSS/AdminOtp.css";
function AdminOtp() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const serverMessageRef = useRef(null);
  const [otpResult, setOtpResult] = useState(false);
  const baseUrl = "http://localhost:5001/admin/sendOtp";
  const handleOtp = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    setFormError({});
    setIsFormValidated(false);
    serverMessageRef.current.textContent = "";
    setFormData({ usn: e.target[0].value });
  };
  const formValidater = () => {
    const error = {};
    if (!formData.usn) {
      error.usnError = "USN required";
    }
    setFormError(error);
    return true;
  };
  useEffect(() => {
    if (isFormSubmitted) {
      setIsFormValidated(formValidater());
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted]);
  useEffect(() => {
    (async () => {
      if (isFormValidated && Object.keys(formError).length === 0) {
        try {
          setDisableButton(true);
          const response = await axios.post(baseUrl, formData);
          serverMessageRef.current.textContent = response.data?.message;
          setOtpResult(response.data?.status);
        } catch (err) {
          console.log(err);
        } finally {
          setDisableButton(false);
        }
      }
    })();
  }, [isFormValidated]);
  return (
    <>
      <div className="admin-otp-container">
        <form onSubmit={handleOtp}>
          <input type="text" placeholder="USN..."></input>
          <p>{formError.usnError}</p>
          <p>{disableButton}</p>
          <button type="submit" disabled={disableButton}>
            Send OTP
          </button>
          <p ref={serverMessageRef}></p>
        </form>
      </div>
    </>
  );
}

export default AdminOtp;
