import React, { useState } from "react";
import { Typography, TextField, Paper, Button, Container } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CustomTextField from "../TextField/CustomTextField";
import CustomAlert from "../CustomAlert/CustomAlert";

import "./EmailCard.css";

export default function EmailCard(props) {
  const [email, setEmail] = useState("");
  const [fieldVariant, setFieldVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("EMAIL ALREADY TAKEN");
  const [alertOpen, setAlertOpen] = useState(false)
  const [containerStatus, setContainerStaus] = useState("")

  const handleEmailSubmit = (e) => {
 
    if (!checkEmailSyntax(email)) {
      setFieldVariant("error");
      setTimeout(() => {
        setFieldVariant("");
      }, 1000);
      return;
    }

    fetch("/api/v1/account/emailcheck", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    }).then((response) => {

      if (response.status != 200) {
        setFieldVariant("error");
        return;
      }

      setFieldVariant("success")
      props.onSetEmail(email)

      setTimeout(()=>{
        props.onSetActiveStage(2);
        props.onSetTypeWriter("Enter a password")
      }, 1000)
      
    });
  };


  function checkEmailSyntax(email) {

    if(!email.includes("@")) return false;

    if(!email.includes(".")) return false;

    return true

  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div >
    <Paper 
      sx={{ backgroundColor: "#2F3C7E", borderRadius: 5}}
      className="paper-container"
    >
      <CustomTextField
        onChange={handleEmailChange}
        className="textfield"
        type="email"
        variant={fieldVariant}
      />
      <Button
        className="button"
        variant="contained"
        color="secondary"
        onClick={handleEmailSubmit}
      >
        <SendIcon />
      </Button>
    </Paper>
    {/* <CustomAlert enabled={alertOpen} className="alert" variant="error" message={alertMessage}/> */}
    </div>
    
  );
}
