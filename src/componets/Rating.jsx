import React from "react";
import "./Rating.css";
const Rating = ({ rating }) => {
  const stars = Array(5).fill(0);
  return (
    <div className="star-box">
      {stars.map((_, index) => (
        <span key={index} className={index < rating ? "star" : "star-outline"}>
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default Rating;
