import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/AdminLogin.css";
import axios from "axios";

function AdminLogin() {
  const sendOtpUrl = "http://localhost:5001/admin/sendOtp";
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loginData, setLoginData] = useState({ usn: "", password: "" });
  const [loginError, setLoginError] = useState({});
  const [isForgotValidated, setIsForgotValidated] = useState();
  const [forgotData, setForgotData] = useState({ usn: "" });
  const [isForgotSetted, setIsForgotSetted] = useState(false);
  const [otpError, setOtpError] = useState({ message: "" });
  const [loading, setLoading] = useState(false);
  const usnInputRef = useRef(null);
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
  const forgotValidater = () => {
    const error = {};
    if (!forgotData.usn) {
      error.usnError = "USN required";
    }
    setLoginError(error);
    return true;
  };
  const handleForgot = (e) => {
    e.preventDefault();
    setIsForgotSetted(true);
    setIsForgotValidated(false);
    setLoginError({});
    setForgotData({ usn: usnInputRef.current.value });
  };
  useEffect(() => {
    if (isForgotValidated && Object.keys(loginError).keys.length === 0) {
      (async () => {
        try {
          setLoading(true);
          const response = await axios.post(sendOtpUrl, forgotData);
          if (response.data?.status) {
            navigate("/AdminOtp", {
              state: {
                usn: forgotData.usn,
                email: response.data?.email,
                forgot: true,
              },
            });
          } else {
            otpError.message = response.data?.message;
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
          console.log("completed");
        }
      })();
    }
  }, [isForgotValidated]);
  useEffect(() => {
    if (isForgotSetted) {
      setIsForgotValidated(forgotValidater());
      setIsForgotSetted(false);
    }
  }, [isForgotSetted]);
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
          <div
            className={`loading-overlay ${loading ? `form-loading` : ``}`}
          ></div>
          <div className={`progress-bar ${loading ? `form-loading` : ``}`}>
            <div className="progress-bar-value"></div>
          </div>
          <h1>Login </h1>
          <input type="text" placeholder="USN" ref={usnInputRef} />
          <p>{loginError.usnError}</p>
          <input type="password" id="password" placeholder="Passowrd.." />
          <p>{loginError.passwordError}</p>
          <div className="form-sub-footer-sec">
            <button onClick={handleForgot}>Forgot password?</button>
            <input type="submit" value="Submit" />
          </div>
          <div className="form-footer-sec">
            <button>Register?</button>
            <p>{otpError.message}</p>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminLogin;
