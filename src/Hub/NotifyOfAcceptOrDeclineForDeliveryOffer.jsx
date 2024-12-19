import React, { useEffect, useState, useMemo } from "react";
import * as signalR from "@microsoft/signalr";
import { useSelector } from "react-redux";
import notificationSound from "../../src/Tools/Sound/fanfare.mp3";
import DisplayNotificationAll from "./DisplayNotificationAll";

const NotifyOfAcceptOrDeclineForDeliveryOffer = ({ actionData }) => {
  const [connection, setConnection] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const userEmail = useSelector((state) => state.auth.email);
  const personType = useSelector((state) => state.auth.userType);

  const audio = useMemo(() => new Audio(notificationSound), []);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        "https://hatley.runasp.net/NotifyOfAcceptOrDeclineForDeliveryOffer"
      )
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      if (newConnection) {
        newConnection.stop().then(() => console.log("Connection stopped"));
      }
    };
  }, []);

  useEffect(() => {
    if (connection && !isConnected) {
      const startConnection = async () => {
        try {
          await connection.start();
          setIsConnected(true);
          console.log("Connected to SignalR hub");

          connection.on(
            "NotifyOfAcceptOrDeclineForDeliveryOffer",
            (
              state,
              price_of_offer,
              order_id,
              user_name,
              user_photo,
              orders_count,
              check
            ) => {
              console.log("Notification received:", {
                state,
                price_of_offer,
                order_id,
                user_name,
                user_photo,
                orders_count,
                check,
              });

              if (userInteracted) {
                audio.play();
              }

              setNotifications((prevNotifications) => [
                ...prevNotifications,
                {
                  state,
                  price_of_offer,
                  order_id,
                  user_name,
                  user_photo,
                  orders_count,
                  check,
                },
              ]);
            }
          );

          if (actionData) {
            const {
              state,
              price_of_offer,
              order_id,
              user_name,
              user_photo,
              orders_count,
            } = actionData;
            const check = { email: actionData.email, type: "User" };

            if (connection.state === signalR.HubConnectionState.Disconnected) {
              await connection.start();
              console.log("Connection restarted");
            }

            connection
              .invoke(
                "NotifyOfAcceptOrDeclineForDeliveryOffer",
                state,
                price_of_offer,
                order_id,
                user_name,
                user_photo,
                orders_count,
                check
              )
              .then(() => {
                console.log("Notification sent successfully");
              })
              .catch((err) => {
                console.error("Error sending notification:", err);
              });
          }

          connection.onclose(async () => {
            console.log("Disconnected from SignalR hub");
            setIsConnected(false);
            try {
              await connection.start();
              setIsConnected(true);
              console.log("Reconnected to SignalR hub");
            } catch (err) {
              console.error("Error while reconnecting:", err);
            }
          });
        } catch (err) {
          console.error("Error while starting connection:", err);
        }
      };

      startConnection();
    }
  }, [connection, isConnected, actionData, userInteracted, audio]);

  useEffect(() => {
    if (connection && isConnected && actionData) {
      const sendNotification = async () => {
        try {
          const {
            state,
            price_of_offer,
            order_id,
            user_name,
            user_photo,
            orders_count,
          } = actionData;
          const check = { email: actionData.email, type: "User" };

          if (connection.state === signalR.HubConnectionState.Disconnected) {
            await connection.start();
            console.log("Connection restarted");
          }

          connection
            .invoke(
              "NotifyOfAcceptOrDeclineForDeliveryOffer",
              state,
              price_of_offer,
              order_id,
              user_name,
              user_photo,
              orders_count,
              check
            )
            .then(() => {
              console.log("Notification sent successfully");
            })
            .catch((err) => {
              console.error("Error sending notification:", err);
            });
        } catch (err) {
          console.error("Error while sending notification:", err);
        }
      };

      sendNotification();
    }
  }, [connection, isConnected, actionData]);

  const handleUserInteraction = () => {
    setUserInteracted(true);
  };

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.check.email === userEmail &&
      notification.check.type.toUpperCase() === personType
  );

  return (
    <div onClick={handleUserInteraction}>
      <h2>Notifications</h2>
      {filteredNotifications.map((notification, index) => (
        <div key={index}>
          <DisplayNotificationAll
            title="New Notification"
            message={`State: ${notification.state}, Price of Offer: ${notification.price_of_offer}, Order ID: ${notification.order_id}`}
            type="info"
          />
        </div>
      ))}
    </div>
  );
};

export default NotifyOfAcceptOrDeclineForDeliveryOffer;
