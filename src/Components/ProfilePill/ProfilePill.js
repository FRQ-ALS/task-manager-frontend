import React, { useState } from "react";

import "./ProfilePill.css";


const menuItems = ["Profile", "Settings", "Dashboard", "Log out"]

export default function ProfilePill() {
  const [menuDrawn, setMenuDrawn] = useState(false);

  const handleMenuDraw = (e) => {
    setMenuDrawn(!menuDrawn);
  };


  function renderMenuItems() {

    return (<div className="menu">
      {menuItems.map((item) => (
        <button className="menu-item">{item}</button>
      ))}
    </div>);
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
          <img
            className="icon"
            src="https://i.picsum.photos/id/208/200/200.jpg?hmac=J1BdqRgAAAId9wernbPINrW38haBGOtrpEqn3m2wjlY"
          ></img>
        </div>

        <h1 className="profile-name">Farooq Al-Saadi</h1>
      </button>
    </div>
  );
}
