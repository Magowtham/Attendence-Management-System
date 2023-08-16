import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Registration.css";
import { useLocation } from "react-router-dom";

function Registration() {
  const location = useLocation();
  const initialFormData = {
    name: "",
    usn: "",
    email: "",
    imageLink: "",
    githubLink: "",
    linkedinLink: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState({});
  const [isFormSetted, setIsFormSetted] = useState(false);
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [adminFormError, setAdminFormError] = useState({ passwordError: "" });
  const [adminUsn, setAdminUsn] = useState("");
  const [isAdminValidated, setIsAdminValidated] = useState(false);
  const baseUrl = "http://localhost:5001/admin/memberReg";
  const adminAuthUrl = "http://localhost:5001/admin/memberRegAuth";
  const validateFormData = (values) => {
    const errors = {};
    const emailRegex = /^[(\w\d\W)+]+@[\w+]+\.[\w+]+$/i;
    const urlRegex = /^(https):\/\/[\w\.-]+\.\w{2,}(\/.*)?$/;
    if (!values.name) {
      errors.nameErr = "Name is required";
    }
    if (!values.usn) {
      errors.usnErr = "USN is required";
    }
    if (!values.email) {
      errors.emailErr = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.emailErr = "Email is invalid";
    }
    if (!values.imageLink) {
      errors.imageLinkError = "Image url is required";
    } else if (!urlRegex.test(values.imageLink)) {
      errors.imageLinkError = "Image url is not valid";
    }
    if (!values.githubLink) {
      errors.githubLinkError = "GitHub url is required";
    } else if (!urlRegex.test(values.githubLink)) {
      errors.githubLinkError = "GitHub url is not valid";
    }
    if (!values.linkedinLink) {
      values.linkedinLink = "not has linkedin account";
    } else if (!urlRegex.test(values.linkedinLink)) {
      errors.linkedinLinkError = "Linkedin url is not valid";
    }
    return errors;
  };

  const handleFormData = (e) => {
    e.preventDefault();
    setIsFormSetted(true);
    setFormData({
      name: e.target[0].value,
      usn: e.target[1].value,
      email: e.target[2].value,
      imageLink: e.target[3].value,
      githubLink: e.target[4].value,
      linkedinLink: e.target[5].value,
    });
  };
  const authAdmin = (e) => {
    e.preventDefault();
    if (!e.target[0].value) {
      setAdminFormError({ error: "Admin password required" });
    } else {
      axios
        .post(adminAuthUrl, { usn: adminUsn, password: e.target[0].value })
        .then((res) => {
          setIsAdminValidated(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    if (!adminUsn) {
      setAdminUsn(location.state?.adminUsn);
    }
  }, [location.state]);
  useEffect(() => {
    if (isFormValidated) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setIsFormValidated(false);
        }
      });
    }
  }, [isFormValidated]);
  useEffect(() => {
    if (isFormSetted) {
      setFormError(validateFormData(formData));
    }
  }, [formData]);
  useEffect(() => {
    if (isFormSetted && Object.keys(formError).length === 0) {
      setIsFormValidated(true);
    }
  }, [formError]);
  useEffect(() => {
    if (isAdminValidated) {
      axios({
        method: "POST",
        url: baseUrl,
        data: formData,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(`An error was occured while sending the data ${err}`);
        });
    }
  }, [isAdminValidated]);

  return (
    <>
      <div
        className={`reg-container-overlay  ${isFormValidated ? `popup` : ``}`}
        onClick={() => {
          setIsFormValidated(false);
        }}
      ></div>
      <div className="reg-container">
        <form
          className={`login-popup-page ${isFormValidated ? `popup` : ``}`}
          onSubmit={authAdmin}
        >
          <label>Admin Password</label>
          <input type="password" placeholder="Admin password..." />
          <p>{adminFormError.error}</p>
          <input type="submit" value="submit" />
        </form>
        <form onSubmit={handleFormData}>
          <label for="name">Member Name:</label>
          <input type="text" id="name" placeholder="Name" />
          <p>{formError.nameErr}</p>
          <label for="usn">Member USN:</label>
          <input type="text" id="usn" placeholder="USN" />
          <p>{formError.usnErr}</p>
          <label for="email">Member Email:</label>
          <input type="email" id="email" placeholder="Email" />
          <p>{formError.emailErr}</p>
          <label for="email">Member Profile Image URL:</label>
          <input type="text" id="img-link" placeholder="Profile Image URL" />
          <p>{formError.imageLinkError}</p>
          <label for="email">Member Github URL:</label>
          <input type="text" id="github-link" placeholder="Github URL" />
          <p>{formError.githubLinkError}</p>
          <label for="email">Memeber Linkedin URL:</label>
          <input type="text" id="linkedin-link" placeholder="Linkedin URL" />
          <p>{formError.linkedinLinkError}</p>
          <input type="submit" value="submit" />
        </form>
      </div>
    </>
  );
}

export default Registration;
