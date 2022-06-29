import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ContextProvider } from "../../Global/Context";
import "./Login.css";

function Login() {

    const { login } = useContext(ContextProvider);

  // handling form inputs
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const loginUser = (e) => {
    e.preventDefault();
    login(inputs);
    setInputs({email: "", password: "" });
  };
  return (
    <div className="login">
      <h1 className="login__logo">Login</h1>

      <div className="login__container">
        <form onSubmit={loginUser}>
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
            Log In
          </button>
        </form>
        <div className="signup__item">
          <span className="signup__instruction">Don't have an account?</span>
          <Link to="/SignUp" className="signup__button">
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
