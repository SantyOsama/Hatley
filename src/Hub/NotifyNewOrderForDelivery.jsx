import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const NotifyNewOrderForDelivery = () => {
  const [order, setOrder] = useState(null);
  const [userName, setUserName] = useState("");
  const [userOrdersCount, setUserOrdersCount] = useState(0);
  const [type, setType] = useState("");
  const [deliverersEmails, setDeliverersEmails] = useState([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://hatley.runasp.net/NotifyNewOrderForDelivery")
      .withAutomaticReconnect()
      .build();

    connection.on(
      "NotifyOrderForDeliveryHup",
      (orderData, user_Name, user_Orders_Count, delivers_emails, orderType) => {
        // console.log(orderData);
        setOrder(orderData);
        setUserName(user_Name);
        setUserOrdersCount(user_Orders_Count);
        setDeliverersEmails(delivers_emails);
        setType(orderType);
      }
    );

    connection
      .start()
      .then(() => console.log("Connected to SignalR hub"))
      .catch((err) => console.error("Error connecting to SignalR hub", err));

    return () => {
      connection
        .stop()
        .then(() => console.log("Disconnected from SignalR hub"))
        .catch((err) =>
          console.error("Error disconnecting from SignalR hub", err)
        );
    };
  }, []);

  if (!order) {
    return <div>Waiting for order notifications...</div>;
  }

  return (
    <div>
      <h2>New Order Notification</h2>
      <p>
        <strong>Description:</strong> {order.description}
      </p>
      <p>
        <strong>From:</strong> {order.order_governorate_from},{" "}
        {order.order_zone_from}, {order.order_city_from},{" "}
        {order.detailes_address_from}
      </p>
      <p>
        <strong>To:</strong> {order.order_governorate_to}, {order.order_zone_to}
        , {order.order_city_to}, {order.detailes_address_to}
      </p>
      <p>
        <strong>Created:</strong> {order.created}
      </p>
      <p>
        <strong>Order Time:</strong> {order.order_time}
      </p>
      <p>
        <strong>Price:</strong> {order.price}
      </p>
      <p>
        <strong>User ID:</strong> {order.user_ID}
      </p>
      <p>
        <strong>User Name:</strong> {userName}
      </p>
      <p>
        <strong>User Orders Count:</strong> {userOrdersCount}
      </p>
      <p>
        <strong>Type:</strong> {type}
      </p>
      <h3>Deliverers Emails:</h3>
      <ul>
        {deliverersEmails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotifyNewOrderForDelivery;
