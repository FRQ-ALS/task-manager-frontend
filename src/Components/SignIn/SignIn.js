import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./SignIn.css";
import { Typography, TextField, Paper, Button, Container} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';


export default function SignIn() {
  return (
    <div className="main-container">
      <Typography color="primary">Enter your email</Typography>
      <Paper
        sx={{ backgroundColor: "#5D3F6A", borderRadius: 3 }}
        className="paper-container"
      >
        <TextField sx={{borderRadius:20}}  className="field" variant="filled"/>
        <Button className="button" variant="contained" endIcon={<SendIcon/>}/>
      </Paper>
    </div>
  );
}
