import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./TrackingOrdersUser.css";
import { Timeline, NavbarUser, Spinners } from "../../Components";
import TrackingOrdersUserImage from "../../Tools/Images/TrackingOrderUser.svg";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as signalR from "@microsoft/signalr";

library.add(fas);

function TrackingOrdersUser() {
  const [trackings, setTrackings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const userEmail = useSelector((state) => state.auth.email);
  const storedOrderType = useSelector((state) => state.auth.userType);
  const navigate = useNavigate();
  const [connection, setConnection] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState(null);
  const noOp = () => {};
  noOp(connection);

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
        setTrackings(response.data);
      } catch (error) {
        setLoading(false);
        if (error.response) {
          if (error.response.status === 401) {
            Swal.fire(
              "Authentication Error",
              "You must log in first!!! ",
              "error"
            );
            navigate("/loginUser");
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

    fetchData();
  }, [token, navigate]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://hatley.runasp.net/NotifyChangeStatusForUser")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => console.log("Connected to SignalR hub"))
      .catch((err) => console.error("Error connecting to SignalR hub", err));

    newConnection.on(
      "NotifyChangeStatusForUser",
      (status, orderId, checkObject) => {
        if (
          checkObject.email === userEmail &&
          storedOrderType.toUpperCase() === checkObject.type.toUpperCase()
        ) {
          setUpdatedStatus({ status, orderId, checkObject });
        }
      }
    );

    return () => {
      newConnection
        .stop()
        .then(() => console.log("Disconnected from SignalR hub"));
    };
  }, [userEmail, storedOrderType]);

  useEffect(() => {
    if (updatedStatus) {
      setTrackings((prevTrackings) =>
        prevTrackings.map((tracking) =>
          tracking.order_id === updatedStatus.orderId
            ? { ...tracking, status: updatedStatus.status }
            : tracking
        )
      );
    }
  }, [updatedStatus]);

  return (
    <Container>
      <NavbarUser />
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
              No existing orders
            </div>
          ) : (
            trackings
              .sort((a, b) => b.order_id - a.order_id) // ترتيب تنازلي حسب معرف الطلب
              .map((tracking, index) => (
                <div className="box-tracking" key={index}>
                  <Timeline
                    status={tracking.status}
                    orderId={tracking.order_id}
                    orderTime={tracking.order_time}
                    zoneFrom={tracking.zone_from}
                    cityFrom={tracking.city_from}
                    cityTo={tracking.city_to}
                    zoneTo={tracking.zone_to}
                    delivery_id={tracking.delivery_id}
                  />
                </div>
              ))
          )}
        </>
      )}
    </Container>
  );
}

export default TrackingOrdersUser;
