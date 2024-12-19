import { Button, Col, Row } from "react-bootstrap";
import "./Notification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useCallback } from "react";

function Notification({ name, img, rating, count, price, offer, setOffers }) {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const handleAccept = async () => {
    const { order_id, offer_id, offer_value, delivery_email } = offer.view;
    const url = `https://hatley.runasp.net/api/Offer/User/Accept?orderid=${order_id}&offerid=${offer_id}&price_of_offer=${offer_value}&delivery_email=${delivery_email}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setOffers((prevOffers) =>
          prevOffers.filter((o) => o.view.order_id !== order_id)
        );

        Swal.fire({
          title: "Success!",
          text: "The offer has been accepted. Redirecting to tracking orders page...",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/home/trackingOrdersUser");
        });
      }
    } catch (error) {
      console.error("Error accepting offer:", error);
      Swal.fire({
        title: "Error!",
        text: "There was a problem accepting the offer. Please try again.",
        icon: "error",
      });
    }
  };

  const handleDecline = useCallback(async () => {
    const { order_id, offer_id, offer_value, delivery_email } = offer.view;
    const url = `https://hatley.runasp.net/api/Offer/User/Decline?orderid=${order_id}&offerid=${offer_id}&price_of_offer=${offer_value}&delivery_email=${delivery_email}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setOffers((prevOffers) =>
          prevOffers.filter((o) => o.view.offer_id !== offer_id)
        );

        Swal.fire({
          title: "Declined",
          text: "The offer has been declined.",
          icon: "info",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error declining offer:", error);
      Swal.fire({
        title: "Error!",
        text: "There was a problem declining the offer. Please try again.",
        icon: "error",
      });
    }
  }, [offer, setOffers, token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDecline();
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Clear the timer if the component is unmounted or if the user interacts
  }, [handleDecline]);

  return (
    <div className="notification">
      <Row className="f-row">
        <Col xs={4} className="col_1_img">
          <div className="image-icon-2">
            <img src={img} alt="img" />
            <div style={{ whiteSpace: "nowrap" }}>
              <FontAwesomeIcon icon={faStar} className="not-star" />
              {rating} ({count})
            </div>
          </div>
        </Col>
        <Col xs={6}>
          <span className="name">{name}</span>
        </Col>
        <Col xs={2}>
          <span className="col_3_price">EGP{price}</span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="Not-buttons">
          <Button className="me-2 mb-3" onClick={handleDecline}>
            Decline
          </Button>
          <Button className="mb-3" onClick={handleAccept}>
            Accept
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Notification;
