import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const response = await fetch("http://localhost:4001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/user");
      } else {
        console.error("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password } = formData;

  return (
    <div>
      <Nav />
      <div className="login-box">
        <h1>Login</h1>

        <form className="login-form" onSubmit={onSubmit}>
          <div>
            <label className="login-label" htmlFor="email">
              Email
            </label>
            <input
              className="login-input"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="login-label" htmlFor="password">
              Password
            </label>
            <input
              className="login-input"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <input className="login-input" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
