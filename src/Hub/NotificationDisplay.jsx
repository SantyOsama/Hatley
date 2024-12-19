import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import DisplayNotificationAccept from "./DisplayNotificationAccept";
import DisplayNotificationDecline from "./DisplayNotificationDecline";
import "react-notifications-component/dist/theme.css";

const NotificationDisplay = () => {
  const [acceptNotifications, setAcceptNotifications] = useState([]);
  const [declineNotifications, setDeclineNotifications] = useState([]);
  const navigate = useNavigate();

  // Use selectors to get user email and type from Redux store
  const userEmail = useSelector((state) => state.auth.email);
  const personType = useSelector((state) => state.auth.userType);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        "https://hatley.runasp.net/NotifyOfAcceptOrDeclineForDeliveryOffer"
      )
      .withAutomaticReconnect()
      .build();

    connection.on(
      "NotifyOfAcceptOrDeclineForDeliveryOffer",
      (
        state,
        price_of_offer,
        orderid,
        user_Name,
        user_Photo,
        Orders_Count,
        check
      ) => {
        const newNotification = {
          state,
          price_of_offer,
          orderid,
          user_Name,
          user_Photo,
          Orders_Count,
          check,
        };

        console.log("New notification received:", newNotification.state);

        // Add new notification to the appropriate list based on state
        if (state === "Accept") {
          setAcceptNotifications((prevNotifications) => [
            newNotification,
            ...prevNotifications,
          ]);
        } else if (state === "Decline") {
          setDeclineNotifications((prevNotifications) => [
            newNotification,
            ...prevNotifications,
          ]);
        }

        if (state === "Accept") {
          setTimeout(() => {
            navigate("/delivery/home-delivery/trackingOrdersDelivery");
          }, 5000);
        }
      }
    );

    connection
      .start()
      .then(() => console.log("Connected to SignalR hub"))
      .catch((err) => console.error("Error connecting to SignalR hub:", err));

    return () => {
      connection
        .stop()
        .then(() => console.log("Disconnected from SignalR hub"));
    };
  }, [navigate]);

  const filteredAcceptNotifications = acceptNotifications.filter(
    (notification) =>
      notification.check.email === userEmail &&
      notification.check.type.toUpperCase() === personType.toUpperCase()
  );

  const filteredDeclineNotifications = declineNotifications.filter(
    (notification) =>
      notification.check.email === userEmail &&
      notification.check.type.toUpperCase() === personType.toUpperCase()
  );

  return (
    <div>
      {filteredAcceptNotifications.map((notification, index) => (
        <DisplayNotificationAccept
          key={index}
          message={`Offer for Order ID ${notification.orderid} has been accepted at ${notification.price_of_offer} EGP. Please proceed with the next steps.`}
        />
      ))}

      {filteredDeclineNotifications.map((notification, index) => (
        <DisplayNotificationDecline
          key={index}
          message={`Offer for Order ID ${notification.orderid} has been declined at ${notification.price_of_offer} EGP. Please submit an offer with a reasonable price.`}
        />
      ))}
    </div>
  );
};

export default NotificationDisplay;
