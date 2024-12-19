import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./DisplayReviewForDelivery.css";
import StarRatingForDelivery from "../../Components/StartRatingForDelivery/StarRatingForDelivery";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Spinners } from "../../Components";

function DisplayReviewForDelivery() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(
          "https://hatley.runasp.net/api/Rating/last5Ratings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRatings(response.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          Swal.fire("Error", error.response.data, "error");
        } else {
          Swal.fire("API Error", error.message, "error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [token]);

  return (
    <Container>
      <div className="box-model">
        {loading ? (
          <Spinners />
        ) : (
          ratings.map((rating, index) => (
            <Row className="mb-2" key={index}>
              <Col>
                <StarRatingForDelivery
                  coloredStars={rating.value}
                  name={rating.name}
                />
              </Col>
            </Row>
          ))
        )}
      </div>
    </Container>
  );
}

export default DisplayReviewForDelivery;
