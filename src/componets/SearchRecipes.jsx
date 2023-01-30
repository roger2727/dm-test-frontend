import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchRecipes.css";

const SearchRecipes = () => {
  const navigate = useNavigate();
  const [showCategoryButtons, setShowCategoryButtons] = useState(false);
  const [showIngredientButtons, setShowIngredientButtons] = useState(false);
  const [showRecipeNameSearch, setShowRecipeNameSearch] = useState(false);
  const [showServingSize, setShowServingSize] = useState(false);
  const [searchIngredient, setSearchIngredient] = useState("");
  const [searchRecipeName, setSearchRecipeName] = useState("");
  const [servingSize, setServingSize] = useState(0);

  const handleCategoryClick = () => {
    setShowCategoryButtons(!showCategoryButtons);
    setShowIngredientButtons(false);
    setShowRecipeNameSearch(false);
    setShowServingSize(false);
  };

  const handleIngredientClick = () => {
    setShowIngredientButtons(!showIngredientButtons);
    setShowCategoryButtons(false);
    setShowRecipeNameSearch(false);
    setShowServingSize(false);
  };

  const handleRecipeNameClick = () => {
    setShowRecipeNameSearch(!showRecipeNameSearch);
    setShowCategoryButtons(false);
    setShowIngredientButtons(false);
    setShowServingSize(false);
  };

  const handleServingSizeClick = () => {
    setShowServingSize(!showServingSize);
    setShowCategoryButtons(false);
    setShowIngredientButtons(false);
    setShowRecipeNameSearch(false);
  };

  const handleCategorySearch = (category) => {
    navigate(`/category/${category}`);
  };

  const handleIngredientSearch = () => {
    navigate(`/search-ingredients/${searchIngredient}`);
  };

  const handleRecipeNameSearch = () => {
    navigate(`/search-title/${searchRecipeName}`);
  };

  const handleServingSizeSearch = (servingSize) => {
    setServingSize(servingSize);
    navigate(`/search-serving-size/${servingSize}`);
  };

  return (
    <div className="search-group">
      <div className="search-box">
        <h3>Search By</h3>
        <button className="search-btns" onClick={handleCategoryClick}>
          Category
        </button>
        <button className="search-btns" onClick={handleIngredientClick}>
          Ingredients
        </button>
        <button className="search-btns" onClick={handleRecipeNameClick}>
          Recipe Name
        </button>
        <button className="search-btns" onClick={handleServingSizeClick}>
          Serving size
        </button>
      </div>
      {showCategoryButtons && (
        <div className="cat-btns">
          <button
            className="category-btns"
            onClick={() => handleCategorySearch("Breakfast")}
          >
            Breakfast
          </button>
          <button
            className="category-btns"
            onClick={() => handleCategorySearch("Lunch")}
          >
            Lunch
          </button>
          <button
            className="category-btns"
            onClick={() => handleCategorySearch("Dinner")}
          >
            Dinner
          </button>
          <button
            className="category-btns"
            onClick={() => handleCategorySearch("Dessert")}
          >
            Dessert
          </button>
        </div>
      )}
      {showIngredientButtons && (
        <div className="ingredient-search">
          <input
            type="text"
            placeholder="Search by Ingredient"
            value={searchIngredient}
            onChange={(e) => setSearchIngredient(e.target.value)}
          />
          <button onClick={handleIngredientSearch}>Search</button>
        </div>
      )}
      {showRecipeNameSearch && (
        <div className="recipe-name-search">
          <input
            type="text"
            placeholder="Search by Recipe Name"
            value={searchRecipeName}
            onChange={(e) => setSearchRecipeName(e.target.value)}
          />
          <button onClick={handleRecipeNameSearch}>Search</button>
        </div>
      )}
      {showServingSize && (
        <div className="serving-size-btns">
          <button
            className="serve-btn"
            onClick={() => handleServingSizeSearch(1)}
          >
            serves 1
          </button>
          <button
            className="serve-btn"
            onClick={() => handleServingSizeSearch(2)}
          >
            serves 2
          </button>
          <button
            className="serve-btn"
            onClick={() => handleServingSizeSearch(4)}
          >
            serves 3
          </button>
          <button
            className="serve-btn"
            onClick={() => handleServingSizeSearch(6)}
          >
            serves 4
          </button>
        </div>
      )}
    </div>
  );
};
export default SearchRecipes;
