import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Paper, Button, Container } from "@mui/material";
import DefaultImage from "../../Images/default-image.png";
import CustomButton from "../CustomButton/CustomButton";
import CustomTextField from "../TextField/CustomTextField";
import "./ImageUploadCard.css";

export default function ImageUploadCard(props) {
  const [image, setImage] = useState(DefaultImage);
  const [imageChanged, setImageChanged] = useState(false);
  const [approved, setApproved] = useState("");
  const navigate = useNavigate();

  const fileHandler = (e) => {
    setImage(e.target.files[0]);
    setImageChanged(true);
  };

  const handleSubmit = (e) => {
    uploadImage();
  };

  const handleSkip = (e) => {
    navigate("/");
  };

  function createImageURL(image) {
    return URL.createObjectURL(image);
  }

  function uploadImage() {
    const body = new FormData();
    body.append("file", image);

    var jwt = localStorage.getItem("jwt");

    fetch("/api/v1/images/upload/imageType=profile", {
      credentials: "include",
      method: "POST",
      headers: { Authorization: "Bearer " + jwt },
      body: body,
    }).then((response) => {
      if (response.status == 200) {
        console.log("Image uploaded");
        setApproved("approved");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    });
  }

  return (
    <div>
      <div id="createProfileContainer">
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          onChange={fileHandler}
        />
        <label htmlFor="contained-button-file">
          <Button className="image-button" component="span">
            {imageChanged ? (
              <img className="imageChanged" src={createImageURL(image)}></img>
            ) : (
              null
            )}
          </Button>
        </label>

        <div id="inputContainer">
        <CustomTextField placeholder="Enter display name"></CustomTextField>
        <CustomButton onClick={handleSubmit} className="choice-button">
          SUBMIT
        </CustomButton>
        <CustomButton onClick={handleSkip} className="choice-button">
          SKIP FOR NOW
        </CustomButton>
        </div>
      </div>
    </div>
  );
}
