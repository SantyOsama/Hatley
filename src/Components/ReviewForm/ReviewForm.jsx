import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./ReviewForm.css";
import ReviewFormImage from "./../../Tools/Images/ReviewFormImage.svg";
import StarRating from "../StarRating/StarRating"; // Import the StarRating component
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Spinners from "../Spinners/Spinners";
import axios from "axios";

function ReviewForm({ id, delivery_id }) {
  const [reviewText, setReviewText] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [existingComment, setExistingComment] = useState(null);
  const alertRef = useRef(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchExistingComment = async () => {
      try {
        const response = await axios.get(
          `https://hatley.runasp.net/api/Comment/orderid/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          setExistingComment(response.data);
          setReviewText(response.data.text);
        }
      } catch (error) {
        if (error.response.data === "the Comment for order is not exist") {
          setReviewText("");
        } else {
          console.error("Error fetching existing comment:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message || "Failed to fetch existing comment",
          });
        }
      }
    };
    if (token) {
      fetchExistingComment();
    }
  }, [id, token]);
  const handleClickOutside = (event) => {
    if (alertRef.current && !alertRef.current.contains(event.target)) {
      setIsAlertVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const postComment = async (comment) => {
    try {
      let url = `https://hatley.runasp.net/api/Comment`;
      let method = "POST";

      if (existingComment) {
        url = `https://hatley.runasp.net/api/Comment/${id}/${comment.text}`;
        method = "PUT";
        comment.comment_id = reviewText.comment_id;
      }

      const response = await axios({
        method: method,
        url: url,
        data: method === "POST" ? comment : undefined,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      method === "POST"
        ? Swal.fire({
            icon: "success",
            title: "Success",
            text: "Comment posted successfully!",
          })
        : Swal.fire({
            icon: "success",
            title: "Success",
            text: "Comment Updated successfully! close modal.",
          });
      console.log(response);
      return { status: "success" };
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data,
          });
          return { status: "error", message: data };
        } else if (status === 404) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "The delivery does not exist",
          });
          return { status: "error", message: "The delivery does not exist" };
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred during save",
          });
          return { status: "error", message: "An error occurred during save" };
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Network error",
        });
        return { status: "error", message: "Network error" };
      }
    }
  };

  const handleAddReviewClick = async () => {
    if (reviewText.trim() === "") {
      Swal.fire("Error", "Review text cannot be empty", "warning");
      return;
    }

    setIsLoading(true);

    const comment = {
      order_id: id,
      text: reviewText,
    };

    const result = await postComment(comment);

    setIsLoading(false);

    if (result.status === "success") {
      setReviewText("");
      setIsAlertVisible(false);
    } else {
      Swal.fire("Error", result.message, "error");
    }
  };

  // const handleCancelButtonClick = () => {
  //   setIsAlertVisible(false);
  // };

  return (
    <Container>
      <div
        ref={alertRef}
        className={`sweet-pop-alert ${isAlertVisible ? "show" : ""}`}
      >
        {isLoading ? (
          <Spinners />
        ) : (
          <>
            <Row>
              <Col>
                <div className="text-center">
                  <img src={ReviewFormImage} alt="the_image" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-center">
                  <p>How do you rate your experience?</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-center">
                  {/* Include the StarRating component here */}
                  <StarRating id={id} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-center">
                  <input
                    type="text"
                    placeholder="Enter your review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-center">
                  <Button onClick={handleAddReviewClick} disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add review"}
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
    </Container>
  );
}

export default ReviewForm;
