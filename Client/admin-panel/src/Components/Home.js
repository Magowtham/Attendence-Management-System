import React, { useEffect, useState, useHistory } from "react";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Members from "./Members";
import Registration from "./Registration";
import MembersTable from "./MembersTable";
import "../CSS/Home.css";

function Home() {
  const [size, setSize] = useState(false);
  const [click, setClick] = useState(false);
  const resizer = () => {
    if (window.innerWidth <= 1000) {
      setSize(true);
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
            <span className={`line ${click ? `close-1` : ``}`}></span>
            <span className={`line  ${click ? `close-2` : ``}`}></span>
            <span className={`line  ${click ? `close-3` : ``}`}></span>
          </button>
        </div>
      </nav>
      <div className="home-container">
        <div
          className={`side-bar ${size ? `sidebar-media` : ``} ${
            click ? `open` : ``
          }`}
        >
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
              <Link to="/">
                <li>Members</li>
              </Link>
           
              <Link to="/registration">
                <li>Active Members</li>
              </Link>
              <Link to="/registration">
                <li>Passive Members</li>
              </Link>
              <Link to="/registration">
                <li>Registration</li>
              </Link>
            </ul>
            <div className="footer-sec">
              <button>Logut</button>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" Component={Members} />
          <Route path="/registration" Component={Registration} />
          <Route path="/history" Component={MembersTable}/>
        </Routes>
      </div>
    </>
  );
}

export default Home;
