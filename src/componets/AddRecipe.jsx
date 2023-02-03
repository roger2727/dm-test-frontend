import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "./AddRecipe.css";

const AddRecipe = () => {
  // this under
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const handleSubmit = () => {
    setSubmitClicked(true);
  };
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [],
    instructions: [],
    category: "",

    cookingTime: "",
    servingSize: "",
    rating: "",

    comments: [],
  });
  const [recipeId, setRecipeId] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === "ingredients" || e.target.name === "instructions") {
      const value = e.target.value;
      setFormData({
        ...formData,
        [e.target.name]: value.split("\n"),
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://dm-backend-test-production.up.railway.app/recipes/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ...formData,
            createdAt: new Date(),
          }),
        }
      );
      if (response.ok) {
        console.log(response);
        const json = await response.json();
        setRecipeId(json.recipe._id);
        navigate(`/upload-image/${json.recipe._id}`);
      } else {
        const error = await response.json();
        console.error(error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Nav />
      <h1 className="add-title">Add Recipe</h1>
      <div className="form-box">
        <form onSubmit={onSubmit}>
          <div className="left-half">
            <div>
              <label htmlFor="title">Title</label>
              <input
                className="form-input"
                type="text"
                name="title"
                value={formData.title}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={onChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Dinner">Dinner</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>
            <div>
              <label htmlFor="ingredients">Ingredients</label>
              <textarea
                name="ingredients"
                value={formData.ingredients.join("\n")}
                onChange={onChange}
                required
                placeholder="Example: 
  salt
  chciken
  salad"
              />
            </div>
            <div>
              <label htmlFor="instructions">Instructions</label>
              <textarea
                name="instructions"
                value={formData.instructions.join("\n")}
                onChange={onChange}
                required
                placeholder="Example: 
  Preheat oven to 350°F.
  In a large bowl, combine flour, sugar, and baking powder.
  Add in the butter, eggs, and milk. Mix until well combined."
              />
            </div>
          </div>
          <div className="right-half">
            <div>
              <label htmlFor="cookingTime">Cooking Time (minutes)</label>
              <input
                className="form-input"
                type="number"
                name="cookingTime"
                value={formData.cookingTime}
                onChange={onChange}
                min="10"
                max="200"
                step="10"
                required
              />
            </div>
            <div>
              <label htmlFor="servingSize">Serving Size</label>
              <input
                className="form-input"
                type="number"
                name="servingSize"
                value={formData.servingSize}
                onChange={onChange}
                required
                min="1"
                max="10"
              />
            </div>
            <div>
              <label htmlFor="rating">Rating (out of 5)</label>
              <input
                className="form-input"
                type="number"
                name="rating"
                value={formData.rating}
                onChange={onChange}
                required
                min="1"
                max="5"
              />
            </div>

            <div className="submit-button">
              <button className="form-btn" type="submit">
                Add Recipe
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddRecipe;
