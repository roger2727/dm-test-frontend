import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import SearchRecipes from "./SearchRecipes";
import "./RecipeCategory.css";
const RecipeIngrediants = () => {
  const [recipes, setRecipes] = useState([]);
  const { ingredient } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:4001/public/search-ingredients/${ingredient}`
        );
        const data = await res.json();
        setRecipes(data.recipes);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [ingredient]);

  return (
    <div className="category-page">
      <Nav />
      <SearchRecipes />
      <h2>Recipes for {ingredient}</h2>
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

export default RecipeIngrediants;
