import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./StarRatingForDelivery.css";

function StarRatingForDelivery({ coloredStars = 0, name = "Name Null" }) {
  const [hover, setHover] = useState(null);
  const [totalStars] = useState(5);

  const noOp = () => {};
  noOp(hover);
  return (
    <div className="star-rating">
      <div className="rating-label">
        <div className="border-lab">
          <span className="name text-start">{name}:</span>
        </div>
        {[...Array(totalStars)].map((star, index) => {
          const currentRating = index + 1;
          const isColored = currentRating <= coloredStars;
          return (
            <span
              key={index}
              className="star"
              style={{
                color: isColored ? "#ffc107" : "#e4e5e9",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              <FontAwesomeIcon icon={faStar} />
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default StarRatingForDelivery;
