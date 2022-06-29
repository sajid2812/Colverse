import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ContextProvider } from "../../Global/Context";
import "./Signup.css";

function Signup() {
  const { usersList, register } = useContext(ContextProvider);

  // handling form inputs
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const registerUser = (e) => {
    e.preventDefault();
    console.log(usersList)

    usersList.find((user) => user.displayName === inputs.username)
      ? alert("username already exist")
      : register(inputs);
    setInputs({ username: "", email: "", password: "" });
  };
  return (
    <div className="login">
      <h1 className="login__logo">Sign Up</h1>

      <div className="login__container">
        <form onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleInput}
            value={inputs.username}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            onChange={handleInput}
            value={inputs.email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInput}
            value={inputs.password}
            required
          />
          <button type="submit" className="login__signInButton">
            Sign Up
          </button>
        </form>
        <div className="signup__item">
          <span className="signup__instruction">Already have an account?</span>
          <Link to="/Login" className="signup__button">
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
