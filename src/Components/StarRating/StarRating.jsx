import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./StarRating.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function StarRating({ id }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [totalStars] = useState(5);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    axios
      .get(`https://hatley.runasp.net/api/Rating/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRating(response.data.value);
        setSelectedIndex(response.data.value - 1);
      })
      .catch((error) => {
        console.error("Error fetching rating:", error);
      });
  }, [id, token]);

  // Function to handle selecting a star and submitting the rating to the server
  const handleSelect = (index) => {
    const selectedRating = index + 1;
    setRating(selectedRating);
    setSelectedIndex(index);

    const url =
      selectedIndex === null
        ? `https://hatley.runasp.net/api/Rating?value=${selectedRating}&orderid=${id}`
        : `https://hatley.runasp.net/api/Rating/${id}/${selectedRating}`;

    const method = selectedIndex === null ? "post" : "put";

    axios({
      method: method,
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const successMessage =
          method === "post"
            ? "Rating submitted successfully"
            : "Rating updated successfully";
        Swal.fire("Success", successMessage, "success");
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              Swal.fire(
                "Error",
                `Bad Request: ${error.response.data}`,
                "error"
              );
              break;
            case 404:
              Swal.fire("Error", `Not Found: ${error.response.data}`, "error");
              break;
            default:
              Swal.fire(
                "Error",
                `Error submitting rating: ${error.response.data}`,
                "error"
              );
          }
        } else {
          Swal.fire("Error", `Network error: ${error.message}`, "error");
        }
      });
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              checked={currentRating === rating}
              onChange={() => handleSelect(index)}
            />
            <span
              className="star"
              style={{
                color:
                  currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              <FontAwesomeIcon icon={faStar} />
            </span>
          </label>
        );
      })}
      {/* {selectedIndex !== null && <p>Selected index: {selectedIndex + 1}</p>} */}
    </div>
  );
}

export default StarRating;
