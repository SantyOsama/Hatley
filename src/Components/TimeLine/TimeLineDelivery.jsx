import React, { useState, Fragment } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { FaCheck, FaSpinner } from "react-icons/fa";
import "./TimeLine.css";
import ToFrom from "../ToFrom/ToFrom";
import { DisplayReviewForDelivery } from "../../Routes";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function TimeLineDelivery({
  statu,
  orderId,
  orderTime,
  zoneFrom,
  cityFrom,
  cityTo,
  zoneTo,
  detailesAdressFrom,
  detailesAdressTo,
}) {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(statu);
  const token = useSelector((state) => state.auth.token);
  console.log(detailesAdressFrom);
  const handleButtonClick = async () => {
    if (status === 3 || status === 4) {
      setShowModal(true);
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to proceed with this action?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, proceed",
        cancelButtonText: "No, cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          switch (status) {
            case -1:
              await handleStart();
              break;
            case 0:
            case 1:
              await handleNext();
              break;
            case 2:
              await handleEnd();
              break;
            default:
              setShowModal(true);
              break;
          }
        }
      });
    }
  };

  const handleStart = async () => {
    try {
      const response = await axios.get(
        `https://hatley.runasp.net/api/Traking/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Start API response:", response.data);
      setStatus(0);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleNext = async () => {
    try {
      const response = await axios.get(
        `https://hatley.runasp.net/api/Traking/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Next API response:", response.data);
      setStatus((prevStatus) => prevStatus + 1);
    } catch (error) {
      handleApiError(error);
    }
  };
  const handleEnd = async () => {
    try {
      const response = await axios.get(
        `https://hatley.runasp.net/api/Traking/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("End API response:", response.data);
      setStatus(3);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) {
        Swal.fire("Error", data, "error");
      } else if (status === 403) {
        Swal.fire(
          "Forbidden",
          "You are not allowed to perform this action.",
          "error"
        );
      } else {
        Swal.fire("API Error", error.message, "error");
      }
    } else {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const buttonText = () => {
    switch (status) {
      case -1:
        return "Start";
      case 0:
        return "Next";
      case 1:
        return "Next";
      case 2:
        return "End";
      case 3:
      case 4:
        return "Reviews";
      default:
        return "Reviews";
    }
  };
  return (
    <Container>
      <>
        <Row className="mt-4 ms-4">
          <Col md={4}>
            <div className="text-start">
              <p>
                Order ID:
                <span className={status >= 3 ? "status_g" : "status_p"}>
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
        <Row>
          <ToFrom to={detailesAdressTo} from={detailesAdressFrom} />
        </Row>
        {/* <Row style={{ paddingLeft: "10px", fontWeight: "regular" }}>
          from: {detailesAdressFrom}
        </Row>
        <Row style={{ paddingLeft: "10px" }}>to: {detailesAdressTo}</Row> */}

        <Row className="mt-2">
          <Col xs={12} md={12}>
            <Row>
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
                        className={
                          status > index ? "active-line" : "inactive-line"
                        }
                      />
                    )}
                  </Fragment>
                ))}
              </div>
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
                  <span>Order Processed</span>
                </div>
              </Col>
              <Col xs={3}>
                <div
                  className={`text-center margin ${
                    status >= 1 ? "status_g" : "status_p"
                  }`}
                >
                  <span>Order Completed</span>
                </div>
              </Col>
              <Col xs={3}>
                <div
                  className={`text-center margin-route ${
                    status >= 2 ? "status_g" : "status_p"
                  }`}
                >
                  <span>Order in Route</span>
                </div>
              </Col>
              <Col xs={3}>
                <div
                  className={`text-end ${
                    status >= 3 ? "status_g" : "status_p"
                  }`}
                >
                  <span>Order Arrived</span>
                </div>
              </Col>
            </Row>
            <Row className="mt-4 mb-3">
              <Col className="text-center">
                <button className="rating-button" onClick={handleButtonClick}>
                  {buttonText()}
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4 className="rating-margin">Rating</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DisplayReviewForDelivery />
          </Modal.Body>
          <Modal.Footer className="text-center justify-content-center">
            <Button variant="secondary" onClick={handleCloseModal}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
}

export default TimeLineDelivery;
