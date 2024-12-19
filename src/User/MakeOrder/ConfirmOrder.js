import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
//import { useLocation } from "react-router-dom";
import { MessageInput } from "../../Components";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
function ConfirmOrder({ formData, options }) {
  // const navigate = useNavigate();
  //const location = useLocation();
  //const formData = location.state;
  const [hours, minutes] = formData.time.split(":").map(Number);
  let formattedTime;
  if (hours === 0) {
    formattedTime = `12:${minutes.toString().padStart(2, "0")} AM`;
  } else if (hours === 12) {
    formattedTime = `12:${minutes.toString().padStart(2, "0")} PM`;
  } else if (hours > 12) {
    formattedTime = `${(hours - 12).toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} PM`;
  } else {
    formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} AM`;
  }
  // console.log("Form Data:", formData);
  // console.log("Options:", options);

  const fromCity =
    options.find(
      (option) => option.zone_id === parseInt(formData.fromLocation.city)
    )?.name || "Unknown City";
  const toCity =
    options.find(
      (option) => option.zone_id === parseInt(formData.toLocation.city)
    )?.name || "Unknown City";

  // console.log("From City:", fromCity);
  // console.log("To City:", toCity);
  return (
    <>
      <Row className="m-2">
        <Col md={7} className="order-Details">
          <Form.Label className="form-label-make-order">
            Order Details
          </Form.Label>
          <MessageInput
            value={formData.orderDetails}
            name="orderDetails"
            label="Order Details"
            placeholder="Enter your order details"
            textareaStyle={{ minHeight: "240px", important: true }} // Apply important
            read={true}
          />
        </Col>
        <Col md={5} className="price-data-time">
          <div className="mb-4">
            <Form.Label className="form-label-make-order">{"Price"}</Form.Label>
            <div
              style={{
                color: "#5BB264",
                fontSize: "xx-large",
                fontWeight: "bold",
              }}
            >
              {formData.price} EGP
            </div>
          </div>
          <Form.Group className="mb-3">
            <div className="mb-4 mt-3">
              <Form.Label className="form-label-make-order">Date</Form.Label>
              <div>{formData.date}</div>
            </div>
            <div className="mb-4 mt-3">
              <Form.Label className="form-label-make-order">Time</Form.Label>
              <div>{formattedTime}</div>
            </div>
          </Form.Group>
        </Col>
      </Row>
      <Row style={{ margin: "0px", marginBottom: "20px" }}>
        <Col md={12}>
          <Container fluid>
            <Row>
              <p
                style={{
                  marginTop: "-10px",
                  marginBottom: "0px",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                From:
              </p>
              <div
                style={{
                  margin: "5px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <div>{formData.fromLocation.govern}</div>
                <div>{fromCity}</div>
                <div>{formData.fromLocation.state}</div>
              </div>
            </Row>
            <Row>
              <Col xs={12}>
                <input
                  style={{
                    backgroundColor: "white",
                    border: "1px solid gray",
                    borderRadius: "5px",
                    height: "40px",
                    width: "100%",
                    padding: "5px",
                  }}
                  type="text"
                  value={formData.fromLocation.detailedAddress}
                  readOnly
                />
                {/* {formData.fromLocation.detailedAddress.length > 50
                    ? formData.fromLocation.detailedAddress.slice(0, 50) +
                      "...."
                    : formData.fromLocation.detailedAddress} */}
              </Col>
            </Row>
          </Container>
          <FontAwesomeIcon
            icon={faArrowDown}
            className="arrow-icon"
            style={{ marginLeft: "45%", marginTop: "0px" }}
          />
          <Container fluid>
            <Row>
              <p
                style={{
                  marginTop: "-10px",
                  marginBottom: "0px",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                To:
              </p>
              <div
                style={{
                  margin: "5px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <div>{formData.toLocation.govern}</div>
                <div>{toCity}</div>
                <div>{formData.toLocation.state}</div>
              </div>
            </Row>
            <Row>
              <Col xs={12}>
                <input
                  style={{
                    backgroundColor: "white",
                    border: "1px solid gray",
                    borderRadius: "5px",
                    height: "40px",
                    width: "100%",
                    padding: "5px",
                  }}
                  type="text"
                  value={formData.toLocation.detailedAddress}
                  readOnly
                />
                {/* {formData.toLocation.detailedAddress.length > 50
                    ? formData.toLocation.detailedAddress.slice(0, 50) + "..."
                    : formData.toLocation.detailedAddress} */}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
}
export default ConfirmOrder;
