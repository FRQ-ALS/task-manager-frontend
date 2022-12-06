import React from "react";
import "./CustomAlert.css";

export default function CustomAlert(props) {
  const className = "alert " + props.className;

  return (
    <>
      {props.enabled ? (
        <div id="alert" className={className}>
          {props.message}
        </div>
      ) : null}
    </>
  );
}
