import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import SearchRecipes from "./SearchRecipes";
import "./RecipeCategory.css";
const RecipeCategory = () => {
  const [recipes, setRecipes] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4001/public/category/${category}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.log(err));
  }, [category]);

  return (
    <div className="category-page">
      <Nav />
      <SearchRecipes />
      <h2>Recipes for {category}</h2>
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

export default RecipeCategory;
