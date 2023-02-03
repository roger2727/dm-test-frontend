import React, { useState } from "react";

const SaveRecipeButton = ({ recipeId }) => {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch(`/favorites/${recipeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();

      setMessage(result.message);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Save</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SaveRecipeButton;
