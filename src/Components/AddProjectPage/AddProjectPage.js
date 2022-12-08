import React, { useState, useRef, useEffect } from "react";

import "./AddProjectPage.css";
import CustomTextField from "../TextField/CustomTextField";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import OwnerTab from "../OwnerTab/OwnerTab";
import CustomAlert from "../CustomAlert/CustomAlert";
import { useNavigate } from "react-router-dom";
import ProjectInvitation from "../ProjectInvitation/ProjectInvitation";
import { render } from "@testing-library/react";

const NAME_TAKEN_MESSAGE =
  "A project with this name already exists on this account, please enter another name.";
const FIELD_EMPTY_MESSAGE =
  "Project name cannot be empty! Please enter a project name";
const BELOW_ZERO_MESSAGE = "The maximum number of uses cannot be 0 or lower";
const INVALID_DATE_MESSAGE = "The selected date must be from tomorrow onwards";

export default function AddProjectPage(props) {
  var jwt = localStorage.getItem("jwt");

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [invitation, setInvitation] = useState("");
  const [pageToggle, setPageToggle] = useState(true);
  const [token, setToken] = useState("");
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

  const handleInvitation = (parameter) => {
    setInvitation(parameter);
  };

  const handleCopyButton = (e) => {
    let copyText = document.getElementById("linkText").innerText;
    // copyText.select()
    // copyText.selectionRange(0,99999)
    navigator.clipboard.writeText(copyText);
    printAlert("Copied to clipboard!");
  };

  const handleSubmit = (e) => {
    if (invitation.isToggled) {
      validateInvitation(invitation);
    }

    let inviteToggled = invitation.inviteToggled;
    let expiry = invitation.expiry;
    let maximumUses = invitation.maximumUses;

    var body = {
      projectName,
      projectDescription,
      isPrivate,
      inviteToggled,
      expiry,
      maximumUses,
    };

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
        response.json().then((responseJson) => {
          setToken(responseJson.token);
        });
        // navigate("/dashboard");
        setPageToggle(false);
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

  function validateInvitation(invite) {
    if (invite.maximumUses <= 0) {
      printAlert(BELOW_ZERO_MESSAGE);
      return;
    }

    const expiryDate = new Date(invite.expiry);

    let today = new Date();

    if (expiryDate <= today) {
      printAlert(INVALID_DATE_MESSAGE);
      return;
    }
  }

  function renderLinkCard() {
    let link = `localhost:3000/joinProject=${token}`;

    return (
      <div id="linkCardContainer">
        <div id="linkCard">
          <p id="linkHeader">Your unique invite link: </p>
          <p id="linkText">{link}</p>
          <button onClick={handleCopyButton} id="linkButton">
            Copy
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div id="pageContainer">
        <CustomAlert enabled={showAlert} message={alertMessage}></CustomAlert>
        {pageToggle ? (
          <div id="form-container">
            <div id="fieldContainer">
              <CustomTextField
                id="projectName"
                className="textfield"
                placeholder="Project Name*"
                onChange={handleNameChange}
              />
              <div className="label">Owned by:</div>
              <OwnerTab />
              <CustomTextField
                id="projectDesc"
                className="textfield"
                placeholder="Project Description(optional)"
                onChange={handleDescriptionChange}
              />
            </div>
            <div id="switchContainer">
              <p1 className="label">Private</p1>
              <ToggleSwitch onSetToggle={handleSwitchToggle} />
              <p1 className="label">Public</p1>
            </div>
            <ProjectInvitation onSetInvitation={handleInvitation} />
            <button onClick={handleSubmit} id="submit">
              Create Project
            </button>
          </div>
        ) : (
          renderLinkCard()
        )}
      </div>
    </>
  );
}
