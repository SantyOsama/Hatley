import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import "./OrderDetails.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ReOrder, MessageInput, Notification } from "../../Components";
import * as signalR from "@microsoft/signalr";

function OrderDetails({ order, onDelete }) {
  const [showeditedOrderModal, setShoweditedOrderModal] = useState(false);
  const [editedOrder, setEditedOrder] = useState(order);
  const [connection, setConnection] = useState(null);
  const [offers, setOffers] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const handleCloseeditedOrderModal = () => setShoweditedOrderModal(false);
  const handleShoweditedOrderModal = () => setShoweditedOrderModal(true);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://hatley.runasp.net/NotifyNewOfferForUser", {
        accessTokenFactory: () => token,
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [token]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR hub");

          connection.on("NotifyNewOfferForUser", (view, check) => {
            console.log("New offer received:", view, check);

            const adjustedView = {
              ...view,
              delivery_photo: view.delivery_photo.replace(
                "D:\\Sites\\site4609\\wwwroot\\wwwroot\\",
                "https://hatley.runasp.net/"
              ),
            };

            setOffers((prevOffers) => [
              ...prevOffers,
              { view: adjustedView, check },
            ]);
          });

          connection.onclose(async () => {
            console.log("Disconnected from SignalR hub");
            try {
              await connection.start();
              console.log("Reconnected to SignalR hub");
            } catch (err) {
              console.error("Error while reconnecting:", err);
            }
          });
        })
        .catch((err) =>
          console.error("Error while starting connection: ", err)
        );
    }

    return () => {
      if (connection) {
        connection.stop().then(() => console.log("Connection stopped"));
      }
    };
  }, [connection]);

  const handleDeleteOrder = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://hatley.runasp.net/api/Order/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          Swal.fire("Deleted!", "Your order has been deleted.", "success");
          onDelete(orderId);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          Swal.fire("Error", "The order does not exist", "error");
        } else {
          Swal.fire("Error", "An error occurred during deletion", "error");
        }
      }
    }
  };

  const handleSubmitSuccess = async () => {
    handleCloseeditedOrderModal();

    try {
      const response = await axios.get(
        `https://hatley.runasp.net/api/Order/${order.order_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setEditedOrder(response.data);

        console.log(editedOrder);
        console.log("response", response.data);
      } else {
        Swal.fire("Error", "Failed to fetch updated orders", "error");
      }
    } catch (error) {
      console.error("Error fetching updated orders:", error);
      Swal.fire("Error", "Failed to fetch updated orders", "error");
    }
  };

  // const handleDecline = async (offer) => {
  //   const { order_id, offer_value, delivery_email } = offer.view;
  //   const url = `https://hatley.runasp.net/api/Offer/User/Decline?orderid=${order_id}&price_of_offer=${offer_value}&delivery_email=${delivery_email}`;

  //   try {
  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (response.status === 200) {
  //       setOffers((prevOffers) =>
  //         prevOffers.filter((o) => o.view.order_id !== order_id)
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error declining offer:", error);
  //   }
  // };

  return (
    <Container fluid className="order-container">
      <div className="border-red">
        <Row className="m-2">
          <Col md={7} className="order-Details">
            <Form.Label className="order-label">Order Details:</Form.Label>
            <MessageInput
              value={editedOrder.description}
              name="orderDetails"
              label="Order Details"
              placeholder="Enter your order details"
              textareaStyle={{ minHeight: "150px", important: true }}
              read={true}
            />
          </Col>
          <Col md={5} className="price-data-time">
            <Form.Group className="mb-3">
              <div className="mb-2">
                <Form.Label className="order-label">Price:</Form.Label>
                <div
                  style={{
                    color: "#5BB264",
                    fontSize: "x-large",
                    fontWeight: "bold",
                  }}
                >
                  {order.price} EGP
                </div>
              </div>
              <div className="mb-2 mt-2">
                <Form.Label className="order-label">Date:</Form.Label>
                <div>
                  {new Date(editedOrder.order_time + "z").toLocaleDateString()}
                </div>
              </div>
              <div className="mb-2 mt-2">
                <Form.Label className="order-label">Time:</Form.Label>
                <div>
                  {new Date(editedOrder.order_time).toLocaleTimeString()}
                </div>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ margin: "0px", marginBottom: "20px" }}>
          <Col md={12}>
            <Container fluid>
              <Row>
                <Col xs={12}>
                  <Row className="d-flex flex-column flex-sm-row align-items-center">
                    <p className="order-label mb-1 mb-sm-0">From:</p>
                    <div
                      className="d-flex flex-column flex-md-row gap-3 mb-2"
                      style={{ justifyContent: "space-around", width: "100%" }}
                    >
                      <div>{editedOrder.order_governorate_from}</div>
                      <div>{editedOrder.order_zone_from}</div>
                      <div>{editedOrder.order_city_from}</div>
                    </div>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <input
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #0084ff",
                      borderRadius: "5px",
                      height: "40px",
                      width: "100%",
                      padding: "5px",
                      marginBottom: "5px",
                    }}
                    type="text"
                    value={editedOrder.detailes_address_from}
                    readOnly
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Row className="d-flex flex-column flex-sm-row align-items-center">
                    <p className="order-label mb-1 mb-sm-0">To:</p>
                    <div
                      className="d-flex flex-column flex-md-row gap-3 mb-2"
                      style={{ justifyContent: "space-around", width: "100%" }}
                    >
                      <div>{editedOrder.order_governorate_to}</div>
                      <div>{editedOrder.order_zone_to}</div>
                      <div>{editedOrder.order_city_to}</div>
                    </div>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <input
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #0084ff",
                      borderRadius: "5px",
                      height: "40px",
                      width: "100%",
                      padding: "5px",
                    }}
                    type="text"
                    value={editedOrder.detailes_address_to}
                    readOnly
                  />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button variant="primary" onClick={handleShoweditedOrderModal}>
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteOrder(editedOrder.order_id)}
            >
              Cancel
            </Button>
          </div>
        </Row>
        <Row style={{ flexWrap: "wrap" }}>
          {offers
            .filter((offer) => offer.view.order_id === order.order_id)
            .map((offer, index) => (
              <Col
                key={index}
                xs={12}
                sm={6}
                md={12}
                lg={6}
                className="d-flex justify-content-center"
              >
                <Notification
                  name={offer.view.delivery_name}
                  img={offer.view.delivery_photo}
                  rating={offer.view.delivery_avg_rate}
                  count={offer.view.delivery_count_rate}
                  price={offer.view.offer_value}
                  // price={offer.view.order_id}
                  offer={offer}
                  setOffers={setOffers}
                />
              </Col>
            ))}
        </Row>
      </div>
      <Modal show={showeditedOrderModal} onHide={handleCloseeditedOrderModal}>
        <Modal.Header
          style={{
            backgroundColor: "#0055b9",
            color: "white",
          }}
          closeButton
        >
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            background: "linear-gradient(270deg, #ffffff, #bcdbf8)",
          }}
        >
          <ReOrder
            action="edit"
            orderId={editedOrder.order_id}
            props={{
              description: editedOrder.description,
              price: editedOrder.price,
              fromLocation: {
                govern: editedOrder.order_governorate_from,
                city: editedOrder.order_zone_from,
                state: editedOrder.order_city_from,
                detailedAddress: editedOrder.detailes_address_from,
              },
              toLocation: {
                govern: editedOrder.order_governorate_to,
                city: editedOrder.order_zone_to,
                state: editedOrder.order_city_to,
                detailedAddress: editedOrder.detailes_address_to,
              },
            }}
            onSubmitSuccess={handleSubmitSuccess}
          />
        </Modal.Body>
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></div>
    </Container>
  );
}

export default OrderDetails;
