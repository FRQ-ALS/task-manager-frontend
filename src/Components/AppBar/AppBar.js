import { Button, Typography } from "@mui/material";
import React from "react";
import { AppBar } from "@mui/material";
import { Container } from "@mui/material";
import "./AppBar.css";
import { Grid } from "@mui/material";
import { Toolbar } from "@mui/material";
import MapsHomeWorkRoundedIcon from "@mui/icons-material/MapsHomeWorkRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import { useNavigate } from "react-router-dom";

export default function Appbar() {
  let navigate = useNavigate();

  const signInHandler = () => {
    navigate("/signup");
  };

  const homePageHandler = () => {
    navigate("/home");
  };

  return (
    <div disableGutters={true} variant="regular" className="main">
      <div container className="home-container">
        <Button onClick={homePageHandler}>
          <MapsHomeWorkRoundedIcon color="secondary" className="homeIcon" />
        </Button>
      </div>

      <div className="login-container">
        <Button className="button" variant="contained" color="secondary">
          SIGN IN
        </Button>

        <Button
          className="button"
          variant="contained"
          color="secondary"
          onClick={signInHandler}
        >
          {/* <LockOpenRoundedIcon className="lockIcon" color="secondary" /> */}
          SIGN UP
        </Button>
      </div>
    </div>
  );
}
