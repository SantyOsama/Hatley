import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "../../User/TrackingOrdersUser/TrackingOrdersUser.css";
import TrackingOrdersUserImage from "../../Tools/Images/TrackingOrderUser.svg";
import { TimeLineDelivery, NavbarDelivery, Spinners } from "../../Components";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

library.add(fas);

function TrackingOrdersDeliveries() {
  const [trackings, setTrackings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://hatley.runasp.net/api/Traking",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const sortedData = response.data.sort(
          (a, b) => b.order_id - a.order_id
        );
        setTrackings(sortedData);
        // console.log(sortedData);
      } catch (error) {
        setLoading(false);
        if (error.response) {
          if (error.response.status === 401) {
            Swal.fire(
              "Authentication Error",
              "You must log in first!!! ",
              "error"
            );
            navigate("/delivery/loginDelivery");
          } else if (
            error.response.data &&
            error.response.data === "No exit orders"
          ) {
            setTrackings([]);
          } else {
            Swal.fire(
              "There was an error fetching the tracking data!",
              error.message,
              "error"
            );
          }
        } else {
          Swal.fire(
            "There was an error fetching the tracking data!",
            error.message,
            "error"
          );
        }
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token, navigate]);

  return (
    <Container>
      <NavbarDelivery />
      {loading ? (
        <Spinners />
      ) : (
        <>
          <div className="img">
            <img src={TrackingOrdersUserImage} alt="Tracking Orders" />
          </div>
          {trackings.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "100px",
                height: "500px",
              }}
            >
              No existing tracking orders available.
            </div>
          ) : (
            trackings.map((tracking, index) => (
              <div className="box-tracking" key={index}>
                <Row className="mt-2">
                  <Col xs={12} md={12}>
                    <TimeLineDelivery
                      statu={tracking.status}
                      orderId={tracking.order_id}
                      orderTime={tracking.order_time}
                      zoneFrom={tracking.zone_from}
                      cityFrom={tracking.city_from}
                      cityTo={tracking.city_to}
                      zoneTo={tracking.zone_to}
                      detailesAdressTo={tracking.detailes_address_from}
                      detailesAdressFrom={tracking.detailes_address_to}
                    />
                  </Col>
                </Row>
              </div>
            ))
          )}
        </>
      )}
    </Container>
  );
}

export default TrackingOrdersDeliveries;
