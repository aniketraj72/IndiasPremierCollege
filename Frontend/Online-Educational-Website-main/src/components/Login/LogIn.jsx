import React, { useState } from "react";
import "./LogIn.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    console.log("e" + e);
    e.preventDefault();
    axios
      .post("http://localhost:8000/register", {
        email: email,
        username: username,
        password: password,
      })
      .then((response) => {
        console.log("signup" + response.status);
        if (response.status === 201) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("err" + err);
      });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login", {
        email: email,
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          console.log("in 23");
          localStorage.setItem("token", "authenticated");
          navigate("/");
        }
        //   setAuthenticated(true);
        // } else {
        //   setAuthenticated(false);
        // }
      })
      .catch((error) => {
        // Handle errors, e.g., network issues
        console.error(error);
      });
  };

  const toggleForm = () => {
    const loginForm = document.querySelector(".login-form");
    const registerForm = document.querySelector(".register-form");

    if (registered) {
      loginForm.style.display = "block";
      registerForm.style.display = "none";
    } else {
      loginForm.style.display = "none";
      registerForm.style.display = "block";
    }

    setRegistered(!registered);
  };
  return (
    <div class="login-page">
      <div class="form">
        <form class="register-form">
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="text"
            placeholder="email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button onClick={handleSignup}>create</button>
          <p class="message">
            Already registered?{" "}
            <a href="#" onClick={toggleForm}>
              Sign In
            </a>
          </p>
        </form>
        <form class="login-form">
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button onClick={handleLogin}>login</button>
          <p class="message">
            Not registered?
            <a href="#" onClick={toggleForm}>
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
