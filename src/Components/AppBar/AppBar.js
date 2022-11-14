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
        navigate("/login")

    }

    const homePageHandler = () => {
        navigate("/home")
    }



  return (
    <AppBar position="static">
      <Container className="container" maxWidth="x1">
        <Toolbar disableGutters={true} variant="regular">
          <Grid sx={{ flexGrow: 5}} container spacing={135}>
            <Grid item>
              <Button onClick={homePageHandler} >
                <MapsHomeWorkRoundedIcon
                  color="secondary"
                  className="homeIcon"
                />
              </Button>
            </Grid>
            <Grid item >
              <Button onClick={signInHandler}>
                <LockOpenRoundedIcon className="lockIcon" color="secondary" />
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
