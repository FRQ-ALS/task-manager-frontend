import React, { useState, useEffect, useRef } from "react";
import CustomTextField from "./../TextField/CustomTextField";
import { TextField, Button } from "@mui/material";
import { Alert, Collapse } from "@mui/material";
import CustomAlert from "../CustomAlert/CustomAlert";

import "./LoginWindow.css";

export default function LoginWindow(props) {
  const className = "window " + props.className;
  const [alertOepn, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const ref = useRef(null);
  const { onClickOutside } = props;

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  //method that detects whether user has clicked away from window.

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
        props.onClickOutSide(event);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

 

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

      props.onSetLoggedInStatus(true);
      localStorage.setItem("loggedIn", true);

      response.json().then((responseJson) => {
        localStorage.setItem("jwt", responseJson.jwt);
      });
    });
  };

  return (
    <div ref={ref} className={className}>
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
