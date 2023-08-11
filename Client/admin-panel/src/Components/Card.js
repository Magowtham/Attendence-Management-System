import React from "react";
import "../CSS/Card.css";

function Card() {
  return (
    <>
      <div className="member-card">
        <div className="member-img-sec">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
          />
        </div>
        <div className="member-info-sec">
          <h1>Gowtham MA</h1>
          <h2>4AL21EC029</h2>
        </div>
        <div className="member-footer-sec">
          <div className="Social-media">
            <a href="#">
              <font color="#007cc4">
                <i className="fab fa-google"></i>
              </font>
            </a>
            <a href="#">
              <font color="#007cc4">
                <i className="fab fa-github"></i>
              </font>
            </a>
            <a href="#">
              <font color="#007cc4">
                <i className="fab fa-linkedin"></i>
              </font>
            </a>
          </div>
          <button>History</button>
        </div>
      </div>
    </>
  );
}

export default Card;
