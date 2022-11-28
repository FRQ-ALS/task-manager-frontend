import React from "react";

import { Paper, Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import "./DashboardBar.css"

export default function DashboardBar() {

    return (<Paper className="bar-container">
        <Button className="button" variant="contained">
            <AddCircleOutlineIcon/>
        </Button>
    </Paper>)
}