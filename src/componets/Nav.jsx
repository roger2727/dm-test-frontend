import React from "react";
import "./Nav.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://https://dinner-mate-backend-production-c888.up.railway.app//auth/logout",
        {
          method: "POST",
        }
      );
      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.log("An error occurred while logging out.");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="nav-box">
      <div className="nav">
        <img className="logo" src={logo} alt="logo" />
        <div>
          <button className="auth-btn" onClick={() => navigate("/")}>
            home
          </button>
          {localStorage.getItem("token") ? (
            <>
              <button className="auth-btn" onClick={() => navigate("/all")}>
                my recipes
              </button>
              <button
                className="auth-btn"
                onClick={() => navigate("/AddRecipe")}
              >
                Add recipe
              </button>
              <button className="auth-btn" onClick={handleLogout}>
                logout
              </button>
            </>
          ) : (
            <>
              <button className="auth-btn" onClick={() => navigate("/login")}>
                login
              </button>
              <button
                className="auth-btn"
                onClick={() => navigate("/register")}
              >
                register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
