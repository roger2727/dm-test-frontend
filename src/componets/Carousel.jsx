import React, { useState, useEffect } from "react";
import "./Carousel.css";
import { Link } from "react-router-dom";

const RecipeCarousel = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4001/public/all")
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes))
      .catch((err) => console.log(err));
  }, []);

  const handlePrevClick = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    } else {
      setCurrentIndex(recipes.length - 4);
    }
  };

  const handleNextClick = () => {
    if (currentIndex + 4 < recipes.length) {
      setCurrentIndex(currentIndex + 4);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div>
      <h2>All recipes</h2>
      <div className="carousel-container ">
        <div className="carousel">
          <button className="carousel-btn" onClick={handlePrevClick}>
            Prev
          </button>
          {recipes
            .slice(currentIndex, currentIndex + 4)
            .map((recipe, index) => (
              <Link key={recipe._id} to={`/${recipe._id}`}>
                <img
                  className="carousel-image"
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ flex: "1 0 25%" }}
                />
              </Link>
            ))}
          <button className="carousel-btn" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCarousel;
