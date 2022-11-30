import React, { useState, useEffect } from "react";

import "./ProfilePill.css";

const menuItems = [
  "Profile",
  "Settings",
  "Notifications",
  "Dashboard",
  "Log out",
];

export default function ProfilePill(props) {
  const [menuDrawn, setMenuDrawn] = useState(false);
  const [notifications, setNotifications] = useState(2);
  // /JSON.parse(localStorage.getItem("notifications"))
  const [profileImage, setProfileImage] = useState([]);

  const handleMenuDraw = (e) => {
    setMenuDrawn(!menuDrawn);
  };

  const handleButtonClick = (e, button) => {
    if (button === "Log out") {
      localStorage.setItem("loggedIn", false);
      localStorage.setItem("jwt", "");

      props.onSetLoggedInStatus(false);
    }
  };

  // Note for future self: important to use async await as you do not want to
  // create an ObjectURL before the image has been loaded

  const fetchImage = async () => {
    var jwt = localStorage.getItem("jwt");
    var imageURL;

    const response = await fetch("/api/v1/images/download/" + 1, {
      credentials: "include",
      method: "GET",
      headers: { Authorization: "Bearer " + jwt },
    });

    const imageBlob = await response.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);

    setProfileImage(imageObjectURL);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  function renderMenuItems() {
    return (
      <div className="menu">
        {menuItems.map((item) => (
          <button
            onClick={(event) => handleButtonClick(event, item)}
            className="menu-item"
          >
            {item}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="main-container">
      {menuDrawn ? renderMenuItems() : null}
      <button
        onClick={handleMenuDraw}
        variant="outlined"
        className="profile-container"
      >
        <div className="icon">
          <img className="icon" src={profileImage}></img>
        </div>
        <h1 className="profile-name">Farooq Al-Saadi</h1>
        {notifications != 0 ? (
          <div className="notification">{notifications}</div>
        ) : null}
      </button>
    </div>
  );
}
