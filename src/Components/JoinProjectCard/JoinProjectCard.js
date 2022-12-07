import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./JoinProject.css";

const projects = [1, 2, 3, 4, 5, 6, 7, 8];
const collaborators = [1, 2, 3, 4];

export default function JoinProjectCard() {
  const params = useParams();
  const jsonArray = JSON.stringify(params);
  const token = JSON.parse(jsonArray).token;
  const [projectData, setProjectData] = useState("");
  
  const taskStatus = [
    {
      name: "Pending",
      value: projectData.pendingTasks,
    },
    {
      name: "Completed",
      value: projectData.completedTasks,
    },
    {
      name: "Blocked",
      value: projectData.blockedTasks,
    },
  ];

  let jwt = localStorage.getItem("jwt");

  useEffect(() => {
    fetch(`api/v1/projects/getProjectByToken/${token}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setProjectData(responseJson);
      });
  }, []);

  return (
    <div id="project">
      <h1 id="heading">{projectData.projectTitle}</h1>
      <div id="status-container">
        {taskStatus.map((status, index) => (
          <div key={index} id="mappedStatus">
            <div id="status-indicator" className={status.name}>
              {status.value}
            </div>
            <h1 id="task-status-heading">{status.name}</h1>
          </div>
        ))}
      </div>
      <div id="collaborators">
        {collaborators.map((user) => (
          <div id="user">
            <img
              id="image"
              src="https://i.picsum.photos/id/900/200/200.jpg?hmac=ZrAJ9H_K0TLi9qA-7h0aKGGzI3tLtlu1lx6ntCljBfc"
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
}
