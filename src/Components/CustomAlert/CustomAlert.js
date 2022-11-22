import React from "react";
import "./CustomAlert.css";

export default function CustomAlert(props) {
  const className = "alert " + props.className;

  return (
    <div>
      {props.enabled ? (
        <div id={props.variant} className={className}>
          {props.message}
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
}
