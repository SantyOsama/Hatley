import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import {
  NavbarDelivery,
  SidebarDelivery,
  Comment,
  Spinners,
} from "../../../Components";
import "./DeliveryRatings.css";
import { useSelector } from "react-redux";

function DeliveryRatings() {
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async function fetchRatings() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://hatley.runasp.net/api/Delivery/RatingsWithComments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRatings(response.data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setError("Failed to fetch ratings. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    if (token) {
      fetchRatings();
    }
  }, [token]);

  const filteredRatings = ratings.filter((rating) => rating.comment !== null);

  return (
    <Container fluid>
      <Row>
        <NavbarDelivery />
      </Row>
      <Row className={`flex-column-sm ${"header-order-details-to-right"}`}>
        <Col xs={12} sm={3} md={4} lg={2} className="order-1">
          <div className="sidebar-container">
            <SidebarDelivery />
          </div>
        </Col>
        <Col xs={12} sm={9} md={8} lg={10} className="order-lg-2 order-md-2">
          <div className="all-comments">
            {loading ? (
              <Spinners />
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : filteredRatings.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "100px",
                  height: "100px",
                }}
              >
                No existing comments
              </div>
            ) : (
              <>
                <p>Comments: {filteredRatings.length} comments</p>
                {filteredRatings.map((rating, index) => (
                  <Row key={index} className="one-comment">
                    <Comment
                      coloredStars={rating.rating}
                      num={5}
                      name={rating.user_name}
                      date={new Date(
                        rating.comment_created_at
                      ).toLocaleDateString()}
                      time={new Date(
                        rating.comment_created_at
                      ).toLocaleTimeString()}
                      content={rating.comment}
                      photo={rating.user_photo}
                      orderID={rating.order_id}
                    />
                  </Row>
                ))}
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DeliveryRatings;
