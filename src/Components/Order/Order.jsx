import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import "./Order.css";
import ToFrom from "../ToFrom/ToFrom";
import { useState } from "react";
import { Report, ReOrder } from "../../Components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Order({
  id,
  description,
  orderGovernorateFrom,
  orderZoneFrom,
  orderCityFrom,
  detailesAddressFrom,
  orderGovernorateTo,
  orderZoneTo,
  orderCityTo,
  detailesAddressTo,
  orderTime,
  price,
  status,
  deliveryName,
  deliveryPhoto,
  deliveryAvgRate,
  orderRate,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showReModal, setShowReModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenReModal = () => setShowReModal(true);
  const handleCloseReModal = () => setShowReModal(false);

  const handleSubmitSuccess = () => {
    handleCloseReModal();
    navigate("/home/profile/myOrderPage");
  };

  return (
    <Container>
      <div className="order col-12">
        <Row className="mb-3">
          <div className="profile-box">
            <Col className="delivery-image">
              <img src={deliveryPhoto} alt="" className="delivery-picture" />
            </Col>
            <Col className="delivery-name">
              <span>{deliveryName}</span>
            </Col>
            <Col className="delivery-rating">
              <div>
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1;
                  const isColored = currentRating <= orderRate;
                  return (
                    <span
                      key={index}
                      className="star"
                      style={{
                        color: isColored ? "#ffc107" : "#e4e5e9",
                      }}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                  );
                })}
              </div>
            </Col>
          </div>
        </Row>
        <Row className="border-1">
          <Col className="text-start">
            <div className="order-date-id ms-5">
              <p>
                Order ID: <span>{id}</span>
              </p>
              <p>Date: {new Date(orderTime).toLocaleString()}</p>
              <p>
                Price: <span>{price} EGP</span>
              </p>
            </div>
          </Col>
          <Col className="text-center order-status">
            <div>
              <span className="status" style={{ color: "#009e10" }}>
                Completed
              </span>
              <div className="place-to-from">
                <ToFrom to={orderCityTo} from={orderCityFrom} />
              </div>
            </div>
          </Col>
        </Row>
        <Row className="order-details">
          <Col>
            <p
              className="text-start ms-5"
              style={{ overflowWrap: "break-word" }}
            >
              {description.length > 220
                ? description.substring(0, 220) + "..."
                : description}
            </p>
          </Col>
        </Row>
        <Row className="order-buttons">
          <Col className="buttons">
            <Button className="Report-button" onClick={handleOpenModal}>
              Report
            </Button>
            <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header
                closeButton
                style={{ backgroundColor: "#0055b9", color: "white" }}
              >
                <Modal.Title className="add-report-margin">Report</Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  backgroundColor: "#0055b9",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Report orderId={id} />
              </Modal.Body>
            </Modal>
            <Button className="Re-order-button" onClick={handleOpenReModal}>
              Re-order
            </Button>
            <Modal show={showReModal} onHide={handleCloseReModal} centered>
              <Modal.Header
                closeButton
                style={{ backgroundColor: "#0055b9", color: "white" }}
              >
                <Modal.Title>Re Order</Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  background: "linear-gradient(270deg, #ffffff, #bcdbf8)",
                }}
              >
                <ReOrder
                  action="reorder"
                  orderId={id}
                  props={{
                    description,
                    price,
                    fromLocation: {
                      govern: orderGovernorateFrom,
                      city: orderZoneFrom,
                      state: orderCityFrom,
                      detailedAddress: detailesAddressFrom,
                    },
                    toLocation: {
                      govern: orderGovernorateTo,
                      city: orderZoneTo,
                      state: orderCityTo,
                      detailedAddress: detailesAddressTo,
                    },
                  }}
                  onSubmitSuccess={handleSubmitSuccess}
                />
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Order;
