import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import "./order.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import {
  NavbarMakeOrder,
  MessageInput,
  PriceInput,
  Location2Input,
  AlertDismissible,
} from "../../Components";
import { ConfirmOrder } from "../../Routes";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";

function MakeOrder() {
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orderDetails: "",
    price: "",
    fromLocation: {
      govern: "",
      city: "",
      state: "",
    },
    toLocation: {
      govern: "",
      city: "",
      state: "",
    },
    date: "",
    time: "",
  });
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const currentDate = now.toISOString().split("T")[0];
      const currentTime =
        now.toTimeString().split(":")[0] +
        ":" +
        now.toTimeString().split(":")[1];
      setCurrentDate(currentDate);
      setCurrentTime(currentTime);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (name, value) =>
    setFormData({ ...formData, [name]: value });

  const getCurrentLocation = (label) => {
    // Geolocation handling logic
  };
  const [option, setOption] = useState([]);
  const fromCity =
    option.find(
      (option) => option.zone_id === parseInt(formData.fromLocation.city)
    )?.name || "Unknown City";
  const toCity =
    option.find(
      (option) => option.zone_id === parseInt(formData.toLocation.city)
    )?.name || "Unknown City";

  const handleOpenModal = (e) => {
    e.preventDefault();
    if (
      formData.orderDetails &&
      formData.price &&
      formData.toLocation.city &&
      formData.toLocation.govern &&
      formData.toLocation.state &&
      formData.fromLocation.city &&
      formData.fromLocation.govern &&
      formData.fromLocation.state &&
      formData.fromLocation.detailedAddress &&
      formData.toLocation.detailedAddress &&
      formData.date &&
      formData.time
    ) {
      axios
        .get("https://hatley.runasp.net/api/Zone", {
          headers: {
            Accept: "*/*",
          },
        })
        .then((response) => {
          setOption(response.data);
          console.log(response.data);
        });
      setShowModal(true);
    } else {
      Swal.fire("Make sure that you fill all fields first", "", "warning");
    }
    if (
      formData.fromLocation.govern !== null &&
      formData.fromLocation.govern !== undefined &&
      formData.fromLocation.govern !== ""
    ) {
      const fetchGovernNameFrom = async (id) => {
        try {
          const response = await axios.get(
            `https://hatley.runasp.net/api/Governorate/${id}`
          );
          setFormData((prevFormData) => ({
            ...prevFormData,
            fromLocation: {
              ...prevFormData.fromLocation,
              govern: response.data.name,
            },
          }));
        } catch (error) {
          console.error(
            "Error fetching from location governorate name:",
            error
          );
        }
      };
      fetchGovernNameFrom(formData.fromLocation.govern);
    }
    if (
      formData.toLocation.govern !== null &&
      formData.toLocation.govern !== undefined &&
      formData.toLocation.govern !== ""
    ) {
      const fetchGovernNameTo = async (id) => {
        try {
          const response = await axios.get(
            `https://hatley.runasp.net/api/Governorate/${id}`
          );
          setFormData((prevFormData) => ({
            ...prevFormData,
            toLocation: {
              ...prevFormData.toLocation,
              govern: response.data.name,
            },
          }));
        } catch (error) {
          console.error("Error fetching to location governorate name:", error);
        }
      };
      console.log(formData.toLocation.govern);
      fetchGovernNameTo(formData.toLocation.govern);
    }
  };
  const dataToSend = {
    description: formData.orderDetails,
    order_governorate_from: formData.fromLocation.govern,
    order_zone_from: fromCity,
    order_city_from: formData.fromLocation.state,
    order_governorate_to: formData.toLocation.govern,
    order_zone_to: toCity,
    order_city_to: formData.toLocation.state,
    detailes_address_from: formData.fromLocation.detailedAddress,
    detailes_address_to: formData.toLocation.detailedAddress,
    order_time: `${formData.date}T${formData.time}:00.000Z`,
    price: formData.price,
  };
  const token = useSelector((state) => state.auth.token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log();
    console.log("Form Data:", formData);
    console.log("Data to send:", dataToSend);
    try {
      const response = await axios.post(
        "https://hatley.runasp.net/api/Order",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer  ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "You have submitted a new order successfully",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "submit-button",
          },
        });
        navigate("/home/profile/myOrderPage");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          Swal.fire("You must login first", "", "warning");
        } else {
          Swal.fire(
            "Error",
            error.response.data || "An unexpected error occurred",
            "error"
          );
        }
      } else {
        Swal.fire("Error", "Network error or server not responding", "error");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      fromLocation: {
        ...prevFormData.fromLocation,
        govern: "",
      },
      toLocation: {
        ...prevFormData.toLocation,
        govern: "",
      },
    }));
  };
  return (
    <>
      <NavbarMakeOrder />
      <div className="container-data-make">
        <Form onSubmit={handleOpenModal}>
          <Row className="m-2">
            <Col md={7} className="order-Details">
              <Form.Label className="form-label-make-order">
                Order Details
              </Form.Label>
              <MessageInput
                value={formData.orderDetails}
                onChange={(e) =>
                  handleInputChange("orderDetails", e.target.value)
                }
                name="orderDetails"
                label="Order Details"
                placeholder="Enter your order details"
                textareaStyle={{ minHeight: "300px", important: true }} // Apply important
                read={false}
              />
            </Col>
            <Col md={5} className="price-data-time">
              <div className="mb-4 mt-3">
                <PriceInput
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  name="price"
                  label="Price"
                />
              </div>
              <Form.Group className="mb-3">
                <div className="mb-4 mt-3">
                  <Form.Label className="form-label-make-order">
                    Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    min={currentDate}
                    required
                  />
                </div>
                <div className="mb-4 mt-3">
                  <Form.Label className="form-label-make-order">
                    Time
                  </Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    min={formData.date === currentDate ? currentTime : "00:00"}
                    required
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mt-3">
              <div className="text-start">
                <AlertDismissible label={"From"} />
              </div>
              <div className="mt-2 mb-2">
                <Location2Input
                  address={formData.fromLocation}
                  onChange={(value) => handleInputChange("fromLocation", value)}
                  label=""
                  onGetCurrentLocation={() => getCurrentLocation("From")}
                />
              </div>
              <FontAwesomeIcon icon={faArrowDown} className="arrow-icon mb-5" />
              <div className="text-start">
                <AlertDismissible label={"To"} />
              </div>
              <div className="mt-2 mb-2">
                <Location2Input
                  address={formData.toLocation}
                  onChange={(value) => handleInputChange("toLocation", value)}
                  label=" "
                  onGetCurrentLocation={() => getCurrentLocation("To")}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-4 button-1">
              <Button
                variant="primary"
                type="radio"
                style={{
                  border: "3px solid #06004F",
                  backgroundColor: "rgba(255,255,255)",
                  color: "#06004F",
                  height: "45px",
                }}
                disabled
              >
                <div className="d-flex align-items-center">
                  <div style={{ whiteSpace: "nowrap" }}>
                    Cash on delivery
                    <span className="ms-2">
                      <FontAwesomeIcon icon="fa-solid fa-money-bill" />
                    </span>
                  </div>
                </div>
              </Button>
            </Col>
            <Col className="text-center mt-4 disabled-button button-2">
              <Button
                variant="primary"
                type="radio"
                style={{
                  border: "none",
                  backgroundColor: "rgba(255,255,255)",
                  color: "#06004F",
                  height: "45px",
                  cursor: "not-allowed",
                }}
                disabled
              >
                <div style={{ whiteSpace: "nowrap" }}>
                  <span className="me-2">Payment now</span>
                  <FontAwesomeIcon icon="fa-solid fa-credit-card" />
                </div>
              </Button>
            </Col>
            <Col className="text-center mt-4 button-3">
              <Button variant="primary" type="submit" onClick={handleOpenModal}>
                <div style={{ whiteSpace: "nowrap" }}>
                  <span className="me-2">Send Order</span>
                  <FontAwesomeIcon icon="fa-solid fa-circle-check" />
                </div>
              </Button>
              <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header
                  closeButton
                  style={{
                    backgroundColor: "#0055b9",
                    color: "white",
                  }}
                >
                  <Modal.Title className="add-report-margin">
                    Confirm Order
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderEndEndRadius: "6px",
                    borderEndStartRadius: "6px",
                  }}
                >
                  <ConfirmOrder formData={formData} options={option} />
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "space-around" }}>
                  <Col
                    className="mt-6 button-1"
                    style={{ justifyContent: "center", display: "flex" }}
                    xs={{ order: 1 }}
                  >
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                      style={{ height: "45px" }}
                    >
                      <div style={{ whiteSpace: "nowrap" }}>
                        <span className="me-2">Confirm</span>
                        <FontAwesomeIcon icon="fa-solid fa-circle-check" />{" "}
                      </div>
                    </Button>
                  </Col>
                  <Col
                    className="mt-6 button-3"
                    style={{ justifyContent: "center", display: "flex" }}
                  >
                    <Button
                      variant="primary"
                      type="radio"
                      style={{
                        border: "1px solid red",
                        backgroundColor: "rgba(255,255,255)",
                        color: "red",
                        height: "45px",
                        marginLeft: "10px",
                      }}
                      onClick={handleCloseModal}
                    >
                      <div className="d-flex align-items-center">
                        <div style={{ whiteSpace: "nowrap" }}>
                          Cancel
                          <span className="ms-1">
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              style={{ color: "#ff0000" }}
                            />
                          </span>
                        </div>
                      </div>
                    </Button>
                  </Col>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default MakeOrder;
