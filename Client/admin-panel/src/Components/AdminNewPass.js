import React from "react";

function AdminNewPass() {
  return (
    <>
      <div className="admin-new-passs-container">
        <form>
          <input type="password" placeholder="Enter new password..." />
          <input type="password" placeholder="Confirm new password.." />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default AdminNewPass;
