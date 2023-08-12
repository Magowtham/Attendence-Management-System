import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Registration.css";

function Registration() {
  const initialFormData = {
    name: "",
    usn: "",
    email: "",
    imgLink: "",
    githubLink: "",
    linkedinLink: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState({});
  const [isFormSetted, setIsFormSetted] = useState(false);
  const baseUrl = "";
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
    if (!values.imgLink) {
      errors.imgLinkError = "Image is required";
    } else if (!urlRegex.test(values.imgLink)) {
      errors.imgLinkError = "Image url is not valid";
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
  const sendFormData = () => {
    axios({
      method: "POST",
      url: baseUrl,
      data: "",
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(`An error was occured while sending the data ${err}`);
      });
  };

  const handleFormData = (e) => {
    e.preventDefault();
    setIsFormSetted(true);
    const target = e.target;
    setFormData({
      name: e.target[0].value,
      usn: e.target[1].value,
      email: e.target[2].value,
      imgLink: e.target[3].value,
      githubLink: e.target[4].value,
      linkedinLink: e.target[5].value,
    });
  };
  useEffect(() => {
    if (isFormSetted) {
      setFormError(validateFormData(formData));
    }
  }, [formData]);
  useEffect(() => {
    console.log(formError);
  }, [formError]);
  return (
    <>
      <div className="reg-container">
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
          <p>{formError.imgLinkError}</p>
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
