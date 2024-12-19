import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./../../Components/StartRatingForDelivery/StarRatingForDelivery.css";

function StarForComment(props) {
  const [totalStars] = useState(props.num);
  const coloredStars = props.coloredStars;

  return (
    <>
      <div className="rating-label">
        {[...Array(totalStars)].map((star, index) => {
          const currentRating = index + 1;
          const isColored = currentRating <= coloredStars;
          return (
            <span
              key={index} // Unique key prop assigned here
              className="star"
              style={{
                color: isColored ? "#ffc107" : "#e4e5e9",
                fontSize: "1em",
                cursor: "text",
              }}
            >
              <FontAwesomeIcon icon={faStar} />
            </span>
          );
        })}
      </div>
    </>
  );
}

export default StarForComment;
