import React from "react";

import "./ProfilePill.css"


export default function ProfilePill() {


    return (
        <button variant="outlined" className="profile-container">
        <div className="icon">
          <img
            className="icon"
            src="https://i.picsum.photos/id/208/200/200.jpg?hmac=J1BdqRgAAAId9wernbPINrW38haBGOtrpEqn3m2wjlY"
          ></img>
        </div>
  
        <h1 className="profile-name">Farooq</h1>
        </button>
      );


}