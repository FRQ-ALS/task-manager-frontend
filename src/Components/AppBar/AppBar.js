import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
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
import NotificationTray from "../NotificationTray/NotificationTray";

export default function Appbar() {
  const [loginWindowToggle, setLoginWindowToggle] = useState(false);
  const [notiTrayToggle, setNotiTrayToggle] = useState(false);

  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn"))
  );

  let navigate = useNavigate();

  const signInHandler = () => {
    navigate("/login")
  };

  const signUpHandler = () => {
    setLoginWindowToggle(false);
    navigate("/signup");
  };

  const homePageHandler = () => {
    navigate("/home");
  };

  const handleToggleNotiTray = () => {
    setNotiTrayToggle(!notiTrayToggle);
  };

  const handleLoggedInStatus = (parameter) => {
    setLoggedIn(parameter);

    if (parameter == true) {
      setLoginWindowToggle(false);
      navigate("/home");
    }
  };

  return (
    <div>
      <div disableGutters={true} variant="regular" className="main">
        <div container className="home-container">
          <Button onClick={homePageHandler}>
            <MapsHomeWorkRoundedIcon className="homeIcon" />
          </Button>
        </div>
        {!loggedIn ? (
          <div className="login-container">
            <button
              id="signInButton"
              onClick={signInHandler}
        
            >
              SIGN IN
            </button>

            <button
              id="signInButton"
              onClick={signUpHandler}
            >
              SIGN UP
            </button>
          </div>
        ) : (
          <ProfilePill
            onToggleNotiTray={handleToggleNotiTray}
            onSetLoggedInStatus={handleLoggedInStatus}
          />
        )}
      </div>

      {loginWindowToggle ? (
        <div container className="loginWindowWrapper">
          <LoginWindow
            onSetLoggedInStatus={handleLoggedInStatus}
            show={loginWindowToggle}
            onClickOutside={(event) => setLoginWindowToggle(false)}
            className="loginWindow"
          />
        </div>
      ) : null}

      <div className="notificationTrayWrapper">
        <NotificationTray
          show={notiTrayToggle}
          onClickOutSide={(event) => setNotiTrayToggle(false)}
        />
      </div>
    </div>
  );
}
