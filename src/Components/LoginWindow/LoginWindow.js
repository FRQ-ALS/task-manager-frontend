import React, { useState } from "react";
import CustomTextField from "./../TextField/CustomTextField";
import { TextField, Button } from "@mui/material";
import { Alert, Collapse } from "@mui/material";
import CustomAlert from "../CustomAlert/CustomAlert";

import "./LoginWindow.css";

export default function LoginWindow(props) {
  const className = "window " + props.className;
  const [alertOepn, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    fetch("api/v1/account/authenticate", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    }).then((response) => {
      if (response.status != 200) {
        setAlertOpen(true);
        setAlertText("incorrect email/password");
        return;
      }

      response.json().then((responseJson) => {
        console.log(responseJson);
      });
    });
  };

  return (
    <div className={className}>
      <CustomTextField
        onChange={handleLoginChange}
        name="email"
        placeholder="Email"
        className="login"
      ></CustomTextField>

      <CustomTextField
        onChange={handleLoginChange}
        name="password"
        type="password"
        placeholder="Password"
        className="login"
      ></CustomTextField>
      <Collapse in={alertOepn}>
        <Alert className="login-alert" severity="error">
          {alertText}
        </Alert>
      </Collapse>
      <Button
        onClick={handleLoginSubmit}
        variant="contained"
        color="secondary"
        className="signin-button"
      >
        SIGN IN
      </Button>
      <a className="link" href="/">
        Forgot password?
      </a>
    </div>
  );
}
