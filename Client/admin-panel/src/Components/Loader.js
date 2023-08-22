import React from "react";
import "../CSS/Loader.css";

function Loader() {
  return (
    <>
      <div className="loader-container">
        <div className="loader">
          <div className="outer-circle"></div>
          <div className="inner-circle"></div>
        </div>
      </div>
    </>
  );
}

export default Loader;
