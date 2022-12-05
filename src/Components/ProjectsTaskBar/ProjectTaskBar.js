import React, { useState } from "react";
import "./ProjectTaskBar.css";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import AddProjectDialog from "../AddProjectDialog/AddProjectDialog";

export default function ProjectTaskBar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false)

  const handleAddButton = () => {
    if (dialogOpen === true) return;

    setDialogOpen(!dialogOpen);
  };

  const handleSearchButton = () => {
    setSearchOpen(!searchOpen)
  };

  return (
    <div id="mainContainer">
      <div id="taskbar-container">
        <SearchIcon onClick={handleSearchButton} id="search" className="true" />
        {searchOpen ? <input id="input"></input> : null}
        <AddIcon onClick={handleAddButton} className="button" />
      </div>
      <AddProjectDialog
        show={dialogOpen}
        onClickOutside={(event) => setDialogOpen(false)}
      />
    </div>
  );
}
