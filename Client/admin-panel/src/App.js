import React, { useState } from "react";
import AdminLogin from "./Components/AdminLogin";

import Home from "./Components/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" exact Component={Home} />
        <Route path="AdminLogin" Component={AdminLogin} />
      </Routes>
    </>
  );
}

export default App;
