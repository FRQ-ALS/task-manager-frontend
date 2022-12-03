import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import Sidebar from "../Sidebar/Sidebar";
import Projects from "../Projects/Projects";

export default function Dashboard() {


  return(
    <div id="dashboard-container">
      {/* <Sidebar id="sidebar" /> */}
      <Projects id="projects"/>
    </div>
  )
}
