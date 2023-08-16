import React, { useEffect, useState, useHistory } from "react";
import axios from "axios";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Members from "./Members";
import Registration from "./Registration";
import MembersTable from "./MembersTable";
import ActiveMembers from "./ActiveMembers";
import InActiveMembers from "./InActiveMembers";
import "../CSS/Home.css";

function Home() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
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
    axios
      .get("http://localhost:5001/admin/verify", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status) {
          setVerified(true);
        }
      })
      .catch((err) => {
        console.log("An error was occured");
        navigate("/AdminLogin");
      });
  });
  useEffect(() => {
    window.addEventListener("resize", resizer);
    resizer();
  }, []);

  if (!verified) {
    return <p>Loading...</p>;
  }

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

              <Link to="/activeMembers">
                <li>Active Members</li>
              </Link>
              <Link to="/inActiveMembers">
                <li>Inactive Members</li>
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
          <Route path="/" exact Component={Members} />
          <Route path="/registration" Component={Registration} />
          <Route path="/history" Component={MembersTable} />
          <Route path="/activeMembers" Component={ActiveMembers} />
          <Route path="/inActiveMembers" Component={InActiveMembers}/>
        </Routes>
      </div>
    </>
  );
}

export default Home;
