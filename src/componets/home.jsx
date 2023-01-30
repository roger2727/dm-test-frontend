import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import RandomRecipes from "./RandomRecipes";
import RecipeCarousel from "./Carousel";
import SearchRecipes from "./SearchRecipes";
import Nav from "./Nav";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <Nav />
      <div>
        <SearchRecipes />
      </div>
      <div>
        <RandomRecipes />
      </div>
      <div>
        <RecipeCarousel />
      </div>
    </div>
  );
};

export default Home;
