import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import "./DeliveriesDelivery.css";
import Header from "../../../Components/Header/header";
import {
  SidebarDelivery,
  NavbarDelivery,
  OrderDelivery,
  Spinners,
} from "../../../Components";
import { useSelector } from "react-redux";

function DeliveriesDelivery() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://hatley.runasp.net/api/Order/Orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const filteredOrders = response.data.filter(
          (order) => order.status === 3
        );
        setOrders(filteredOrders);
      } catch (error) {
        setLoading(false);
        setError("No Records exist");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);
  console.log(orders);
  return (
    <>
      <Container fluid>
        <Row>
          <NavbarDelivery />
        </Row>
        <Row className={` flex-column-sm ${"header-order-details-to-right"}`}>
          <Col xs={12} sm={3} md={4} lg={2} className="order-1">
            <div className="sidebar-container">
              <SidebarDelivery />
            </div>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={6}
            lg={10}
            className="order-lg-2 order-md-2"
            style={{ textAlign: "center" }}
          >
            <div>
              <Header text="Previous Orders" />
              <div className="sizing">
                {loading ? (
                  <Spinners />
                ) : orders.length === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "100px",
                      height: "100px",
                    }}
                  >
                    No existing orders
                  </div>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  orders.map((order) => (
                    <OrderDelivery key={order.order_id} order={order} />
                  ))
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DeliveriesDelivery;
