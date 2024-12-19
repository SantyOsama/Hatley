import React, { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const NotifyChangeStatusForUser = () => {
  const [connection, setConnection] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState(null);
  const noOp = () => {};
  noOp(connection);
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
        console.log("Received status update:");
        console.log("Status:", status);
        console.log("Order ID:", orderId);
        console.log("Check Object:", checkObject);
        setUpdatedStatus({ status, orderId, checkObject });
      }
    );

    return () => {
      newConnection
        .stop()
        .then(() => console.log("Disconnected from SignalR hub"));
    };
  }, []);

  return (
    <div>
      <h2>Notify Change Status for User</h2>
      {updatedStatus && (
        <div>
          <h3>Updated Status:</h3>
          <p>Status: {updatedStatus.status}</p>
          <p>Order ID: {updatedStatus.orderId}</p>
          <p>
            Check Object:
            <ul>
              <li>Email: {updatedStatus.checkObject.email}</li>
              <li>Type: {updatedStatus.checkObject.type}</li>
            </ul>
          </p>
        </div>
      )}
    </div>
  );
};

export default NotifyChangeStatusForUser;
