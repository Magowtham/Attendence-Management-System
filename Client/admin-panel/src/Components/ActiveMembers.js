import React, { useEffect, useState } from "react";
import SubLoader from "./SubLoader";
import Card from "./Card";
import "../CSS/ActiveMembers.css";
import axios from "axios";

function ActiveMembers() {
  const [activeMembers, setActiveMembers] = useState([]);
  const [data, setData] = useState(false);
  const baseUrl = "http://localhost:5001/admin/activeMembers";
  useEffect(() => {
    if (activeMembers.length === 0) {
      axios
        .get(baseUrl)
        .then((res) => {
          setData(true);
          setActiveMembers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [activeMembers]);
  if (!data) {
    return <SubLoader />;
  }
  return (
    <>
      <div className="active-members-grid">
        {activeMembers.map((member) => (
          <Card
            id={member._id}
            name={member.name}
            usn={member.usn}
            email={member.email}
            imageLink={member.imageLink}
            githubLink={member.githubLink}
            linkedinLink={member.linkedinLink}
          />
        ))}
      </div>
    </>
  );
}

export default ActiveMembers;
