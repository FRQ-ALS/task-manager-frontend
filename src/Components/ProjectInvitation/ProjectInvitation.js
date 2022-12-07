import React, { useEffect, useState } from "react";

import "./ProjectInvitation.css";
import CustomTextField from "../TextField/CustomTextField";


export default function ProjectInvitation(props) {
  const [buttonSelected, setButtonSelected] = useState(null);

  const handlePromptButton = (e) => {
    let x = e.target.name;
    switch (x) {
      case "Yes":
        setButtonSelected("Yes");
        setInvitation({...invitation, inviteToggled: true})
        break;
      case "No":
        setButtonSelected("No");
        setInvitation({...invitation, inviteToggled: false})
        
    }
  };

  const [invitation, setInvitation] = useState({
    inviteToggled: false,
    expiry: "",
    maximumUses: "",
  });

  const handleDate = (e) => {
    setInvitation({...invitation, expiry: e.target.value})
  };

  const handleMaxNumber = (e) => {
    setInvitation({...invitation, maximumUses: e.target.value})
  };


  useEffect(()=>{

    props.onSetInvitation(invitation)

  }, [invitation])

  return (
    <div id="invitationcontainer">
      <div id="promptcontainer">
        <p1 id="text">Would you like to generate an invitation link?</p1>
        <button
          onClick={handlePromptButton}
          name="Yes"
          id="button"
          className={buttonSelected === "Yes" ? "selected" : ""}
        >
          Yes
        </button>
        <button
          onClick={handlePromptButton}
          name="No"
          id="button"
          className={buttonSelected === "No" ? "selected" : ""}
        >
          No
        </button>
      </div>

      {buttonSelected === "Yes" ? (
        <div id="invFormContainer">
          <div id="expiryContainer">
            <label id="text" for="birthday">
              When should the invite expire?
            </label>
            <input
              onChange={handleDate}
              type="date"
              id="birthday"
              name="birthday"
            />
          </div>

          <div id="expiryContainer">
            <label id="text" for="birthday">
              How many uses should the invite have?
            </label>
            <CustomTextField
              onChange={handleMaxNumber}
              className="uses"
              type="number"
            ></CustomTextField>
          </div>
        </div>
      ) : null}
    </div>
  );
}
