import React from "react";
import "../CSS/Loader.css";

function Loader({ isSubComponent }) {
  return (
    <>
      <div className={`loader-container ${!isSubComponent ? `main` : ``} `}>
        <div className="loader">
          <div className="outer-circle"></div>
          <div className="inner-circle"></div>
        </div>
      </div>
    </>
  );
}

export default Loader;
