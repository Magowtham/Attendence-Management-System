import React, { lazy, useState, Suspense } from "react";
import Loader from "./Components/Loader";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./Components/Home"));
const AdminLogin = lazy(() => import("./Components/AdminLogin"));
const AdminRegister = lazy(() => import("./Components/AdminRegister"));
const AdminOtp = lazy(() => import("./Components/AdminOtp"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader isSubComponent={false} />}>
        <Routes>
          <Route path="*" exact Component={Home} />
          <Route path="/AdminLogin" Component={AdminLogin} />
          <Route path="/AdminRegister" Component={AdminRegister} />
          <Route path="/AdminOtp" Component={AdminOtp} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
