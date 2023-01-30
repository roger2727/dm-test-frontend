import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});
  const { recipeId } = useParams();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:4001/public/${recipeId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setRecipe(data.recipe);
      } catch (err) {
        console.error(err);
      }
    };
    getRecipe();
  }, [recipeId]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:4001/recipes/update/${recipeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(recipe),
      });
      navigate(`/public/${recipeId}`);
    } catch (err) {
      console.error(err);
    }
  };
  //form fields
  return (
    <form className="update-form">
      <label>
        Title:
        <input
          type="text"
          value={recipe.title}
          onChange={(event) =>
            setRecipe({ ...recipe, title: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Ingredients:
        <textarea
          value={recipe.ingredients}
          onChange={(event) =>
            setRecipe({ ...recipe, ingredients: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Instructions:
        <textarea
          value={recipe.instructions}
          onChange={(event) =>
            setRecipe({ ...recipe, instructions: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Category:
        <input
          type="text"
          value={recipe.category}
          onChange={(event) =>
            setRecipe({ ...recipe, category: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Cooking Time:
        <input
          type="number"
          value={recipe.cookingTime}
          onChange={(event) =>
            setRecipe({ ...recipe, cookingTime: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Serving Size:
        <input
          type="number"
          value={recipe.servingSize}
          onChange={(event) =>
            setRecipe({ ...recipe, servingSize: event.target.value })
          }
        />
      </label>
      <br />
      <button type="submit" onClick={handleUpdate}>
        Update Recipe
      </button>
    </form>
  );
};
export default UpdateRecipe;
