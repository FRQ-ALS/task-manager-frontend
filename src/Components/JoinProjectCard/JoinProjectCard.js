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
  const [profileImage, setProfileImage] = useState([]);


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
        fetchImage()
      });
  }, []);

  const handleJoinButton = (e) => {
    let projectId = projectData.projectID;
    let invitationToken = token;

    let body = { projectId, invitationToken };

    console.log(body);

    fetch("/api/v1/projects/joinProject", {
      credentials: "include",
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.ok) {
        response.text().then((bodyText) => {
          console.log(bodyText);
        });
      }
    });
  };


  const fetchImage = async () => {
    var jwt = localStorage.getItem("jwt");
    var imageURL;

    const response = await fetch("/api/v1/images/download/" + 1, {
      credentials: "include",
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}`},
    });

    const imageBlob = await response.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setProfileImage(imageObjectURL)
  };


  return (
    <div id="joinProjectContainer">
      <div id="joinProjectCard">
        <h1 id="heading">{projectData.projectTitle}</h1>
        {/* <p id="owner">Owned by:{projectData.owner.email}</p> */}

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
                src={profileImage}
              ></img>
            </div>
          ))}
        </div>
        <button onClick={handleJoinButton} id="joinButton">
          JOIN
        </button>
      </div>
    </div>
  );
}
