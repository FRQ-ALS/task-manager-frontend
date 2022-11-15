import React, { useState } from "react";
import { Typography, TextField, Paper, Button, Container } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CustomTextField from "../TextField/CustomTextField";

import "./EmailCard.css";

export default function EmailCard(props) {
  const [email, setEmail] = useState("");
  const [fieldVariant, setFieldVariant] = useState("");

  const handleEmailSubmit = (e) => {
    setFieldVariant("")
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
      props.onSetActiveStage(2);
    });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Paper
      sx={{ backgroundColor: "#2F3C7E", borderRadius: 10 }}
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
  );
}
