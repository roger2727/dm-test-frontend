import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import SearchRecipes from "./SearchRecipes";
import "./RecipeCategory.css";
const RecipeTitle = () => {
  const [recipes, setRecipes] = useState([]);
  const { title } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:4001/public/search-title/${title}`
        );
        const data = await res.json();
        setRecipes(data.recipes);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [title]);

  return (
    <div className="category-page">
      <Nav />
      <SearchRecipes />
      <h2>Recipes with title {title}</h2>
      <div className="image-container">
        {recipes.map((recipe) => (
          <Link key={recipe._id} to={`/${recipe._id}`}>
            <img src={recipe.image} alt={recipe.title} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipeTitle;
