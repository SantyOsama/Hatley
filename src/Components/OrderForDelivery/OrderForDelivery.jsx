import React, { useState } from "react";
import NotificationImage from "./../../Tools/Images/avatar.jpg";
import ToFrom from "../ToFrom/ToFrom";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { format } from "date-fns";
import Offer from "../Offer/Offer";
import "./OrderForDelivery.css";

function OrderForDelivery({
  name = "Undefined",
  OrderDetails = "Null",
  price = "EGP0",
  to = "Undefined",
  from = "Undefined",
  orderId,
  photo,
  rating,
  count = 0,
  time,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const imageSrc = photo || NotificationImage;

  const date = new Date(time);
  const formattedDate = format(date, "yyyy-MM-dd");
  const formattedTime = format(date, "hh:mm a");

  return (
    <Container>
      <div className="orderForDelivery">
        <Row className="align-items-center first-row border-t">
          <Col xs={1} className="orderIdHomeDelivery">
            ID:<span>{orderId}</span>
          </Col>
          <Col className="text-center first-column ">
            <img
              src={imageSrc}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              alt="Notification"
            />
            <div className="start-rating">
              {rating} <span className="">({count})</span>
            </div>
          </Col>
          <Col>
            <div className="text-center nameOfUser ">
              <h2>{name}</h2>
            </div>
          </Col>
          <Col>
            <div className="price-time text-center">
              <span>{price + " EGP"}</span>
              <br />
              <span className="time">{formattedDate}</span>
              <br />
              <span className="time">{formattedTime}</span>
            </div>
          </Col>
        </Row>

        <Row className="mt-3 border-t">
          <Col className="to-from text-center ">
            <ToFrom to={to} from={from} />
          </Col>
        </Row>

        <Row className="mt-3 text-center border-t">
          <Col>
            <p className="order-det">{OrderDetails}</p>
          </Col>
        </Row>

        <Row className="mt-3 text-center border-t ">
          <Col className="order-buttons mt-3">
            <Button className="mb-3" onClick={handleButtonClick}>
              Offer
            </Button>
          </Col>
        </Row>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#0055b9",
            color: "white",
          }}
        >
          <Modal.Title>Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            background: "linear-gradient(243deg, white 0%, #97BADB 100%)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderEndEndRadius: "6px",
            borderEndStartRadius: "6px",
          }}
        >
          <Offer
            onCloseModal={handleCloseModal}
            name={name}
            price={price}
            from={from}
            to={to}
            OrderDetails={OrderDetails}
            orderId={orderId}
            photo={imageSrc}
            date={formattedDate}
            time={formattedTime}
            rating={rating}
            count={count}
          />
        </Modal.Body>
        <Modal.Footer
          style={{
            background: "linear-gradient(243deg, white 0%, #97BADB 100%)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderEndEndRadius: "6px",
            borderEndStartRadius: "6px",
            justifyContent: "space-around",
          }}
        >
          <Button variant="secondary" onClick={handleCloseModal}>
            Ignore
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default OrderForDelivery;

// {/* <FontAwesomeIcon icon={faStar} className="not-star text-center" /> */}
// {/* <Button
//   className="me-2 mb-3"
//   onClick={() =>
//     navigate("/delivery/home-delivery/trackingOrdersDelivery")
//   }
// >
//   Accept
// </Button> */}
