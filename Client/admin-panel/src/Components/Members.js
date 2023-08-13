import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import "../CSS/Members.css";

function Members() {
  const [membersData, setMembersData] = useState([]);
  const baseUrl = "http://localhost:5001/admin/membersData";
  useEffect(() => {
    axios
      .get(baseUrl)
      .then((res) => {
        setMembersData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(membersData);
  return (
    <>
      <div className="members-grid">
        {membersData.map((member) => (
          <Card
            name={member.name}
            usn={member.usn}
            imageLink={member.imageLink}
            email={member.email}
            githubLink={member.githubLink}
            linkedinLink={member.linkedinLink}
          />
        ))}
      </div>
    </>
  );
}

export default Members;
