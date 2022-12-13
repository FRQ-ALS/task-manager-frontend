import React from "react";
import { useNavigate } from "react-router-dom";

import ProjectTaskBar from "../ProjectsTaskBar/ProjectTaskBar";

import "./Projects.css";

const projects = [1, 2, 3, 4, 5, 6, 7, 8];
const collaborators = [1, 2, 3, 4];

const taskStatus = ["Pending", "Completed", "Blocked"];

export default function Projects(props) {
  const navigate = useNavigate();

  const buttonHandler = (projectID) => {
    navigate("/project/ 3");
  };

  return (
    <div id={props.id} className="projectsContainer">
      <ProjectTaskBar />
      <div id="project-container">
        {projects.map((project) => (
          <div onClick={buttonHandler} id="project">
            <h1 id="heading">Project Title</h1>
            <div id="status-container">
              {taskStatus.map((status) => (
                <div id="mappedStatus">
                  <div id="status-indicator" className={status}>
                    123
                  </div>
                  <h1 id="task-status-heading">{status}</h1>
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
        ))}
      </div>
    </div>
  );
}
