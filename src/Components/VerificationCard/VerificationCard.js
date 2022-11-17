import React, { useState, useEffect } from "react";
import { Typography, TextField, Paper, Button, Container } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import "./VerificationCard.css";

export default function VerificationCard(props) {
  const [userLocked, setUserLocked] = useState(true);
  const [verified, setVerified] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 1000);
    return () => clearInterval(interval);
  });

  function getData() {
    var email = props.email;

    fetch("api/v1/account/checkVerified/" + email, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((responseJson) => {
          console.log(responseJson);
          localStorage.setItem("userID", responseJson.userID);
        });
        setUserLocked(false);
        setVerified("verified");
        setTimeout(() => {
          props.onSetActiveStage(4);
        }, 3000);
      }
    });
  }

  function isUserLocked() {
    switch (userLocked) {
      case true:
        return (
          <div className="verification-false-container">
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="title">
              Please verify your email address before proceeding
            </p>
          </div>
        );

      case false:
        return (
          <div className="confirmed-container">
            <CheckCircleIcon className="tick"></CheckCircleIcon>
          </div>
        );
    }
  }

  return (
    <div>
      <Paper
        id={verified}
        sx={{ backgroundColor: "#2F3C7E", borderRadius: 5 }}
        className="verification-container"
      >
        {isUserLocked()}
      </Paper>
      {/* <Button variant="outlined" onClick={toggleEnabled}></Button> */}
    </div>
  );
}
