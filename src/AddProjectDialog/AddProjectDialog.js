import React from "react";

import "./AddProjectDialog.css";

export default function AddProjectDialog(props) {
  function renderDialog() {


    return (
    <div id="blur-container">
    <div id="dialog-container"></div>
    </div> 
    );
  }

  return <>{props.open ? renderDialog() : null}</>;
}
