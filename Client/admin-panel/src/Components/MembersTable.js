import React, { useEffect, useMemo, useState } from "react";
import SubLoader from "./SubLoader";
import { useLocation, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import axios from "axios";
import "../CSS/MembersTable.css";

function MembersTable() {
  const [memberId, setMemberId] = useState("");
  const [memberHistory, setMemberHistory] = useState([]);
  const [data, setData] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const baseUrl = "http://localhost:5001/admin/memberTable";
  useEffect(() => {
    setMemberId(state?.id);
  }, [state]);

  useEffect(() => {
    if (memberHistory.length === 0 && memberId) {
      axios
        .post(baseUrl, { id: memberId })
        .then((res) => {
          setData(true);
          setMemberHistory(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [memberHistory, memberId]);

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Login Time",
        accessor: "loginTime",
      },
      {
        Header: "Logout Time",
        accessor: "logoutTime",
      },
      {
        Header: "Total Hours",
        accessor: "totalTime",
      },
    ],
    [memberHistory]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: memberHistory,
    });

  const backRout = () => {
    navigate("/");
  };

  if (!data) {
    return <SubLoader />;
  }
  return (
    <>
      <div className="table-container">
        <button onClick={backRout} className="material-symbols-outlined">
          arrow_back_ios
        </button>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                  <button style={{ backgroundColor: "red", padding: "20px" }}>
                    click
                  </button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MembersTable;
