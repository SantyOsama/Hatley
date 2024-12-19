import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import "./OrderDelivery.css";
import ToFrom from "../ToFrom/ToFrom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Report } from "../../Routes";
import StarForComment from "../StarForComment/StarForComment";

//
function OrderDelivery({ order }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const noOp = () => {};
  noOp(navigate);
  // Function to handle opening the modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <div className="order col-12">
        <Row className="mb-3 ">
          <div className="profile-box ">
            <Col className="delivery-image w-100 w-sm-auto">
              <img src={order.photo} alt="" className="delivery-picture" />
            </Col>
            <Col className="delivery-name w-100 w-sm-auto">
              <span className="">{order.name}</span>
            </Col>
            <Col className="delivery-rating w-100 w-sm-auto">
              <div>
                <StarForComment coloredStars={order.order_rate} num={5} />
              </div>
            </Col>
          </div>
        </Row>

        <Row className="border-1">
          <Col className="text-start">
            <div className="order-date-id ms-5">
              <p>
                Order ID: <span>{order.order_id}</span>
              </p>
              <p>
                Date: {new Date(order.created).toLocaleDateString()} at{" "}
                {new Date(order.created).toLocaleTimeString()}
              </p>
              <p>
                Price:<span> {order.price} EGP</span>
              </p>
            </div>
          </Col>
          <Col className="text-center order-status">
            <div>
              <span className="status">Completed</span>
              <div className="place-to-from">
                <ToFrom
                  to={`${order.order_zone_from}, ${order.order_city_from}`}
                  from={`${order.order_zone_to}, ${order.order_zone_to}`}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row className=" order-details">
          <Col>
            <p className="text-start ms-5">Details: {order.description}</p>
          </Col>
        </Row>
        <Row className=" order-buttons">
          <Col className="buttons">
            <Button className="Report-button" onClick={handleOpenModal}>
              Report
            </Button>
            <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header
                closeButton
                style={{
                  backgroundColor: "#0055b9",
                  color: "white",
                }}
              >
                <Modal.Title className="add-report-margin">Report</Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  backgroundColor: "#0055b9",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderEndEndRadius: "6px",
                  borderEndStartRadius: "6px",
                }}
              >
                <Report />
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default OrderDelivery;
