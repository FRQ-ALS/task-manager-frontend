import React, { useState } from "react";
import { Typography, TextField, Paper, Button, Container } from "@mui/material";
import DefaultImage from "../../Images/default-image.png";
import "./ImageUploadCard.css";

export default function ImageUploadCard(props) {
  const [image, setImage] = useState(DefaultImage);

  const [imageChanged, setImageChanged] = useState(false);

  const fileHandler = (e) => {
    setImage(e.target.files[0]);
    setImageChanged(true);
  };

  const handleSubmit = (e) => {};

  const handleSkip = (e) => {};

  function createImageURL(image) {
    return URL.createObjectURL(image);
  }

  return (
    <div>
      <Paper
        sx={{ backgroundColor: "#2F3C7E", borderRadius: 5 }}
        className="image-container"
      >
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
              <img className="image" src={createImageURL(image)}></img>
            ) : (
              <img className="image" src={image}></img>
            )}
          </Button>
        </label>

        <Button
          onClick={handleSubmit}
          className="choice-button"
          variant="contained"
          color="secondary"
        >
          SUBMIT
        </Button>
        <Button
          onClick={handleSkip}
          className="choice-button"
          variant="contained"
          color="secondary"
        >
          SKIP FOR NOW
        </Button>
      </Paper>
    </div>
  );
}
