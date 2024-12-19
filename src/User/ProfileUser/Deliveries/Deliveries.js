import { Col, Container, Row } from "react-bootstrap";
import "./Deliveries.css";
import {
  Order,
  Header,
  Sidebar,
  NavbarUser,
  Spinners,
} from "../../../Components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);

  const fetchDeliveries = async (token) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://hatley.runasp.net/api/Order/Deliveries",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.length === 0) {
        setError("No Records exist");
        setDeliveries([]);
      } else {
        const sortedOrders = response.data.sort(
          (a, b) => b.order_id - a.order_id
        );
        setDeliveries(sortedOrders);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        Swal.fire(
          "",
          "Unauthorized access. Please login to view your deliveries.",
          "error"
        );
      } else {
        Swal.fire("", "An error occurred while fetching deliveries.", "info");
        setError("An error occurred while fetching deliveries.");
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchDeliveries(token);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <Container fluid>
      <Row>
        <NavbarUser />
      </Row>
      <Row className={`flex-column-sm ${"header-order-details-to-right"}`}>
        <Col xs={12} sm={3} md={4} lg={2} className="order-1">
          <div className="sidebar-container">
            <Sidebar />
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
            <Header text="Previous orders" />
            <div className="sizing">
              {isLoading ? (
                <Spinners />
              ) : error ? (
                <p>{error}</p>
              ) : deliveries.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "100px",
                    height: "500px",
                  }}
                >
                  There are no deliveries available.
                </div>
              ) : (
                deliveries.map((delivery) => (
                  <Order
                    key={delivery.order_id}
                    id={delivery.order_id}
                    description={delivery.description}
                    orderZoneFrom={delivery.order_zone_from}
                    orderCityFrom={delivery.order_city_from}
                    detailesAddressFrom={delivery.detailes_address_from}
                    orderZoneTo={delivery.order_zone_to}
                    orderCityTo={delivery.order_city_to}
                    detailesAddressTo={delivery.detailes_address_to}
                    orderTime={delivery.order_time}
                    price={delivery.price}
                    status={delivery.status}
                    deliveryName={delivery.delivery_name}
                    deliveryPhoto={delivery.delivery_photo}
                    deliveryAvgRate={delivery.delivery_avg_rate}
                    orderRate={delivery.order_rate}
                  />
                ))
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Deliveries;
