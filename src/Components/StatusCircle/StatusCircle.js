import react from "react";
import "./StatusCircle.css";

export default function StatusCircle(props) {


  return (
    <div
      onMouseOver={(event) => console.log("Mouse Over " + props.taskId)}
      id="circle"
      className={"approved"}
    ></div>
  );
}
