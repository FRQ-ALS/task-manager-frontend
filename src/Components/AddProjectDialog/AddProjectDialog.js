import React, { useState, useRef, useEffect } from "react";

import "./AddProjectDialog.css";
import CustomTextField from '../TextField/CustomTextField'


export default function AddProjectDialog(props) {
  const ref = useRef(null);
  const { onClickOutside } = props;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
        props.onClickOutSide(event);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  if (!props.show) return null;

  return (
    <div ref={ref} id="blur-container">
      <div id="dialog-container">
        <CustomTextField id="textfield" className="ProjectName" placeholder="Project Name"></CustomTextField>
        <CustomTextField id="textfield" className="ProjectDesc" placeholder="Project Desc"></CustomTextField>
      </div>
    </div>
  );
}
