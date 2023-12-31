import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/AdminOtp.css";
function AdminOtp() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({ usn: "", email: "" });
  const [isOtpSetted, setIsOtpSetted] = useState(false);
  const [otpData, setOtpData] = useState({ otp: "" });
  const [otpError, setOtpError] = useState({});
  const [isOtpValidated, setIsOtpValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendDisable, setResendDisable] = useState(false);
  const { state } = useLocation();
  const baseUrl = "http://localhost:5001/admin/verifyOtp";
  const resendUrl = "http://localhost:5001/admin/sendOtp";
  const handleOtp = (e) => {
    e.preventDefault();
    setIsOtpSetted(true);
    setOtpData({ otp: e.target[0]?.value });
    setOtpError({});
    setIsOtpValidated(false);
  };
  const validateOtpData = (otp) => {
    const error = {};
    if (!otp) {
      error.otpFieldError = "OTP is required";
    }
    setOtpError(error);
    return true;
  };
  const handleResend = async (e) => {
    e.preventDefault();
    setOtpError({});
    try {
      setLoading(true);
      const response = await axios.post(resendUrl, { usn: adminData.usn });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setResendDisable(true);
      setTimeout(() => {
        setResendDisable(false);
      }, 10000);
    }
  };
  useEffect(() => {
    setAdminData({ usn: state?.usn, email: state?.email });
  }, []);
  useEffect(() => {
    if (isOtpSetted) setIsOtpValidated(validateOtpData(otpData.otp));
    setIsOtpSetted(false);
  }, [isOtpSetted]);
  useEffect(() => {
    if (isOtpValidated && Object.keys(otpError).length === 0) {
      (async () => {
        try {
          setLoading(true);
          const response = await axios.post(baseUrl, {
            usn: adminData.usn,
            otp: otpData.otp,
          });
          if (response.data?.status) {
            navigate("/AdminNewPass", {
              state: { ...state, otpVerified: true },
            });
          } else {
            console.log(response.data?.message);
            setOtpError({ otpFieldError: response.data?.message });
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isOtpValidated]);
  useEffect(() => {
    if (!state?.forgot) {
      navigate("/AdminLogin");
    }
  }, [state]);
  return (
    <>
      <div className="admin-otp-container">
        <form onSubmit={handleOtp}>
          <div
            className={`loading-overlay ${loading ? `form-loading` : ``}`}
          ></div>
          <div className={`progress-bar ${loading ? `form-loading` : ``}`}>
            <div className="progress-bar-value"></div>
          </div>
          <h1>Account recovery</h1>
          <p>
            Check your email OTP was sent to{" "}
            <span style={{ color: "#1cf8bd" }}>{adminData?.email}</span>
          </p>
          <p style={{ color: "red", margin: "30px 0px 2px 0px" }}>
            {otpError.otpFieldError}
          </p>
          <input type="text" placeholder="OTP" autoComplete="new-otp" />
          <div className="footer-sec">
            <button
              onClick={handleResend}
              disabled={resendDisable}
              style={{
                opacity: `${resendDisable ? `0.6` : `1`}`,
                pointerEvents: `${resendDisable ? `none` : ``}`,
              }}
            >
              Resend it
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminOtp;
