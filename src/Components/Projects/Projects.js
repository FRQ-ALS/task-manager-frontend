import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectTaskBar from "../ProjectsTaskBar/ProjectTaskBar";
import useAlert from "../../Hooks/AlertHook";
import { GetProfileImage } from "../Functions/GetProfileImage/GetProfileImage";
import "./Projects.css";

const projects = [1, 2, 3, 4, 5, 6, 7, 8];
const collaborators = [1, 2, 3, 4];
const taskStatus = ["Pending", "Completed", "Blocked"];


let jwt = localStorage.getItem("jwt");
export default function Projects(props) {
  const [projectData, setProjectData] = useState();
  const [images, setImages] = useState({})

  const navigate = useNavigate();
  const { setAlert } = useAlert();

  const buttonHandler = (projectID) => {
    navigate("/project/ 3");
  };

  const fetchProjects = () => {
    fetch("/api/v1/projects/getProjects", {
      credentials: "include",
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    }).then((response) => {
      {
        response.ok
          ? response.json().then((responseJson) => setProjectData(responseJson))
          : setAlert("Error retrieing project Data, please reload", "error");
      }
    });
  };
  const renderProjects = () => {
    if (projectData.length === 0) {
      return (
        <div id="loading">
          You currently do not have any projects. Create a new project or join
          an existing one.
        </div>
      );
    }

    return (
      <div id="project-container">
        {projectData.map((project) => (
          <div onClick={buttonHandler} id="project">
            <h1 id="heading">{project.projectTitle}</h1>
            <div id="status-container">
              {taskStatus.map((status) => (
                <div id="mappedStatus">
                  <div id="status-indicator" className={status}>
                    {status == "Pending"
                      ? project.pendingTasks
                      : status == "Completed"
                      ? project.completedTasks
                      : project.blockedTasks}
                  </div>
                  <h1 id="task-status-heading">{status}</h1>
                </div>
              ))}
            </div>
            <div id="collaborators">
              <div id="ownerContainer">
                {/* <img src={GetProfileImage(project.owner.userID)}></img> */}
              </div>
              {project.collaborators.map((user) => (
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
    );
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  console.log(projectData);

  return (
    <div id={props.id} className="projectsContainer">
      <ProjectTaskBar />
      {projectData === undefined ? (
        <div id="loading">Loading...</div>
      ) : (
        renderProjects()
      )}
    </div>
  );
}
