import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  MessageInput,
  PriceInput,
  Location2Input,
  Spinners,
} from "../../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function ReOrder({ action, orderId, props, onSubmitSuccess }) {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [zones, setZones] = useState([]);
  const [governorates, setGovernorates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: props.description || "",
    price: props.price || "",
    fromLocation: {
      govern: props.fromLocation.govern,
      city: "",
      state: "",
      detailedAddress: props.fromLocation.detailedAddress || "",
    },
    toLocation: {
      govern: props.toLocation.govern,
      city: "",
      state: "",
      detailedAddress: props.toLocation.detailedAddress || "",
    },
    date: "",
    time: "",
  });
  // console.log("props", props);
  // console.log("form data", formData);
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

  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await axios.get("https://hatley.runasp.net/api/Zone", {
          headers: {
            Accept: "*/*",
          },
        });
        setZones(response.data);
      } catch (error) {
        console.error("Error fetching zones:", error);
      }
    };

    const fetchGovernorates = async () => {
      try {
        const response = await axios.get(
          "https://hatley.runasp.net/api/Governorate",
          {
            headers: {
              Accept: "*/*",
            },
          }
        );
        setGovernorates(response.data);
      } catch (error) {
        console.error("Error fetching governorates:", error);
      }
    };

    fetchZones();
    fetchGovernorates();
  }, []);
  // useEffect(() => {
  //   setFormData({
  //     description: props.description || "",
  //     price: props.price || "",
  //     date: currentDate,
  //     time: currentTime,
  //     fromLocation: {
  //       govern: props.fromLocation.govern || "",
  //       city: props.fromLocation.city || "",
  //       state: props.fromLocation.state || "",
  //       detailedAddress: props.fromLocation.detailedAddress || "",
  //     },
  //     toLocation: {
  //       govern: props.toLocation.govern || "",
  //       city: props.toLocation.city || "",
  //       state: props.toLocation.state || "",
  //       detailedAddress: props.toLocation.detailedAddress || "",
  //     },
  //   });
  // }, [props, currentDate, currentTime]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.description ||
      !formData.price ||
      !formData.date ||
      !formData.time ||
      !formData.fromLocation.govern ||
      !formData.fromLocation.city ||
      !formData.fromLocation.state ||
      !formData.fromLocation.detailedAddress ||
      !formData.toLocation.govern ||
      !formData.toLocation.city ||
      !formData.toLocation.state ||
      !formData.toLocation.detailedAddress ||
      !formData.date ||
      !formData.time
    ) {
      Swal.fire("Please fill in all the fields.", "", "warning");
      return;
    }

    const apiUrl =
      action === "edit"
        ? `https://hatley.runasp.net/api/Order/${orderId}`
        : "https://hatley.runasp.net/api/Order";
    console.log("governorates", governorates);
    const method = action === "edit" ? "put" : "post";
    const dataToSend = {
      description: formData.description,
      order_governorate_from:
        governorates.find(
          (gov) => gov.governorate_ID === parseInt(formData.fromLocation.govern)
        )?.name || "Unknown Governorate",
      order_zone_from:
        zones.find(
          (zone) => zone.zone_id === parseInt(formData.fromLocation.city)
        )?.name || "Unknown City",
      order_city_from: formData.fromLocation.state,
      detailes_address_from: formData.fromLocation.detailedAddress,
      order_governorate_to:
        governorates.find(
          (gov) => gov.governorate_ID === parseInt(formData.toLocation.govern)
        )?.name || "Unknown Governorate",
      order_zone_to:
        zones.find(
          (zone) => zone.zone_id === parseInt(formData.toLocation.city)
        )?.name || "Unknown City",
      order_city_to: formData.toLocation.state,
      detailes_address_to: formData.toLocation.detailedAddress,
      order_time: `${formData.date}T${formData.time}:00.000Z`,
      price: formData.price,
    };
    console.log("send this", dataToSend);
    setLoading(true);
    try {
      const response = await axios({
        method: method,
        url: apiUrl,
        data: dataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: `You have ${
            action === "edit" ? "edited" : "reordered"
          } the order successfully`,
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "submit-button",
          },
        }).then(() => {
          onSubmitSuccess();
        });
        setLoading(false);
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
        setLoading(false);
      } else {
        Swal.fire("Error", "Network error or server not responding", "error");
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = (label) => {
    // Implement geolocation logic if needed
  };
  return (
    <>
      <div>
        {loading ? (
          <div style={{ height: "400px" }}>
            <Spinners />
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12} className="order-Details">
                <Form.Label className="form-label-make-order">
                  Order Details
                </Form.Label>
                <MessageInput
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  name="description"
                  label="Order Details"
                  placeholder="Enter your order details"
                  textareaStyle={{
                    minHeight: "12rem",
                    minWidth: "100%",
                    important: true,
                  }}
                />
              </Col>
              <Col md={12} className="price-data-time">
                <div>
                  <PriceInput
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    name="price"
                    label="Price"
                  />
                </div>
                <Form.Group>
                  <div>
                    <Form.Label className="form-label-make-order">
                      Date
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      min={currentDate}
                      required
                    />
                  </div>
                  <div>
                    <Form.Label className="form-label-make-order">
                      Time
                    </Form.Label>
                    <Form.Control
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={(e) =>
                        handleInputChange("time", e.target.value)
                      }
                      min={
                        formData.date === currentDate ? currentTime : "00:00"
                      }
                      required
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="form-label-make-order text-start m-0">From</div>
                <div>
                  <div className="negative-margin">
                    <Location2Input
                      address={formData.fromLocation}
                      onChange={(value) =>
                        handleInputChange("fromLocation", value)
                      }
                      label=""
                      onGetCurrentLocation={() => getCurrentLocation("From")}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-start form-label-make-order m-0">To</div>
                  <div className="negative-margin">
                    <Location2Input
                      address={formData.toLocation}
                      onChange={(value) =>
                        handleInputChange("toLocation", value)
                      }
                      label=" "
                      onGetCurrentLocation={() => getCurrentLocation("To")}
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                className="text-center mb-2"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
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
                        <FontAwesomeIcon icon={["fas", "money-bill"]} />
                      </span>
                    </div>
                  </div>
                </Button>
                <Button
                  onClick={handleSubmit}
                  style={{
                    height: "45px",
                  }}
                  variant="primary"
                  type="submit"
                >
                  <div style={{ whiteSpace: "nowrap" }}>
                    <span className="me-2">
                      {action === "edit" ? "Edit Order" : "Reorder"}
                    </span>
                    <FontAwesomeIcon icon={["fas", "circle-check"]} />{" "}
                  </div>
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </>
  );
}
