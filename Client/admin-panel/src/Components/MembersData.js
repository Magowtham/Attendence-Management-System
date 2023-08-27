import React, { useState } from "react";

function MembersData() {
  const data = ["gowtham", "rahil", "charan", "sathish"];

  const TableCell = ({ data, click }) =>
    click ? <input type="text" value={data} /> : <td>{data}</td>;
  return (
    <>
      <table>
        <tbody>
          {data.map((data, index) => (
            <tr>
              <TableCell data={data} click={false} />
              <button>click</button>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default MembersData;
