import React, { useState, useRef, useEffect } from "react";

import "./AddProjectPage.css";
import CustomTextField from "../TextField/CustomTextField";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import OwnerTab from "../OwnerTab/OwnerTab";
import CustomAlert from "../CustomAlert/CustomAlert";
import { useNavigate } from "react-router-dom";

const NAME_TAKEN_MESSAGE =
  "A project with this name already exists on this account, please enter another name.";
const FIELD_EMPTY_MESSAGE =
  "Project name cannot be empty! Please enter a project name";
  
export default function AddProjectPage(props) {
  var jwt = localStorage.getItem("jwt");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSwitchToggle = (parameter) => {
    setIsPrivate(parameter);
  };

  const handleSubmit = (e) => {
    var body = { projectName, projectDescription, isPrivate };
    console.log(body);

    if (projectName == "") {
      printAlert(FIELD_EMPTY_MESSAGE);
      return;
    }

    fetch("/api/v1/projects/addproject", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status == 406) {
        printAlert(NAME_TAKEN_MESSAGE);
      }

      if (response.status == 200) {
        navigate("/dashboard");
      }
    });
  };

  function printAlert(message) {
    setShowAlert(true);
    setAlertMessage(message);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  }

  return (
    <div id="form-container">
      <div id="fieldContainer">
        <CustomTextField
          id="textfield"
          className="ProjectName"
          placeholder="Project Name*"
          onChange={handleNameChange}
        />
        <div className="label">Owned by:</div>
        <OwnerTab />
        <CustomTextField
          id="textfield"
          className="ProjectDesc"
          placeholder="Project Description(optional)"
          onChange={handleDescriptionChange}
        />
      </div>
      <div id="switchContainer">
        <p1 className="label">Private</p1>
        <ToggleSwitch onSetToggle={handleSwitchToggle} />
        <p1 className="label">Public</p1>
      </div>
      <button onClick={handleSubmit} id="submit">
        Create Project
      </button>
      <>
        <CustomAlert enabled={showAlert} message={alertMessage}></CustomAlert>
      </>
    </div>
  );
}
