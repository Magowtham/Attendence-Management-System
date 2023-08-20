import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Card from "./Card";
import axios from "axios";
import Members from "./Members";

function InActiveMembers() {
  const [inActiveMembers, setInActiveMembers] = useState([]);
  const [data, setData] = useState(false);
  const baseUrl = "http://localhost:5001/admin/inActiveMembers";
  useEffect(() => {
    if (inActiveMembers.length === 0) {
      axios
        .get(baseUrl)
        .then((res) => {
          setData(true);
          setInActiveMembers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [inActiveMembers]);
  if (!data) {
    return <Loader isSubComponent={true} />;
  }
  return (
    <>
      <div className="inactive-members-grid">
        {inActiveMembers.map((member) => (
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

export default InActiveMembers;
