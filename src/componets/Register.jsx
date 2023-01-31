import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, username };
      await fetch(
        "https://dm-backend-test-production.up.railway.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password, username } = formData;

  return (
    <div>
      <Nav />
      <div className="register-box">
        <h1>Register</h1>
        <form className="register-form" onSubmit={onSubmit}>
          <div>
            <label className="register-label" htmlFor="email">
              Email
            </label>
            <input
              className="register-input"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="register-label" htmlFor="password">
              Password
            </label>
            <input
              className="register-input"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="register-label" htmlFor="username">
              Username
            </label>
            <input
              className="register-input"
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
          </div>
          <input className="register-input" type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default Register;
