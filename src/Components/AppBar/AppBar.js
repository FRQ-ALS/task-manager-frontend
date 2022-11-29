import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { AppBar } from "@mui/material";
import { Container } from "@mui/material";
import "./AppBar.css";
import { Grid } from "@mui/material";
import { Toolbar } from "@mui/material";
import MapsHomeWorkRoundedIcon from "@mui/icons-material/MapsHomeWorkRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import { useNavigate } from "react-router-dom";
import LoginWindow from "../LoginWindow/LoginWindow";
import ProfilePill from "../ProfilePill/ProfilePill";


export default function Appbar() {
  const [loginToggle, setLoginToggle] = useState(false);

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));

  let navigate = useNavigate();

  const signInHandler = () => {
    setLoginToggle(!loginToggle);
  };

  const signUpHandler = () => {
    setLoginToggle(false);
    navigate("/signup");
  };

  const homePageHandler = () => {
    navigate("/home");
  };

  const handleLoggedInStatus = (parameter) => {
    setLoggedIn(parameter);
  };


  return (
    <div>
      <div disableGutters={true} variant="regular" className="main">
        <div container className="home-container">
          <Button onClick={homePageHandler}>
            <MapsHomeWorkRoundedIcon color="secondary" className="homeIcon" />
          </Button>
        </div>
        {!loggedIn ? (
          <div className="login-container">
            <Button
              onClick={signInHandler}
              className="button"
              variant="contained"
              color="secondary"
            >
              SIGN IN
            </Button>

            <Button
              className="button"
              variant="contained"
              color="secondary"
              onClick={signUpHandler}
            >
              {/* <LockOpenRoundedIcon className="lockIcon" color="secondary" /> */}
              SIGN UP
            </Button>
          </div>
        ) : (
          <ProfilePill/>
        )}
      </div>
      <div container className="loginWindow-wrapper">
        {loginToggle ? (
          <LoginWindow
            onSetLoggedInStatus={handleLoggedInStatus}
            className="loginWindow"
          />
        ) : null}
      </div>
    </div>
  );
}
