import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Card.css";
function Card({ id, name, usn, email, imageLink, githubLink, linkedinLink,loginStatus }) {
  const navigate = useNavigate();
  const tableRout = () => {
    navigate("/history", { state: { id } });
  };
  return (
    <>
      <div className="member-card">
        <div className="inlab-status"></div>
        <div className="member-img-sec">
          <img src={imageLink} alt="" />
        </div>
        <div className="member-info-sec">
          <div className={`member-status  ${loginStatus?`login`:``}`}></div>
          <h1>{name}</h1>
          <h2>{usn}</h2>
        </div>
        <div className="member-footer-sec">
          <div className="Social-media">
            <a href="#">
              <font color="#007cc4">
                <a href={email}>
                  <i className="fab fa-google"></i>
                </a>
              </font>
            </a>
            <a href="#">
              <font color="#007cc4">
                <a href={githubLink}>
                  <i className="fab fa-github"></i>
                </a>
              </font>
            </a>
            <a href="#">
              <font color="#007cc4">
                <a href={linkedinLink}>
                  <i className="fab fa-linkedin"></i>
                </a>
              </font>
            </a>
          </div>
          <button onClick={tableRout}>History</button>
        </div>
      </div>
    </>
  );
}

export default Card;
