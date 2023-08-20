import React, { useEffect, useRef, useState, lazy, useMemo } from "react";
import axios from "axios";
import "../CSS/Members.css";
import Loader from "./Loader";

const Card = lazy(() => import("./Card"));

function Members() {
  const [membersData, setMembersData] = useState([]);

  const [totalMembers, setTotalMembers] = useState(0);
  const [activeMembers, setActiveMembers] = useState(0);
  const [inActiveMembers, setInActiveMembers] = useState(0);
  const [data, setData] = useState(false);

  const baseUrl = "http://localhost:5001/admin/membersData";
  useEffect(() => {
    axios
      .get(baseUrl)
      .then((res) => {
        setData(true);
        setMembersData(res.data?.allMembers);
        setActiveMembers(res.data?.activeMembersCount);
        setInActiveMembers(res.data?.inActiveMembersCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setTotalMembers(membersData.length);
  }, [membersData]);
  if (!data) {
    return <Loader isSubComponent={true} />;
  }
  return (
    <>
      <div className="members-container">
        <div className="member-other-info">
          <div className="total-members-sec">
            <h1>{totalMembers}</h1>
            <h2>Total Lab Members</h2>
          </div>
          <div className="active-members-sec">
            <h1>{activeMembers}</h1>
            <h2>Active Members</h2>
          </div>
          <div className="inactive-members-sec">
            <h1>{inActiveMembers}</h1>
            <h2>Inactive Members</h2>
          </div>
        </div>
        <div className="members-grid">
          {membersData.map((member) => (
            <Card
              id={member._id}
              name={member.name}
              usn={member.usn}
              imageLink={member.imageLink}
              email={member.email}
              githubLink={member.githubLink}
              linkedinLink={member.linkedinLink}
              loginStatus={member.loginStatus}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Members;
