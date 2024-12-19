import React, { Fragment, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { ToFrom, ButtonRating, ReviewForm } from "../../Components";
import "./TimeLine.css";

function Timeline({
  status,
  orderId,
  orderTime,
  zoneFrom,
  cityFrom,
  cityTo,
  zoneTo,
  delivery_id,
  textButton = "Rating",
}) {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

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
      <>
        <Row className="mt-4 ms-4">
          <Col md={4} className="content-col-tracing">
            <div className="text-start">
              <p>
                Order ID:
                <span className={status >= 3 ? "status_g" : "status_p"}>
                  {" "}
                  {orderId}
                </span>
              </p>
              <p>Date: {new Date(orderTime).toLocaleString()}</p>
            </div>
          </Col>
          <Col md={4}></Col>
          <Col md={4} style={{ display: "flex", justifyContent: "center" }}>
            <div className="text-end me-5">
              {status >= 3 ? (
                <p className="complete">Completed</p>
              ) : (
                <p className="pending">Pending</p>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <ToFrom to={`${zoneTo},${cityTo}`} from={`${zoneFrom},${cityFrom}`} />
        </Row>
        <Row className="mt-2">
          <Col xs={12} md={12}>
            <Row key={status}>
              <Fragment key={status}>
                <div className="timeline">
                  {[...Array(4)].map((_, index) => (
                    <Fragment key={index}>
                      <div
                        className={
                          status >= index ? "active-point" : "inactive-point"
                        }
                      >
                        {status >= index ? (
                          <FaCheck className="done-icon" />
                        ) : (
                          <FaSpinner className="loading-icon" />
                        )}
                      </div>
                      {index < 3 && (
                        <div
                          key={`line-${index}`}
                          className={
                            status > index ? "active-line" : "inactive-line"
                          }
                        />
                      )}
                    </Fragment>
                  ))}
                </div>
              </Fragment>
            </Row>
            <Row
              className="mt-2 row-2"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Col xs={3}>
                <div
                  className={`text-start ${
                    status >= 0 ? "status_g" : "status_p"
                  }`}
                >
                  <div>
                    <span>Order Processed</span>
                  </div>
                </div>
              </Col>
              <Col xs={3}>
                <div
                  className={`text-center margin ${
                    status >= 1 ? "status_g" : "status_p"
                  }`}
                >
                  <div>
                    <span>Order Completed</span>
                  </div>
                </div>
              </Col>
              <Col xs={3}>
                <div
                  className={`text-center margin-route ${
                    status >= 2 ? "status_g" : "status_p"
                  }`}
                >
                  <div>
                    <span>Order in Route</span>
                  </div>
                </div>
              </Col>
              <Col xs={3}>
                <div
                  className={`text-end ${
                    status >= 3 ? "status_g" : "status_p"
                  }`}
                >
                  <div>
                    <span>Order Arrived</span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-4 mb-3">
              <Col className="text-center">
                {/* Render the ButtonRating component */}
                <ButtonRating
                  textButton={textButton}
                  status={status}
                  handleCloseModal={handleOpenModal}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Modal to display the ReviewForm component */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title className="add-rating-margin">
              Rate & Review
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReviewForm id={orderId} delivery_id={delivery_id} />
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
}

export default Timeline;
