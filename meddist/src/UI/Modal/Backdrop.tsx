/** @format */

import React from "react";

import "./Backdrop.css";

const backdrop: React.FC<{ show: boolean; onClick: () => void }> = (props) => {
  const cssClasses = [
    "Backdrop",
    props.show ? "BackdropOpen" : "BackdropClosed",
  ];

  return (
    <div
      onClick={() => {
        props.onClick();
      }}
      className={cssClasses.join(" ")}
    ></div>
  );
};

export default backdrop;
