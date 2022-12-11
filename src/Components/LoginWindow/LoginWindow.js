import React, { useState, useEffect, useRef } from "react";
import CustomTextField from "./../TextField/CustomTextField";
import "./LoginWindow.css";
import useAuth from "../../Hooks/AuthHook";
import useAlert from "../../Hooks/AlertHook";
import { useNavigate } from "react-router-dom";

export default function LoginWindow(props) {
  const className = "window " + props.className;
  const {setAuth, auth} = useAuth();
  const {setAlert} = useAlert();
  const navigate = useNavigate();



useEffect(()=>{
  let x = JSON.parse(localStorage.getItem("loggedIn"));

  if(x == true) {
    navigate("/home")
  }
  
},[])


  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    fetch("api/v1/account/authenticate", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    }).then((response) => {
      console.log(response)
      if (response.status != 200) {
      setAlert("Incorrect email/password. Please try again", "error")
        return;
      }

      if(response.ok){
        setAuth(true)
        localStorage.setItem("loggedIn", true)
        navigate("/home")
        response.json().then((responseJson) => {
          console.log(responseJson.jwt)
          localStorage.setItem("jwt", responseJson.jwt);
        });
      }
    });
  };

  return (
    <div id="loginScreenContainer">
      <div id="loginContainer" className={className}>
        <CustomTextField
          id="emailField"
          onChange={handleLoginChange}
          name="email"
          placeholder="Email"
          className="login"
        ></CustomTextField>

        <CustomTextField
          id="passwordField"
          onChange={handleLoginChange}
          name="password"
          type="password"
          placeholder="Password"
          className="login"
        ></CustomTextField>
        <button
          onClick={handleLoginSubmit}
          id="signInButton123"
          variant="contained"
          color="secondary"
          // className="signin-button"
        >
          SIGN IN
        </button>
        <a className="link" href="/">
          Forgot password?
        </a>
        <a className="link" href="/signup">
          Don't have an account?
        </a>
      </div>
    </div>
  );
}
