import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Paper,
  Button
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CssBaseline from "@mui/material/CssBaseline";

import "./Dashboard.css";

export default function Dashboard() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const stages = [
    {
      id: 1,
      title: "Do this.....",
      description: "And this......",
    },
    {
      id: 2,
      title: "Do this.....",
      description: "And this......",
    },
    {
      id: 3,
      title: "Do this.....",
      description: "And this......",
    },
    {
      id: 4,
      title: "Do this.....",
      description: "And this......",
    },
  ];

  var tasks = [
    {
      id: 1,
      title: "Build Endpoint",
      description: "Build endpoint for the login/registration system.",
    },
    {
      id: 2,
      title: "Test Title 2",
      description: "Test Description 2",
    },
    {
      id: 3,
      title: "Test Title 3",
      description: "Test Description 3",
    },
    {
      id: 4,
      title: "Test Title 4",
      description: "Test Description 4",
    },
  ];

  return (
    <div className="container">
      <CssBaseline />
      {tasks.map((task) => (
        <Accordion
          className="item"
          expanded={expanded === task.id}
          onChange={handleChange(task.id)}
          sx={{
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            className="title"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0, fontWeight:'bold' }}>
              {task.title}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {task.description}
            </Typography>
            <Button>LOL</Button>
          </AccordionSummary>

          <AccordionDetails className="details">
            {stages.map((stage) => (
              <Paper className="paper">{stage.id}</Paper>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
