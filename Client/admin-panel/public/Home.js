import React, { useEffect, useState } from "react";
import Members from "../src/Components/Members";
import "../CSS/Home.css";

function Home() {
  const [size, setSize] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const resizer = () => {
    if (window.innerWidth <= 1000) {
      setSize(true);
      console.log(size);
    } else {
      setSize(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizer);
    resizer();
  });

  return (
    <>
      <nav>
        <div className={`logo-sec ${size ? `hide` : ``}`}>
          <img src="/Media/edwins.jpeg" alt="" />
        </div>
        <div className={`media-btn ${size ? `` : `hide`}`}>
          <button
            className="hamburger"
            onClick={() => {
              setClick(!click);
            }}
          >
            <span className={`line  ${isClick ? `close-1` : ``}`}></span>
            <span className={`line  ${isClick ? `close-2` : ``}`}></span>
            <span className={`line  ${isClick ? `close-3` : ``}`}></span>
          </button>
        </div>
      </nav>
      <div className="home-container">
        <div className={`side-bar sidebar-media ${click ? `open` : `close`}`}>
          <div className="profile-sec">
            <div className="image-sec">
              <img src="/Media/profile.jpeg" alt="" />
            </div>
            <div className="info-sec">
              <h1>Edwin</h1>
            </div>
          </div>
          <div className="routes-sec">
            <ul>
              <li>Members</li>
              <li>Registration</li>
            </ul>
            <div className="footer-sec">
              <button>Logut</button>
            </div>
          </div>
        </div>
        <Members />
      </div>
    </>
  );
}

export default Home;
