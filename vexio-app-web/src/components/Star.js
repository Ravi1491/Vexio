import "../App.css";

import React, { useState } from "react";

const StarRating = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (index) => {
    onRatingChange(index);
  };

  const handleStarHover = (index) => {
    setHoveredRating(index);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const getStarIcon = (index) => {
    const filled = index <= (hoveredRating || rating);
    const halfFilled =
      index - 0.5 <= (hoveredRating || rating) &&
      index > (hoveredRating || rating);

    return (
      <span
        key={index}
        className={`star ${filled ? "filled" : ""} ${
          halfFilled ? "half-filled" : ""
        }`}
        onClick={() => handleStarClick(index)}
        onMouseEnter={() => handleStarHover(index)}
        onMouseLeave={handleStarLeave}
      >
        {filled ? "\u2605" : "\u2606"}{" "}
        {/* Unicode character for filled and empty stars */}
      </span>
    );
  };

  const renderStars = () => {
    const stars = [];
    const totalStars = 5;

    for (let i = 1; i <= totalStars; i++) {
      stars.push(getStarIcon(i));
    }

    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;
