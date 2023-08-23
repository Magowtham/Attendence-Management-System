import React, { useEffect, useState, lazy, Suspense, useRef } from "react";
import SubLoader from "./SubLoader";
import axios from "axios";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "../CSS/Home.css";

const Members = lazy(() => import("./Members"));
const Registration = lazy(() => import("./Registration"));
const MembersTable = lazy(() => import("./MembersTable"));
const ActiveMembers = lazy(() => import("./ActiveMembers"));
const InActiveMembers = lazy(() => import("./InActiveMembers"));
const AdminOtp = lazy(() => import("./AdminOtp"));

function Home() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [adminUsn, setAdminUsn] = useState("");
  const [size, setSize] = useState(false);
  const [click, setClick] = useState(false);
  const [searchbar, setSearchbar] = useState(false);
  const searchBarRef = useRef(null);

  const resizer = () => {
    if (window.innerWidth <= 1000) {
      setSize(true);
    } else {
      setSize(false);
    }
  };
  const handleSearchbar = (e) => {
    setSearchbar(!searchbar);
  };
  useEffect(() => {
    window.addEventListener("resize", resizer);
    resizer();
    return () => {
      window.removeEventListener("resize", resizer);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5001/admin/verify", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setVerified(true);
          setAdminUsn(res.data?.adminInfo?.usn);
        }
      })
      .catch((err) => {
        navigate("/AdminLogin");
        console.log(err);
      });
  });

  const handleLogout = () => {
    axios
      .get("http://localhost:5001/admin/logout", { withCredentials: true })
      .then((res) => {
        if (res.data?.status) {
          navigate("/AdminLogin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <div className="search-bar-sec">
          <div class="search-box">
            <input
              className={`search-text ${searchbar ? `open` : ``}`}
              type="text"
              placeholder="Search Anything"
              ref={searchBarRef}
            />
            <button className="search-btn" onClick={handleSearchbar}>
              <i className="fas fa-search"></i>
            </button>
          </div>
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
              <img
                src="https://media.licdn.com/dms/image/C5603AQEYIfLt-1Hqgw/profile-displayphoto-shrink_800_800/0/1661957350678?e=2147483647&v=beta&t=8IN11JV8QK_fESs0qg_cBDSMpad7hM4PzyYd_hWKvPY"
                alt=""
              />
            </div>
            <div className="info-sec">
              <h1>{adminUsn}</h1>
            </div>
          </div>
          <div className="routes-sec">
            <ul>
              <Link to="/" style={{ textDecoration: "none" }}>
                <li>Members</li>
              </Link>

              <Link to="/activeMembers" style={{ textDecoration: "none" }}>
                <li>Active Members</li>
              </Link>
              <Link to="/inActiveMembers" style={{ textDecoration: "none" }}>
                <li>Inactive Members</li>
              </Link>
              <Link
                to="/registration"
                state={{ adminUsn }}
                style={{ textDecoration: "none" }}
              >
                <li>Registration</li>
              </Link>
            </ul>
            <div className="footer-sec">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
        <div className="sub-components-sec">
          <div
            className={`sub-components-sec-overlay ${click ? `open` : ``}`}
          ></div>
          <Suspense fallback={<SubLoader />}>
            <Routes>
              <Route path="/" exact Component={Members} />
              <Route path="/registration" Component={Registration} />
              <Route path="/history" Component={MembersTable} />
              <Route path="/activeMembers" Component={ActiveMembers} />
              <Route path="/inActiveMembers" Component={InActiveMembers} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default Home;
