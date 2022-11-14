import React from "react";
import { Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./SignIn.css";
import { Typography } from "@mui/material";
export default function SignIn() {
  return (
    <div>
      <Typography color="secondary" className="mainHeader">
        CREATE YOUR ACCOUNT
      </Typography>
      <Button className="iconButton">
        <AccountCircleIcon className="icon" />
      </Button>
    </div>
  );
}
