import React from "react";
import Button from "react-bootstrap/Button";
import "./TimeLine.css";
// import { useNavigate } from "react-router-dom";

function ButtonRating({ textButton, status, handleCloseModal }) {
  // const navigate = useNavigate();

  // Function to handle clicking the button
  const handleClick = () => {
    // navigate("/reviewForm"); // Navigate to the review form page
    handleCloseModal(); // Close the modal
  };

  return (
    <Button
      className="rating-button"
      disabled={status < 3} // Disable the button if status is less than 3
      onClick={handleClick} // Call handleClick function when the button is clicked
    >
      {textButton}
    </Button>
  );
}

export default ButtonRating;
