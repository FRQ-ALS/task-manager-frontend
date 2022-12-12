import React from "react";
import "./CustomButton.css";

export default function CustomButton(props) {
  const className = `defaultButton ${props.className}`


  return <button id={props.id} onClick={props.onClick} className={className}>{props.children}</button>;
}
