import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import "./RecipeDetails.css";
import SearchRecipes from "./SearchRecipes";
import Rating from "./Rating";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [showIngredients, setShowIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:4001/public/${id}`);
      const data = await res.json();
      setRecipe(data.recipe);
    }
    fetchData();
  }, [id]);

  const handleIngredientsClick = () => {
    setShowIngredients(!showIngredients);
    setShowInstructions(false);
  };

  const handleInstructionsClick = () => {
    setShowInstructions(!showInstructions);
    setShowIngredients(false);
  };

  return (
    <div>
      <Nav />
      <SearchRecipes />
      <div className="recipe-details">
        <div className="image">
          <h2>{recipe.title}</h2>
          <div className="recipe-image">
            <img src={recipe.image} alt={recipe.title} />
          </div>

          <Rating rating={recipe.rating} />
        </div>
        <div className="recipe-info">
          <button onClick={handleIngredientsClick}>Ingredients</button>
          <button onClick={handleInstructionsClick}>Instructions</button>
          {showIngredients && (
            <ul>
              {recipe.ingredients &&
                recipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
          )}
          {showInstructions && (
            <ol>
              {recipe.instructions &&
                recipe.instructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
            </ol>
          )}
          <p>Category: {recipe.category}</p>
          <p>Cooking Time: {recipe.cookingTime} minutes</p>
          <p>Serving Size: {recipe.servingSize}</p>

          <p>Vegetarian: {recipe.vegetarian ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
