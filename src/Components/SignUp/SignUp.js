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

const DEFAULT_MESSAGE = "Welcome! Please enter your email!";

export default function SignUp() {
  const [typeWriterText, setTypeWriterText] = useState(DEFAULT_MESSAGE);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeStep, setActiveStep] = useState(4);

  const handleActiveStep = (enteredActiveStage) => {
    setActiveStep(enteredActiveStage);
  };

  const handleEmailChange = (enteredValue) => {
    setEmail(enteredValue);
  };

  const handlePasswordChange = (enteredValue) => {
    setPassword(enteredValue);
    submitRequest();
  };

  function submitRequest() {
    var body = { email, password };
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
        return (
          <ImageUploadCard/>
        );
    }
  }

  return (
    <div className="main-container">
      <div container className="multistage-container">
        <MultiStage activeStage={activeStep} className="stages" />
      </div>
      {/* <div className="typewriter-container">
        <Typewriter
          options={{
            delay: 30,
          }}
          onInit={(typewriter) => {
            typewriter.typeString(typeWriterText).pauseFor(2500).start();
          }}
        />
      </div> */}
      {cardSwitcher()}
    </div>
  );
}
