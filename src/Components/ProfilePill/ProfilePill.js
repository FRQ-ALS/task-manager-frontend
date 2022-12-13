import React, { useState, useEffect } from "react";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useAuth from "../../Hooks/AuthHook";
import NotificationBell from "../NotificationBell/NotificationBell";
import "./ProfilePill.css";

const menuItems = ["Profile", "Settings", "Dashboard", "Log out"];

export default function ProfilePill(props) {
  const [menuDrawn, setMenuDrawn] = useState(false);
  const [unreadNotifications, setNotifications] = useState(1);
  // /JSON.parse(localStorage.getItem("notifications"))

  const [profileImage, setProfileImage] = useState([]);
  const {setAuth} = useAuth()

  const handleMenuDraw = (e) => {
    setMenuDrawn(!menuDrawn);
  };

  const handleNotiClick = (e) => {
    props.onToggleNotiTray()
  }

  const handleButtonClick = (e, button) => {
    if (button === "Log out") {
      localStorage.setItem("loggedIn", false);
      setAuth(false)
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
        {menuItems.map((item, index) => (
          <button 
            key={index}
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
      </button>



      <NotificationBell onClick={handleNotiClick}></NotificationBell>
    </div>
  );
}