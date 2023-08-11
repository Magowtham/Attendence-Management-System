import React,{useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom"
import {useTable} from "react-table"
import "../CSS/MembersTable.css";

function MembersTable() {
  const navigate=useNavigate()
  const {state}=useLocation();


  const usrData = [
    { id: 1,date:"7/4/2023", loginTime: "19:30",  logoutTime: "19:30" ,totalHours:"3"},
    { id: 2,date:"7/4/2023", loginTime: "19:30",  logoutTime: "19:30" ,totalHours:"3"},
    { id: 3,date:"7/4/2023", loginTime: "19:30",  logoutTime: "19:30" ,totalHours:"3"},

  ];
  const columns = useMemo(
    () => [
      {
        Header: "SL No.",
        accessor: "id",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Login Time",
        accessor: "loginTime",
      },
      {
        Header:"Logout Time",
        accessor:"logoutTime"
      },  {
        Header:"Totale Hours",
        accessor:"totalHours"
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: usrData,
    });

    const backRout=()=>{
      navigate("/")
    }
  
  return <>
  <div className="table-container">
    <button onClick={backRout} >Back</button>
  <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
 </>;
}

export default MembersTable;
