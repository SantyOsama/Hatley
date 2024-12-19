import ToFrom from "../ToFrom/ToFrom";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./Offer.css";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function Offer({
  name = "Undefined",
  OrderDetails = "Details:",
  price = 0,
  to = "Undefined",
  from = "Undefined",
  onCloseModal,
  orderId,
  photo,
  date,
  time,
  rating,
  count,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(price);
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);

  const simulateEscKeyPress = () => {
    const escEvent = new KeyboardEvent("keydown", {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      which: 27,
      bubbles: true,
    });
    document.dispatchEvent(escEvent);
  };

  const showWaitingModal = () => {
    Swal.fire({
      title: "Waiting for approval...",
      text: "Please wait for 10 seconds",
      timer: 10000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();

        setTimeout(() => {
          simulateEscKeyPress();
        }, 10000);
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
  };

  const acceptOffer = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://hatley.runasp.net/api/Offer/view?orderid=${orderId}&value=${price}&email=${email}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire("Success", "Offer sent successfully!", "success");
        showWaitingModal();
      } else if (response.status === 401) {
        setError("Unauthorized");
        Swal.fire("Error", "Unauthorized access!", "error");
      } else {
        setError("Error during processing, please try again");
        Swal.fire(
          "Error",
          "Error during processing, please try again",
          "error"
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(
          error.response.data || "Error during processing, please try again"
        );
        Swal.fire(
          "Error",
          error.response.data || "Error during processing, please try again",
          "error"
        );
      } else {
        setError("Error during processing, please try again");
        Swal.fire(
          "Error",
          "Error during processing, please try again",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const updateOffer = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://hatley.runasp.net/api/Offer/view?orderid=${orderId}&value=${currentPrice}&email=${email}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire("Success", "Price updated successfully!", "success");
        showWaitingModal();
      } else if (response.status === 401) {
        setError("Unauthorized");
        Swal.fire("Error", "Unauthorized access!", "error");
      } else {
        setError("Error during processing, please try again");
        Swal.fire(
          "Error",
          "Error during processing, please try again",
          "error"
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(
          error.response.data || "Error during processing, please try again"
        );
        Swal.fire(
          "Error",
          error.response.data || "Error during processing, please try again",
          "error"
        );
      } else {
        setError("Error during processing, please try again");
        Swal.fire(
          "Error",
          "Error during processing, please try again",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePriceUpdate = (newPrice) => {
    setCurrentPrice(newPrice);
    const newOffer = {
      name,
      OrderDetails: `From: ${from}, To: ${to}, ${OrderDetails}`,
      price: newPrice,
      to,
      from,
    };
    const noOp = () => {};
    noOp(newOffer);

    // console.log("New Offer:", newOffer);
  };

  return (
    <Container>
      <Row className="align-items-center first-row border-t">
        <Col xs={1} className="orderIdHomeDelivery">
          ID:<span>{orderId}</span>
        </Col>
        <Col className="text-center first-column">
          <img
            src={photo}
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            alt="Notification"
          />
          <div className="start-rating">
            {rating} <span className="">({count})</span>
          </div>
        </Col>
        <Col>
          <div className="text-center name-of-user">
            <h2>{name}</h2>
            <br />
            <span className="time">{date}</span>
            <br />
            <span className="time">{time}</span>
          </div>
        </Col>
      </Row>

      <Row className="text-center border-t">
        <Col>
          <textarea
            readOnly
            value={OrderDetails}
            style={{
              width: "100%",
              height: "100px",
              border: "1px solid white",
              borderRadius: "10px",
              paddingLeft: "5px",
            }}
          />
        </Col>
      </Row>

      <Row className="border-t">
        <Col className="to-from text-center">
          <ToFrom to={to} from={from} />
        </Col>
      </Row>

      <Row>
        <div className="price-time-offer text-center">
          <span>{currentPrice + " EGP"}</span>
        </div>
      </Row>

      <Row>
        <Col className="mt-3 d-flex justify-content-center">
          <Button
            className="acceptance"
            onClick={acceptOffer}
            disabled={loading}
          >
            {loading ? "Sending..." : `Original Price ${price} EGP `}
          </Button>
        </Col>
      </Row>

      {error && (
        <Row className="mt-3 text-center">
          <Col>
            <div className="text-danger">{error}</div>
          </Col>
        </Row>
      )}

      <Row className="mt-3 text-center border-t">
        <Col className="offer-buttons">
          <span className="not-offer">Show your price:</span>
        </Col>
      </Row>

      <Row className="mt-3 text-center border-t">
        <Col className="offer-buttons-show-your-price">
          <Button
            className="me-4 mb-2 button-2"
            onClick={() => handlePriceUpdate(currentPrice - 5)}
          >{`${"-5"}`}</Button>
          <Button
            className="me-4 mb-2 acceptance"
            onClick={updateOffer}
          >{`${currentPrice} EGP`}</Button>
          <Button
            className="me-4 mb-2 button-3"
            onClick={() => handlePriceUpdate(currentPrice + 5)}
          >{`${"+5"}`}</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Offer;
