import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "./RecipesList.css";

const UserRecipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const { userId } = useParams();
  const [currentUserId, setCurrentUserId] = useState("");

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetch(
          "https://dm-backend-test-production.up.railway.app/recipes/all",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setRecipes(data.recipes);
        setCurrentUserId(data.userId);
      } catch (err) {
        console.error(err);
      }
    };
    getRecipes();
  }, []);

  const handleDelete = async (recipeId) => {
    try {
      await fetch(
        `https://dm-backend-test-production.up.railway.app/recipes/delete/${recipeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // Remove the deleted recipe from the state
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (recipeId) => {
    navigate(`/update/${recipeId}`);
  };

  return (
    <div>
      <Nav />
      <div className="list-box">
        {recipes.map((recipe) => (
          <div className="each" key={recipe._id}>
            {/* display recipe */}
          </div>
        ))}
        {favorites.map((favorite) => (
          <div className="each" key={favorite._id}>
            {/* display favorite recipe */}
          </div>
        ))}
      </div>
      <Nav />
      <div className="list-box">
        {recipes.map((recipe) => (
          <div className="each" key={recipe._id}>
            <h2>{recipe.title}</h2>
            <Link key={recipe._id} to={`/${recipe._id}`}>
              <img
                className="carousel-image"
                src={recipe.image}
                alt={recipe.title}
                style={{ flex: "1 0 25%" }}
              />
            </Link>
            <div>
              {localStorage.getItem("token") &&
              recipe.userId === currentUserId ? (
                <>
                  <button onClick={() => handleDelete(recipe._id)}>
                    Delete
                  </button>
                  <button onClick={() => handleUpdate(recipe._id)}>
                    Update
                  </button>
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRecipes;
