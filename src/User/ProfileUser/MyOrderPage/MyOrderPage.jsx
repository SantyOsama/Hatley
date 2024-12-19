import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import {
  Sidebar,
  Header,
  OrderDetails,
  NavbarUser,
  Spinners,
  // Notification,
} from "../../../Components";
import "./MyOrderPage.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const fetchOrders = async (token, setOrders, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await axios.get(
      "https://hatley.runasp.net/api/Order/Orders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const sortedOrders = response.data.sort((a, b) => b.order_id - a.order_id);
    setOrders(sortedOrders);
  } catch (error) {
    if (error.response && error.response.data === "No Records exist") {
      setOrders([]);
    } else {
      Swal.fire("", "There was an error fetching the orders!", "error");
    }
  } finally {
    setIsLoading(false);
  }
};

function MyOrderPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchOrders(token, setOrders, setIsLoading);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleDeleteOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.order_id !== orderId)
    );
  };
  // console.log(orders);
  return (
    <>
      <Container fluid>
        <Row>
          <NavbarUser />
        </Row>
        <Row className={`${"header-order-details-to-right"}`}>
          <Col xs={12} md={2} className="sidebar-col order-md-1 order-2">
            <div className="sidebar-container">
              <Sidebar />
            </div>
          </Col>{" "}
          <Col xs={12} md={10} className="order-md-2 order-1">
            <Header text={"My Current orders"} />
            {isLoading ? (
              <Spinners />
            ) : orders.length === 0 ? (
              <>
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
                <Col xs={12} md={12}>
                  <div className="text-center">
                    <Button
                      variant="primary"
                      className="order-button "
                      onClick={() => navigate("/home/makeOrder")}
                    >
                      Make Order Now{" "}
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </Button>
                  </div>
                </Col>
              </>
            ) : (
              orders.map((order) => (
                <OrderDetails
                  key={order.order_id}
                  order={order}
                  onDelete={handleDeleteOrder}
                />
              ))
            )}
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <Notification />
          </Col>
          <Col>
            <Notification />
          </Col>
          <Col>
            <Notification />
          </Col>
          <Col>
            <Notification />
          </Col>
          <Col>
            <Notification />
          </Col>
          <Col>
            <Notification />
          </Col>
        </Row> */}
      </Container>
      <Outlet />
    </>
  );
}

export default MyOrderPage;
