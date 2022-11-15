import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./SignUp.css";
import { Typography, TextField, Paper, Button, Container } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MultiStage from "../MultistageSignUp/MultiStage";
import Typewriter from "typewriter-effect";
import EmailCard from "../EmailCard/EmailCard";

import CustomTextField from "../TextField/CustomTextField";

const DEFAULT_MESSAGE = "Welcome! Please enter your email!";

export default function SignUp() {
  const [typeWriterText, setTypeWriterText] = useState("HELLO");
  const [email, setEmail] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  const handleActiveStep = (enteredActiveStage) => {
    setActiveStep(enteredActiveStage);
  };

  

  return (
    <div className="main-container">
      <div container className="multistage-container">
        <MultiStage activeStage={activeStep} className="stages" />
      </div>
      <div className="typewriter-container">
        <Typewriter
          options={{
            delay: 30,
          }}
          onInith={(typewriter) => {
            typewriter.typeString(typeWriterText).pauseFor(2500).start();
          }}
        />
      </div>
      <EmailCard onSetActiveStage={handleActiveStep} />
    </div>
  );
}
