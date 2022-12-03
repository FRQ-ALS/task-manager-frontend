import React, { useState } from "react";
import "./ProjectTaskBar.css";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import AddProjectDialog from "../../AddProjectDialog/AddProjectDialog";

export default function ProjectTaskBar() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddButton = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <>
      <div id="taskbar-container">
        <SearchIcon className="button" />
        <AddIcon onClick={handleAddButton} className="button" />
      </div>
      <AddProjectDialog open={dialogOpen} />
    </>
  );
}
