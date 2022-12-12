import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./SignUp.css";
import { Typography, TextField, Paper, Button, Container } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MultiStage from "../MultistageSignUp/MultiStage";
import Typewriter from "typewriter-effect";
import EmailCard from "../EmailCard/EmailCard";
import PasswordCard from "../PasswordCard/PasswordCard";
import VerificationCard from "../VerificationCard/VerificationCard";
import ImageUploadCard from "../ImageUploadCard/ImageUploadCard";

const DEFAULT_MESSAGE = "Enter your email.";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  const handleActiveStep = (enteredActiveStage) => {
    setActiveStep(enteredActiveStage);
  };

  const handleEmailChange = (enteredValue) => {
    setEmail(enteredValue);
  };

  const handlePasswordChange = (enteredValue) => {
    submitRequest(enteredValue);
  };



  function submitRequest(password) {
    var body = { email, password };
    console.log(body);
    fetch("api/v1/account/register", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      console.log(response.status);
    });
  }

  function cardSwitcher() {
    switch (activeStep) {
      case 1:
        return (
          <EmailCard
            onSetEmail={handleEmailChange}
            onSetActiveStage={handleActiveStep}
          />
        );

      case 2:
        return (
          <PasswordCard
            onSetPassword={handlePasswordChange}
            onSetActiveStage={handleActiveStep}
          />
        );

      case 3:
        return (
          <VerificationCard email={email} onSetActiveStage={handleActiveStep} />
        );

      case 4:
        return <ImageUploadCard />;
    }
  }

  return (
    <div id="signUpContainer">
      <MultiStage activeStage={activeStep} className="stages" />
      {cardSwitcher()}
    </div>
  );
}
