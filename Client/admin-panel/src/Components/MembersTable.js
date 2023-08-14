import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import axios from "axios";
import "../CSS/MembersTable.css";

function MembersTable() {
  const [memberId, setMemberId] = useState("");
  const [memberHistory, setMemberHistory] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const baseUrl = "http://localhost:5001/admin/memberTable";
  useEffect(() => {
    setMemberId(state?.id);
  });
  useEffect(() => {
    if (memberId) {
      console.log(memberId);
      axios
        .post(baseUrl, state)
        .then((res) => {
          setMemberHistory(console.log(res.data[0].history[0]));
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [memberId]);

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
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: memberHistory
        ? memberHistory
        : [{ datae: "123", loginTime: "12:30", logoutTime: "4:40" }],
    });

  const backRout = () => {
    navigate("/");
  };

  return (
    <>
      <div className="table-container">
        <button onClick={backRout}>Back</button>
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
