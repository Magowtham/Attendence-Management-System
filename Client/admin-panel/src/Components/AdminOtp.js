import React, { useEffect } from "react";
import "../CSS/AdminOtp.css";
function AdminOtp() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [isFormValidated, setIsFormValidated] = useState(false);
  const handleOtp = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    setFormData({});
  };
  const formValidater = (value) => {
    const error = {};
    if (!value) {
      error.usnError = "USN required";
    }
    setFormError(err);
    return true;
  };
  useEffect(() => {
    if (isFormSubmitted) {
      setIsFormValidated(formValidater());
    }
  }, [isFormSubmitted]);
  return (
    <>
      <div className="admin-otp-container">
        <form onSubmit={handleOtp}>
          <input type="text" placeholder="USN..."></input>
          <button type="submit">Generate OTP</button>
        </form>
      </div>
    </>
  );
}

export default AdminOtp;
