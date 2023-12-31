import React, { lazy, useState, Suspense } from "react";
import Loader from "./Components/Loader";
import { Route, Routes } from "react-router-dom";
import Test from "./Components/Test";
const Home = lazy(() => import("./Components/Home"));
const AdminLogin = lazy(() => import("./Components/AdminLogin"));
const AdminRegister = lazy(() => import("./Components/AdminRegister"));
const AdminOtp = lazy(() => import("./Components/AdminOtp"));
const AdminNewPass = lazy(() => import("./Components/AdminNewPass"));

function App() {
  return (
    <>
      {/* <Suspense fallback={<Loader isSubComponent={false} />}>
        <Routes>
          <Route path="*" exact Component={Home} />
          <Route path="/AdminLogin" Component={AdminLogin} />
          <Route path="/AdminRegister" Component={AdminRegister} />
          <Route path="/AdminOtp" Component={AdminOtp} />
          <Route path="/AdminNewPass" Component={AdminNewPass} />
        </Routes>
      </Suspense> */}
      <Test />
    </>
  );
}

export default App;
