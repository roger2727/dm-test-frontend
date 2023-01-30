import React from "react";
import "./Nav.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className="nav-box">
      <div className="nav">
        <img className="logo" src={logo} alt="logo" />
        <div>
          <button className="auth-btn" onClick={() => navigate("/all")}>
            my recipes
          </button>
          <button className="auth-btn" onClick={() => navigate("/AddRecipe")}>
            create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
