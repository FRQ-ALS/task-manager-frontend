import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CustomTextField from "../TextField/CustomTextField";
import useAlert from "../../Hooks/AlertHook";
import CustomButton from "../CustomButton/CustomButton";
import "./EmailCard.css";

export default function EmailCard(props) {
  const [email, setEmail] = useState("");
  const [fieldVariant, setFieldVariant] = useState("");

  const {setAlert} = useAlert()

  const handleEmailSubmit = (e) => {
    console.log("hello")

    fetch("/api/v1/account/emailcheck", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    }).then((response) => {

      if (!response.ok) {
        response.text().then((text) => setAlert(text, "error"))
        return;
      }

      props.onSetEmail(email);

      setTimeout(() => {
        props.onSetActiveStage(2);
      }, 1000);
    });
  };


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <div
        className="paper-container"
      >
        <CustomTextField
          onChange={handleEmailChange}
          className="field"
          type="email"
          variant={fieldVariant}
          placeholder="Enter your email"
        />
        <CustomButton
          id="sendButton"
          onClick={handleEmailSubmit}
        >
          <SendIcon />
        </CustomButton>
      </div>
    </div>
  );
}
